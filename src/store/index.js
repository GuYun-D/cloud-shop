import Vue from "vue"
import Vuex from "vuex"

import home from './modules/home'
import user from './modules/user'
import search from './modules/search'

Vue.use(Vuex)

const actions = {
  yyy({commit}){

  }
}

const mutations = {
  /**
   * 此处的state是总的状态
   */
  xxx(state) {
    
  }
}

const getters = {
  zzz(state) {
    // 说明这里的state管理的是全局的
    return state.home.xxx
  }
}

// 向外暴漏store对象
export default new Vuex.Store({
  actions,
  mutations,
  getters,
  modules: {
    home,
    user,
    search
  }
})

/**
 * vuex多模块编程的总状态结构
 */
