<template>
  <div>
    <TypeNav></TypeNav>
     <h1>Search组件</h1> 
     <h4>{{$route.params.keywords}}</h4>
  </div>
</template>

<script>
import TypeNav from "../../components/TypeNav/index"

  export default {
    name: 'Search',
    data(){
      return {

      }
    },
    
    comments: {
      TypeNav
    }
  }
</script>

<style lang="less" scoped>

</style>