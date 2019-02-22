/**
 * index Js
 * @JsName index
 * @Description 贷款产品（ 模块 ）API.
 * @DateTime 2018-12-22 20:39:22
 * @author 花花
 */

/**
 * 贷款产品 API
 */
const GoodsAPI = {
    obtainPaging: "/api/v1/lending/goods/paging/{page}", // 获取信息 , 分页获取 :: {page} : 页数
    obtain: "/api/v1/lending/goods/{id}", // 获取信息 , 根据主键 :: {id} : 主键
    remove: "/api/v1/lending/goods/{id}", // 删除信息 , 根据主键 :: {id} : 页数
    addition: "/api/v1/lending/goods", // 保存信息 :: 产品信息
    modify: "/api/v1/lending/goods", // 更新信息 :: 产品信息
    upload: "/api/v1/lending/goods/upload", // 上传文件
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - GoodsAPI（ 贷款产品 API ） 
 */
export { GoodsAPI };
export default GoodsAPI;
