// 引入二次封装的axios
import request from '@/utils/request'

// sku列表接口
// GET /admin/product/list/{page}/{limit}
export const reqSkuList = (page,limit)=>request({url:`/admin/product/list/${page}/${limit}`,method:'get'})

// sku上架
// GET /admin/product/onSale/{skuId}
export const reqSale = (skuId)=>request({url:`/admin/product/onSale/${skuId}`,method:'get'})

// sku下架
//GET /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId)=>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})

// sku详情
// GET /admin/product/getSkuById/{skuId}
export const reqSkuById = (skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})
