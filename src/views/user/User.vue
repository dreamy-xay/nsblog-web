<!--
 * @Description: 用户详细信息页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:04:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-07 18:14:58
-->
<template>
  <base-view
    :top-bar="true"
    :background="true"
    bind-class="user"
  >
    <div class="user-head">
      <user-header />
    </div>
    <div class="user-body">
      <user-info />
      <user-main />
    </div>
  </base-view>
</template>

<script>
import { defineComponent } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import UserHeader from '@/views/user/childComps/UserHeader.vue';
import UserInfo from '@/views/user/childComps/userInfo/UserInfo.vue';
import UserMain from '@/views/user/childComps/userMain/UserMain.vue';
import { mapState } from '@/util/store';
import { useRoute } from 'vue-router';

/**
 * @description: 用户详细信息页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'user',
  components: {
    BaseView,
    UserHeader,
    UserInfo,
    UserMain,
  },
  setup() {
    const route = useRoute(); // route
    const username = route.params.username; // 获取路由的username
    const isSelf = mapState('global', ['tokenInfo']).tokenInfo.value.username === username; // 查询当下浏览器登录username
    console.log(isSelf);
    return {};
  },
});
</script>

<style lang="scss" scoped>
.user {
  .user-head {
    width: 100%;
    @include flex();
    margin: 16px 0;
  }

  .user-body {
    width: 100%;
    @include flex(initial, space-between);
    margin-bottom: 16px;
  }
}
</style>
