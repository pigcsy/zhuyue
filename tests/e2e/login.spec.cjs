const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ context, page }) => {
  // This app embeds legacy API hosts. Route every request before navigation,
  // and never let a browser test reach a real backend or external resource.
  await context.route('**/*', async route => {
    if (new URL(route.request().url()).origin === 'http://127.0.0.1:4173') {
      await route.continue();
    } else {
      await route.abort('blockedbyclient');
    }
  });
  await page.goto('/backend/login');
  await expect(page.getByRole('heading', { name: '者月钱包', exact: true })).toBeVisible();
});

test('empty username is rejected without a login request', async ({ page }) => {
  const requests = [];
  page.on('request', request => { if (request.url().includes('/oauth/api/v1/login')) requests.push(request); });
  await page.getByRole('button', { name: '登录', exact: true }).click();
  await expect(page.getByText('请输入用户名', { exact: false })).toBeVisible();
  expect(requests).toHaveLength(0);
});

test('empty password is rejected without a login request', async ({ page }) => {
  const requests = [];
  page.on('request', request => { if (request.url().includes('/oauth/api/v1/login')) requests.push(request); });
  await page.getByPlaceholder('用户名').fill('workflow-fixture-user');
  await page.getByRole('button', { name: '登录', exact: true }).click();
  await expect(page.getByText('请输入用户凭证', { exact: false })).toBeVisible();
  expect(requests).toHaveLength(0);
});

test('API rejection is displayed and the form becomes usable again', async ({ page }) => {
  let calls = 0;
  await page.route('**/oauth/api/v1/login', async route => {
    calls++;
    expect(route.request().method()).toBe('PATCH');
    await route.fulfill({ json: { code: 10002, result: '测试拒绝' } });
  });
  await page.getByPlaceholder('用户名').fill('workflow-fixture-user');
  await page.getByPlaceholder('密码').fill('fixture-only-value');
  await page.getByRole('button', { name: '登录', exact: true }).click();
  await expect(page.getByText('登陆失败 , 测试拒绝')).toBeVisible();
  await expect(page.getByRole('button', { name: '登录', exact: true })).toBeEnabled();
  expect(calls).toBe(1);
});

test('network failure is displayed and submission can be retried', async ({ page }) => {
  await page.route('**/oauth/api/v1/login', route => route.abort('failed'));
  await page.getByPlaceholder('用户名').fill('workflow-fixture-user');
  await page.getByPlaceholder('密码').fill('fixture-only-value');
  await page.getByRole('button', { name: '登录', exact: true }).click();
  await expect(page.getByText('登录失败 , 网络异常')).toBeVisible();
  await expect(page.getByRole('button', { name: '登录', exact: true })).toBeEnabled();
});
