# 项目开发约定

这是 Vue 2 / Vue Router 3 / Vuex 3 的钱包客户端，使用 Vue CLI 3、Webpack 4 和 Yarn Classic 锁文件。不要套用 Vue 3、Pinia 或 Vite 的 API。

- 入口为 src/main.js 和 src/router.js；app 是移动端，web 是后台；各自的 module、request 和 environ 负责服务调用。
- 使用 Node 24、Yarn 1.22.22，依赖以 yarn.lock 为准。安装使用 yarn install --frozen-lockfile --ignore-scripts；不混入 package-lock.json。
- 修改前读取 project-checks.json。快速检查：python scripts/run_checks.py --tier quick；交付检查：python scripts/run_checks.py --tier full --report .check-reports/full.json。
- lint:check 不自动修复源码。原 npm run test 是测试环境开发服务器，不是断言测试。
- check:build 用 NODE_ENV=production 和独立 workflow 模式输出到 .checks-dist，不加载 .env.production，也不覆盖仓库中已跟踪的 dist。Webpack 4 的 OpenSSL 兼容参数仅限检查构建子进程；这是迁移前的兼容措施。
- 浏览器测试只服务本机编译产物，模拟登录 API 并阻断外部请求，不验证真实账号、后端鉴权、数据库或交易。
- .env 文件已存在于历史仓库，按敏感配置对待，不读取、打印或修改其中的值；配置源文件也不得复制到日志和知识库。未经审查不上传构建产物或 trace；测试只用虚构凭证。
- 已有依赖漏洞必须如实报告，不能把编译或页面回归通过说成安全审计通过。大规模依赖迁移及业务变更另行界定范围。
- 不在本机创建 MySQL、Redis 或对应容器。Serena 项目记忆独立启用；共享个人知识仅在明确授权下写入 Obsidian。
