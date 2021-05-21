import Vue from 'vue'
import App from './App.vue'

// 注册路由器
import router from './router/index'

import TypeNav from "./components/TypeNav"
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
