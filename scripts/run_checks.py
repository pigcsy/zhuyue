"""Run reviewed project-defined checks with explicit outcomes and snapshot evidence."""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import time


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def redact(text: str) -> str:
    for key, value in os.environ.items():
        if len(value) >= 6 and re.search(r'TOKEN|PASSWORD|SECRET|API_KEY|AUTHORIZATION', key, re.I):
            text = text.replace(value, '[REDACTED]')
    text = re.sub(r'(?i)(Bearer\s+)[A-Za-z0-9._~+/=-]{8,}', r'\1[REDACTED]', text)
    text = re.sub(r'\b(?:gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})\b', '[REDACTED]', text)
    return text


def within(root: Path, relative: str) -> Path:
    candidate = (root / relative).resolve()
    if not candidate.is_relative_to(root):
        raise ValueError('Check working directory or input escapes the project root')
    return candidate


def load_manifest(path: Path) -> dict:
    data = json.loads(path.read_text(encoding='utf-8-sig'))
    if not isinstance(data, dict) or data.get('schema_version') != 1 or not isinstance(data.get('checks'), list):
        raise ValueError('Expected schema_version=1 and a checks array')
    names = set()
    root = path.parent.resolve()
    for check in data['checks']:
        if not isinstance(check, dict):
            raise ValueError('Each check must be an object')
        name = check.get('id')
        if not isinstance(name, str) or not name or name in names:
            raise ValueError('Check ids must be nonempty and unique')
        names.add(name)
        argv = check.get('argv')
        if not isinstance(argv, list) or not argv or not all(isinstance(x, str) and x for x in argv):
            raise ValueError(f'{name}: argv must be a nonempty string array')
        tiers = check.get('tiers')
        if not isinstance(tiers, list) or not tiers or not set(tiers) <= {'quick', 'full', 'risk'}:
            raise ValueError(f'{name}: invalid tiers')
        if not isinstance(check.get('required', True), bool):
            raise ValueError(f'{name}: required must be boolean')
        timeout = check.get('timeout_seconds', 120)
        if not isinstance(timeout, (int, float)) or isinstance(timeout, bool) or not 0 < timeout <= 3600:
            raise ValueError(f'{name}: timeout must be in (0, 3600] seconds')
        within(root, check.get('cwd', '.'))
        requirements = check.get('requires_env', [])
        if not isinstance(requirements, list) or not all(isinstance(x, str) and x for x in requirements):
            raise ValueError(f'{name}: requires_env must contain environment variable names')
    patterns = data.get('inputs', ['project-checks.json'])
    if not isinstance(patterns, list) or not all(isinstance(x, str) and x and not Path(x).is_absolute() for x in patterns):
        raise ValueError('inputs must be a list of relative project paths or glob patterns')
    return data


def snapshot(root: Path, patterns: list[str]) -> dict:
    files = {}
    for pattern in patterns:
        within(root, pattern)
        for path in root.glob(pattern):
            if path.is_file():
                resolved = within(root, str(path.relative_to(root)))
                files[str(path.relative_to(root)).replace('\\', '/')] = digest(resolved)
    return {'files': dict(sorted(files.items())), 'file_count': len(files)}


def run_check(root: Path, check: dict) -> dict:
    result = {'id': check['id'], 'required': check.get('required', True),
              'cwd': str(within(root, check.get('cwd', '.')))}
    missing = [key for key in check.get('requires_env', []) if not os.environ.get(key)]
    if missing:
        return {**result, 'status': 'BLOCKED', 'reason': 'Missing required environment variable names: ' + ', '.join(missing)}
    replacements = {'{python}': sys.executable, '{root}': str(root), '{node}': shutil.which('node') or 'node'}
    argv = list(check['argv'])
    for i, arg in enumerate(argv):
        for key, value in replacements.items():
            arg = arg.replace(key, value)
        argv[i] = arg
    result['argv'] = [redact(value) for value in argv]
    started = time.monotonic()
    try:
        process = subprocess.run(argv, cwd=result['cwd'], capture_output=True, text=True,
                                 encoding='utf-8', errors='replace', timeout=check.get('timeout_seconds', 120),
                                 shell=False)
        result.update(status='PASS' if process.returncode == 0 else 'FAIL', exit_code=process.returncode,
                      stdout_tail=redact(process.stdout)[-2400:], stderr_tail=redact(process.stderr)[-2400:])
    except FileNotFoundError:
        result.update(status='BLOCKED', reason='Required executable or working directory is unavailable')
    except subprocess.TimeoutExpired:
        result.update(status='BLOCKED', reason='Check exceeded its configured time bound')
    except OSError as error:
        result.update(status='BLOCKED', reason=f'Could not start check: {type(error).__name__}')
    result['elapsed_seconds'] = round(time.monotonic() - started, 3)
    return result


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--manifest', type=Path, default=Path('project-checks.json'))
    parser.add_argument('--tier', choices=['quick', 'full', 'risk'], default='quick')
    parser.add_argument('--list', action='store_true', help='Inspect selected commands without running them')
    parser.add_argument('--report', type=Path)
    args = parser.parse_args(argv)
    try:
        manifest_path = args.manifest.resolve()
        manifest_sha = digest(manifest_path)
        data = load_manifest(manifest_path)
        root = manifest_path.parent
        selected = [check for check in data['checks'] if args.tier in check['tiers']]
        if not selected:
            raise ValueError('No checks defined for the requested tier; this is not a passing gate')
        before = snapshot(root, data.get('inputs', ['project-checks.json']))
        if digest(manifest_path) != manifest_sha:
            raise ValueError('Manifest changed while preparing checks; reread and retry')
        if args.list:
            print(json.dumps({'status': 'SKIPPED', 'reason': 'Plan only; no checks executed',
                              'tier': args.tier, 'checks': selected}, ensure_ascii=False, indent=2))
            return 0
        results = [run_check(root, check) for check in selected]
        required = [check for check in results if check['required']]
        status = 'FAIL' if any(x['status'] == 'FAIL' for x in required) else (
            'BLOCKED' if any(x['status'] == 'BLOCKED' for x in required) else 'PASS')
        after = snapshot(root, data.get('inputs', ['project-checks.json']))
        if before != after:
            status = 'BLOCKED'
        report = {'status': status, 'tier': args.tier, 'root': str(root), 'python': sys.version.split()[0],
                  'manifest_sha256': manifest_sha, 'snapshot': before,
                  'inputs_unchanged_during_checks': before == after, 'checks': results}
    except (OSError, ValueError, TypeError, KeyError) as error:
        report = {'status': 'BLOCKED', 'reason': redact(str(error)), 'tier': args.tier}
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return {'PASS': 0, 'FAIL': 1, 'BLOCKED': 2}[report['status']]


if __name__ == '__main__':
    raise SystemExit(main())
