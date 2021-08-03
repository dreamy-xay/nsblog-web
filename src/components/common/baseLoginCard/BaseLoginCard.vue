<!--
 * @Description: 登录页面框动画抽象
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 14:36:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-03 23:11:51
-->

<template>
  <div
    class="base-login-card"
    :class="{'base-login-card-active': animate}"
  >
    <div
      class="base-login-card-inner"
      v-show="!animate"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

/**
 * @description: 登录框动画抽象
 * @param {*}
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseLoginCard',
  setup() {
    const route = useRoute();
    const animate = ref(false);

    watch(
      () => route.path,
      () => {
        animate.value = true;

        setTimeout(() => {
          animate.value = false;
        }, 500);
      }
    );

    return {
      animate,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-login-card {
  width: 480px;
  height: 520px;
  overflow: hidden;
  padding: 80px 65px 60px;
  border-radius: $border-radius-0;
  box-shadow: $shadow-1;
  background-color: $grey-0;
  box-sizing: border-box;

  &.base-login-card-active {
    @keyframes fadeInout {
      0% {
        margin-right: 0;
        opacity: 1;
      }
      25% {
        margin-right: -20px;
        opacity: 0.5;
      }
      50% {
        margin-right: -40px;
        opacity: 0;
      }
      75% {
        margin-right: -20px;
        opacity: 0.5;
      }
      100% {
        margin-right: 0;
        opacity: 1;
      }
    }
    animation: fadeInout 0.5s ease-in-out;
  }

  .base-login-card-inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
