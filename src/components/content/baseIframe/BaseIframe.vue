<!--
 * @Description: 基础 iframe 组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-15 12:09:10
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-18 15:59:12
-->

<template>
  <iframe
    class="base-iframe"
    frameborder="0"
  >
    <slot></slot>
  </iframe>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 基础 iframe 组件 （支持直接内联属性到iframe标签上，即 v-bind="$attrs"）
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseIframe',
});
</script>

<style lang="scss" scoped>
.base-iframe {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
