/**
 * 包含应用的所有接口的接口请求函数
 */

import axios from "axios"

/**
 * 配置通用路径和超时时间
 */
const service = axios.create({
  baseURL: 'http://localhost: 8081',
  timeout: 20000
})

/**
 * 添加请求拦截器
 */
service.interceptors.request.use((config) => {


  // 必须返回config , 后面就会根据返回的config，使用xhr发送ajax请求
  return config
})

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  // 请求成功
  response => {

    return response
  },

  // 请求失败
  error => {
    // throw error
    return Promise.reject(error)
  }
)

// 向外暴露service

export default service