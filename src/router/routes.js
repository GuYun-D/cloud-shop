/**
 * 所有路由匹配的数组
 */
import Home from '@/views/Home'
import Search from '@/views/Search'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Detail from '@/views/detail'

export default
  [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  }, {
    // 加一个问号，代表这个参数可传可不传
    path: '/search/:keywords?',
    component: Search,
    name: 'search'
  }, {
    path: '/register',
    component: Register,
    meta: {
      isHiddenFooter: true
    }
  }, {
    path: '/login',
    component: Login,
    meta: {
      isHiddenFooter: true
    }
  }, {
    path: '/detail/:skuId',
    component: Detail
  }]
