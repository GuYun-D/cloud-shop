/**
 * 登录用户数据的vuex子模块
 */

import { getUserTempId, setToken, removeToken, getToken, getUserInfo } from '@/utils/userabout'
import { reqserRegister, reqUserLogin, reqUerInfo, reqLogout } from '@/api'


const state = {
  // 获取临时标识id
  userTempId: getUserTempId(),
  token: getToken(),
  userInfo: {}
}
const mutations = {
  RECEIVE_TOKEN(state, token) {
    state.token = token
  },

  RECEIVE_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },

  RESET_USERINFO(state) {
    state.userInfo = {}
    state.token = ''
  }
}
const actions = {
  async userRegister({ commit }, info) {
    console.log(info);
    const result = await reqserRegister(info)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  /**
   * 
   * @param {*} param0 
   * @param {*} userInfo 
   * @returns 
   */
  async userLogin({ commit }, userInfo) {
    const result = await reqUserLogin(userInfo)
    console.log(result);
    if (result.code === 200) {
      commit('RECEIVE_TOKEN', result.data.token)
      setToken(result.data.token)
      localStorage.setItem('TOKEN_CREATED_TIME', result.data.tokenCreatedTime)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  /**
   * 获取用户信息
   */
  async getUserInfo({ commit }) {
    const result = await reqUerInfo()
    getUserInfo(result.data.data)
    if (result.code === 200) {
      commit('RECEIVE_USERINFO', result.data.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  /**
   * 删除token
   */
  async resetUserInfo({ commit }) {
    removeToken()
    commit('RESET_USERINFO')
  },

  /**
   * 退出登录
   */
  async userLogout({ commit }){
    const result = await reqLogout()
    if(result.code === 200){
      removeToken()
      commit('RESET_USERINFO')
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