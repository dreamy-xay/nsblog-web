<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-04 16:36:54
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-12 17:56:30
-->
<template>
  <transition
    appear
    name="fade-slide"
  >
    <div
      class="admin-view"
      v-naive-ui-loading-bar="loadingBar"
    >
      <slot></slot>
    </div>
  </transition>
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
  opacity: 1;
  transform: translateX(0px);
}

.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
