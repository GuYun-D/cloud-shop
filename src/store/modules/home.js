/**
 * 首页相关的数据的子模块
 */

import { reqCategoryList } from "@/api"

export default {
  state: {
    categoryList: [],
    xxx: "acd"
  },
  mutations: {
    /**
     * 此处的state是当前模块的
     */
    // aaa(state){

    // }

    // 接收保存三级分类列表
    RECEIVE_CATEGORY_LIST(state, categoryList){
      state.categoryList = categoryList
    }
  },
  actions: {
    /**
     * {commit} commit触发的是所有匹配的mutations可能是自己模块的也可能是其他模块的或者总模块的
     */
    // bbb({commit}){
    //   commit('aaa')
    // },

    /**
     * 获取三级分类
     */
    async getCategoryList({ commit }) {
      const result = await reqCategoryList()
      if(result.meta.status === 200){
        const categoryList =  result.message.splice(0, 15)
        commit('RECEIVE_CATEGORY_LIST', categoryList)
      }
    }
  },
  getters: {
  }
}