<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideFirst" @mouseenter="showFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="slide">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.cat_id"
                :class="index === currentIndex ? 'active' : ''"
                @mouseenter="showSubList(index)"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-cat_name="c1.cat_name"
                    :data-catid1="c1.cat_id"
                    >{{ c1.cat_name }}</a
                  >
                  <!-- <a
                href="javascript:;"
                @click="
                  $router.push(
                    `/search?cat_name=${c1.cat_name}&cat_id1=${c1.cat_id}`
                  )
                "
                >{{ c1.cat_name }}</a
              > -->
                  <!-- <router-link
                to="`/search?cat_name=${c1.cat_name}&cat_id=${c1.cat_id}`"
                >{{ c1.cat_name }}</router-link
              > -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="c2 in c1.children" :key="c2.cat_id">
                      <dt>
                        <a
                          href="javascript:;"
                          :data-cat_name="c2.cat_name"
                          :data-catid2="c2.cat_id"
                          >{{ c2.cat_name }}</a
                        >
                        <!-- <a
                      href="javascript:;"
                      @click="
                        $router.push(
                          `/search?cat_name=${c2.cat_name}&cat_id2=${c2.cat_id}`
                        )
                      "
                      >{{ c1.cat_name }}</a
                    > -->

                        <!-- <router-link
                      to="`/search?cat_name=${c2.cat_name}&cat_id=${c2.cat_id}`"
                      >{{ c2.cat_name }}</router-link
                    > -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.children" :key="c3.cat_id">
                          <a
                            href="javascript:;"
                            :data-cat_name="c3.cat_name"
                            :data-catid3="c3.cat_id"
                            >{{ c3.cat_name }}</a
                          >
                          <!-- <a
                        href="javascript:;"
                        @click="
                          $router.push(
                            `/search?cat_name=${c3.cat_name}&cat_id3=${c3.cat_id}`
                          )
                        "
                        >{{ c2.cat_name }}</a
                      > -->

                          <!-- <router-link
                        to="`/search?cat_name=${c3.cat_name}&cat_id=${c3.cat_id}`"
                        >{{ c3.cat_name }}</router-link
                      > -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
/**
 * dispatch()触发发请求的异步sction调用 ==> 数据从后台接口请求到vuex的state中
 * store.state / mapState() 读取vuex的state数据 ==> 数据从state到组件的computed
 * 在模板中动态显示
 */
import { mapState } from "vuex";
// import _ from "lodash"
// 按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 控制二三级分类的显示
      currentIndex: -2,

      // 控制一级分类的显示与隐藏
      isShowFirst: false,
    };
  },

  computed: {
    categoryList() {
      return this.$store.state.home.categoryList;
    },
    /**
     * import { mapState } from "vuex";
     * ...mapState["categoryList"]
     * 这种写法等同于 return this.$store.state.categoryList;
     * 只适用于单模块编程
     */
    // ...mapState({
    //   categoryList: state => state.home.categoryList  // 函数接受的的总状态，返回值作为计算属性值
    // })
  },
  methods: {
    toSearch(event) {
      const target = event.target;
      // console.dir(target);
      const data = target.dataset;
      const { catid1, catid2, catid3 } = data;
      let catname = data.cat_name;

      // if (target.tagName.toUpperCase() === "A") {
      if (catname) {
        const query = {
          catName: catname,
        };

        if (catid1) {
          query.catId1 = catid1;
        } else if (catid2) {
          query.catId2 = catid2;
        } else if (catid3) {
          query.catId3 = catid3;
        }

        const location = {
          name: "search",
          query,
          /**
           * 需要携带上当前已有的params参数
           */
          params: this.$route.params
        }

        this.$router.push(location);
      }
    },

    /**
     * 调用的频率太高了
     * 节流前：
     *     showSubList(index){
     *          this.currentIndex = index
     *      }
     */
    showSubList: throttle(
      function (index) {
        // 只有当还没有离开整个分类的div时才更新下标
        if (this.currentIndex !== -2) {
          this.currentIndex = index;
        }
        // this.currentIndex = index;
      },
      200
      // {
      //   trailing: false, // 最后一次事件不做延迟处理
      // }
    ),

    showFirst() {
      this.currentIndex = -1;
      this.isShowFirst = true;
    },

    hideFirst() {
      this.currentIndex = -2;
      if (this.$route.path !== "/home") {
        this.isShowFirst = false;
        console.log(this.$route.path);
      }
    },
  },

  created() {
    // 判断当前路由是否是home，如果是就显示一级分类
    const path = this.$route.path;
    if (path === "/" || path === "/home") {
      this.isShowFirst = true;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      &.slide-enter-active,
      &.slide-leave-actibe {
        transition: all 0.6s;
      }
      
      &.slide-enter, &.slide-leave-to{
        opacity: 0;
        height: 0;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            letter-spacing: 5px;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.active {
            background-color: #ccc;
            .item-list {
              display: block;
            }

            transition: all 0.8s;
          }
        }
      }
    }
  }
}
</style>