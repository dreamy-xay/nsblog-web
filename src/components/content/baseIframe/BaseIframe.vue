<!--
 * @Description: 基础 iframe 组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-15 12:09:10
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-15 16:35:37
-->

<template>
  <iframe
    class="base-iframe"
    frameborder="0"
    :src="src"
    :srcdoc="html"
    @load="load"
  >
    <slot></slot>
  </iframe>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 基础 iframe 组件 （支持直接内联属性到iframe标签上，即 v-bind="$attrs"）
 * @param {String} src 内联网页的路径链接
 * @param {String} html iframe不使用 src，直接写入原生html字符串 `默认为null`
 * @slot 全局插槽内嵌
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseIframe',
  props: {
    src: {
      type: String,
      default: null,
    },
    html: {
      type: String,
      default: null,
    },
  },
  setup(_, context) {
    /**
     * @description: iframe 加载完成
     * @param {any} event 事件参数
     * @return {void}
     * @author: dreamy-xay
     */
    function load(event) {
      context.emit('load', event);
    }

    return {
      load,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-iframe {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
