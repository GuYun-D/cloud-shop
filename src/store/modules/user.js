/**
 * 登录用户数据的vuex子模块
 */

import { getUserTempId } from '@/utils/userabout'
import {reqserRegister} from '@/api'


const state = {
  // 获取临时标识id
  userTempId: getUserTempId()
}
const mutations = {}
const actions = {
  async userRegister({commit}, info) {
    console.log(info);
    const result = await reqserRegister(info)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error(result.message))
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