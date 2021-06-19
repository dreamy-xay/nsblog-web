<!--
 * @Description: 管理员界面右侧栏管理员头像
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 15:56:22
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-19 13:38:17
-->

<template>
  <div
    class="admin-avatar"
    :class="{'admin-avatar-min': isCollapse}"
  >
    <div
      class="admin-avatar-left"
      :class="{'left-scale': isCollapse}"
    >
      <el-avatar
        :src="avatar"
        alt="admin"
        @error="$emit('error', $event)"
        :size="65"
      ></el-avatar>
    </div>
    <div
      class="admin-avatar-right"
      :style="{opacity: adminAvatarRightOpacity}"
    >
      <div class="right-nickname">
        {{nickname ? nickname : '📝'}}
      </div>
      <div class="right-signature">
        {{signature ? signature : 'づ￣ 3￣)づ'}}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
/**
 * @description: 管理员界面右侧栏管理员头像
 * @param {Boolean} isCollapse 菜单是否折叠 `必传参数`
 * @param {String} avatar 头像链接  `必传参数`
 * @param {String} nickname 昵称 `必传参数`
 * @param {String} signature 个性签名 `必传参数`
 * @event error 头像加载失败时触发
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'adminAvatar',
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
    },
    avatar: {
      type: String,
      default: '/admin/avatarLoading.gif',
    },
    nickname: {
      type: String,
      default: null,
    },
    signature: {
      type: String,
      default: null,
    },
  },
  watch: {
    isCollapse(isCollapse: boolean) {
      if (isCollapse) (this as any).adminAvatarRightOpacity = 0;
      else
        setTimeout(() => {
          (this as any).adminAvatarRightOpacity = 1;
        }, 300);
    },
  },
  data() {
    return {
      adminAvatarRightOpacity: (this as any).isCollapse ? 0 : 1,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-avatar {
  width: 100%;
  height: 65px;
  overflow: hidden;
  // position: sticky;
  // top: 0;
  // left: 0;
  // z-index: 10;
  background-color: $admin-menu-background-color;
  padding: 25px 0;
  transition: all 0.3s ease-in-out;

  &.admin-avatar-min {
    padding: 5px 0;
  }

  .admin-avatar-left {
    float: left;
    margin-left: 15px;
    width: 75px;
    height: 100%;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &.left-scale {
      width: 64px;
      transform: scale(0.6);
      margin-left: 0;
    }
  }

  .admin-avatar-right {
    float: right;
    margin-right: 10px;
    width: 110px;
    height: 100%;
    overflow: hidden;
    color: $admin-menu-text-color;
    // opacity: 0;

    .right-nickname {
      float: right;
      width: 100%;
      height: 29px;
      line-height: 29px;
    }

    .right-signature {
      float: right;
      width: 100%;
      height: 36px;
      font-size: 12px;
      line-height: 18px;
      /* 文字溢出显示 */
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
