<!--
 * @Description:关注面板数据条组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-09 20:58:06
 * @LastEditors: clq
 * @LastEditTime: 2021-09-11 17:40:50
-->
<template>
  <div class="user-info-attention-item">
    <div class="user-info-attention-item-content">
      <span class="avatar">
        <base-avatar
          :src="avatar"
          shape="square"
          :size="50"
        />
      </span>
      <span class="info">
        <div
          class="nickname-font"
          v-if="nickname.length<nicknameLimit"
        >{{nickname}}</div>
        <div
          class="nickname-font"
          v-else
        >{{nickname.substring(0,nicknameLimit)}}...</div>
        <div
          class="other-font"
          v-if="username.length<usernameLimit"
        >{{username}}</div>
        <div
          class="other-font"
          v-else
        >{{username.substring(0,usernameLimit)}}...</div>
        <div
          class="other-font"
          v-if="signature.length<signatureLimit"
        >{{signature}}</div>
        <div
          class="other-font"
          v-else
        >{{signature.substring(0,signatureLimit)}}...</div>
      </span>
      <span
        v-if="attention"
        class="btn"
        role="button"
        @click="changeAttention"
      >取消关注</span>
      <span
        v-else
        class="btn"
        role="button"
        @click="changeAttention"
      >关注</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';

/**
 * @description:
 * @param {String} avatar 头像链接
 * @param {String} nickname 昵称
 * @param {String} username 用户名
 * @param {String} signature 个性签名
 * @param {Boolean} attention 是否关注
 * @author: clq
 */
export default defineComponent({
  name: 'userInfoAttentionItem',
  components: {
    BaseAvatar,
  },
  props: {
    avatar: {
      type: String,
      default: null,
    },
    nickname: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
    signature: {
      type: String,
      default: null,
    },
    attention: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const nicknameLimit = ref(25);
    const usernameLimit = ref(20);
    const signatureLimit = ref(80);

    function changeAttention() {
      context.emit('update:attention', !props.attention);
    }
    return { nicknameLimit, usernameLimit, signatureLimit, changeAttention };
  },
});
</script>

<style lang="scss" scoped>
.user-info-attention-item {
  box-sizing: border-box;
  width: 100%;
  height: 82px;
  margin: 0px;
  padding: 16px 0px 15px;
  border-bottom: 1px solid $grey-2;

  .user-info-attention-item-content {
    width: 100%;
    height: 100%;
    // padding: 0px;
    // background-color: green;

    .avatar {
      display: inline-block;
      width: 50px;
      height: 50px;
      // background-color: red;
    }

    .info {
      display: inline-block;
      height: 100%;
      padding-left: 10px;
      position: relative;
      top: -7px;
      background-color: $grey-0;

      .nickname-font {
        position: relative;
        top: -2px;
        height: 15px;
        font-family: Arial;
        font-size: 14px;
        color: $grey-10;
      }

      .other-font {
        position: relative;
        top: 4px;
        height: 15px;
        font-family: Arial;
        font-size: 12px;
        color: $grey-7;
      }
    }

    .btn {
      float: right;
      position: relative;
      top: 9px;
      left: -16px;
      padding: 6px 12px;
      border-radius: 5px;
      background-color: $grey-3;
      font-family: Arial;
      font-size: 14px;
      color: $grey-9;
    }
  }
}
</style>
