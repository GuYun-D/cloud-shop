<template>
  <div class="home">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <!-- <Floor v-for="floor in floors" :key="floor.id" :floor="floor"></Floor> -->
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodyRecommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState } from "vuex";

export default {
  components: {
    TodayRecommend,
    ListContainer,
    Rank,
    Like,
    Floor,
    Brand,
  },
  name: "Home",

  mounted() {
    localStorage.getItem("USER_INFO")
      ? localStorage.getItem("USER_INFO")
      : localStorage.setItem("USER_INFO", JSON.stringify({}));
    localStorage.getItem("ADDRESS_SIOP")
      ? localStorage.getItem("ADDRESS_SIOP")
      : localStorage.setItem("ADDRESS_SIOP", JSON.stringify([]));
  },

  computed: {
    ...mapState({
      floors: (state) => state.home.floors,
    }),
  },
};
</script>

<style lang="less" scoped>
</style>