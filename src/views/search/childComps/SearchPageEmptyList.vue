<!--
 * @Description: 列表为空
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-24 11:04:58
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-24 12:26:35
-->
<template>
  <div
    v-if="show"
    :class="bindClass == '' ? 'search-page-empty-list' : bindClass"
  >
    <slot>列表为空</slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 列表为空
 * @param {Boolean} show  是否显示  `默认为true`
 * @param {String} bindClass 绑定样式 `默认''`
 * @slot 全局插槽
 * @author: Ban
 */

export default defineComponent({
  name: 'SearchPageEmptyList',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    bindClass: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.search-page-empty-list {
  @include flex(center, center);
  width: 100%;
  height: 100px;
  background: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
}
</style>
