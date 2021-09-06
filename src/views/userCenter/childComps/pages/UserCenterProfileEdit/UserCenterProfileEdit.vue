<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:57:31
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-06 12:22:50
-->
<template>
  <div class="user-center-profile-edit">
    <user-center-profile-edit-avatar
      :data="avatarData"
      @uploadAvatar="uploadAvatar"
      @updateSignature="updateSignature"
    />
    <user-center-profile-edit-information :data="informationData" />
    <user-center-profile-edit-job :data="jobData" />
    <user-center-profile-edit-interest />
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import UserCenterProfileEditAvatar from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditAvatar.vue';
import UserCenterProfileEditInformation from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditInformation.vue';
import UserCenterProfileEditJob from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditJob.vue';
import UserCenterProfileEditInterest from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditInterest.vue';
import { base64ToFile } from '@/util/util';
import { getUserInfo } from '@/network/api/user';
import { mapState } from '@/util/store';
import { useMessage } from 'naive-ui';

export default defineComponent({
  name: 'UserCenterProfileEdit',
  components: {
    UserCenterProfileEditAvatar,
    UserCenterProfileEditJob,
    UserCenterProfileEditInformation,
    UserCenterProfileEditInterest,
  },
  setup() {
    const msg = useMessage();
    const userData = reactive({
      //个人信息
      username: null,
      nickname: null,
      avatar: null,
      email: null,
      profession: null,
      birthday: null,
      gender: null,
      address: null,
      city: null,
      signature: null,
      profile: null,
    });

    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const username = tokenInfo.value.username; // 登录用户名

    getUserInfo(username, 0) //得到用户数据
      .then((data) => {
        userData.username = data.username;
        userData.nickname = data.nickname;
        userData.avatar = data.avatar;
        userData.profession = data.profession;
        userData.birthday = data.birthday;
        userData.gender = data.gender;
        userData.address = data.address;
        userData.city = data.city;
        userData.signature = data.signature;
        userData.profile = data.profile;
      })
      .catch((error) => {
        console.log(error), msg.error('获取消息失败，请重试', { duration: 2000, closable: true });
      });

    //头像和个性签名数据
    const avatarData = computed(() => {
      return {
        username: userData.username,
        avatar: userData.avatar,
        signature: userData.signature,
      };
    });

    //昵称，生日，性别，家乡，个人简介
    const informationData = computed(() => {
      return {
        username: userData.username,
        nickname: userData.nickname,
        gender: userData.gender,
        city: userData.city,
        birthday: userData.birthday,
        profile: userData.profile,
      };
    });

    //职业，现居地
    const jobData = computed(() => {
      return {
        username: userData.username,
        profession: userData.profession,
        address: userData.address,
      };
    });

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
      console.log(informationData);

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

      avatarData,
      informationData,
      userData,
      jobData,
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
