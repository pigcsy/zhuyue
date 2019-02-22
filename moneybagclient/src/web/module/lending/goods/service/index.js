/**
 * index Js
 * @JsName index
 * @Description 贷款产品（ 模块 ）服务.
 * @DateTime 2018-12-22 20:39:22
 * @author 花花
 */
// 引入 GoodsAPI 库
import GoodsAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPut, AxiosDelete, AxiosPost } from "@/web/request";

/**
 * 获取信息 , 分页获取
 * -- {page} : 页数
 */
const obtainPaging = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.obtainPaging, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取信息 , 根据主键
 * -- {id} : 主键
 */
const obtain = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.obtain, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取信息 , 根据主键
 * -- {id} : 主键
 */
const remove = (payload) => {
    return new Promise((resolve, reject) => AxiosDelete(GoodsAPI.remove, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 保存信息 , 产品信息
 */
const addition = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(GoodsAPI.addition, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
 };

/**
 * 更新信息 , 产品信息
 */
const modify = (payload) => {
   return new Promise((resolve, reject) => AxiosPut(GoodsAPI.modify, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * API
 */
const api = GoodsAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - obtainPaging（ 获取信息 , 分页获取 :: {page} : 页数 ）
 * - obtain（ 获取信息 , 根据主键 :: {id} : 主键 ）
 * - remove（ 删除信息 , 根据主键 :: {id} : 主键 ）
 * - addition（ 保存信息 , 产品信息 ）
 * - modify（ 更新信息 , 产品信息 ）
 * - api ( API )
 */
export { obtainPaging, obtain, remove, addition, modify, api };
export default { obtainPaging, obtain, remove, addition, modify, api };


