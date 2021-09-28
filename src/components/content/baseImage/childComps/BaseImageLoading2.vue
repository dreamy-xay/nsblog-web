<!--
 * @Description: 基本图片加载动画，编号1
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-27 12:13:30
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-28 18:30:23
-->
<template>
  <div
    class="base-image-loading-2"
    :style="{transform: `scale(${_scale_})`}"
  >
    <ul>
      <li
        v-for="index of 9"
        :key="index"
      ></li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';

/**
 * @description: 基本图片加载动画，编号2
 * @param {Number} scale 加载动画相对图片高度缩放比例 `必传参数`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseImageLoading2',
  props: {
    scale: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const _scale_ = ref(1); // 缩放比例

    // 以高度 0.5 被缩放
    onMounted(() => {
      const el = getCurrentInstance().vnode.el;
      _scale_.value = (el.parentElement.offsetHeight * props.scale) / el.offsetHeight;
    });

    return {
      _scale_,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-image-loading-2 {
  list-style: none;
  @include flex(center, center);

  ul {
    height: 220px;
    transform: translateY(75px);
    @include flex();

    li {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      margin-right: 10px;

      &:nth-child(1) {
        background-color: $red-0;
        animation: love1 1.5s infinite;
      }

      &:nth-child(2) {
        background-color: $orange-0;
        animation: love2 1.5s infinite;
        animation-delay: 0.1s;
      }

      &:nth-child(3) {
        background-color: $yellow-0;
        animation: love3 1.5s infinite;
        animation-delay: 0.2s;
      }

      &:nth-child(4) {
        background-color: $green-0;
        animation: love4 1.5s infinite;
        animation-delay: 0.3s;
      }

      &:nth-child(5) {
        background-color: $blue-0;
        animation: love5 1.5s infinite;
        animation-delay: 0.4s;
      }

      &:nth-child(6) {
        background-color: $red-1;
        animation: love4 1.5s infinite;
        animation-delay: 0.5s;
      }

      &:nth-child(7) {
        background-color: $purple-0;
        animation: love3 1.5s infinite;
        animation-delay: 0.6s;
      }

      &:nth-child(8) {
        background-color: $pink-0;
        animation: love2 1.5s infinite;
        animation-delay: 0.7s;
      }

      &:nth-child(9) {
        background-color: $green-0;
        animation: love1 1.5s infinite;
        animation-delay: 0.8s;
      }

      @keyframes love1 {
        30%,
        50% {
          height: 60px;
          transform: translateY(-30px);
        }

        75%,
        100% {
          height: 20px;
          transform: translateY(0);
        }
      }

      @keyframes love2 {
        30%,
        50% {
          height: 125px;
          transform: translateY(-62.5px);
        }

        75%,
        100% {
          height: 20px;
          transform: translateY(0);
        }
      }

      @keyframes love3 {
        30%,
        50% {
          height: 160px;
          transform: translateY(-75px);
        }

        75%,
        100% {
          height: 20px;
          transform: translateY(0);
        }
      }

      @keyframes love4 {
        30%,
        50% {
          height: 180px;
          transform: translateY(-60px);
        }

        75%,
        100% {
          height: 20px;
          transform: translateY(0);
        }
      }

      @keyframes love5 {
        30%,
        50% {
          height: 190px;
          transform: translateY(-45px);
        }

        75%,
        100% {
          height: 20px;
          transform: translateY(0);
        }
      }
    }
  }
}
</style>
