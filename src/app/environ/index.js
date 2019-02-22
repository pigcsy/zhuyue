/**
 * Environ Js
 * @JsName index
 * @Description 环境配置.
 * @DateTime 2018-12-22 20:39:22
 * @author 
 */

/**
 * 当前环境
 */
const CurrentEnviron = process.env.NODE_ENV;

/**
 * 环境配置
 */
const Environ = require("./configuration/".concat(CurrentEnviron)).default;

/**
 * 环境配置
 * -- 服务配置.
 */
const { server: Service } = Environ;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - Environ（ 环境配置 ）
 * - Environ.Service（ 服务配置 :: 导出 ）
 */
export { Service };
export default Environ;