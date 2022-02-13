<!--
 * @Description: 基础内容加载框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-16 16:27:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-13 19:36:48
-->
<template>
  <div
    class="base-content-loading"
    :style="style"
  >
    <n-skeleton
      v-for="(width, index) in line"
      :key="index"
      :style="{width, marginBottom: index !== line.length - 1 ? `${space}px` : 0, ...skeletonStyle}"
      :size="skeletonSize"
      :sharp="false"
      :text="type === 'text'"
      :round="type === 'round'"
      :circle="type === 'circle'"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 基础内容加载框
 * @param {Array} line 骨架条设置数组，[number(百分比宽度，width，也可以设置 px)] `默认为 ['40%', '100%', '80%', '60%']`
 * @param {String} type 骨架条类型，有['text', 'round', 'circle']三选一 `默认为text`
 * @param {Object} style 组件样式 `默认为 {}`
 * @param {Number} space 间距 `默认为10`
 * @param {Object} skeletonStyle 骨架条样式 `默认为 {}`
 * @param {Number} skeletonSize 股价条大小 `默认为 undefined`
 * @author: dreamy-xay
 */
export default defineComponent({
  name: 'baseContentLoading',
  props: {
    line: {
      type: Array,
      default: () => ['40%', '100%', '80%', '60%'],
    },
    type: {
      type: String,
      default: 'text',
    },
    style: {
      type: Object,
      default: () => ({}),
    },
    space: {
      type: Number,
      default: 10,
    },
    skeletonStyle: {
      type: Object,
      default: () => ({}),
    },
    skeletonSize: {
      type: Number,
      default: undefined,
    },
  },
});
</script>

<style lang="scss" scoped>
.base-content-loading {
  background-color: $grey-0;
  width: 100%;
}
</style>
