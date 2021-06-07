import { reqAddOrderDataCart } from '@/api'
import { reqShopCartList } from '@/api'

export default {
  state: {
    shopCartList: []
  },

  mutations: {
    RECEIVE_SHOPCART_LIST(state, shopCartList) {
      state.shopCartList = shopCartList
    }
  },

  actions: {
    // 传递多个参数不能直接用逗号隔开，使用解构的方法
    addOrderDataCart({ commit }, { skuId, skuNum }) {
      const result = reqAddOrderDataCart(skuId, skuNum)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },

    async getCartList({ commit }) {
      const result = await reqShopCartList();
      const shop = JSON.parse(localStorage.getItem('SHOPPINGCART')) || [];
      const shopList = result.data.data.goodsList;
      const shopArr = [];
      for(let i = 0; i < shop.length; i++){
        for(let j = 0; j < shopList.length; j++){
          if(shopList[j].id == shop[i].skuId){
            shopArr.push(shopList[j])
          }
        }
      }

      commit('RECEIVE_SHOPCART_LIST', shopArr)
    }
  },

  getters: {

  }
}