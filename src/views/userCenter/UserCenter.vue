<!--
 * @Description: 个人中心外框
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-18 21:26:17
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-24 21:30:28
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    bind-class="user-center"
  >
    <div class="user-center-center">
      <div class="center-left">
        <user-center-menu></user-center-menu>
      </div>
      <div class="center-right">
        <router-view />
      </div>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BaseView from '@/components/content/baseView/BaseView.vue';
import UserCenterMenu from '@/views/userCenter/childComps/UserCenterMenu';

/**
 * @description:
 * @param {*}
 * @return {*}
 * @author: Ban
 */
export default defineComponent({
  name: 'UserCenter',
  components: {
    BaseView,
    UserCenterMenu,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.user-center {
  .user-center-center {
    width: 1142px;
    display: flex;

    .center-left {
      width: 200px;
    }

    .center-right {
      margin-left: 16px;
      margin-top: 16px;
    }
  }
}
</style>
