<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-04 16:36:54
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-19 15:24:48
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
      v-loading="loading"
      :element-loading-svg="loadingSvg"
      :element-loading-svg-view-box="loadingSvgViewBox"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useLoadingBar } from 'naive-ui';
import { useRoute } from 'vue-router';
import { ElLoading } from 'element-plus';
import styles from '@/assets/style/define.scss';

/**
 * @description: 后台管理不同项视图
 * @emits 'AdminView-AddEventListener-KeyDown' 为iframe内部增加子页面刷新和缩放按键监听 (element: HTMLElement) => void
 * @slot 全局内容插槽
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminView',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    loadingSvg: {
      type: String,
      default: `<svg t="1679131210382" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3248" width="256" height="256"><path d="M204.8 204.8m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#EBF2FC" p-id="3249"></path><path d="M819.2 204.8m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#B5D2F3" p-id="3250"></path><path d="M819.2 819.2m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#7FB0EA" p-id="3251"></path><path d="M204.8 819.2m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#4A90E2" p-id="3252"></path></svg>`,
    },
    loadingSvgViewBox: {
      type: String,
      default: '0, 0, 256, 256',
    },
  },
  directives: {
    loading: ElLoading.directive,
  },
  setup() {
    const loadingBar = useLoadingBar(); // naive-ui loadingBar
    const route = useRoute(); // route
    const thisComponentRouteName = route.name; // 记录当前组件路由名称
    const show = ref(!route.meta['noCache']); // 控制过渡动画显示

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

    if (route.meta['noCache'])
      // 初始化过渡
      viewInit();
    else {
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
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-view {
  width: calc(100% - 32px);
  margin: 16px;
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
