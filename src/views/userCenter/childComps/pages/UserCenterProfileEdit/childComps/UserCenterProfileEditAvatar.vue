<!--
 * @Description: 修改头像和用户签名
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-31 10:28:07
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-31 11:56:37
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
        >
          更换头像
        </div>
      </div>
      <!-- <base-avatar-cropper
        v-model="showAvatarCropper"
        :uploadHandler="avatarCropperHandler"
      /> -->
    </div>
    <div class="user-center-profile-edit-avatar-right">
      <el-tooltip
        placement="top"
        trigger="hover"
        content="修改个性签名"
        popper-class="user-center-profile-edit-avatar-right-signature"
      >
        <div
          class="signature"
          role="button"
        >
          {{data.signature}}
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseAvatarCropper from '@/components/content/baseAvatarCropper/BaseAvatarCropper.vue';

/**
 * @description: 修改头像和用户签名
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userCenterProfileEditAvatar',
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
  components: {
    // BaseAvatarCropper,
  },
  setup() {
    const showAvatarCropper = ref(false); // 显示头像修改剪贴框

    function avatarCropperHandler(e) {
      console.log(e);
    }

    return {
      showAvatarCropper,
      avatarCropperHandler,
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
    overflow: hidden;
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
