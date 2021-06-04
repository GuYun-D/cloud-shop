<template>
  <div>
    <Pageination :total="50" :currentPage="1" :pageSize="4" @currentChange="currentChange"></Pageination>
  </div>
</template>

<script>
import Pageination from "@/components/myTest";
export default {
  name: "Login",
  components: {
    Pageination,
  },
  methods: {
    currentChange(channge){
      console.log(channge);
    }
  }
};
</script>

<style lang="less" scoped>
</style>