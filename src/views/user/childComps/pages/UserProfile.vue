<!--
 * @Description: 用户主页个人简介
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-11 19:40:37
-->
<template>
  <div class="user-profile">
    <v-md-preview :text="text" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

import { getProfile } from '@/network/api/user';

import { useRoute } from 'vue-router';

/**
 * @description: 用户主页个人简介
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userProfile',
  setup() {
    const route = useRoute(); // route
    const username = route.params.username;
    const text = ref('');
    getProfile(username).then((data) => {
      text.value = data.profile;
    });
    return {
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
