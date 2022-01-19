<!--
 * @Description: 页脚
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-10 20:39:59
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-18 17:14:12
-->

<template>
  <div class="base-footer">
    <div
      class="foot1"
      v-if="true"
    >
      <a href="">关于</a>
      <a href="">博客</a>
      <a
        href=""
        class="a3"
      >网站</a>
    </div>
    <div
      class="foot2"
      v-if="true"
    >
      <i class="iconfont blog-weibo"></i>
      <i class="iconfont blog-email"></i>
    </div>
    <div class="foot3">© 2021 · 笔记分享部落阁 · ALL RIGHTS RESERVED</div>
  </div>

</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 页脚
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseFooter',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.base-footer {
  width: 100%;
  height: 122px;
  background: $grey-0;
  box-shadow: $shadow-0;
  margin-top: 20px;
  @include flex(center, center, column);
  .foot1 {
    font-size: 15px;
    height: 20px;
    margin-top: 16px;
    a {
      color: $grey-7;
      margin-right: 20px;
    }
    .a3 {
      margin-right: 0px;
    }
  }
  .foot2 {
    height: 28px;
    margin-top: 10px;
    margin-bottom: 14px;
    @include flex(center, center);
    .blog-weibo {
      margin-right: 20px;
    }
    .iconfont {
      font-size: 20px;
      color: $grey-8;
    }
  }
  .foot3 {
    font-size: 14px;
    color: $grey-7;
    height: 20px;
    margin-bottom: 14px;
  }
}
</style>
