<!--
 * @Description:公告牌
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-15 13:19:14
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-13 14:26:12
-->
<template>
  <div
    class="base-bulletin"
    :style="style"
  >
    <div class="base-bulletin-top">
      <div class="icon"> <i :class="type ? 'iconfont blog-gonggao':'iconfont blog-zhaomu'"></i> </div>
      <div class="text">{{type ? '公告牌':'征集令'}}</div>
    </div>

    <div
      class="base-bulletin-context"
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
      class="base-bulletin-null"
    >{{type ? '暂无公告哦~':'暂无征集哦~'}}</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

/**
 * @description:公告牌
 * @param {Array} bulletinData 公告牌告示text和连接href `默认[]`
 * @param {Boolean} type true为公告牌false为征集令 `默认为false`
 * @param {Object} style 最外层样式 `默认为 null`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'baseBulletin',
  props: {
    bulletinData: {
      type: Array,
      default: () => [],
    },
    type: {
      type: Boolean,
      default: false,
    },
    style: {
      type: Object,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.base-bulletin {
  width: 252px;
  padding: 16px;
  border-radius: $border-radius-0;
  background-color: $grey-0;
  box-shadow: $shadow-0;

  .base-bulletin-top {
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

  .base-bulletin-context {
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

  .base-bulletin-null {
    @include flex(center, center);
    font-size: 14px;
    color: $grey-7;
  }
}
</style>
