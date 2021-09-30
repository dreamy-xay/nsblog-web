<!--
 * @Description: 基本图片加载动画，编号1
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-27 12:13:30
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-28 20:17:47
-->
<template>
  <div
    class="base-image-loading-1"
    :style="{transform: `scale(${thisScale})`}"
  >
    <div
      class='base-image-loading-1-dot'
      v-for="index of 6"
      :key="index"
    ></div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';

/**
 * @description: 基本图片加载动画，编号1
 * @param {Number} scale 加载动画相对图片高度缩放比例 `必传参数`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseImageLoading1',
  props: {
    scale: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const thisScale = ref(1); // 缩放比例

    // 以高度 0.5 被缩放
    onMounted(() => {
      const el = getCurrentInstance().vnode.el;
      thisScale.value = (el.parentElement.offsetHeight * props.scale) / el.offsetHeight;
    });

    return {
      thisScale,
    };
  },
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
      background-color: $green-0;
      animation-delay: 0.5s;
    }

    &:nth-child(2) {
      background-color: $purple-0;
      animation-delay: 0.4s;
    }

    &:nth-child(3) {
      background-color: $red-1;
      animation-delay: 0.3s;
    }

    &:nth-child(4) {
      background-color: $orange-1;
      animation-delay: 0.2s;
    }

    &:nth-child(5) {
      background-color: $blue-0;
      animation-delay: 0.1s;
    }

    &:nth-child(6) {
      background-color: $yellow-0;
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
