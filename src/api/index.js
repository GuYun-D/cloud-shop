/**
 * 包含应用的所有接口的接口请求函数
 */
import ajax from './ajax.js'

/**
 * 首页三级分类
 */

export function reqCategoryList(){
  // return ajax.get('/goods.json')
  // get参数，不带参数
  // return ajax("/goos.json")
  // 对象形式
  return ajax({
    url: 'http://localhost:8080/JSON/goods.json',
    method: "get"
  })
}