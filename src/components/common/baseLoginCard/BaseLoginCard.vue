<!--
 * @Description: 登录框动画抽象
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 14:36:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-26 17:22:01
-->

<template>
  <div class="base-login-card">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 登录框动画抽象
 * @param {*}
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseLoginCard',
});
</script>

<style lang="scss" scoped>
.base-login-card {
  width: 480px;
  height: 520px;
  padding: 80px 65px 60px;
  border-radius: $border-radius-0;
  box-shadow: $shadow-1;
  background-color: $grey-0;
  box-sizing: border-box;
}
</style>
