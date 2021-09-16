<!--
 * @Description: 用户主页问答记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-15 20:46:41
-->
<template>
  <div
    class="user-question"
    v-if="privacySetting.view_ask"
  >

  </div>

  <user-null
    v-else
    :select="privacySetting.view_ask"
  />

</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from '@/util/store';
import UserNull from '@/views/user/childComps/UserNull.vue';

/**
 * @description: 用户主页问答记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userQuestion',
  components: {
    UserNull,
  },
  setup() {
    return { ...mapState('user', ['privacySetting']) };
  },
});
</script>

<style lang="scss" scoped>
.user-question {
  width: 100%;
}
</style>
