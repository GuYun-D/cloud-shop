<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearfix" v-if="deliveryAddress.length == 0">
        <router-link to="/addAddress" class="addAddress"
          >暂无收货地址信息，请点此添加</router-link
        >
      </div>

      <div class="address clearfix" v-else>
        <div>
          <span class="username selected">{{ address.name }}</span>
          <p>
            <span class="s1">{{ address.address }}</span>
            <span class="s2">{{ address.phone }}</span>
            <span class="s3" v-if="address.isDefault">默认地址</span>
            <span class="s3" v-show="!address.isDefault">设为默认</span>
            <span class="s4" @click="addressList = !addressList">更换地址</span>
          </p>
        </div>
      </div>
      <div id="addressList" v-show="addressList">
        <ul>
          <li
            v-for="(address, index) in addressListArray"
            :key="address.name"
            @click="changeAddress(address, index)"
          >
            {{ address.name }}&nbsp;&nbsp;{{ address.address }}&nbsp;&nbsp;{{
              address.phone
            }}
          </li>
          <li><router-link to="/addAddress">新增收货地址</router-link></li>
        </ul>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearfix">
        <span
          class="username"
          v-for="(pay, index) in paymentMethod"
          :key="pay.id"
          :class="{ selected: pay.default }"
          @click="changePayMethod(index)"
          >{{ pay.payName }}</span
        >
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearfix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearfix" v-for="shop in shopArr" :key="shop.id">
          <li>
            <img style="width: 100px" :src="shop.defaultImg" alt="" />
          </li>
          <li>
            <p>
              {{ shop.titile }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ shop.price }}</h3>
          </li>
          <li>X{{ shop.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="message"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearfix">
      <ul>
        <li>
          <b
            ><i>{{ totailNum }}</i
            >件商品，总商品金额</b
          >
          <span>{{ totalPrice }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>{{ totalPrice }}</span>
      </div>
    </div>
    <div class="sub clearfix">
      <a href="javascript:;" @click="submitOrder" class="subBtn">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
// import { reqSubminOrder } from "@/api";

export default {
  name: "Trade",
  data() {
    return {
      address: {},
      addressList: false,
      defaultAddress: {},
      index: -1,
      message: "",
      addressListArray: [],
      paymentWay: "在线支付",
      paymentMethod: [
        {
          id: 7689485697,
          payName: "在线支付",
          default: true,
        },
        {
          id: 647586708 - 90,
          payName: "货到付款",
          default: false,
        },
      ],
      shopArr: [],
      orderNumber: "",
    };
  },

  mounted() {
    this.getTradeInfo();
    this.$store.dispatch("getCartList");
    this.randerAddress();
    this.getShopList();
  },

  methods: {
    getTradeInfo() {
      this.$store.dispatch("tradeInfo");
    },

    changeAddress(address) {
      this.address = address;
      this.addressList = false;
    },

    randerAddress() {
      setTimeout(() => {
        for (let i = 0; i < this.deliveryAddress.length; i++) {
          if (this.deliveryAddress[i].isDefault == true) {
            this.address = this.deliveryAddress[i];
          } else {
            this.addressListArray.push(this.deliveryAddress[i]);
          }
        }
      }, 200);
    },

    changePayMethod(index) {
      this.paymentMethod.forEach((item) => {
        item.default = false;
      });
      this.paymentMethod[index].default = true;
      this.paymentWay = this.paymentMethod[index].name;
    },

    getShopList() {
      setTimeout(() => {
        this.shopArr = this.shopList.filter((item) => {
          return item.isChecked === 1;
        });
      }, 1000);
    },

    // 提交订单
    async submitOrder() {
      let tradeNum = this.tradeInfo.outTradeNo;
      let tradeData = {
        consignee: this.address.name,
        consigneeTel: this.address.phone,
        deliveryAddress: this.address.address,
        paymentWay: this.paymentWay,
        orderDetailList: this.addressListArray,
      };
      // 带上交易编号和交易信息
      try {
        const result = await this.$API.reqSubminOrder(tradeNum, tradeData);
        if (result.code === 200) {
          this.orderNumber = result.data;
          alert("提交成功")
          this.$router.push('/pay?orderNo='+result.data)
        }
      } catch (error) {
        alert(error.message)
      }
    },
  },

  computed: {
    ...mapGetters(["deliveryAddress"]),
    ...mapState({
      shopList: (state) => state.shopCart.shopCartList,
      tradeInfo: (state) => state.trade.tradeInfo,
    }),

    totailNum() {
      let num = 0;
      this.shopArr.forEach((item) => {
        num += item.skuNum;
      });
      return num;
    },

    totalPrice() {
      let price = 0;
      this.shopArr.forEach((item) => {
        price += item.skuNum * item.price;
      });
      return price;
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .addAddress {
        color: #f40;
        font-size: 18px;
        font-weight: bold;
        transition: all 0.3s;

        &:hover {
          color: green;
        }
      }

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
          border-radius: 2px;
        }

        .s4 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: skyblue;
          color: #fff;
          margin-top: 3px;
          text-align: center;
          border-radius: 2px;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    #addressList {
      width: 600px;
      padding-left: 20px;

      li {
        width: 100%;
        padding: 10px;
        font: 16px;
        font-weight: bold;
        color: #111;
        cursor: pointer;

        &:hover {
          background-color: #ccc;
        }
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>