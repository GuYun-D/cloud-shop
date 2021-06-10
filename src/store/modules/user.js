/**
 * 登录用户数据的vuex子模块
 */

import { getUserTempId, setToken, removeToken, getToken } from '@/utils/userabout'
import {reqserRegister, reqUserLogin} from '@/api'


const state = {
  // 获取临时标识id
  userTempId: getUserTempId(),
  token: getToken()
}
const mutations = {
  RECEIVE_TOKEN(state, token){
    state.token = token
  }
}
const actions = {
  async userRegister({commit}, info) {
    console.log(info);
    const result = await reqserRegister(info)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error(result.message))
    }
  },

  async userLogin({commit}, userInfo){
    const result = await reqUserLogin(userInfo)
    console.log(result);
    if(result.code === 200){
      commit('RECEIVE_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    }else {
      return Promise.reject(new Error('failed'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}