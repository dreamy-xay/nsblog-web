<!--
 * @Description 首页顶部之中间部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-22 17:52:26
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-04 14:25:38
-->
<template>
  <div class="base-top-bar-center">
    <div class="center-middle">
      <input type="text">
      <button class="base-top-bar-center-button">
        <i class="iconfont blog-sousuo"></i>
      </button>
    </div>

  </div>
</template>

<script>
/**
 * @description: The center of TopBar
 * @author: Ban
 */
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TopBarHeadCenter',
});
</script>


<style lang="scss" scoped>
.base-top-bar-center {
  box-sizing: border-box;
  flex: 1;
  padding-right: 13px;
  width: 373px;
  //text-align: center;

  .center-middle {
    transform: translate(0, 10px);
    input {
      height: 36px;
      width: calc(100% - 48px);
      max-width: 325px;
      border: 1px solid #e5e5e5;
      border-radius: 3px 0 0 3px;
      background: $grey-2;
      text-indent: 16px;
      vertical-align: top;
      outline: 0;
    }

    .base-top-bar-center-button {
      width: 48px;
      height: 36px;
      display: inline-block;
      vertical-align: top;
      border-radius: 0 3px 3px 0;
      border: 0;
      cursor: pointer;
      background: $green-0;
      .blog-sousuo {
        font-size: 24px;
        text-align: center;
        color: $grey-0;
      }
    }
  }
}
</style>
