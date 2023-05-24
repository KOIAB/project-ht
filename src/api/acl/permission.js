import request from '@/utils/request'

/* 
权限管理相关的API请求函数
*/
const api_name = '/admin/acl/permission'


  
  /* 
  获取权限(菜单/功能)列表
  */
  export function getPermissionList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  }
  
  /* 
  删除一个权限项
  */
  export function removePermission(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: "delete"
    })
  }
  
  /* 
  保存一个权限项
  */
  export function addPermission(permission) {
    return request({
      url: `${api_name}/save`,
      method: "post",
      data: permission
    })
  }

  /* 
  更新一个权限项
  */
  export function updatePermission(permission) {
    return request({
      url: `${api_name}/update`,
      method: "put",
      data: permission
    })
  }

  /* 
  查看某个角色的权限列表
  */
  export function toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  }

  /* 
  给某个角色授权
  */
  export function doAssign(roleId, permissionId) {
    return request({
      url: `${api_name}/doAssign`,
      method: "post",
      params: {roleId, permissionId}
    })
  }

