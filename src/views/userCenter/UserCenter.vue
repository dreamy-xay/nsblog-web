<!--
 * @Description: 个人中心页面
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-18 21:26:17
<<<<<<< HEAD
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-26 21:45:48
=======
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-26 22:31:44
>>>>>>> f38c6ba96db5c518d13ee462c04782c6f20b97e9

-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    bind-class="user-center"
  >
<<<<<<< HEAD
    <div class="user-center-center">
      <div class="center-left">
        <user-center-menu></user-center-menu>
      </div>
      <div class="center-right">
        <router-view> </router-view>
      </div>
=======
    <div class="user-center-left">
      <user-center-menu :username="tokenInfo.username"></user-center-menu>
    </div>
    <div class="user-center-right">
      <router-view :scrollTop="scrollTop" />
>>>>>>> f38c6ba96db5c518d13ee462c04782c6f20b97e9
    </div>
  </base-view>
</template>

<script>
<<<<<<< HEAD
import { defineComponent } from 'vue';
=======
import { defineComponent, ref, watch } from 'vue';
>>>>>>> f38c6ba96db5c518d13ee462c04782c6f20b97e9
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
  beforeRouteEnter(_, __, next) {
    if (store.getters['global/isLogin']) next();
    else next({ name: 'signIn' });
  },
  components: {
    BaseView,
    UserCenterMenu,
  },
  setup() {
<<<<<<< HEAD
    return {};
=======
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const scrollTop = ref(0); // 垂直滚动

    /**
     * @description: 滚动监听
     * @param {any} e 滚动事件参数 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function getScroll(e) {
      scrollTop.value = e.scrollTop;
    }

    //监听登录状态
    watch(
      () => tokenInfo.value.status,
      (value) => {
        if (!value) router.push('/');
      }
    );

    return {
      tokenInfo,
      scrollTop,
      getScroll,
    };
>>>>>>> f38c6ba96db5c518d13ee462c04782c6f20b97e9
  },
});
</script>

<style lang="scss" scoped>
:deep(.user-center) {
  @include flex(initial, space-between);

  & > div {
    display: inline-block; // 触发bfc
    margin-top: 16px;
  }

  .center-left {
    width: 200px;
  }

  .center-right {
    width: 926px;
  }
}
</style>
