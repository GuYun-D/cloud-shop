<template>
  <div class="swiper-container">
    <div class="swiper-wrapper" :style="imageLeft" ref="swiperWiper">
      <div
        class="swiper-slide"
        v-for="(image, index) in imageList"
        :key="image.id"
      >
        <img
          :src="image.imgUrl"
          :class="{ active: index === defaultIndex }"
          @click="changeDefaultIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next" @click="changeSwiper('next')"></div>
    <div class="swiper-button-prev" @click="changeSwiper('prev')"></div>
  </div>
</template>

<script>
export default {
  name: "ImageList",
  props: ["imageList"],
  data() {
    return {
      // 鼠标移入对应下标图片后显示边框
      defaultIndex: 0,
      imgLeft: 0,
      nextFlag: true,
      prevFlag: true,
    };
  },
  methods: {
    changeDefaultIndex(index) {
      this.defaultIndex = index;
      this.$bus.$emit("syncDefaultIndex", index);
    },

    changeSwiper(value) {
      if (value === "next" && this.nextFlag) {
        this.nextFlag = false;
        if (this.defaultIndex === this.$refs.swiperWiper.children.length - 1) {
          this.defaultIndex = 8;
          return;
        }
        if (
          this.defaultIndex >= 6 &&
          this.defaultIndex < this.$refs.swiperWiper.children.length - 1
        ) {
          this.imgLeft -= 56;
        }
        this.$bus.$emit("syncDefaultIndex", ++this.defaultIndex);
      } else if (value === "prev" && this.prevFlag) {
        this.prevFlag = false;
        if (this.defaultIndex === 0) {
          return (this.defaultIndex = 0);
        }
        if (this.defaultIndex >= 7) {
          this.imgLeft += 56;
        }
        this.$bus.$emit("syncDefaultIndex", --this.defaultIndex);
      }

      this.nextFlag = true;
      this.prevFlag = true;
    },
  },

  computed: {
    imageLeft() {
      return { left: this.imgLeft + "px" };
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>