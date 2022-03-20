<!--
 * @Description: 后台管理页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-21 20:02:51
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-03-20 14:43:08
-->
<template>
  <n-loading-bar-provider :loading-bar-style="{loading: {backgroundColor: styles.blue1}}">
    <div class="admin">
      <admin-menu :routes="routes" />
      <div
        class="admin-view"
        :style="{width: viewWidth}"
      >
        <admin-head :routes-menu="routes" />
        <router-view v-if="isRouterAlive" />
      </div>
    </div>
  </n-loading-bar-provider>
</template>

<script>
import { defineComponent, nextTick, provide, ref } from 'vue';
import AdminMenu from '@/views/admin/childComps/adminMenu/AdminMenu.vue';
import AdminHead from '@/views/admin/childComps/adminHead/AdminHead.vue';
import store from '@/store';
import styles from '@/assets/style/define.scss';
import { getMenuRoutes } from '@/util/router';
import events from '@/events';

/**
 * @description: 后台管理页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'admin',
  components: {
    AdminMenu,
    AdminHead,
  },
  beforeRouteEnter(_, __, next) {
    if (store.getters['global/isLogin']) next();
    else next({ name: 'signIn' });
  },
  setup() {
    const routes = getMenuRoutes(); // 获取所有路由菜单列表
    const viewWidth = ref('');

    // 监听子菜单显示状态
    events.on('AdmiSubMenu-subMenuChange', (showLength, show) => {
      viewWidth.value = show && showLength ? 'calc(100% - 266px)' : 'calc(100% - 64px)';
    });

    const isRouterAlive = ref(true); // router刷新控制变量

    /**
     * @description: router重新加载方法
     * @return {void}
     * @author: Z_Y_C
     */
    function reload() {
      isRouterAlive.value = false; //先关闭，
      nextTick(() => {
        isRouterAlive.value = true; //再打开
      });
    }
    // 方法向下映射
    provide('reload', reload);

    return {
      styles,
      routes,
      viewWidth,
      isRouterAlive,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include flex(center, center, space-between);

  .admin-view {
    height: 100%;
    overflow: hidden;
    transition: 0.25s ease-in;
  }
}
</style>
