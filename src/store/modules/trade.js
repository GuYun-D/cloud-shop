import { reqTradeInfo, reqAddAress } from '@/api'

const state = {
  tradeInfo: {},
  newAddress: {}
}

const actions = {
  async tradeInfo({ commit, state, dispatch }) {
    const result = await reqTradeInfo()
    const addresses = JSON.parse(localStorage.getItem('ADDRESS_ShOP')) || []
    result.data.data.records[0].deliveryAddress = addresses
    if (result.code === 200) {
      // console.log(result.data.data.records[0].deliveryAddress[0]);
      commit('RECEIVE_TRADE_INFO', result.data.data.records[0])
    }
  },

  async addAddress({commit}, info){
    const result = await reqAddAress(info)
    if(result.code === 200){
      commit('RECEIVE_NEW_ADDRESS', result.data)
      return "ok"
    }else {
      return Promise.reject(new Error('failed'))
    }
  }
}

const mutations = {
  RECEIVE_TRADE_INFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo
  },

  RECEIVE_NEW_ADDRESS(state, addressInfo){
    state.newAddress = addressInfo
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