/**
 * index Js
 * @JsName index
 * @Description 配置信息（ 模块 ）服务.
 * @DateTime 2018-12-22 20:39:22
 * @author 花花
 */
// 引入 ConfigureAPI 库
import ConfigureAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPatch } from "@/web/request";

/**
 * 获取信息 , 根据条件
 * -- {code} : 编码
 */
const obtain = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(ConfigureAPI.obtain, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 更新信息 , 根据条件
 */
const modify = (payload) => {
    return new Promise((resolve, reject) => AxiosPatch(ConfigureAPI.modify, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - obtain（ 获取信息 , 根据条件 :: {code} : 编码 ）
 * - modify（ 更新信息 , 根据条件 ）
 */
export { obtain, modify };
export default { obtain, modify };


