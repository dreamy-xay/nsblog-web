<!--
 * @Description: 注册账号
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 18:50:47
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-27 18:03:12
-->
<template>
  <div class="sign-up">
    <login-logo>
      <div class="sign-up-input">
        <n-message-provider>
          <login-input
            class="username"
            ref="usernameInput"
            v-model="username"
            placeholder="账户"
            :maxlength="30"
            :verify="verifyUsername"
            @enter="submit"
          />
          <login-input
            class="email"
            ref="emailInput"
            v-model="email"
            placeholder="邮箱"
            :maxlength="255"
            :verify="verifyEmail"
            @enter="submit"
          />
          <login-input
            type="password"
            class="password"
            ref="passwordInput"
            v-model="password"
            placeholder="密码"
            :maxlength="255"
            :verify="verifyPassword"
            show-password
            @enter="submit"
          />
          <login-input
            type="password"
            class="confirmed-password"
            ref="confirmedPasswordInput"
            v-model="confirmedPassword"
            placeholder="重复密码"
            :maxlength="255"
            :verify="verifyConfirmedPassword"
            show-password
            @enter="submit"
          />
        </n-message-provider>
        <div class="other">
          <div
            class="right"
            role="button"
            @click="signIn"
          >
            立即登录
          </div>
        </div>
      </div>
      <div class="sign-up-button">
        <login-button
          bind-class="submit"
          @click="submit"
        >创建账户</login-button>
      </div>
    </login-logo>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import router from '@/router';
import LoginLogo from '@/views/login/childComps/LoginLogo';
import LoginInput from '@/views/login/childComps/LoginInput';
import LoginButton from '@/views/login/childComps/LoginButton';

/**
 * @description: 注册账号
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'signUp',
  components: {
    LoginLogo,
    LoginInput,
    LoginButton,
  },
  setup() {
    const username = ref(''); // 账号
    const email = ref(''); // 邮箱
    const password = ref(''); // 密码
    const confirmedPassword = ref(''); // 验证密码（重复密码）

    const usernameInput = ref(null); // 账号ref
    const emailInput = ref(null); // 邮箱ref
    const passwordInput = ref(null); // 密码ref
    const confirmedPasswordInput = ref(null); // 验证密码ref

    /**
     * @description: 跳转到登陆页面
     * @return {void}
     * @author: dreamy-xay
     */
    function signIn() {
      router.push({ name: 'signIn' });
    }

    function verifyUsername(username) {
      if (username === '') return true;
      const usernameReg = /^[a-zA-Z]([-_a-zA-Z0-9]{0,30})$/;
      return usernameReg.test(username);
    }

    function verifyEmail(email) {
      if (email === '') return true;
      const emailReg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      return emailReg.test(email);
    }

    function verifyPassword(password) {
      if (password === '') return true;
      const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/;
      return passwordReg.test(password);
    }

    function verifyConfirmedPassword(confirmedPassword) {
      if (confirmedPassword === '') return true;
      return confirmedPassword === password.value;
    }

    /**
     * @description: 递交注册
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      let success = true; // 所填信息是否有效
      if (username.value === '' || !usernameInput.value.check({ message: '用户名不为空且仅由字母数字_-构成' }))
        success = false;
      if (email.value === '' || !emailInput.value.check({ message: '邮箱格式不正确' })) success = false;
      if (password.value === '' || !passwordInput.value.check({ message: '密码超过8位且由大小写字母数字构成' }))
        success = false;
      if (confirmedPassword.value === '' || !confirmedPasswordInput.value.check({ message: '密码不一致' }))
        success = false;
      if (success) {
        console.log('submit');
      }
    }

    return {
      username,
      email,
      password,
      confirmedPassword,
      usernameInput,
      emailInput,
      passwordInput,
      confirmedPasswordInput,
      verifyUsername,
      verifyEmail,
      verifyPassword,
      verifyConfirmedPassword,
      signIn,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.sign-up {
  width: 100%;
  height: 100%;

  .sign-up-input {
    width: 100%;
    height: 283px;
    overflow: hidden;

    .username {
      margin-top: 45px;
    }

    .email,
    .password,
    .confirmed-password {
      margin-top: 22px;
    }

    .other {
      width: 100%;
      height: 19px;
      line-height: 19px;
      font-size: 14px;
      margin-top: 8px;

      .right {
        height: 100%;
        float: right;
        color: $green-0;
        transition: all 0.4s;

        &:hover {
          color: $green-1;
        }
      }
    }
  }

  .sign-up-button {
    width: 100%;
    height: 45px;
    overflow: hidden;
  }
}
</style>
