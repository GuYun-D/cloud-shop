<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去
          <router-link target="_blank" to="/login">登陆</router-link>
        </span>
      </h3>

      <div class="content">
        <label>手机号:</label>
        <input
          v-model="registerInfo.phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="registerInfo.code"
        />
        <img
          id="codeCheck"
          title="点击换一个"
          ref="code"
          @click="changeRander"
          :src="verificationCodeArr[random].path"
          alt="code"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="registerInfo.password"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          v-model="registerInfo.passwordTow"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="registerInfo.isChecked" />
        <span>同意协议并注册《云购物用户协议</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      verificationCodeArr: [
        {
          path: "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2903212808,3208655458&fm=11&gp=0.jpg",
          validator: "7364",
        },
        {
          path: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2476609755,3832854071&fm=26&gp=0.jpg",
          validator: "6220",
        },
        {
          path: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3492744630,2999008487&fm=26&gp=0.jpg",
          validator: "2vyk",
        },
        {
          path: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1961666463,3631644844&fm=26&gp=0.jpg",
          validator: "hauzt",
        },
      ],

      random: 0,

      registerInfo: {
        phone: "",
        code: "",
        password: "",
        passwordTow: "",
        isChecked: true,
      },
    };
  },

  methods: {
    changeRander() {
      this.random += 1;
      if (this.random > 3) this.random = 0;
    },

    async register() {
      // 获取用户信息，注册用户
      let { phone, code, password, passwordTow } = this.registerInfo;

      if (
        phone &&
        code &&
        password &&
        passwordTow &&
        code.toLowerCase() === this.verificationCodeArr[this.random].validator
      ) {
        if (!(passwordTow === password)) {
          alert("两次密码不一致");
          return;
        }
        try {
          await this.$store.dispatch("userRegister", {
            phone,
            code,
            password,
          });

          alert("注册成功");
          this.$router.push("/login");
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert("输入完整信息或填写正确验证码");
      }
    },
  },

  computed: {},
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 30px;
      position: relative;

      #codeCheck {
        width: 100px;
        height: 40px;
        vertical-align: middle;
        margin-left: 10px;
        cursor: pointer;
      }

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      margin-top: 10px;
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>