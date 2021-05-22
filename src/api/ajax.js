/**
 * axios二次封装
 */

import axios from "axios"
import NProgress from "nprogress"
import 'nprogress/nprogress.css'

/**
 * 配置通用路径和超时时间
 */
const service = axios.create({
  // baseURL: 'http://localhost: 8081/',
  timeout: 20000
})

/**
 * 添加请求拦截器
 */
service.interceptors.request.use((config) => {
  // 显示进度条
  NProgress.start()

  // 必须返回config , 后面就会根据返回的config，使用xhr发送ajax请求
  return config
})

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(


  // 请求成功
  response => {
    // 隐藏进度条
    NProgress.done()

    return response.data
  },

  // 请求失败
  error => {
    NProgress.done()
    alert(error.message || "未知的请求错误")
    // throw error
    return Promise.reject(error)
  }
)

// 向外暴露service

export default service