<!--
 * @Description: 未登录时提示
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-09 12:14:46
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-20 17:46:32
-->

<template>
  <div class="top-bar-not-login">
    <div class="top-bar-not-login-content">
      {{ content }}
    </div>
    <a v-prefix
      href="/login/signIn?back"
      class="top-bar-not-login-link"
    >
      <div>
        立即登录
      </div>
    </a>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 未登录时提示
 * @param {String} content 登录既可查看title `必传参数`
 * @author: Ban
 */
export default defineComponent({
  name: 'TopBarNotLogin',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.top-bar-not-login {
  width: 328px;
  padding: 14px 16px;
  box-sizing: border-box;
  overflow: hidden;

  .top-bar-not-login-content {
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: $grey-7;
    margin-bottom: 14px;
  }

  .top-bar-not-login-link div {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $green-0;
    color: $grey-0;
    border-radius: $border-radius-1;
    transition: 0.25s;

    &:hover {
      background: $green-1;
    }
  }
}
</style>
