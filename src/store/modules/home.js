import mockRequest from '@/utils/mockRequest'
const state={
    list:{}
}
const mutations={
    GETDATA(state,list){
        state.list = list
    }
}
const actions ={
    // 获取首页模拟数据
    async getData({commit}){
        let result = await mockRequest.get('/home/list')
        if(result.code==20000){
            commit('GETDATA',result.data)
        }
    }
}
const getters ={}
export default {
    state,
    mutations,
    actions,
    getters
}