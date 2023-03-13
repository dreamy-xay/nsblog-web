<!--
 * @Description: 后台管理页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-21 20:02:51
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-13 18:30:22
-->
<template>
  <base-loading-page
    :color="styles.blue0"
    :show="loading"
    v-if="loading"
  />
  <n-loading-bar-provider
    v-else
    :loading-bar-style="{loading: {backgroundColor: styles.blue1}}"
  >
    <div class="admin">
      <admin-menu :is-super="userData.is_super" />
      <div
        class="admin-content"
        :style="{width: viewWidth}"
      >
        <admin-head :user-data="userData" />
        <el-scrollbar
          bind-class="
          admin-body"
          max-height="calc(100% - 110px)"
        >
          <div class="admin-body">
            <router-view
              v-slot="{ Component, route }"
              v-if="isRouterAlive"
            >
              <keep-alive
                v-if="!route.meta['noCache']"
                :include="cacheAdminMenuList"
              >
                <component
                  :is="Component"
                  :key="route.fullPath"
                />
              </keep-alive>
              <component
                v-else
                :is="Component"
                :key="route.fullPath"
              />
            </router-view>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </n-loading-bar-provider>
</template>

<script>
import { defineComponent, nextTick, provide, reactive, ref } from 'vue';
import BaseLoadingPage from '@/components/common/baseLoadingPage/BaseLoadingPage.vue';
import AdminMenu from '@/views/admin/childComps/adminMenu/AdminMenu.vue';
import AdminHead from '@/views/admin/childComps/adminHead/AdminHead.vue';
import store from '@/store';
import styles from '@/assets/style/define.scss';
import events from '@/events';
import { getUserInfo } from '@/network/api/user';
import { useMessage } from 'naive-ui';
import { mapState, mapGetters } from '@/util/store';
import { useRoute } from 'vue-router';
import router from '@/router';

/**
 * @description: 后台管理页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'admin',
  components: {
    BaseLoadingPage,
    AdminMenu,
    AdminHead,
  },
  beforeRouteEnter(_, __, next) {
    if (store.getters['global/isLogin']) next();
    else next({ name: 'signIn' });
  },
  setup() {
    const route = useRoute(); // 当前路由状态
    const msg = useMessage(); // naive-ui message
    const viewWidth = ref('');
    const isRouterAlive = ref(true); // router刷新控制变量
    const loading = ref(true); // 是否显示加载状态
    const userData = reactive({
      username: '',
      nickname: '',
      avatar: '',
      is_super: true,
    }); // 用户数据

    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const { cacheAdminMenuList } = mapGetters('global', ['cacheAdminMenuList']); // 获取计算的缓存的页面
    console.log(cacheAdminMenuList.value);
    /**
     * @description: 获取后台基本用户数据
     * @author: dreamy-xay
     */
    if (tokenInfo.value.status) {
      getUserInfo(tokenInfo.value.username, 4)
        .then((data) => {
          userData.username = data.username;
          userData.nickname = data.nickname;
          userData.avatar = data.avatar;
          userData.is_super = Boolean(data.is_super);

          // 更新路由状态
          if (!userData.is_super && route.meta['super'])
            router.replace({ name: 'admin' }).then(() => {
              // 加载状态取消
              loading.value = false;
            });
          else loading.value = false; // 加载状态取消
        })
        .catch((error) => {
          console.log(error);
          msg.error('数据加载异常，请刷新页面！', { duration: 3000, closable: true });
        });
    }

    // 监听子菜单显示状态
    events.on('AdminSubMenu-subMenuChange', (showLength, show) => {
      viewWidth.value = show && showLength ? 'calc(100% - 266px)' : 'calc(100% - 64px)';
    });

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
      viewWidth,
      userData,
      isRouterAlive,
      loading,
      cacheAdminMenuList,
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

  .admin-content {
    height: 100%;
    overflow: hidden;
    background-color: $grey-2;
    transition: 0.25s;

    .admin-body {
      padding: 16px;
      height: calc(100% - 32px);
      width: calc(100% - 32px);
    }
  }
}
</style>
