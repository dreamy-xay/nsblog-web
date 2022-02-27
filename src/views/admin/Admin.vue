<!--
 * @Description: 后台管理页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-21 20:02:51
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-27 21:17:56
-->
<template>
  <n-loading-bar-provider :loading-bar-style="{loading: {backgroundColor: styles.blue1}}">
    <div
      class="admin"
      :style="{width:headWidth+'px'}"
    >
      <admin-menu />
      <div
        class="content"
        :style="{width:openMenu ? 'calc(100% - 64px)' : 'calc(100% - 266px)'}"
      >
        <admin-head />
      </div>

      <div
        class="router"
        :style="{width:openMenu ? 'calc(100% - 84px)' : 'calc(100% - 286px)'}"
      >
        <router-view />
      </div>
    </div>

  </n-loading-bar-provider>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue';
import AdminMenu from '@/views/admin/childComps/adminMenu/AdminMenu.vue';
import AdminHead from '@/views/admin/childComps/adminHead/AdminHead.vue';
import store from '@/store';
import styles from '@/assets/style/define.scss';
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
    const openMenu = ref(false); // 打卡目录
    const headWidth = ref(document.body.clientWidth);
    events.on('AdminNavigation-changeMenu', () => {
      openMenu.value = !openMenu.value;
    });

    window.onresize = () => {
      headWidth.value = document.body.clientWidth;
    };

    return { styles, openMenu, headWidth };
  },
});
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  // @include flex();
  .content {
    // @include flex(initial, initial, column);
    transition: 0.4s;

    position: absolute;
    top: 0px;
    right: 0px;

    // width: 100%;
  }

  .router {
    position: absolute;
    transition: 0.4s;
    top: 120px;
    right: 10px;
    width: 100%;
  }
}
</style>
