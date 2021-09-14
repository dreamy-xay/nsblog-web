<!--
 * @Description: 用户主页个人简介
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-14 09:39:32
-->
<template>
  <div
    class="user-profile"
    v-if="privacySetting.view_profile"
  >
    <v-md-preview :text="text" />
  </div>
  <div v-else>
    <base-svg
      svg="no-permission"
      :color="styles.green0"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

import { getProfile } from '@/network/api/user';

import { useRoute } from 'vue-router';

import { mapState } from '@/util/store';
import BaseSvg from '@/components/content/baseSvg/BaseSvg.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 用户主页个人简介
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userProfile',
  components: {
    BaseSvg,
  },
  setup() {
    const route = useRoute(); // route
    const username = route.params.username;
    const text = ref('');
    getProfile(username).then((data) => {
      text.value = data.profile;
    });
    return {
      styles,
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
