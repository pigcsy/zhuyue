/**
 * index Js
 * @JsName index
 * @Description 用户信息（ 模块 ）API.
 * @DateTime 2018-12-22 20:39:22
 * @author 花花
 */

/**
 * 用户信息 API
 */
const UserAPI = {
    obtainAll: "/api/v1/user/all/{page}", // 获取全部 , 分页获取 :: {page} : 页数
    obtain: "/api/v1/user/{id}/{page}", // 用户产品 :: 根据条件 , 分页获取 :: {id} : 用户主键 , {page} : 页数
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - UserAPI（ 用户信息 API ） 
 */
export { UserAPI };
export default UserAPI;
