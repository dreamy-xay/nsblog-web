<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:57:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-02 19:57:02
-->
<template>
  <div class="user-center-profile-edit">
    <user-center-profile-edit-avatar
      @uploadAvatar="uploadAvatar"
      @updateSignature="updateSignature"
    />
    <user-center-profile-edit-information />
    <user-center-profile-edit-job />
    <user-center-profile-edit-interest />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserCenterProfileEditAvatar from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditAvatar.vue';
import UserCenterProfileEditInformation from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditInformation.vue';
import UserCenterProfileEditJob from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditJob.vue';
import UserCenterProfileEditInterest from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditInterest.vue';
import { base64ToFile } from '@/util/util';

export default defineComponent({
  name: 'UserCenterProfileEdit',
  components: {
    UserCenterProfileEditAvatar,
    UserCenterProfileEditJob,
    UserCenterProfileEditInformation,
    UserCenterProfileEditInterest,
  },
  setup() {
    /**
     * @description: 上传新头像
     * @param {string} image base64字符串 `必传参数`
     * @param {() => void} success 请求成功执行函数 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function uploadAvatar(image, success) {
      // TODO:
      // request upload： base64ToFile(image, 'avatar');
      console.log(base64ToFile(image, 'avatar'));

      // TODO:
      // requset success(then)： success();
      success();
    }

    /**
     * @description: 更新个性签名
     * @param {string} signature 新个性签名 `必传参数`
     * @param {() => void} error 请求失败执行函数 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function updateSignature(signature, error) {
      // TODO:
      // request update： signature
      console.log(signature);

      // TODO:
      // requset error(catch)： error();
      error();
    }

    return {
      uploadAvatar,
      updateSignature,
    };
  },
});
</script>

<style lang='scss' scoped>
.user-center-profile-edit {
  width: 926px;
  @include flex(initial, initial, column);
}
</style>
