/**
 * Request Js
 * @JsName index
 * @Description Request 请求库.
 * @DateTime 2018-12-22 20:39:22
 * @author 
 */
import { AxiosJs } from "@/extend";
import { Service } from "../environ";
import Router from "@/router";

/**
 * AxiosJs 按需加载  
 */
const { axios, Axios, AxiosGet, AxiosPut, AxiosPost, AxiosHead, AxiosPatch, AxiosDelete, AxiosOptions, Method } = AxiosJs;

/**
 * 定义 Key 常量
 */
const Key = "$Key";

/**
 * 指定请求超时的毫秒数, 如果请求比 timeout 长, 请求将被中止
 */
axios.defaults.timeout = 5000;

/**
 * 在请求中打开 withCredentials 属性, 解决跨域不能共享 Session 问题
 */
axios.defaults.withCredentials = true;

/**
 * 设置 Headers 的 Token 令牌 
 */
if (localStorage.getItem(Key)) {
    axios.defaults.headers.common['Token'] = localStorage.getItem(Key)
}

/**
 * 指定 baseURL , baseURL 将被添加到 url，除非 url 是绝对的, baseURL 不会添加
 */
axios.defaults.baseURL = Service.host;

/**
 * 注册一个 http Request 拦截器
 */
axios.interceptors.request.use((config) => config, (err) => Promise.reject(err));

/**
 * 注册一个 http Response 拦截器
 */
axios.interceptors.response.use((res) => {
    let arr = res.config.url.split('/');
    if (arr[arr.length - 1] === "login" && res.data.code === 10001) {
        localStorage.setItem(Key, res.data.data);
        axios.defaults.headers.common["Token"] = localStorage.getItem(Key);
        delete res.data["data"];
    } else if (res.data.code === 10008 || res.data.code === 10012) {
        Router.push({ "path": "/login" });
        delete res["data"];
    }
    return res;
}, (err) => {
    return Promise.reject(err);
});

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - Axios（ 请求库 ）
 */
export { Axios, AxiosGet, AxiosPut, AxiosPost, AxiosHead, AxiosPatch, AxiosDelete, AxiosOptions, Method };
export default { Axios, AxiosGet, AxiosPut, AxiosPost, AxiosHead, AxiosPatch, AxiosDelete, AxiosOptions, Method };
