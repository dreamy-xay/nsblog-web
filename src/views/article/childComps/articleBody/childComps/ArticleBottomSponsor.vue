<!--
 * @Description: 文章页面打赏组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-24 20:04:12
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 21:10:27
-->
<template>
  <div class="article-bottom-sponsor">
    <div
      class="article-bottom-sponsor-inner"
      role="button"
    >
      <div class="img">
        Sponsor
      </div>
      <div
        class="item"
        @click="openSponsor('paypal')"
      >
        <i class="iconfont blog-paypal"></i>
      </div>
      <div
        class="item"
        @click="openSponsor('alipay')"
      >
        <i class="iconfont blog-zhifubao"></i>
      </div>
      <div
        class="item"
        @click="openSponsor('weixin')"
      >
        <i class="iconfont blog-tianjiaweixinzhifu"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 文章页面打赏组件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'articleBottomSponsor',
  props: {
    sponsors: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    function openSponsor(key) {
      console.log(props.sponsors[key]);
    }

    return {
      openSponsor,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-bottom-sponsor {
  width: 100%;
  height: 33px;
  margin-top: 54px;
  @include flex(center, center);

  .article-bottom-sponsor-inner {
    height: 100%;
    width: 276px;
    @include flex(center, center);
    position: relative;

    .item {
      width: 92px;
      height: 100%;
      transition: 0.25s;
      background-color: $grey-0;
      box-shadow: $shadow-0;
      z-index: 1;
      @include flex(center, center);

      .iconfont {
        font-size: 50px;
      }

      &:hover {
        z-index: 3;
      }

      &:nth-child(2) {
        color: $green-0;
        border-radius: 4px 0 0 4px;

        &:hover {
          color: $green-1;
          box-shadow: 0 0 6px $green-1;
        }
      }

      &:nth-child(3) {
        color: $blue-0;
        box-shadow: $shadow-0;
        z-index: 2;

        &:hover {
          color: $blue-1;
          box-shadow: 0 0 6px $blue-1;
        }
      }

      &:nth-child(4) {
        color: $orange-0;
        border-radius: 0 4px 4px 0;

        &:hover {
          color: $orange-1;
          box-shadow: 0 0 6px $orange-1;
        }
      }
    }

    .img {
      cursor: default;
      position: absolute;
      left: 30px;
      top: -54px;
      font-size: 12px;
      width: 70px;
      height: 70px;
      line-height: 70px;
      color: $grey-0;
      z-index: 0;
      background: $yellow-0 url('/article/o_like.png') no-repeat center 10px;
      background-size: 20px;
      border-radius: 35px;
      text-align: center;
      transform: rotatez(-15deg);
    }
  }
}
</style>
