import { reqAddOrderDataCart } from '@/api'

export default {
  actions: {
    // 传递多个参数不能直接用逗号隔开，使用解构的方法
    addOrderDataCart({ commit }, { skuId, skuNum }){
      const result = reqAddOrderDataCart(skuId, skuNum)
      if(result.code === 200){
        return 'ok'
      }else {
        return Promise.reject(new Error('failed'))
      }
    }
  },

  getters: {

  }
}