<!--
 * @Description: 基本图片加载动画，编号0
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-27 12:13:30
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-27 12:39:59
-->
<template>
  <div class="base-image-loading-0">
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
.base-image-loading-0 {
  width: 50px;
  height: 50px;
  background-color: transparent;

  &:before {
    content: '';
    width: 50px;
    height: 5px;
    background: $grey-11;
    opacity: 0.1;
    position: absolute;
    top: 59px;
    left: 0;
    border-radius: 50%;
    animation: shadow 0.5s linear infinite;
  }

  &:after {
    content: '';
    width: 50px;
    height: 50px;
    background: $green-0;
    animation: animate 0.5s linear infinite;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
  }
  @keyframes animate {
    17% {
      border-bottom-right-radius: 3px;
    }
    25% {
      transform: translateY(9px) rotate(22.5deg);
    }
    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 40px;
    }
    75% {
      transform: translateY(9px) rotate(67.5deg);
    }
    100% {
      transform: translateY(0) rotate(90deg);
    }
  }
  @keyframes shadow {
    0%,
    100% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.2, 1);
    }
  }
}
</style>
