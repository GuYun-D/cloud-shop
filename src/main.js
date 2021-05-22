import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 注册路由器
import router from './router/index'

import TypeNav from "./components/TypeNav"
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
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
