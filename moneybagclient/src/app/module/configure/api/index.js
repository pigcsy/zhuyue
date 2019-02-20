/**
 * index Js
 * @JsName index
 * @Description 配置信息（ 模块 ）API.
 * @DateTime 2018-12-22 20:39:22
 * @author csy
 */

/**
 * 配置信息 API
 */
const ConfigureAPI = {
    obtain: "/api/v1/configure/{code}", // 获取信息 , 根据条件 :: {code} : 编码
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - ConfigureAPI（ 配置信息 API ） 
 */
export { ConfigureAPI };
export default ConfigureAPI;
