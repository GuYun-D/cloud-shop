/**
 * 首页相关的数据的子模块
 */

export default{
  state: {
    categoryList: [],
    xxx: "acd"
  },
  mutations: {
    /**
     * 此处的state是当前模块的
     */
    aaa(state){

    }
  },
  actions: {
    /**
     * @param {commit} commit触发的是所有匹配的mutations可能是自己模块的也可能是其他模块的或者总模块的
     */
    bbb({commit}){
      commit('aaa')
    }
  },
  getters:{
  }
}