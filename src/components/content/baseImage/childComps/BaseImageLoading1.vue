<!--
 * @Description: 基本图片加载动画，编号1
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-27 12:13:30
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-27 12:40:14
-->
<template>
  <div class="base-image-loading-1">
    <div
      class='base-image-loading-1-dot'
      v-for="index of 6"
      :key="index"
    ></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 基本图片加载动画，编号0
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseImageLoading0',
});
</script>

<style lang="scss" scoped>
.base-image-loading-1 {
  height: 20px;
  width: 250px;

  .base-image-loading-1-dot {
    animation-name: loader;
    animation-timing-function: ease-in-out;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    position: absolute;
    border: 1px solid $grey-0;

    &:first-child {
      background-color: #8cc759;
      animation-delay: 0.5s;
    }

    &:nth-child(2) {
      background-color: #8c6daf;
      animation-delay: 0.4s;
    }

    &:nth-child(3) {
      background-color: #ef5d74;
      animation-delay: 0.3s;
    }

    &:nth-child(4) {
      background-color: #f9a74b;
      animation-delay: 0.2s;
    }

    &:nth-child(5) {
      background-color: #60beeb;
      animation-delay: 0.1s;
    }

    &:nth-child(6) {
      background-color: #fbef5a;
      animation-delay: 0s;
    }

    @keyframes loader {
      15% {
        transform: translateX(0);
      }
      45% {
        transform: translateX(230px);
      }
      65% {
        transform: translateX(230px);
      }
      95% {
        transform: translateX(0);
      }
    }
  }
}
</style>
