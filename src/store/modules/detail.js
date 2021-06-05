import { reqGoodsDeatil } from '@/api'

export default {
  state: {
    goodsDetailInfo: {}
  },

  actions: {
    async getSkuDetailInfo({ commit }, skuId) {
      const result = await reqGoodsDeatil()
      if (result.code === 200) {
        const info = result.data.data.goodsList.filter((item, index) => {
          return item.id == skuId
        })
        commit('RECEIVE_DETAIL_INFO', info)
      }
    }
  },

  mutations: {
    RECEIVE_DETAIL_INFO(state, skuDetailInfo) {
      state.skuDetailInfo = skuDetailInfo
    }
  },

  getters: {

  }
}