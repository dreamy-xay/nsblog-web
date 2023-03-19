<!--
 * @Description: 后台管理页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-21 20:02:51
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-19 14:33:12
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
      <admin-menu
        :is-super="userData.is_super"
        v-show="!zoom"
      />
      <div
        class="admin-content"
        :class="{'admin-content-zoom': zoom}"
        :style="{width: viewWidth}"
      >
        <admin-head
          :user-data="userData"
          :show-navigation="!zoom"
          @tagsChange="cachedRouteChanage"
          @zoomToggle="zoomToggle"
        />
        <div
          class="admin-body"
          :style="{height: `calc(100% - ${pageHeadHeight}px)`}"
        >
          <el-scrollbar>
            <base-router-view
              :cached-route-names="cachedRouteNames"
              :routes="adminRoutes"
            />
          </el-scrollbar>
        </div>
      </div>
    </div>
  </n-loading-bar-provider>
</template>

<script>
import { computed, defineComponent, nextTick, provide, reactive, ref } from 'vue';
import BaseLoadingPage from '@/components/common/baseLoadingPage/BaseLoadingPage.vue';
import BaseRouterView from '@/components/content/baseRouterView/BaseRouterView.vue';
import AdminMenu from '@/views/admin/childComps/adminMenu/AdminMenu.vue';
import AdminHead from '@/views/admin/childComps/adminHead/AdminHead.vue';
import store from '@/store';
import styles from '@/assets/style/define.scss';
import events from '@/events';
import { getUserInfo } from '@/network/api/user';
import { useMessage } from 'naive-ui';
import { mapState } from '@/util/store';
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
    BaseRouterView,
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
    const viewWidth = ref(''); // 除了菜单外视图宽度
    const zoom = ref(false); // 页面放大缩小模式
    const cachedRouteNames = reactive({}); // 已经缓存的路由名称列表
    const loading = ref(true); // 是否显示加载状态
    const userData = reactive({
      username: '',
      nickname: '',
      avatar: '',
      is_super: false,
    }); // 用户数据

    const { tokenInfo, adminRoutes } = mapState('global', ['tokenInfo', 'adminRoutes']); // 获取tokenInfo 和 adminRoutes

    /**
     * @description: 初始化执行函数
     * @author: dreamy-xay
     */
    function init() {
      //获取后台基本用户数据
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

      /**
       * @description: 平铺路由
       * @param {RouteInfo[]} routes 路由列表 `必传参数`
       * @return {string[]} 返回平铺路由名称
       * @author: dreamy-xay
       */
      function tileRoute(routes) {
        const nameList = [];
        for (const route of routes) {
          nameList.push(route.name);
          nameList.push(...tileRoute(route.children));
        }
        return nameList;
      }

      // 初始化 cachedRouteNames
      for (const name of tileRoute(adminRoutes.value)) cachedRouteNames[name] = false;
    }
    // 初始化执行
    init();

    // 监听子菜单显示状态
    events.on('AdminSubMenu-subMenuChange', (showLength, show) => {
      viewWidth.value = show && showLength ? 'calc(100% - 266px)' : 'calc(100% - 64px)';
    });

    /**
     * @description: 缓存路由发生改变
     * @param {string} routeName 路由名称 `必传参数`
     * @param {boolean} isAdd 是否加入缓存 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function cachedRouteChanage(routeName, isAdd) {
      cachedRouteNames[routeName] = isAdd;
    }

    /**
     * @description: 触发页面的放大缩小
     * @param {boolean} zoomIn 是否放大 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function zoomToggle(zoomIn) {
      zoom.value = zoomIn;
    }

    /**
     * @description: router重新加载方法
     * @param {string} routeName 重新加载的路由名称 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function reload(routeName) {
      msg.destroyAll();
      cachedRouteNames[routeName] = false; // 先关闭
      nextTick(() => {
        cachedRouteNames[routeName] = true; // 在打开
      });
      msg.info('Shift + R 刷新子页面', { closable: false });
    }
    // 方法向下映射
    provide('reload', reload);

    // 计算子页面头部可视范围的高度
    const pageHeadHeight = computed(() => {
      return zoom.value ? 50 : 110;
    });
    // 方法向下映射
    provide('pageHeadHeight', pageHeadHeight);

    return {
      styles,
      viewWidth,
      zoom,
      userData,
      cachedRouteNames,
      loading,
      adminRoutes,
      zoomToggle,
      cachedRouteChanage,
      pageHeadHeight,
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

    &.admin-content-zoom {
      width: 100vw !important;
      height: 100vh;
      transition: none;
    }

    .admin-body {
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>
