import request from '@/utils/request'
// 获取一级分类数据
// GET /admin/product/getCategory1
export const reqCategory1List = ()=>request({url:'/admin/product/getCategory1',method:'get'})

// 获取二级分类数据
// GET /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})

// 获取三级分类数据
// GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})

// 获取平台属性
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 添加属性与属性值接口
/* {
    "attrName": "string",
    "attrValueList": [
      {
        "attrId": 0,//属性Id
        "id": 0,//由服务器数据库生成
        "valueName": "string"
      }
    ],
    "categoryId": 0,//3Id
    "categoryLevel": 3,
    "id": 0//由服务器数据库生成
  } */
// POST /admin/product/saveAttrInfo
export const reqAddOrUpdateAttr = (data)=>request({url:'/admin/product/saveAttrInfo',data,method:'post'})

// 删除属性
// DELETE /admin/product/deleteAttr/{attrId}
export const reqDeleteAttr = (attrId)=>request({url:`/admin/product/deleteAttr/${attrId}`,method:'delete'})