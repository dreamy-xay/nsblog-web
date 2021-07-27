<!--
 * @Description: 注册成功页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 18:58:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-27 23:45:15
-->
<template>
  <div class="sign-up-success">
    <div class="sign-up-sucess-top">
      <i class="iconfont blog-smile"></i>
      <span class="main-content">您已成功注册</span>
      <span class="sub-content">欢迎您加入部落阁，请仔细保管好您的账户信息</span>
    </div>
    <login-button
      @click="signIn"
      bind-class="sign-up-sucess-bottom"
    >
      返回登陆页面
    </login-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import router from '@/router';
import LoginButton from '@/views/login/childComps/LoginButton';

/**
 * @description: 注册成功页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'signUpSuccess',
  components: {
    LoginButton,
  },
  setup() {
    /**
     * @description: 返回登陆页面
     * @return {void}
     * @author: dreamy-xay
     */
    function signIn() {
      router.replace({ name: 'signIn' });
    }

    return {
      signIn,
    };
  },
});
</script>

<style lang="scss" scoped>
.sign-up-success {
  width: 100%;
  height: 100%;
  user-select: none;

  .sign-up-sucess-top {
    width: 100%;
    height: 335px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .iconfont {
      font-size: 180px;
      line-height: 160px;
      color: $green-1;
    }

    .main-content {
      margin-top: 42px;
      font-size: 24px;
      color: $green-1;
    }

    .sub-content {
      margin-top: 22px;
      margin-bottom: 66px;
      font-size: 16px;
      color: $grey-8;
    }
  }
}
</style>
