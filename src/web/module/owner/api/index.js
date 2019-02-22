/**
 * index Js
 * @JsName index
 * @Description 管理员信息（ 模块 ）API.
 * @DateTime 2018-12-22 20:39:22
 * @author 
 */

/**
 * 管理员信息 API
 */
const OwnerAPI = {
    logIn: "/oauth/api/v1/login", // 登录认证 , 根据条件
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - OwnerAPI（ 管理员信息 API ） 
 */
export { OwnerAPI };
export default OwnerAPI;
