<!--
 * @Description: 登录页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 14:18:16
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 14:01:32
-->

<template>
  <div class="login">
    <div class="login-left-circle"></div>
    <div class="login-right-circle"></div>
    <base-login-card>
      <router-view />
    </base-login-card>
    <span class="login-copyright">© 2021 笔记分享部落阁</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseLoginCard from '@/components/common/baseLoginCard/BaseLoginCard.vue';

/**
 * @description: 登录页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'login',
  components: {
    BaseLoginCard,
  },
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  .login-left-circle,
  .login-right-circle {
    position: absolute;
    width: 89%;
    padding: 89% 0 0;
    border-radius: 50%;
    background-color: $green-0;
    overflow: hidden;
    z-index: -1;
  }

  .login-left-circle {
    top: 47.5%;
    left: -20.3%;
  }

  .login-right-circle {
    top: -146.4%;
    left: 19.9%;
  }

  .login-copyright {
    position: absolute;
    display: inline-block;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    color: $grey-0;
    bottom: 30px;
    font-weight: 600;
  }
}
</style>
