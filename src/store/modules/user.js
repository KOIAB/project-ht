// 引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
// 获取token|设置token|移除删除token的函数
import { getToken, setToken, removeToken } from '@/utils/auth'
// 路由模块当中重置路由的方法
import { resetRouter,asyncRoutes,constantRoutes, anyRoutes } from '@/router'
// 引入路由
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 根据不同的角色返回的标记信息
    routes:[],
    roles:[],
    buttons:[],
    // 项目中已有的异步路由，和服务器返回的标记路由进行对比，最终需要展示的路由
    resultAsyncRoutes:[],
    // 最终展示的全部路由
    resultAllRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USEERINFO:(state,userInfo)=>{
    state.name=userInfo.name
    state.avatar=userInfo.avatar
    state.routes=userInfo.routes
    state.buttons=userInfo.buttons
    state.roles=userInfo.roles
  },
  // 最终计算出的异步路由
  SET_RESULTASYNCROUTES(state,asyncroutes){
    // 当前用户的异步路由，一个用户展示完整路由还包含常量路由和任意路由
    state.resultAsyncRoutes=asyncroutes
    // 合并
    state.resultAllRoutes=constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
    // 给路由器添加新路由
    router.addRoutes(state.resultAllRoutes)
  }
}

const actions = {
  // 这里处理登录业务
  async login({ commit }, userInfo) {
    // 解构用户名和密码
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    // 现在使用的时mock的数据
    if(result.code==20000){
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
    /* return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    }) */
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 获取用户信息：返回的数据包含：name用户名，avatar用户头像，routes返回标志不同的用户应该展示那些菜单标记，roles用户角色信息，buttons按钮限用的标记
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // vuex存储全部用户信息
        commit('SET_USEERINFO',data)
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}
// 定义一个函数，两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes=(asyncRoutes,routes)=>{
  // 过滤出当前用户需要展示的异步路由
  return asyncRoutes.filter(item=>{
    // 数组有这个元素(一级路由)
    if(routes.indexOf(item.name)!=-1){
      // 递归
      if(item.children&&item.children.length){
        item.children=computedAsyncRoutes(item.children,routes)
      }
      return true
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

