import Vue from "vue"
import Vuex from "vuex"

import home from './modules/home'
import user from './modules/user'
import search from './modules/search'
import detail from './modules/detail'

Vue.use(Vuex)

// 向外暴漏store对象
export default new Vuex.Store({
  modules: {
    home,
    user,
    search,
    detail
  }
})

/**
 * vuex多模块编程的总状态结构
 */
