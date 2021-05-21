<template>
  <div class="home">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodyRecommend";
import Rank from "./Rank"
import Like from "./Like"
import Floor from "./Floor"
import Brand from "./Brand"

export default {
  components: { 
    TodayRecommend,
    ListContainer,
    Rank,
    Like,
    Floor,
    Brand
  },
  name: "Home",
};
</script>

<style lang="less" scoped>
</style>