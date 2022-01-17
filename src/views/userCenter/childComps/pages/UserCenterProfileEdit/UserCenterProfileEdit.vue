<!--
 * @Description: 个人中心-个人资料
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:57:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-17 23:24:56
-->
<template>
  <div class="user-center-profile-edit">
    <user-center-profile-edit-avatar
      :data="avatarData"
      @uploadAvatar="uploadAvatar"
      @updateSignature="updateSignature"
    />
    <user-center-profile-edit-information
      :data="informationData"
      @changeInformation="changeInformation"
    />
    <user-center-profile-edit-job
      :data="jobData"
      @changeJob="changeJob"
    />
    <user-center-profile-edit-interest
      :selected-tags="tagsData.tags"
      @deleteTag="deleteTag"
      @addTag="addTag"
      @updateTags="updateTags"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import UserCenterProfileEditAvatar from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditAvatar.vue';
import UserCenterProfileEditInformation from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditInformation.vue';
import UserCenterProfileEditJob from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditJob.vue';
import UserCenterProfileEditInterest from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/UserCenterProfileEditInterest.vue';
import { base64ToFile } from '@/util/util';
import { getUserInfo, putUserInfo, modifySignature } from '@/network/api/user';
import { mapState } from '@/util/store';
import { useMessage } from 'naive-ui';
import events from '@/events';

export default defineComponent({
  name: 'UserCenterProfileEdit',
  components: {
    UserCenterProfileEditAvatar,
    UserCenterProfileEditJob,
    UserCenterProfileEditInformation,
    UserCenterProfileEditInterest,
  },
  setup() {
    const msg = useMessage(); // naive-ui message
    const userData = reactive({
      //个人信息
      username: null,
      nickname: null,
      avatar: null,
      email: null,
      profession: null,
      birthday: null,
      gender: null,
      address: ',,',
      city: ',,',
      signature: null,
      profile: null,
      tags: null,
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
        userData.tags = data.tags;
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取消息失败', { duration: 2000, closable: true });
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

    // 兴趣标签
    const tagsData = computed(() => {
      return {
        username: userData.username,
        tags: userData.tags,
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

      // TODO:
      // requset success(then)： success();
      success();
      userData.avatar = image;
      events.emit('gobal-updateAvatar', image);
      msg.success('修改成功', { duration: 2000, closable: true });
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
      modifySignature(signature)
        .then(() => {
          userData.signature = signature;
          msg.success('修改成功', { duration: 2000, closable: true });
        })
        .catch((err) => {
          console.log(err);
          error();
          msg.error('修改个性签名失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description:更改基本信息
     * @param {Object} data 修改后信息 `必传参数`
     * @author: Z_Y_C
     */

    function changeInformation(data) {
      putUserInfo(data)
        .then(() => {
          userData.nickname = data.nickname;
          userData.gender = data.gender;
          userData.city = data.city;
          userData.birthday = data.birthday;
          userData.profile = data.profile;
          msg.success('修改成功', { duration: 2000, closable: true });
        })
        .catch((error) => {
          console.log(error);
          msg.error('修改基本信息失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description:更改职业信息
     * @param {Object} data 修改后信息 `必传参数`
     * @author: Z_Y_C
     */

    function changeJob(data) {
      putUserInfo(data)
        .then(() => {
          userData.profession = data.profile;
          userData.address = data.address;
          msg.success('修改成功', { duration: 2000, closable: true });
        })
        .catch((error) => {
          console.log(error);
          msg.error('修改基本信息失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 删除兴趣标签
     * @param {number} index 标签索引 `必传参数`
     * @author: Ban
     */
    function deleteTag(index) {
      userData.tags.splice(index, 1);
    }

    /**
     * @description: 添加兴趣标签
     * @param {number} index 标签索引 `必传参数`
     * @author: Ban
     */
    function addTag(tag) {
      userData.tags.splice(userData.tags.length, 0, tag);
    }

    /**
     * @description: 更改兴趣标签信息
     * @return {void}
     * @author: dreamy-xay
     */
    function updateTags() {
      putUserInfo(tagsData)
        .then(() => {
          msg.success('修改成功', { duration: 2000, closable: true });
        })
        .catch((error) => {
          console.log(error);
          msg.error('修改兴趣标签失败', { duration: 2000, closable: true });
        });
    }

    return {
      uploadAvatar,
      updateSignature,

      avatarData,
      informationData,
      userData,
      jobData,
      tagsData,

      changeInformation,
      changeJob,

      deleteTag,
      addTag,
      updateTags,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-center-profile-edit {
  width: 926px;
  @include flex(initial, initial, column);
}
</style>
