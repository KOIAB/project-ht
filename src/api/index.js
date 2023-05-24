// 将产品相关的四个请求接口统一暴露
import *as trademark from './product/tradeMark'
import *as attr from './product/attr'
import *as spu from './product/spu'
import *as sku from './product/sku'

// 引入权限相关的接口
import *as user from './acl/user'
import *as role from './acl/role'
import *as permission from './acl/permission'

// 对外暴露
export default {
    trademark,
    attr,
    spu,
    sku,
    user,
    role,
    permission
}