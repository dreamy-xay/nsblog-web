<!--
 * @Description: 背景墙组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 18:57:55
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-16 17:54:16
-->
<template>
  <div class="base-background" :style="{ background: `url('${prefix.resource}/background.png')`}">
    <div
      class="base-background-mask"
      v-if="mask"
    ></div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue';

/**
 * @description: 背景墙组件
 * @param {Boolean} mask 是否开启mask黑度蒙版 `默认开启`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseBackground',
  props: {
    mask: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const prefix = inject("prefix");

    return {
      prefix
    }
  }
});
</script>

<style lang="scss" scoped>
.base-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -99999;

  .base-background-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.01);
  }
}
</style>
