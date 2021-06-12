import { reqTradeInfo, reqAddAress } from '@/api'

const state = {
  tradeInfo: {}
}

const actions = {
  async tradeInfo({ commit }) {
    const result = await reqTradeInfo()
    console.log(result.data.data.records[0]);
    if (result.code === 200) {
      commit('RECEIVE_TRADE_INFO', result.data.data.records)
    }
  },

  async addAddress({commit}, info){
    const result = await reqAddAress(info)
    console.log(result);
    if(result.code === 200){
      return "ok"
    }else {
      return Promise.reject(new Error('failed'))
    }
  }
}

const mutations = {
  RECEIVE_TRADE_INFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo
  }
}

const getters = {
  orderDetailList(state) {
    return state.tradeInfo.orderDetailList || []
  },

  deliveryAddress(state) {
    return state.tradeInfo.deliveryAddress || []
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}