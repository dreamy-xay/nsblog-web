<!--
 * @Description:按分类或标签查询博客
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-12 14:07:49
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-27 14:06:16
-->
<template>
  <div
    class="blog-main-text"
    v-if="title"
  >
    <div class="blog-main-text-contetx">
      <div class="contetx-icon">
        <i :class="type ? 'iconfont blog-biaoqian' : 'iconfont blog-fenlei1'"></i>
      </div>
      <div class="contetx-type">{{ type ? '标签' : '分类' }}</div>
      <div class="context-name">
        <div class="left"></div>
        {{ title }}
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

/**
 * @description:按分类或标签查询博客
 * @param {string} title 显示内容 `默认为null`
 * @param {Boolean} type 标签或分类类型 `默认为true 标签`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'blogMainText',
  props: {
    title: {
      type: String,
      default: null,
    },
    type: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.blog-main-text {
  width: 100%;
  margin-top: 30px;
  @include flex(center, center);
  width: 100%;
  height: 80px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  margin-bottom: 30px;
  transition: 0.25s;
  overflow: hidden;

  .blog-main-text-contetx {
    @include flex(center, center);
    color: $grey-8;
    .contetx-icon {
      height: 32px;
      line-height: 32px;
      .iconfont {
        font-size: 32px;
      }
    }

    .contetx-type {
      font-size: 32px;
      font-weight: 700;
      line-height: 32px;
      margin-left: 12px;
      margin-right: 24px;
    }

    .context-name {
      height: 40px;
      position: relative;
      @include flex(center, center);
      font-size: 32px;
      font-weight: 700;
      line-height: 40px;
      padding: 0 14px;

      .left {
        width: 14px;
        height: 14px;
        top: -2px;
        left: -2px;
        position: absolute;
        border-top: $grey-8 solid 2px;
        border-left: $grey-8 solid 2px;
      }

      .right {
        width: 14px;
        height: 14px;
        bottom: -2px;
        right: -2px;
        position: absolute;
        border-bottom: $grey-8 solid 2px;
        border-right: $grey-8 solid 2px;
      }
    }
  }
}
</style>
