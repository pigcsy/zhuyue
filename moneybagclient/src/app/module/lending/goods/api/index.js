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
    obtain: "/api/v1/lending/goods/all/{page}", // 获取全部 , 分页获取 :: {page} : 页数
    count: "/api/v1/lending/goods/count/{goodsId}", // 统计信息 , 统计产品 UV、PV :: {goodsId} : 产品主键
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - GoodsAPI（ 贷款产品 API ） 
 */
export { GoodsAPI };
export default GoodsAPI;
