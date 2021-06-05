import { reqGoodsDeatil } from '@/api'

export default {
  state: {
    goodsDetailInfo: {}
  },

  actions: {
    async getSkuDetailInfo({ commit }, skuId) {
      const result = await reqGoodsDeatil()
      console.log(result);
      if (result.code === 200) {
        // const info = result.data.data.goodsList.filter((item, index) => {
        //   return item.id == skuId
        // })
        commit('RECEIVE_DETAIL_INFO', result.data.data)
      }
    }
  },

  mutations: {
    RECEIVE_DETAIL_INFO(state, skuDetailInfo) {
      state.goodsDetailInfo = skuDetailInfo
    }
  },

  getters: {
    // state是当前的，不是总的
    categoryView(state){
      return state.goodsDetailInfo.categoryView || {}
    },

    skuInfo(state){
      return state.goodsDetailInfo.skuInfo || {}
    },

    spuSaleAttrList(state){
      return state.goodsDetailInfo.spuSaleAttrList || []
    }
  }
}