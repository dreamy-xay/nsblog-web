<!--
 * @Description: 博客或文章加载页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-29 16:55:47
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-10-02 10:10:50
-->
<template>
  <div
    class="base-loading-page"
    :style="{opacity: Number(show), pointerEvents: show ? null : 'none'}"
  >
    <div
      class="base-loading-page-loading"
      :style="{transform: `scale(${scale})`}"
    >
      <div class="border out"></div>
      <div class="border in"></div>
      <div class="border mid"></div>
      <div class="circle">
        <span
          class="dot"
          v-for="index of 12"
          :key="index"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';

/**
 * @description: 博客或文章加载页面
 * @param {Boolean} show 文章是否显示 `必传参数`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseLoadingPage',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const scale = ref(1); // scale

    // dom渲染完成
    onMounted(() => {
      scale.value = (Math.min(document.body.offsetHeight, document.body.offsetWidth) * 0.2) / 200;
    });

    return {
      scale,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-loading-page {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999999999999;
  background-color: $grey-0;
  @include flex(center, center);
  opacity: 1;
  transition: 0.25s;

  .base-loading-page-loading {
    position: relative;
    width: 200px;
    height: 200px;
    perspective: 800px;
    transform-style: preserve-3d;
    transition: all 0.2s ease-out;

    .circle {
      width: 100%;
      height: 100%;
      animation: spin 5s linear infinite;

      .dot {
        position: absolute;
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: $green-0;
        animation: jitter 5s ease-in-out infinite, fade-in-out 5s linear infinite;

        &:nth-child(1) {
          top: 90px;
          left: 180px;
          animation-delay: 0s;
        }

        &:nth-child(2) {
          top: 135px;
          left: 168px;
          animation-delay: 0.41667s;
        }

        &:nth-child(3) {
          top: 168px;
          left: 135px;
          animation-delay: 0.83333s;
        }

        &:nth-child(4) {
          top: 180px;
          left: 90px;
          animation-delay: 1.25s;
        }

        &:nth-child(5) {
          top: 168px;
          left: 45px;
          animation-delay: 1.66667s;
        }

        &:nth-child(6) {
          top: 135px;
          left: 12px;
          animation-delay: 2.08333s;
        }

        &:nth-child(7) {
          top: 90px;
          left: 0px;
          animation-delay: 2.5s;
        }

        &:nth-child(8) {
          top: 45px;
          left: 12px;
          animation-delay: 2.91667s;
        }

        &:nth-child(9) {
          top: 12px;
          left: 45px;
          animation-delay: 3.33333s;
        }

        &:nth-child(10) {
          top: 0px;
          left: 90px;
          animation-delay: 3.75s;
        }

        &:nth-child(11) {
          top: 12px;
          left: 135px;
          animation-delay: 4.16667s;
        }

        &:nth-child(12) {
          top: 45px;
          left: 168px;
          animation-delay: 4.58333s;
        }
      }
    }

    .border {
      position: absolute;
      border-radius: 50%;
      border: 3px solid $green-0;
    }

    .out {
      top: 15%;
      left: 15%;
      width: 70%;
      height: 70%;
      border-left-color: transparent;
      border-right-color: transparent;
      animation: spin 2s linear reverse infinite;
    }

    .in {
      top: 18%;
      left: 18%;
      width: 64%;
      height: 64%;
      border-top-color: transparent;
      border-bottom-color: transparent;
      animation: spin 2s linear infinite;
    }

    .mid {
      top: 40%;
      left: 40%;
      width: 20%;
      height: 20%;
      border-left-color: transparent;
      border-right-color: transparent;
      animation: spin 1s linear infinite;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes jitter {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(0.7, 0.7);
    }
    50% {
      transform: scale(1, 1);
    }
    75% {
      transform: scale(1.3, 1.3);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes fade-in-out {
    0% {
      opacity: 0.8;
    }
    25% {
      opacity: 0.2;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0.8;
    }
  }
}
</style>
