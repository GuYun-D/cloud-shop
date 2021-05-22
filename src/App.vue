<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHiddenFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

import {getCategoryList} from './api'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },

  mounted(){
    // 异步获取三级分类列表
    getCategoryList().then(res => {
      console.log(res);
    })
  }
}
</script>

<style lang="less" scoped>

</style>>

</style>
