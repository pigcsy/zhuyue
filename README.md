# 者月钱包客户端

Vue 2 / Vue CLI 3 / Webpack 4 项目，移动端代码在 `src/app`，管理后台在 `src/web`，路由为 `src/router.js`。两者都是前端代码；仓库没有后端服务实现。

## 安装和开发

使用 Node 24.22.0、Yarn Classic 1.22.22 和已提交的 `yarn.lock`：

```sh
npm exec --yes --package=yarn@1.22.22 -- yarn install --frozen-lockfile --ignore-scripts --non-interactive
npm run dev
```

`npm run test` 启动 testing 模式的开发服务器，并非自动化测试。原有 development / testing / production 命令继续保留。`scripts/vue-cli.cjs` 只为旧 Webpack 构建/开发进程添加 OpenSSL 兼容选项，不改变本机全局 `NODE_OPTIONS`。`node-sass` 已替换为固定版本的 Dart Sass；旧 loader 的废弃 API 警告仍需后续构建链升级解决。

## 检查和回归

```sh
python scripts/run_checks.py --tier quick --report .check-reports/quick.json
python scripts/run_checks.py --tier full --report .check-reports/full.json
```

- quick 运行源码、配置和新增脚本的只读 lint；full/risk 再运行构建及 4 项登录页面回归。
- 构建使用 `NODE_ENV=production`、独立 `workflow` 模式，输出到 `.checks-dist`，不加载 `.env.production`，不覆盖已跟踪的 `dist`。这验证生产优化编译，不等于验证正式部署配置。
- 首次浏览器测试可执行 `node node_modules/@playwright/test/cli.js install chromium`。本机已有 Chrome 时，在 PowerShell 设置 `$env:E2E_CHANNEL='chrome'` 后运行 full 即可；CI 使用 Chromium。
- 测试验证空用户名、空密码、API 拒绝和网络错误后的表单恢复。所有外部网络请求均被拦截，API 响应在浏览器内模拟，仅使用虚构输入，不连接真实服务。
- 结果保存在 `.check-reports`，失败时保留 Playwright trace / 截图。检查记录命令、退出码和输入文件哈希；运行中输入改变会报 BLOCKED，需要重新验证最终内容。
- `npm run lint:check` 不改文件，`npm run lint` 保留自动修复行为。不要在存在无关改动时批量自动修复。

## CI 和已知限制

`.github/workflows/checks.yml` 在 master 的 push 和 pull request 运行同一 full 检查入口，避免功能分支重复运行；Actions 固定到已核对的提交，权限为 contents: read，证据保留 7 天。按系统、架构和锁文件缓存依赖下载，仍执行冻结安装和全部检查；上传范围限于检查报告与失败诊断，缺少报告会使 CI 失败。

这是历史项目，旧依赖已关联多项公开漏洞，Browserslist 数据和 bundle 大小也有构建警告。构建、lint 或页面回归通过不代表漏洞已修复、安全审计通过或性能达标；应单独评估 Axios、Vue 及构建链的迁移和业务回归。

真实账号登录、服务端鉴权、租户隔离、数据库事务、支付/借贷业务以及正式环境均未验证，需要受控测试环境。不得用本机 MySQL/Redis 或新容器绕过环境缺口。

仓库历史中包含环境文件和构建产物；本次不打印、改写或重新发布其中的配置。后续公开发布前应由项目维护者审查历史中的敏感数据，不通过重写历史作为常规修复。
