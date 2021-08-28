<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:57:31
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-28 23:23:25
-->
<template>
  <user-center-profile-edit-information></user-center-profile-edit-information>
  <user-center-profile-edit-job></user-center-profile-edit-job>
</template>

<script>
import { defineComponent } from 'vue';
import userCenterProfileEditJob from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/userCenterProfileEditJob.vue';
import userCenterProfileEditInformation from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/userCenterProfileEditInformation.vue';

export default defineComponent({
  name: 'UserCenterProfileEdit',
  components: {
    userCenterProfileEditJob,
    userCenterProfileEditInformation,
  },
  setup(props, context) {
    return {};
  },
});
</script>

<style lang='scss' scoped>
</style>
