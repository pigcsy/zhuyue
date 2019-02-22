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
import { AxiosGet } from "@/app/request";

/**
 * 获取全部 , 分页获取
 * -- {page} : 页数
 */
const obtain = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.obtain, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 统计信息 , 统计产品 UV、PV
 * -- {goodsId} : 产品主键
 */
const count = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.count, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - obtain（ 获取全部 , 分页获取 :: {page} : 页数 ）
 * - count（ 统计信息 , 统计产品 UV、PV :: {goodsId} : 产品主键 ）
 */
export { obtain, count };
export default { obtain, count };


