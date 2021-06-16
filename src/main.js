import Vue from 'vue'
import App from './App.vue'
import store from './store'
import "swiper/css/swiper.css";
import Pageination from './components/Pageination'

import * as API from '@/api'

/**
 * mockjs不需要暴漏函数，直接打包就可以通过ajax访问
 */
import './mock/mockServer'

// 注册路由器
import router from './router/index'

import TypeNav from "./components/TypeNav"
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pageination.name, Pageination)

// 导入elementui
import '@/plugins/elementui'

// 导入懒加载
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/loading.gif'
Vue.use(VueLazyload, {
  loading
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate () {
    // 将当前vm作为总线对象挂到Vue原型对象上
    Vue.prototype.$bus = this,
    // 不适用vuex
    Vue.prototype.$API = API
  },
  router,
  /**
   * store对象的功能
   *    读取数据：store.state.xxxx
   *             store.getters.yyy
   *    更新数据： store.dispatch(action名称，data)
   *              store.commit(mutation名称，data)
   *              
   */
  store
}).$mount('#app')
