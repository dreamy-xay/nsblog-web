<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:57:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-31 10:37:10
-->
<template>
  <div class="user-center-profile-edit">
    <user-center-profile-edit-avatar></user-center-profile-edit-avatar>
    <user-center-profile-edit-information></user-center-profile-edit-information>
    <user-center-profile-edit-job></user-center-profile-edit-job>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserCenterProfileEditAvatar from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditAvatar.vue';
import UserCenterProfileEditJob from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditJob.vue';
import UserCenterProfileEditInformation from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditInformation.vue';

export default defineComponent({
  name: 'UserCenterProfileEdit',
  components: {
    UserCenterProfileEditAvatar,
    UserCenterProfileEditJob,
    UserCenterProfileEditInformation,
  },
  setup(props, context) {
    return {};
  },
});
</script>

<style lang='scss' scoped>
.user-center-profile-edit {
  width: 926px;
  @include flex(initial, initial, column);
}
</style>
