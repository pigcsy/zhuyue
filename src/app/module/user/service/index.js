/**
 * index Js
 * @JsName index
 * @Description 用户信息（ 模块 ）服务.
 * @DateTime 2018-12-22 20:39:22
 * @author 
 */
// 引入 UserAPI 库
import UserAPI from "../api";
// Request 按需引入加载
import { AxiosPatch } from "@/app/request";

/**
 * 登录认证 , 根据条件
 */
const logIn = (payload) => {
    return new Promise((resolve, reject) => AxiosPatch(UserAPI.logIn, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - logIn（ 登录认证 , 根据条件 ）
 */
export { logIn };
export default { logIn };


