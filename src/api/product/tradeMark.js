//获取品牌管理数据模块
// 引入request
import request from '@/utils/request'

// 获取品牌列表接口
// GET /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList =(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})

// 新增品牌接口
// POST /admin/product/baseTrademark/save
/* 携带参数 不需要传递id（由服务器生成）
{
  "logoUrl": "string",
  "tmName": "string"
}
*/
// 修改品牌
// PUT /admin/product/baseTrademark/update
/* 携带参数 需要传递id（告诉服务器修改哪一个品牌）
{
  "id": 0,
  "logoUrl": "string",
  "tmName": "string"
}
*/
export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    if(tradeMark.id){
        return request({url:'/admin/product/baseTrademark/update',data:tradeMark,method:'put'})
    }else{
        return request({url:'/admin/product/baseTrademark/save',data:tradeMark,method:'post'})
    }
}

// 删除品牌 DELETE /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})