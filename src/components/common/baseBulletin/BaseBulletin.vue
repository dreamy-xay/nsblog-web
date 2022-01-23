<!--
 * @Description:公告牌
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-15 13:19:14
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-23 13:54:24
-->
<template>
  <div class="home-bulletin">
    <div class="home-bulletin-top">
      <div class="icon"> <i :class="type ? 'iconfont blog-gonggao':'iconfont blog-zhaomu'"></i> </div>
      <div class="text">{{type ? '公告牌':'征集令'}}</div>
    </div>

    <div
      class="home-bulletin-context"
      role="button"
      v-for="(item , index) in bulletinData"
      :key="index"
    >
      <div class="icon"> <i :class="type ? 'iconfont blog-gonggao1':'iconfont blog-zhiling'"></i> </div>
      <a
        class="text"
        :href="item.href"
        :target="item.href"
      >{{item.text}}</a>
    </div>

    <div
      v-if="bulletinData.length<=0"
      class="home-bulletin-null"
    >暂无公告哦~</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

/**
 * @description:公告牌
 * @param {Array} bulletinData 公告牌告示text和连接href `默认[]`
 * @param {Boolean} type true为公告牌false为征集令 `默认为false`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'homeBulletin',
  props: {
    bulletinData: {
      type: Array,
      default: () => [],
    },
    type: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.home-bulletin {
  width: 252px;
  padding: 16px;
  border-radius: $border-radius-0;
  background-color: $grey-0;
  box-shadow: $shadow-0;
  margin-bottom: 16px;

  .home-bulletin-top {
    height: 24px;
    @include flex(center);
    margin-bottom: 16px;

    .icon {
      height: 16px;
      line-height: 16px;
      margin-right: 10px;

      .iconfont {
        font-size: 18px;
        color: $green-0;
      }
    }

    .text {
      @include flex(center);
      font-size: 14px;
      font-weight: 700;
      color: $grey-11;
    }
  }

  .home-bulletin-context {
    height: 16px;
    @include flex(center);
    margin: 10px 0;
    color: $grey-7;

    &:last-child {
      margin-bottom: 0px;
    }

    .icon {
      height: 16px;
      line-height: 16px;
      margin-right: 10px;

      .iconfont {
        font-size: 18px;
      }
    }

    .text {
      font-size: 14px;
      color: $grey-7;
      transition: 0.25s;
      @include ellipsis(1);

      &:hover {
        color: $grey-9;
      }
    }
  }

  .home-bulletin-null {
    @include flex(center, center);
    font-size: 14px;
    color: $grey-7;
  }
}
</style>
