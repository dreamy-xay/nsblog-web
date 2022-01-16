<!--
 * @Description: 基础内容加载框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-16 16:27:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-16 17:15:07
-->
<template>
  <div
    class="base-content-loading"
    :style="style"
  >
    <n-skeleton
      v-for="(width, index) in line"
      :key="index"
      :style="{width, marginBottom: index !== line.length - 1 ? '10px' : 0, ...skeletonStyle}"
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
