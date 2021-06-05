import { reqGoodsDeatil } from '@/api'

export default {
  state: {
    goodsDetailInfo: {}
  },

  actions: {
    async getSkuDetailInfo({ commit }, skuId) {
      const result = await reqGoodsDeatil(skuId)
      if (result.code === 200) {
        commit('RECEIVE_DETAIL_INFO', result)
        console.log(result);
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