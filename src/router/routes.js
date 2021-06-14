/**
 * 所有路由匹配的数组
 */
import Home from '@/views/Home'
import Search from '@/views/Search'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Detail from '@/views/detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import AddAddress from '@/views/addAddress'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'

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
  }, {
    path: '/addCartSuccess',
    component: AddCartSuccess
  }, {
    path: '/shopCart',
    component: ShopCart
  }, {
    path: '/trade',
    component: Trade
  }, {
    path: '/addAddress',
    component: AddAddress
  }, {
    path: '/pay',
    component: Pay
  }, {
    path: '/paysuccess',
    component: PaySuccess
  }]
