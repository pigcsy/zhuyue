/**
 * Encoding Js
 * @JsName index
 * @Description Encoding 编码库.
 * @DateTime 2018-12-22 20:39:22
 * @author 花花
 */
import { JSEncrypt } from "jsencrypt";

/**
 * 公钥
 */
const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbDf6VdKus3QKh8lyMPfYUehly1kcWttV8HhFTV6uoEPgxlJIQNjZmKLGQ73nI/RJIC1VEQnN/IdKuEWaSK4vWkH/4uDeQMnZaH5xogEtKrEib06FHCGGJytaATKqKLbG0EZRhjuKWvX8UzvmYD3OPZyZQaQMF5Mg5EMUCQZm+IQIDAQAB";

/**
 * RSA 加密
 * -- 公钥
 * @param {*} origin 编码字符
 */
const rsaEncrypt = (origin) => {
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(origin);
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - rsaEncrypt（ RSA 加密 :: 公钥 ）
 */
export { rsaEncrypt };
export default { rsaEncrypt };