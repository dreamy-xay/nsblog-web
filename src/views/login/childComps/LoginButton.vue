<!--
 * @Description: login路由下页面按钮
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 22:15:49
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-27 00:03:57
-->
<template>
  <div
    class="login-button"
    :class="bindClass"
    role="button"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: login路由下页面按钮
 * @param {String} bindClass 自定义绑定类 `默认为null`
 * @slot 默认插槽，按钮内容
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'loginButton',
  props: {
    bindClass: {
      type: String,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
.login-button {
  width: 100%;
  height: 45px;
  border-radius: $border-radius-1;
  overflow: hidden;
  background-color: $green-0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $grey-0;
  font-size: 16px;
  transition: all 0.4s;
  box-shadow: $shadow-0;

  &:hover {
    background-color: $green-1;
  }
}
</style>
