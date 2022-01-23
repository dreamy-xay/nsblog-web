<!--
 * @Description: 热门标签型小组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-15 15:07:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-23 15:38:32
-->
<template>
  <div
    class="base-tag-card"
    :style="style"
  >
    <div class="base-tag-card-top">
      <div class="title">
        {{ title }}
      </div>
    </div>
    <div class="base-tag-card-bottom">
      <a
        class="tag"
        v-for="(item, index) in tags"
        :href="item.url"
        :target="item.url"
        :key="index"
        role="button"
      >
        <div class="text">
          {{ item.name }}
        </div>
        <div
          class="icon"
          v-if="index <= 2 && hotIcon"
        >
          <i class="iconfont blog-hot1"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 热门标签型小组件
 * @param {String} title 小组件标题 `默认为 ''`
 * @param {Boolean} hotIcon 前三标签是否含热门图标 `默认为 true`
 * @param {Array} tags 内容列表 `默认为 []`
 * @param {Object} style 最外层样式 `默认为 null`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseTagCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    hotIcon: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    style: {
      type: Object,
      default: null,
    },
  },
  setup() {
    return {
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.base-tag-card {
  width: 284px;
  background: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  @include flex(center, center, column);

  .base-tag-card-top {
    @include size(252px, 24px);
    padding: 16px;
    @include flex(center);

    .title {
      font-size: 14px;
      font-weight: 700;
      color: $grey-10;
    }
  }

  .base-tag-card-bottom {
    width: 264px;
    margin: 0 4px 0 16px;
    @include flex;
    flex-flow: row wrap;

    .tag {
      @include flex(center, center);
      height: 18px;
      border-radius: 16px;
      padding: 0 8px;
      margin-bottom: 16px;
      margin-right: 12px;
      background: $grey-2;
      font-size: 12px;
      transition: 0.25s;
      max-width: 236px;

      &:hover {
        background: $grey-4;

        .text {
          color: $grey-10;
        }

        .icon .iconfont {
          color: $orange-1;
        }
      }

      .text {
        color: $grey-7;
        transition: 0.25s;
        @include ellipsis(1);
      }

      .icon {
        @include size(10px, 100%);
        @include flex(center, center);
        margin-left: 4px;

        .iconfont {
          font-size: 12px;
          transition: 0.25s;
          color: $orange-0;
        }
      }
    }
  }
}
</style>
