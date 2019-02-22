/**
 * axios Js
 * @JsName axios
 * @Description axios 请求库.
 * @DateTime 2018-12-22 20:39:22
 * @author 花花
 */
import axios from "axios";
import Method from './method';

/**
 * 构建 Promise 函数
 * @param {string} url 请求的 url
 * @param {object} [options] 请求的 options（ 选项 ）
 * @return {string} result 请求的 url
 */
const HandleUrl = (url, options) => {
	let result = url;
	const { method, params } = options;
	if (Method.Get === method || Method.Delete === method) {
		for (const key in params) {
			let keys = "{".concat(key).concat("}");
			if (url.indexOf(keys) > -1) {
				url = url.replace(keys, params[key]);
				delete params[key];
			}
			result = url;
		}
	}
	return result;
};


/**
 * 构建 Promise 函数
 * @param {string} url 请求的 url
 * @param {object} [options] 请求的 options（ 选项 ）
 * @return {Promise} 请求响应的 data（ 数据 ） or err（ 异常 ）
 */
const Axios = (url, options) => {	
    return new Promise((resolve, reject) => axios({ url: HandleUrl(url, options), ...options }).then(res => resolve(res)).catch(err => reject(err)));
};

/**
 * Get 请求
 * @param {string} url 请求的 url
 * @param {object} [options] 请求的 options（ 选项 ）
 * @return {Promise} 请求响应的 data（ 数据 ） or err（ 异常 ）
 */
const AxiosGet = (url, options) => {
	return Axios(url, { ...options, method: Method.Get });
};

/**
 * Put 请求
 * @param {*} url 
 * @param {*} options 
 */
const AxiosPut = (url, options) => {
	return Axios(url, { ...options, method: Method.Put });
};

/**
 * Post 请求
 * @param {*} url 
 * @param {*} options 
 */
const AxiosPost = (url, options) => {
	return Axios(url, { ...options, method: Method.Post });
};

/**
 * Head 请求
 * @param {*} url 
 * @param {*} options 
 */
const AxiosHead = (url, options) => {
	return Axios(url, { ...options, method: Method.Head });
};

/**
 * Patch 请求
 * @param {*} url 
 * @param {*} options 
 */
const AxiosPatch = (url, options) => {
	return Axios(url, { ...options, method: Method.Patch });
};

/**
 * Delete 请求
 * @param {*} url 
 * @param {*} options 
 */
const AxiosDelete = (url, options) => {
	return Axios(url, { ...options, method: Method.Delete });
};

/**
 * Options 请求
 * @param {*} url 
 * @param {*} options 
 */
const AxiosOptions = (url, options) => {
	return Axios(url, { ...options, method: Method.Options });
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - Axios（ 请求库 ）
 */
export { axios, Axios, AxiosGet, AxiosPut, AxiosPost, AxiosHead, AxiosPatch, AxiosDelete, AxiosOptions, Method };
export default { axios, Axios, AxiosGet, AxiosPut, AxiosPost, AxiosHead, AxiosPatch, AxiosDelete, AxiosOptions, Method };
