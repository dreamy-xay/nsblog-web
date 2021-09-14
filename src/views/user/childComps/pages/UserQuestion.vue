<!--
 * @Description: 用户主页问答记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-14 10:47:18
-->
<template>
  <div
    class="user-question"
    v-if="privacySetting.view_ask"
  >

  </div>

  <div v-else>
    <user-empty />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from '@/util/store';
import UserEmpty from '@/views/user/childComps/UserEmpty.vue';

/**
 * @description: 用户主页问答记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userQuestion',
  components: {
    UserEmpty,
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
