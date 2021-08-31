<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:57:31
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-31 13:49:11
-->
<template>
  <div class="user-center-profile-edit">
    <user-center-profile-edit-avatar></user-center-profile-edit-avatar>
    <user-center-profile-edit-information></user-center-profile-edit-information>
    <user-center-profile-edit-job></user-center-profile-edit-job>
    <user-center-profile-edit-interest></user-center-profile-edit-interest>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserCenterProfileEditAvatar from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditAvatar.vue';
import UserCenterProfileEditInformation from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditInformation';
import UserCenterProfileEditJob from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditJob';
import UserCenterProfileEditInterest from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditInterest';

export default defineComponent({
  name: 'UserCenterProfileEdit',
  components: {
    UserCenterProfileEditAvatar,
    UserCenterProfileEditJob,
    UserCenterProfileEditInformation,
    UserCenterProfileEditInterest,
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
