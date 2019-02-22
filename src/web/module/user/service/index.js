/**
 * index Js
 * @JsName index
 * @Description 用户信息（ 模块 ）服务.
 * @DateTime 2018-12-22 20:39:22
 * @author 花花
 */
// 引入 UserAPI 库
import UserAPI from "../api";
// Request 按需引入加载
import { AxiosGet } from "@/web/request";


/**
 * 获取全部 , 分页获取
 * -- {page} : 页数
 */
const obtainAll = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(UserAPI.obtainAll, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户产品 :: 根据条件 , 分页获取 
 * -- {id} : 用户主键
 * -- {page} : 页数
 */
const obtain = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(UserAPI.obtain, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - obtain（ 获取全部 , 分页获取 :: {page} : 页数 ）
 * - obtain（ 用户产品 :: 根据条件 , 分页获取 :: {id} : 用户主键 , {page} : 页数 ）
 */
export { obtainAll, obtain };
export default { obtainAll, obtain };


