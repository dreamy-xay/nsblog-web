<!--
 * @Description: 管理员登陆界面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-10 22:47:16
-->

<template>
  <div
    class="admin-login"
    ref="adminLoginPage"
  >
    <div
      :style="{backgroundImage: 'url(' + loginBackground + ')',}"
      class="admin-login-mask"
      :class="{'input-focus': isInputFocus}"
    >
    </div>
    <div class="admin-login-head">
      <div class="login-head-menu">
        <i
          class="iconfont blog-caidan"
          :class="{'menu-light': menuShow}"
          @mouseenter="menuHover(true, 300)"
          @mouseleave="menuHover(false)"
          role="button"
        ></i>
        <span :class="{'menu-light': menuShow}">MENU</span>
        <div
          class="menu"
          :class="{'menu-show': menuShow}"
          @mouseenter="menuHover(true, 300)"
          @mouseleave="menuHover(false, 300)"
        >
          <div class="menu-empty"></div>
          <div class="menu-card">
            <div
              class="menu-item"
              v-for="(item, index) in menuItems"
              :key="index"
              @click="item.click"
              role="button"
            >
              {{item.name}}
            </div>
          </div>
        </div>
      </div>

      <div class="login-head-other">
        <span
          @click="issueClick"
          role="button"
        >HAVE AN ISSUE?</span>
        <i
          class="iconfont blog-twitter"
          role="button"
          @click="twitterClick"
        ></i>
        <i
          class="iconfont blog-facebook"
          role="button"
          @click="facebookClick"
        ></i>
        <i
          class="iconfont blog-xiangji"
          role="button"
          @click="cameraClick"
        ></i>
      </div>
    </div>
    <div class="admin-login-body">
      <admin-login-from
        @inputFocus="inputFocus"
        @loginClick="loginClick"
      ></admin-login-from>
    </div>
    <background-setting :show="backgroundSettingPopupShow"></background-setting>
  </div>
</template>

<script lang="ts">
/**
 * @description: 管理员登陆界面
 * @author: dreamy-xay
 */

import adminLoginFrom from '@/views/adminLogin/childComps/AdminLoginFrom.vue';
import backgroundSetting from '@/views/adminLogin/childComps/BackgroundSetting.vue';
import html2canvas from 'html2canvas';
import { downLoadFile } from '@/util/util';
import { adminLogin } from '@/network/api';
import { setToken } from '@/network/token';

export default {
  name: 'adminLogin',
  data() {
    return {
      loginBackground: '/login/background.png',
      isInputFocus: false,
      menuShow: false,
      menuItems: [
        {
          name: '回到主页',
          click: (this as any).goHome,
        },
        {
          name: '背景图像偏好',
          click: (this as any).backgroundSetting,
        },
      ],
      delayTimer: null,
      backgroundSettingPopupShow: false,
    };
  },
  methods: {
    menuHover(isShow: boolean, delay: number = 0) {
      if ((this as any).delayTimer) clearTimeout((this as any).delayTimer);
      (this as any).delayTimer = setTimeout(() => {
        (this as any).menuShow = isShow;
        clearTimeout((this as any).delayTimer);
        (this as any).delayTimer = null;
      }, delay);
    },
    issueClick() {
      console.log('issue click');
    },
    twitterClick() {
      console.log('twitter click');
    },
    facebookClick() {
      console.log('facebook click');
    },
    cameraClick() {
      html2canvas((this as any).$refs.adminLoginPage).then((canvas) => {
        downLoadFile('admin', canvas.toDataURL('png'));
      });
    },
    inputFocus(isFocus: boolean) {
      (this as any).isInputFocus = isFocus;
    },
    loginClick(username: string, password: string) {
      adminLogin(username, password)
        .then((res) => {
          setToken(res.token);
          (this as any).$router.push({ path: '/admin', params: res });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* menuMethods */
    goHome() {
      (this as any).$router.push('/');
    },
    backgroundSetting() {
      (this as any).backgroundSettingPopupShow = true;
      (this as any).menuShow = false;
      setTimeout(() => {
        (this as any).backgroundSettingPopupShow = false;
      }, 0);
    },
  },
  components: {
    adminLoginFrom,
    backgroundSetting,
  },
};
</script>

<style lang="scss" scoped>
.admin-login {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .admin-login-mask {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-position: center;
    background-size: cover;
    transition: transform 0.25s, filter 0.25s;
    background-attachment: fixed;
    background-blend-mode: darken;
    backface-visibility: hidden;
    z-index: -2;

    &.input-focus {
      filter: blur(10px);
      transform: scale(1.1);
    }
  }

  .admin-login-head {
    width: 100%;
    height: 32px;
    margin-top: 20px;
    padding: 0 40px;
    color: rgba(255, 255, 255, 0.6);
    box-sizing: border-box;

    .login-head-menu {
      display: flex;
      align-items: center;
      float: left;
      height: 100%;
      position: relative;

      .iconfont {
        font-size: 30px;
      }

      span {
        font-size: 14px;
        margin-left: 12px;
        cursor: default;
        user-select: none;
      }

      .menu {
        overflow: hidden;
        width: 160px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: 0.3s cubic-bezier(0.65, 0.05, 0.1, 1);
        transform-origin: 5% 22%;

        &.menu-show {
          opacity: 1;
          animation: menuShowScale 0.3s cubic-bezier(0.65, 0.05, 0.1, 1);
        }

        @keyframes menuShowScale {
          0% {
            transform: scale(0.5);
          }
          60% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }

        .menu-card {
          background-color: transparent;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.05) 0 2px 10px;
          background-color: rgba(255, 255, 255, 1);
          overflow: hidden;

          .menu-item {
            padding-left: 20px;
            padding-top: 12px;
            padding-bottom: 12px;
            color: rgba(20, 20, 20, 0.9);
            font-size: 11px;
            transition: 0.25s;
            user-select: none;

            &:hover {
              background-color: rgba(0, 0, 0, 0.15);
            }
          }
        }
      }

      .menu-empty {
        height: 40px;
        width: 100%;
      }
    }

    .login-head-other {
      display: flex;
      align-items: center;
      float: right;
      height: 100%;

      .iconfont {
        font-size: 24px;
        margin-right: 30px;
      }

      span {
        font-size: 14px;
        margin-right: 30px;
        user-select: none;
      }
    }

    .login-head-menu .iconfont,
    .login-head-menu span,
    .login-head-other .iconfont,
    .login-head-other span {
      transition: color 0.4s;
    }

    .login-head-menu .iconfont:hover,
    .login-head-menu .iconfont:hover ~ span,
    .login-head-other .iconfont:hover,
    .login-head-other span:hover,
    .menu-light {
      color: white;
    }
  }

  .admin-login-body {
    width: 100%;
    height: calc(100% - 52px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
}
</style>
