<!--
 * @Description: 管理员登陆界面表单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-19 13:32:36
-->


<template>
  <div class="admin-login-from">
    <div class="login-from-head">
      <i class="iconfont blog-note"></i>
    </div>
    <div class="login-from-body">
      <input
        type="text"
        v-model="username"
        placeholder="UserName.."
        @focus="$emit('inputFocus', true)"
        @blur="$emit('inputFocus', false)"
        @keyup.enter="password !== '' ? submitClick() : $refs.adminLoginInputPassword.focus()"
      >
      <i class="iconfont blog-zhanghu icon-username"></i>
      <input
        :type="passwordType"
        v-model="password"
        ref="adminLoginInputPassword"
        placeholder="PassWord.."
        :class="{'password-width': !passwordShow && password !== ''}"
        @focus="$emit('inputFocus', true)"
        @blur="$emit('inputFocus', false)"
        @keyup.enter="submitClick"
        @keyup.ctrl.shift.83="passwordShow = !passwordShow"
      >
      <i class="iconfont blog-ziyuan icon-password"></i>
      <i
        class="iconfont password-show icon-password-eye"
        :class="{'blog-eyeshow': passwordShow, 'blog-eyehidden': !passwordShow}"
        role="button"
        @click="passwordShow = !passwordShow"
      ></i>
    </div>
    <div
      class="login-from-footer"
      role="button"
      @click="submitClick"
    >
      Submit
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
/**
 * @description: 管理员登陆界面表单
 * @event loginClick 登录点击递交触发事件 `账号密码均不为空时触发`
 * @param {String} loginClick.username 管理员账户名
 * @param {String} loginClick.password 管理员密码
 * @event inputFocus 输入框聚焦触发事件
 * @param {Boolean} inputFocus.isFocus 是否触发事件状态
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'adminLoginFrom',
  data() {
    return {
      username: '',
      password: '',
      passwordShow: false,
      passwordType: 'password',
    };
  },
  watch: {
    passwordShow(isShow: boolean) {
      this.passwordType = isShow ? 'text' : 'password';
    },
  },
  methods: {
    submitClick() {
      if (this.username && this.password) {
        this.$emit('loginClick', this.username, this.password);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.admin-login-from {
  height: 306px;
  width: 310px;

  .login-from-head {
    width: 100%;
    text-align: center;
    margin-bottom: 45px;
    user-select: none;

    .iconfont {
      font-size: 64px;
      color: white;
      line-height: 64px;
      opacity: 0.87;
    }
  }

  .login-from-body {
    width: 100%;
    overflow: hidden;
    position: relative;

    input {
      padding: 0 38px 0 45px;
      float: left;
      height: 40px;
      width: 100%;
      color: rgba(255, 255, 255, 0.8);
      line-height: 40px;
      font-size: 13px;
      background-color: rgba(255, 255, 255, 0.15);
      outline: none;
      border: 0;
      letter-spacing: 1.2px;
      margin-bottom: 10px;
      border-radius: 20px;
      transition: color 0.4s;
      transition: background-color 0.4s;

      &::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
      }

      &::selection {
        background: transparent;
      }

      &.password-width {
        letter-spacing: 3.9px;
      }

      &:focus {
        color: white;
        background-color: rgba(255, 255, 255, 0.25);
      }

      &:focus .iconfont {
        color: white;
      }
    }

    .iconfont {
      position: absolute;
      color: rgba(255, 255, 255, 0.8);
      font-size: 18px;

      &.icon-username {
        top: 10px;
        left: 17px;
      }

      &.icon-password {
        top: 61px;
        left: 17px;
      }

      &.icon-password-eye {
        top: 61px;
        right: 17px;
      }
    }
  }

  .login-from-footer {
    width: 100%;
    text-align: center;
    line-height: 40px;
    color: rgba(255, 255, 255, 0.87);
    height: 40px;
    font-size: 14px;
    margin-top: 55px;
    background-color: #f96332;
    border-radius: 20px;
    letter-spacing: 1.2px;
    user-select: none;
    transition: all 0.4s;

    &:hover {
      background-color: #ee460e;
      color: white;
    }
  }
}
</style>
