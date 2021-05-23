<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHiddenFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "app",
  components: {
    Header,
    Footer,
  },

  mounted() {
    // 请求获取三级分类
    this.$store.dispatch('getCategoryList')
  },
};
</script>

<style lang="less" scoped>
</style>>

</style>
