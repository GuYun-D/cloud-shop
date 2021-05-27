/**
 * 首页相关的数据的子模块
 */

import { reqCategoryList, reqBannerList, reqFloors } from "@/api"

export default {
  state: {
    categoryList: [],
    xxx: "acd",
    bannerList: [],
    floors: []
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
    },

    /**
     * bannerList
     */
    RECEIVE_BANNER_LIST(state, bannerList){
      state.bannerList = bannerList
    },

    /**
     * 楼层
     */
    RECEIVE_FLOORS_LIST(state, floors){
      state.floors = floors
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
    },

    /**
     * 获取轮播列表
     */
    async getBannerList({commit}){
      const result = await reqFloors()
      if(result.status === 200){
        const bannerList = result.data
        commit('RECEIVE_BANNER_LIST', bannerList)
      }
    },


    /**
     * 获取楼层
     */
     async getFloors({commit}){
      const result = await reqBannerList()
      if(result.status === 200){
        const floors = result.data
        commit('RECEIVE_BANNER_LIST', floors)
      }
    },

  },
  getters: {
  }
}