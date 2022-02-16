<!--
 * @Description: 重置密码页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-30 15:53:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-15 12:09:24
-->
<template>
  <div class="reset-password">
    <login-logo>
      <div class="reset-password-title">
        重置您的密码
      </div>
      <div class="reset-password-input">
        <login-input
          type="password"
          class="password"
          ref="passwordInput"
          v-model="password"
          placeholder="密码"
          :maxlength="30"
          :verify="verifyPassword"
          show-password
          @enter="passwordEnter"
        />
        <login-input
          type="password"
          class="confirmed-password"
          ref="confirmedPasswordInput"
          v-model="confirmedPassword"
          placeholder="重复密码"
          :maxlength="30"
          :verify="verifyConfirmedPassword"
          show-password
          @enter="submit"
        />
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
      <div class="reset-password-button">
        <login-button
          bind-class="submit"
          @click="submit"
        >确认重置</login-button>
      </div>
    </login-logo>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import LoginLogo from '@/views/login/childComps/LoginLogo.vue';
import LoginInput from '@/views/login/childComps/LoginInput.vue';
import LoginButton from '@/views/login/childComps/LoginButton.vue';
import events from '@/events';
import { forgotPasswordChange } from '@/network/api/user';
import { useMessage } from 'naive-ui';

/**
 * @description: 重置密码页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'resetPassword',
  components: {
    LoginLogo,
    LoginInput,
    LoginButton,
  },
  beforeRouteEnter(to, from, next) {
    if (to.params['enter']) next();
    else next({ path: from.path });
  },
  setup() {
    const msg = useMessage(); // naive-ui mssage
    const info = useRoute().params; // 上个页面 params
    const email = info['email']; // 邮箱号
    const password = ref(''); // 密码
    const confirmedPassword = ref(''); // 验证密码（重复密码）

    const passwordInput = ref(null); // 密码ref
    const confirmedPasswordInput = ref(null); // 验证密码ref

    /**
     * @description: 验证密码，由大小写字母和数字组成，且大于8位
     * @param {string} password 密码 `必传参数`
     * @return {boolean} 是否验证成功
     * @author: dreamy-xay
     */
    function verifyPassword(password) {
      const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/;
      return passwordReg.test(password);
    }

    /**
     * @description: 验证重复密码
     * @param {string} confirmedPassword 重复密码 `必传参数`
     * @return {boolean} 是否验证成功
     * @author: dreamy-xay
     */
    function verifyConfirmedPassword(confirmedPassword) {
      return confirmedPassword === password.value && confirmedPassword !== '';
    }

    /**
     * @description: 跳转到登陆页面
     * @return {void}
     * @author: dreamy-xay
     */
    function signIn() {
      router.push({ name: 'signIn' });
    }

    /**
     * @description: 账号输入框按下回车键执行函数
     * @return {void}
     * @author: dreamy-xay
     */
    function passwordEnter() {
      confirmedPassword.value !== '' ? submit() : confirmedPasswordInput.value.loginInput.focus();
    }

    /**
     * @description: 递交注册
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      let success = true; // 所填信息是否有效
      if (!passwordInput.value.check({ message: '密码超过8位且由大小写字母数字构成' })) success = false;
      if (!confirmedPasswordInput.value.check({ message: '密码不一致' })) success = false;

      // 如果验证成功
      if (success) {
        // 修改密码
        forgotPasswordChange(info['username'], password.value, info['data'])
          .then(() => {
            events.off(eventId);
            const eventId = 'ResetPassword' + Math.floor(Math.random() * 1000);
            // 路由跳转
            router.push({
              name: 'success',
              params: {
                enter: true,
                email,
                eventId,
                mainContent: '您已成功重置密码',
                subContent: '请仔细保管好您的账户信息，重新登录确认账户信息',
              },
            });
            // 一次性事件绑定
            events.on(eventId, () => {
              events.off(eventId);
              router.push({ name: 'signIn' });
            });
          })
          .catch((error) => {
            console.log(error);
            msg.error('重置密码失败', { duration: 3000 });
          });
      }
    }

    return {
      password,
      confirmedPassword,
      passwordInput,
      confirmedPasswordInput,
      verifyPassword,
      verifyConfirmedPassword,
      signIn,
      passwordEnter,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.reset-password {
  width: 100%;
  height: 100%;

  .reset-password-title {
    width: 100%;
    height: 32px;
    padding-top: 30px;
    overflow: hidden;
    line-height: 32px;
    font-size: 24px;
    text-align: center;
    user-select: none;
    color: $green-1;
  }

  .reset-password-input {
    width: 100%;
    height: 221px;
    overflow: hidden;

    .password {
      margin-top: 58px;
    }
    .confirmed-password {
      margin-top: 52px;
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

  .reset-password-button {
    width: 100%;
    height: 45px;
    overflow: hidden;
  }
}
</style>
