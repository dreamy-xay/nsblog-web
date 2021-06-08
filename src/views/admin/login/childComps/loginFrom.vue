<template>
  <div class="login-from">
    <div class="login-from-head">
      <i class="iconfont blog-note"></i>
    </div>
    <div class="login-from-body">
      <input
        type="text"
        v-model="username"
        placeholder="UserName.."
      >
      <i class="iconfont blog-zhanghu icon-username"></i>
      <input
        :type="passwordType"
        v-model="password"
        placeholder="PassWord.."
        :class="{'password-width': !passwordShow && password !== ''}"
      >
      <i class="iconfont blog-ziyuan icon-password"></i>
      <i
        class="iconfont password-show icon-password-eye"
        :class="{'blog-eyeshow': passwordShow, 'blog-eyehidden': !passwordShow}"
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
import { adminLogin } from '@/network/api';
import { setToken } from '@/network/token';

export default {
  name: 'loginFrom',
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
      (this as any).passwordType = isShow ? 'text' : 'password';
    },
  },
  methods: {
    submitClick() {
      if ((this as any).username && (this as any).password) {
        console.log('username:' + (this as any).username);
        console.log('password:' + (this as any).password);
        adminLogin((this as any).username, (this as any).password)
          .then((res) => {
            console.log(res);
            setToken(res.token);
            (this as any).$router.replace({ path: '/admin' });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-from {
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
