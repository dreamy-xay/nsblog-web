<!--
 * @Description: 用户主页个人简介
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-15 16:09:44
-->
<template>
  <div
    class="user-profile"
    v-if="(privacySetting.view_profile || isSelf) && text"
  >
    <v-md-preview
      :text="text"
      :style="style"
    />
  </div>
  <user-null
    v-else
    :select="isSelf ? true : Boolean(privacySetting.view_profile)"
  />
</template>

<script>
import { defineComponent, ref } from 'vue';

import { getProfile } from '@/network/api/user';

import { useRoute } from 'vue-router';

import { mapState } from '@/util/store';
import UserNull from '@/views/user/childComps/UserNull.vue';
import { useMessage } from 'naive-ui';

/**
 * @description: 用户主页个人简介
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userProfile',
  components: {
    UserNull,
  },
  setup() {
    const msg = useMessage(); // naive-ui
    const route = useRoute(); // route
    const username = route.params.username;
    const { tokenInfo } = mapState('global', ['tokenInfo']);
    const isSelf = username === tokenInfo.value.username;
    const text = ref('');
    getProfile(username)
      .then((data) => {
        text.value = data.profile;
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取个人简介信息失败');
      });
    return {
      ...mapState('user', ['privacySetting']),
      text,
      isSelf,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-profile {
  width: 100%;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
  @include word-break;

  :deep(.v-md-editor-preview > div) {
    padding: 16px 32px;
  }
}
</style>
