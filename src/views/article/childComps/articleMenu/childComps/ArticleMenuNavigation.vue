<!--
 * @Description: 导航组件
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-25 15:31:29
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-15 13:25:56
-->
<template>
  <div class="article-menu-navigation">
    <div class="article-menu-navigation-top">
      <div class="article-menu-navigation-top-icon"><i class="iconfont blog-daohang"></i></div>
      <div class="article-menu-navigation-top-text">导航</div>
    </div>

    <div
      class="article-menu-navigation-context"
      v-for="(item, index) in navigationData"
      :key="index"
      role="button"
      @click="clickNavigation(item.path)"
    >
      <div
        class="icon"
        :class="index === 1 ? 'size' : ''"
      ><i :class="item.icon"></i></div>
      <div class="text">{{item.text}}</div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

/**
 * @description: 导航组件
 * @param {String} 用户名 `必传参数`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'articleMenuNavigation',
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const navigationData = [
      //数据
      { icon: 'iconfont blog-zhuye', text: '主页', path: `/blog/${props.data}` },
      { icon: 'iconfont blog-dongtai1', text: '动态', path: `/user/${props.data}/dynamic` },
      { icon: 'iconfont blog-guanyu', text: '关于', path: `/user/${props.data}` },
      { icon: 'iconfont blog-zhifeiji', text: '开往', path: 'https://travellings.now.sh/' },
    ];

    /**
     * @description: 点击导航栏跳转
     * @param {String} path 跳转路径
     * @return {Void}
     * @author: Z_Y_C
     */
    function clickNavigation(path) {
      window.open(path, path);
    }
    return {
      navigationData,
      clickNavigation,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-menu-navigation {
  @include flex(initial, center, column);
  padding: 20px 0 24px 0;
  border-bottom: 1px solid $grey-2;

  .article-menu-navigation-top {
    @include flex(center);
    margin-bottom: 10px;

    .article-menu-navigation-top-icon {
      margin-right: 8px;
      height: 18px;
      line-height: 18px;
      color: $grey-9;

      .iconfont {
        font-size: 14px;
      }
    }

    .article-menu-navigation-top-text {
      color: $grey-9;
      font-size: 14px;
      font-weight: 700;
      height: 19px;
      line-height: 19px;
    }
  }

  .article-menu-navigation-context {
    @include flex(center);
    margin-bottom: 4px;
    padding-left: 20px;
    color: $grey-9;
    height: 30px;
    transition: 0.25s;

    .icon {
      height: 21px;
      line-height: 21px;
      margin-right: 16px;

      .iconfont {
        font-size: 20px;
      }
    }

    .size {
      .iconfont {
        font-size: 16px;
      }
    }

    .text {
      height: 21px;
      line-height: 21px;
      font-size: 16px;
    }

    &:hover {
      color: $green-0;
      background-color: $grey-2;
      border-radius: $border-radius-1;
    }
  }
}
</style>
