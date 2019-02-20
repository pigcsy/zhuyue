/**
 * index Js
 * @JsName index
 * @Description 用户信息（ 模块 ）API.
 * @DateTime 2018-12-22 20:39:22
 * @author csy
 */

/**
 * 用户信息 API
 */
const UserAPI = {
    logIn: "/oauth/api/v1/login", // 登录认证 , 根据条件
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - UserAPI（ 用户信息 API ） 
 */
export { UserAPI };
export default UserAPI;
