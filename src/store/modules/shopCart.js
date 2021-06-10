import { reqAddOrderDataCart, reqShopCartList, reqUpdateCartChecked, reqUpdateCartCheckedAll, reqDeleteOne } from '@/api'

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
    addOrderDataCart({ commit }, { skuId, skuNum, operation }) {
      const result = reqAddOrderDataCart(skuId, skuNum, operation)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },

    async getCartList({ commit, state, dispatch }) {
      const result = await reqShopCartList();
      const shop = JSON.parse(localStorage.getItem('SHOPPINGCART')) || []
      const shopList = result.data.data.goodsList;
      const shopArr = [];

      for (let i = 0; i < shop.length; i++) {
        for (let j = 0; j < shopList.length; j++) {
          if (shopList[j].id == shop[i].skuId) {
            shopList[j].isChecked = shop[i].isChecked
            shopList[j].skuNum = shop[i].skuNum
            shopArr.unshift(shopList[j])
          }
        }
      }

      commit('RECEIVE_SHOPCART_LIST', shopArr)
    },

    upDateCartChecked(context, { skuId, isChecked }) {
      // console.log(isChecked);
      reqUpdateCartChecked(skuId, isChecked)
      const { shopCartList } = context.state
      shopCartList.forEach(item => {
        if (item.id == skuId) {
          item.isChecked = isChecked
        }
      });

      context.commit('RECEIVE_SHOPCART_LIST', shopCartList)
    },

    updateCartCheckedAll({ commit }, isChecked) {
      const result = reqUpdateCartCheckedAll(isChecked)
      return result
    },

    deleteOne({commit}, skuId){
      const result = reqDeleteOne(skuId)
      if(result.code === 200){
        return 'ok'
      }else {
        return Promise.reject(new Error('false'))
      }
    },

    deleteCartAll({commit, dispatch, state}){
      let promises = []

      state.shopCartList.forEach(item => {
        if(!item.isChecked) return
        let promise = dispatch('deleteOne', item.id)
        promises.push(promise)
      })
      return Promise.all(promises)
    }
  },

  getters: {

  }
}