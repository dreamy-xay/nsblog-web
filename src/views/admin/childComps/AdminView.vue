<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-04 16:36:54
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-13 17:27:14
-->
<template>
  <transition
    appear
    name="fade-slide"
    mode="out-in"
  >
    <div
      class="admin-view"
      v-show="show"
      v-naive-ui-loading-bar="loadingBar"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useLoadingBar } from 'naive-ui';
import { useRoute } from 'vue-router';

/**
 * @description: 后台管理不同项视图
 * @slot 全局内容插槽
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminView',
  setup() {
    const loadingBar = useLoadingBar(); // naive-ui loadingBar
    const route = useRoute(); // route
    const thisComponentRouteName = route.name; // 记录当前组件路由名称
    const show = ref(Boolean(route.meta.noCache)); // 控制过渡动画显示

    /**
     * @description: 初始化过渡效果
     * @return {void}
     * @author: dreamy-xay
     */
    function viewInit() {
      const timer = setTimeout(() => {
        show.value = true;
        clearTimeout(timer);
      }, 250);
    }

    if (!route.meta.noCache) {
      // 初始化过渡
      viewInit();
      // 如果缓存了当前页面者监听
      watch(
        () => route.name,
        (name) => {
          const timer = setTimeout(() => {
            show.value = name === thisComponentRouteName;
            clearTimeout(timer);
          }, 250);
        }
      );
    }

    return {
      loadingBar,
      show,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-view {
  width: 100%;
}

.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.25s;
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
