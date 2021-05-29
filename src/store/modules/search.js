/**
 * 管理搜索模块
 */

import { reqSearch } from '@/api'

const state = {
  // 搜索结果数据对象
  productList: []
}

const mutations = {
  // 接收保存商品列表相关数据的对象
  RECEIVE_PRODUCT_LIST(state, productList) {
    state.productList = productList
  }
}

const actions = {
  // 根据搜索条件异步获取商品列表
  async getProductList({ commit }, searchParams) {
    const result = await reqSearch(searchParams)
    if (result.code === 200) {
      commit('RECEIVE_PRODUCT_LIST', result.data.data)
    }
  }
}

const getters = {
  //分类列表
  /**
   * 计算属性忽略多模块，所有模块的计算属性都放在了外面
   */
  goodsList(state) {
    return state.productList.goodsList || []
  },

  // 品牌列表
  trademarkList(state) {
    return state.productList.trademarkList || []
  },

  // 属性列表
  attrsList(state) {
    return state.productList.attrsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}