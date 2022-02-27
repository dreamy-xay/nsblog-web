<!--
 * @Description: 后台管理页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-21 20:02:51
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-27 14:49:05
-->
<template>
  <n-loading-bar-provider :loading-bar-style="{loading: {backgroundColor: styles.blue1}}">
    <div class="admin">
      <admin-menu :routes="routes" />
      <router-view />
    </div>
  </n-loading-bar-provider>
</template>

<script>
import { defineComponent } from 'vue';
import AdminMenu from '@/views/admin/childComps/adminMenu/AdminMenu.vue';
import store from '@/store';
import styles from '@/assets/style/define.scss';
import { getMenuRoutes } from '@/util/router';

/**
 * @description: 后台管理页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'admin',
  components: {
    AdminMenu,
  },
  beforeRouteEnter(_, __, next) {
    if (store.getters['global/isLogin']) next();
    else next({ name: 'signIn' });
  },
  setup() {
    const routes = getMenuRoutes(); // 获取所有路由菜单列表
    return {
      styles,
      routes,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
