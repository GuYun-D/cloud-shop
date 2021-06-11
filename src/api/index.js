/**
 * 包含应用的所有接口的接口请求函数
 */
import user from '@/store/modules/user.js'
import ajax from './ajax.js'
/**
 * 首页三级分类
 */

export function reqCategoryList() {
  // return ajax.get('/goods.json')
  // get参数，不带参数
  // return ajax("/goos.json")
  // 对象形式
  return ajax({
    url: 'http://localhost:8080/JSON/goods.json',
    method: "get"
  })
}

/**
 * 获取接口首页轮播列表
 */
export function reqBannerList() {
  return ajax({
    url: "http://localhost:8080/JSON/banner.json",
    method: "get"
  })
}

/**
 * mock接口
 */

export function reqFloors() {
  return ajax("http://localhost:8080/mock/floors")
}

/**
 * 注意：不需要代理服务器，浏览器没有发出请求，被拦截了，请求还没有到浏览器之前就被拦截了
 */
// reqFloors().then(res => console.log(res))

/**
 * 搜索分页
 */

export function reqSearch(searchParams) {
  return ajax.post('http://localhost:8080/mock/search', searchParams)
}

/**
 * 商品详情页
 */

export function reqGoodsDeatil() {
  return ajax.get('http://localhost:8080/mock/detail')
}

/**
 * 更新购物车
 */
export const reqAddOrderDataCart = (skuId, skuNum, operation) => {
  let exist = false
  const shoppingCart = JSON.parse(localStorage.getItem('SHOPPINGCART')) || []
  if (operation) {
    let index = -1;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].skuId == skuId) {
        index = i
      }
    }

    if (index != -1) {
      switch (operation) {
        case 1:
          shoppingCart[index].skuNum++

          break;
        case -1:
          shoppingCart[index].skuNum--
          if (shoppingCart[index].skuNum <= 1) {
            shoppingCart[index].skuNum = 1
          }
          break
        default:
          shoppingCart[index].skuNum = operation
          break;
      }
    }


  } else {
    shoppingCart.forEach(item => {
      if (item.skuId == skuId) {
        item.skuNum = skuNum
        exist = true
      }
    });

    if (!exist) {
      shoppingCart.push({
        skuId,
        skuNum,
        isChecked: 1
      })
    }
  }

  localStorage.setItem('SHOPPINGCART', JSON.stringify(shoppingCart))
  return { code: 200, message: '成功' }
}

/**
 * 获取购物车信息
 */
export const reqShopCartList = () => {
  return ajax({
    url: 'http://localhost:8080/mock/search',
    method: 'post'
  })
}

/**
 * 修改购物车的选中状态
 */
export const reqUpdateCartChecked = (skuId, isChecked) => {
  const shoppingCart = JSON.parse(localStorage.getItem('SHOPPINGCART')) || []
  let skuIndex = -1
  shoppingCart.forEach((item, index) => {
    if (item.skuId == skuId) {
      skuIndex = index
    }
  });
  if (skuIndex != -1) {
    shoppingCart[skuIndex].isChecked = isChecked
  }

  localStorage.setItem('SHOPPINGCART', JSON.stringify(shoppingCart))
}

/**
 * 购物车全选
 */
export const reqUpdateCartCheckedAll = (isChecked) => {
  const shoppingCart = JSON.parse(localStorage.getItem('SHOPPINGCART')) || []
  shoppingCart.forEach(item => {
    if (item.isChecked !== isChecked) {
      item.isChecked = isChecked
    }
  })

  localStorage.setItem('SHOPPINGCART', JSON.stringify(shoppingCart))

  return { code: 200, message: 'ok' }
}

/**
 * 删除单个商品
 */
export const reqDeleteOne = (id) => {
  const shoppingCart = JSON.parse(localStorage.getItem('SHOPPINGCART')) || []
  shoppingCart.forEach((item, index) => {
    // console.log(item.skuId == id);
    if (item.skuId == id) {
      shoppingCart.splice(index, 1)
    }
  })
  localStorage.setItem('SHOPPINGCART', JSON.stringify(shoppingCart))
  return { code: 200, message: "ok" }
}

/**
 * 用户注册
 */
export const reqserRegister = (info) => {
  const userInfo = JSON.parse(localStorage.getItem('USER_INFO')) || {}
  userInfo.phone = info.phone
  userInfo.password = info.password
  console.log(userInfo);
  localStorage.setItem('USER_INFO', JSON.stringify(userInfo))
  return { code: 200, message: "注册成功" }
}

/**
 * 用户登录
 */

import { getUserTempId } from '@/utils/userabout'
export const reqUserLogin = (myUserInfo) => {
  const userInfo = JSON.parse(localStorage.getItem('USER_INFO')) || {}
  if (myUserInfo.phone === userInfo.phone && myUserInfo.password === userInfo.password) {
    return {
      code: 200,
      message: '登陆成功',
      data: {
        token: getUserTempId(),
        tokenCreatedTime: Date.now()
      },
      ok: true
    }
  } else {
    return {
      code: 201,
      data: null,
      ok: false
    }
  }
}

/**
 * 根据token获取用户信息
 */
export const reqUerInfo = () => {
  return ajax.get('http://localhost:8080/mock/user')
}