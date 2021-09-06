<!--
 * @Description: 个人中心页面
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-18 21:26:17
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-06 23:05:18
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    bind-class="user-center"
  >
    <div class="user-center-left">
      <user-center-menu :username="tokenInfo.username" />
    </div>
    <div class="user-center-right">
      <router-view v-slot="{ Component }">
        <!-- 将页面数据缓存 -->
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import UserCenterMenu from '@/views/userCenter/childComps/UserCenterMenu.vue';
import router from '@/router';
import store from '@/store';
import { mapState } from '@/util/store';

/**
 * @description: 个人中心页面
 * @author: Ban
 */

export default defineComponent({
  name: 'UserCenter',
  components: {
    BaseView,
    UserCenterMenu,
  },
  beforeRouteEnter(_, __, next) {
    if (store.getters['global/isLogin']) next();
    else next({ name: 'signIn' });
  },
  setup() {
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    //监听登录状态
    watch(
      () => tokenInfo.value.status,
      (value) => {
        if (!value) router.push('/');
      }
    );

    return {
      tokenInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.user-center) {
  @include flex(initial, space-between);

  & > div {
    display: inline-block;
    margin-top: 16px;
  }

  .user-center-left {
    width: 200px;
  }

  .user-center-right {
    width: 926px;
    margin-bottom: 16px;
  }
}
</style>
