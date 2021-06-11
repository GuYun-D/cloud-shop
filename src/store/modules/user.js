/**
 * 登录用户数据的vuex子模块
 */

import { getUserTempId, setToken, removeToken, getToken } from '@/utils/userabout'
import {reqserRegister, reqUserLogin, reqUerInfo} from '@/api'


const state = {
  // 获取临时标识id
  userTempId: getUserTempId(),
  token: getToken(),
  userInfo: {}
}
const mutations = {
  RECEIVE_TOKEN(state, token){
    state.token = token
  },

  RECEIVE_USERINFO(state, userInfo){
    state.userInfo = userInfo
  },

  RESET_USERINFO(state){
    state.userInfo = {}
    state.token = ''
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
      localStorage.setItem('TOKEN_CREATED_TIME', result.data.tokenCreatedTime)
      return 'ok'
    }else {
      return Promise.reject(new Error('failed'))
    }
  },

  async getUserInfo({commit}){
    const result = await reqUerInfo()
    if(result.code === 200){
      commit('RECEIVE_USERINFO', result.data.data)
      return 'ok'
    }else {
      return Promise.reject(new Error('failed'))
    }
  },

  async resetUserInfo({commit}){
    removeToken()
    commit('RESET_USERINFO')
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}