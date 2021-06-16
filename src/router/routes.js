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
import Center from '@/views/Center'
import MyOrder from '@/views/Center/MyOrder'
import GroupOrder from '@/views/Center/GroupOrder'

import store from '@/store'

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
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 只有没登陆才能看到login
      let token = store.state.user.token
      if(token){
        next('/')
      }else {
        next()
      }
    }
  }, {
    path: '/detail/:skuId',
    component: Detail
  }, {
    path: '/addCartSuccess',
    component: AddCartSuccess,
    // 只有携带了skuNum和skuInfo的数据，才能跳转到添加购物车成功的页面
    beforeEnter: (to, from, next) => {
      let skuNum = to.query.skuNum
      let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
      if(skuNum && skuInfo){
        next()
      }else{
        alert("参数不够")
        next('/')
      }
    }
  }, {
    path: '/shopCart',
    component: ShopCart
  }, {
    path: '/trade',
    component: Trade,
    // 只有从购物车才能跳到交易页面
    beforeEnter: (to, from, next) => {
      if(from.path === '/shopCart'){
        next()
      }else {
        next('/')
      }
    }
  }, {
    path: '/addAddress',
    component: AddAddress
  }, {
    path: '/pay',
    component: Pay,
    beforeEnter: (to, from, next) => {
      if(from.path === '/trade'){
        next()
      }else {
        next('/')
      }
    }
  }, {
    path: '/paysuccess',
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if(from.path === '/pay'){
        next()
      }else {
        next('/')
      }
    }
  }, {
    path: '/center',
    component: Center,
    children: [
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      },
      {
        path: '',
        redirect: 'myorder'
      }
    ]
  }]
