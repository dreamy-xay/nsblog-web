<!--
 * @Description: 用户主页个人简介
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-14 10:44:31
-->
<template>
  <div
    class="user-profile"
    v-if="privacySetting.view_profile"
  >
    <v-md-preview :text="text" />
  </div>
  <div v-else>
    <user-empty />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

import { getProfile } from '@/network/api/user';

import { useRoute } from 'vue-router';

import { mapState } from '@/util/store';
import UserEmpty from '@/views/user/childComps/UserEmpty.vue';

/**
 * @description: 用户主页个人简介
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userProfile',
  components: {
    UserEmpty,
  },
  setup() {
    const route = useRoute(); // route
    const username = route.params.username;
    const text = ref('');
    getProfile(username).then((data) => {
      text.value = data.profile;
    });
    return {
      ...mapState('user', ['privacySetting']),
      text,
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
}
</style>
