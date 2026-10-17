# 项目入口与验证边界

权威规范在 AGENTS.md、README.md、project-checks.json；先核对它们，不从记忆推断最新验证结果。

这是 Vue 2 / Vue CLI 3 / Webpack 4 的前端仓库，src/app 是移动端，src/web 是管理后台；没有服务端实现。不要套用 Vue 3 / Pinia / Vite 的项目约定。

检查构建使用独立 workflow 模式和 .checks-dist，避免覆盖已跟踪的 dist 或加载 .env.production。Webpack 的 OpenSSL 兼容参数仅限构建/开发子进程。保留 Yarn Classic 的唯一锁文件。

浏览器回归只测试登录表单的本地行为与模拟失败响应，外部网络阻断；它不证明真实鉴权、数据隔离、事务或借贷业务正确。依赖漏洞和构建废弃警告需要单独处理，不能被 lint/build PASS 代替。

环境文件的内容不进入记忆、输出或提示词。不在本机新建 MySQL / Redis 服务或容器。个人跨项目知识仅在明确授权时写入共享 Obsidian。
