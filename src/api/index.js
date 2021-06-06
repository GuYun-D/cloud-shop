/**
 * 包含应用的所有接口的接口请求函数
 */
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
export const reqAddOrderDataCart = (skuId, skuNum) => {
  const shoppingCart = JSON.parse(localStorage.getItem('SHOPPINGCART')) || []
  shoppingCart.push({
    skuId,
    skuNum
  })
  return {code: 200, message: '成功'}
}