<!--
 * @Description: 修改头像和用户签名
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-31 10:28:07
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-06 11:20:44
-->
<template>
  <div class="user-center-profile-edit-avatar">
    <div class="user-center-profile-edit-avatar-left">
      <div class="avatar">
        <img
          :src="data.avatar"
          alt="image"
        >
      </div>
      <div class="operate">
        <div class="username">
          {{data.username}}
        </div>
        <div
          class="button"
          role="button"
          @click="avatarModalShow"
        >
          更换头像
        </div>
        <avatar-cropper
          v-model="showAvatarModal"
          :url="data.avatar"
          @upload="uploadAvatar"
        />
      </div>
    </div>
    <div class="user-center-profile-edit-avatar-right">
      <el-tooltip
        placement="top"
        content="修改个性签名"
        popper-class="user-center-profile-edit-avatar-right-signature"
      >
        <div
          class="signature"
          role="button"
          @click="editSignature"
          v-show="!isEditSignature"
        >
          {{data.signature}}
        </div>
      </el-tooltip>
      <user-center-input
        v-show="isEditSignature"
        type="text"
        v-model="inputValue"
        ref="signatureInput"
        :maxlength="255"
        @blur="updateSignature(false, true)"
        show-close
      />
      <base-modal
        :show="confirmModalShow"
        @confirm="updateSignature(true)"
        @cancel="updateSignature(false)"
        content="确认修改个性签名~ o(*￣▽￣*)o"
        confirmeText="确认修改"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, nextTick } from 'vue';

import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import AvatarCropper from '@/views/userCenter/childComps/pages/UserCenterProfileEdit/childComps/AvatarCropper.vue';

/**
 * @description: 修改头像和用户签名
 * @param {Object} data 组件数据 `必传参数`
 * @event uploadAvatar 头像上传触发事件 (image: Base64, success: () => void) => void
 * @event updateSignature 更新个性签名 (signature: string, error: () => void) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userCenterProfileEditAvatar',
  components: {
    UserCenterInput,
    BaseModal,
    AvatarCropper,
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        username: 'dreamy',
        signature: '花开本无岸，魂落忘川犹在川。醉里不知烟波浩，梦中依稀灯火寒。',
        avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=dreamy',
      }),
    },
  },
  setup(props, context) {
    const inputValue = ref(props.data.signature); // 输入内容
    const showAvatarModal = ref(false); // 显示修改头像模态框
    const isEditSignature = ref(false); // 编辑个性签名
    const confirmModalShow = ref(false); // 编辑个性签名确认框
    const signatureInput = ref(null); // signatureInput ref

    // watch 个性签名
    watch(
      () => props.data.signature,
      (value) => {
        inputValue.value = value;
      }
    );

    /**
     * @description: 编辑个性签名
     * @return {void}
     * @author: dreamy-xay
     */
    function editSignature() {
      isEditSignature.value = true;
      nextTick(() => {
        signatureInput.value.userCenterInput.focus();
      });
    }

    /**
     * @description: 更新个性签名
     * @param {boolean} isConfirm 是否处于确认状态 `必传参数`
     * @param {boolean} isConfirmModalShow 确认框是否显示 `默认为false`
     * @return {void}
     * @author: dreamy-xay
     */
    function updateSignature(isConfirm, isConfirmModalShow = false) {
      if (isConfirm) {
        if (inputValue.value !== props.data.signature)
          context.emit('updateSignature', inputValue.value, () => {
            inputValue.value = props.data.signature;
          });
      }
      confirmModalShow.value = isConfirmModalShow;
      if (!isConfirmModalShow) {
        isEditSignature.value = false;
        if (!isConfirm) inputValue.value = props.data.signature;
      }
    }

    /**
     * @description: 头像上传
     * @param {string} image 头像文件数据 `必传参数`
     * @param {() => void} next 下一步函数操作 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function uploadAvatar(image, next) {
      context.emit('uploadAvatar', image, next);
    }

    /**
     * @description: 裁剪图片显示
     * @return {void}
     * @author: dreamy-xay
     */
    function avatarModalShow() {
      showAvatarModal.value = true;
    }

    return {
      inputValue,
      showAvatarModal,
      editSignature,
      isEditSignature,
      updateSignature,
      confirmModalShow,
      signatureInput,
      uploadAvatar,
      avatarModalShow,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-center-profile-edit-avatar {
  @include flex(initial, space-between);
  width: calc(926px - 48px);
  height: calc(138px - 48px);
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  padding: 24px;

  & > div {
    height: 100%;
  }

  .user-center-profile-edit-avatar-left {
    width: 204px;
    @include flex(center, space-between);

    & > div {
      height: 90px;
      width: 90px;
    }

    .avatar {
      margin-right: 24px;
      border-radius: $border-radius-0;
      user-select: none;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .operate {
      @include flex(initial, space-between, column);

      .username {
        height: 26px;
        line-height: 26px;
        font-size: 16px;
        font-weight: 600;
        color: $grey-10;
      }

      .button {
        width: 100%;
        height: 30px;
        border-radius: $border-radius-0;
        @include flex(center, center);
        background-color: $green-0;
        box-shadow: $shadow-0;
        transition: 0.25s;
        font-size: 14px;
        color: $grey-0;

        &:hover {
          background-color: $green-1;
        }
      }
    }
  }

  .user-center-profile-edit-avatar-right {
    width: 420px;
    @include flex(center);

    .signature {
      font-size: 14px;
      color: $grey-7;
    }
  }
}
</style>


<style lang="scss">
.user-center-profile-edit-avatar-right-signature {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
