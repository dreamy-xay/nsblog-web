<template>
  <div
    class="login"
    :style="{backgroundImage: 'url(' + loginBackground + ')'}"
  >
    <div class="login-head">
      <div class="login-head-menu">
        <i
          class="iconfont blog-caidan"
          @click="menuClick"
          role="button"
        ></i>
        <span>MENU</span>
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
    <div class="login-body">
      <login-from></login-from>
    </div>
  </div>
</template>

<script lang="ts">
import loginFrom from '@/views/admin/login/childComps/loginFrom.vue';

export default {
  name: 'login',
  data() {
    return {
      loginBackground: '/login/background.png',
    };
  },
  methods: {
    menuClick() {
      console.log('menu click');
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
      console.log('camera click');
    },
  },
  components: {
    loginFrom,
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  overflow: hidden;

  .login-head {
    width: 100%;
    height: 32px;
    margin-top: 20px;
    padding: 0 40px;
    color: rgba(255, 255, 255, 0.75);

    .login-head-menu {
      display: flex;
      align-items: center;
      float: left;
      height: 100%;

      .iconfont {
        font-size: 30px;
      }

      span {
        font-size: 14px;
        margin-left: 12px;
        cursor: default;
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
      }
    }

    .login-head-menu .iconfont,
    .login-head-other .iconfont,
    .login-head-other span {
      transition: all 0.4s;
    }

    .login-head-menu .iconfont:hover,
    .login-head-other .iconfont:hover,
    .login-head-other span:hover {
      color: white;
    }
  }

  .login-body {
    width: 100%;
    height: calc(100% - 52px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
}
</style>
