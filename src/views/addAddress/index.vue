<template>
  <div class="container">
    <form action="">
      <div class="input-item">
        <span class="attr">收货人姓名:</span>
        <input type="text" class="content" v-model="addressInfo.name" />
      </div>
      <div class="input-item">
        <span class="attr">联系方式:</span>
        <input type="nummber" class="content" v-model="addressInfo.phone" />
      </div>
      <div class="input-item">
        <span class="attr">收货人详细地址:</span>
        <input type="text" class="content" v-model="addressInfo.address" />
      </div>
      <div class="input-item">
        <button @click.prevent="setAddress">确定</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddAddress",
  data() {
    return {
      addressInfo: {
        name: "",
        phone: "",
        address: "",
      },
    };
  },

  methods: {
     setAddress() {
      const { addressInfo } = this;
      if (
        addressInfo.name.trim() &&
        addressInfo.phone.trim() &&
        addressInfo.address.trim
      ) {
        try {
          this.$store.dispatch("addAddress", addressInfo);
          alert("地址添加成功");
          this.$router.push("/trade");
        } catch (error) {
          alert('添加失败')
        }
      }else {
        alert("请输入完整收货地址")
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  overflow-x: hidden;
  background-color: #fff;
  border-top: 1px solid #f40;
  .input-item {
    width: 500px;
    margin: 0 auto;
    padding: 10px;

    .attr {
      font-size: 16px;
      margin-right: 10px;
    }

    .content {
      width: 500px;
      height: 20px;
      padding: 4px;
      text-indent: 2em;
      outline: none;
      border: 1px solid #666;
      margin-top: 10px;
      border-radius: 4px;
    }

    button {
      height: 40px;
      width: 100px;
      border-radius: 10px;
      border: 1px solid gray;
      color: #fff;
      background-color: #ea4a36;
      opacity: 0.5;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>