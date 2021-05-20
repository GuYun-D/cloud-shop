/**
 * 路由模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


import routes from './routes'


// 安装vue插件
Vue.use(VueRouter)

// 暴漏对象
export default new VueRouter({
  mode: 'history',
  routes
})