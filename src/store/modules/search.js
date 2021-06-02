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
    // const result = await reqSearch(searchParams)
    // const trademarkChangeInfo = searchParams.trademark.split(':')
    // if (result.code === 200) {
    //   if (trademarkChangeInfo.length === 2) {
    //     const showTradmark = result.data.data.trademarkList.splice(trademarkChangeInfo[0], 1)
    //     if (trademarkChangeInfo[0] == 0) {
    //       const showMobliOne = result.data.data.attrsList[1].attrValueList.pop(1)
    //       result.data.data.attrsList[1].attrValueList = [showMobliOne]
    //     } else {
    //       const showMobliOne = result.data.data.attrsList[1].attrValueList.pop(1)
    //     }

    //     const showMobliTow = result.data.data.attrsList[2].attrValueList.splice(trademarkChangeInfo[0], 1)
    //     result.data.data.attrsList[2].attrValueList = showMobliTow

    //     result.data.data.trademarkList = showTradmark
    //   }

    //   // 优化搜索参数参数中如果有空的属性，就删掉
    //   Object.keys(searchParams).forEach(key => {
    //     if(searchParams[key] === '' || (Array.isArray(searchParams[key]) &&  searchParams.length === 0)){
    //       delete searchParams[key]
    //     }
    //   });

    //   // commit('RECEIVE_PRODUCT_LIST', result.data.data)
    // }

    // delete searchParams[key] 会删除原来数组中的属性，所以使用一个浅拷贝
    searchParams = {...searchParams}

    Object.keys(searchParams).forEach(key => {
      if (searchParams[key] === '' || (Array.isArray(searchParams[key]) && searchParams.length === 0)) {
        delete searchParams[key]
      }
    });

    const result = await reqSearch(searchParams)
    commit('RECEIVE_PRODUCT_LIST', result.data.data)
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