<!--
 * @Description: login路由下页面，带logo头的框架
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 16:07:27
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-26 22:33:12
-->
<template>
  <div class="login-logo">
    <div class="login-logo-header">
      <img
        class="favicon"
        src="/favicon.ico"
        alt="favicon"
      >
      <img
        class="logo"
        src="/logo.png"
        alt="logo"
      >
    </div>
    <div class="login-logo-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: login路由下页面，带logo头的框架
 * @slot 默认插槽
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'loginLogo',
});
</script>

<style lang="scss" scoped>
.login-logo {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .login-logo-header {
    width: 232px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 0 auto;
    user-select: none;

    .favicon {
      height: 48px;
      width: 48px;
      margin-right: 1px;
    }

    .logo {
      height: 52px;
      width: 182px;
    }
  }

  .login-logo-inner {
    width: 100%;
    height: 328px;
    overflow: hidden;
  }
}
</style>
