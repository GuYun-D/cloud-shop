/**
 * 所有路由匹配的数组
 */
// import Home from '@/views/Home'
const Home = () => import('@/views/Home')
const Search = () => import('@/views/Search')
const Register = () => import('@/views/Register')
const Login = () => import('@/views/Login')
const Detail = () => import('@/views/detail')
const AddCartSuccess = () => import('@/views/AddCartSuccess')
const ShopCart = () => import('@/views/ShopCart')
const Trade = () => import('@/views/Trade')
const AddAddress = () => import('@/views/addAddress')
const Pay = () => import('@/views/Pay')
const PaySuccess = () => import('@/views/PaySuccess')
const Center = () => import('@/views/Center')
const MyOrder = () => import('@/views/Center/MyOrder')
const GroupOrder = () => import('@/views/Center/GroupOrder')


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
