<template>
  <div
    class="admin-view"
    v-naive-ui-loading-bar="loadingBar"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useLoadingBar } from 'naive-ui';

/**
 * @description: 后台管理不同项视图
 * @slot 全局内容插槽
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminView',
  setup() {
    const loadingBar = useLoadingBar(); // naive-ui loadingBar

    return {
      loadingBar,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-view {
  width: 100%;
  overflow-x: hidden;
}
</style>
