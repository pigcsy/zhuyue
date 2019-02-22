/**
 * index Js
 * @JsName index
 * @Description 配置信息（ 模块 ）服务.
 * @DateTime 2018-12-22 20:39:22
 * @author 
 */
// 引入 ConfigureAPI 库
import ConfigureAPI from "../api";
// Request 按需引入加载
import { AxiosGet } from "@/app/request";

/**
 * 获取信息 , 根据条件
 * -- {code} : 编码
 */
const obtain = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(ConfigureAPI.obtain, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - obtain（ 获取信息 , 根据条件 :: {code} : 编码 ）
 */
export { obtain };
export default { obtain };


