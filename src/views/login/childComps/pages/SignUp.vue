<!--
 * @Description: 注册账号
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 18:50:47
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 10:42:03
-->
<template>
  <div class="sign-up">
    <login-logo>
      <div class="sign-up-input">
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
import LoginLogo from '@/views/login/childComps/LoginLogo.vue';
import LoginInput from '@/views/login/childComps/LoginInput.vue';
import LoginButton from '@/views/login/childComps/LoginButton.vue';
import { signUp, emailSendVCode, exist } from '@/network/api/user';
import events from '@/events';
import { useMessage } from 'naive-ui';

/**
 * @description: 注册账号页面
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
    const msg = useMessage(); // naive-ui mssage
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

    /**
     * @description: 验证用户名，字母开头，数字字母组成
     * @param {string} username 用户名 `必传参数`
     * @return {boolean} 是否验证成功
     * @author: dreamy-xay
     */
    function verifyUsername(username) {
      const usernameReg = /^[a-zA-Z]([-_a-zA-Z0-9]{0,30})$/;
      return usernameReg.test(username);
    }

    /**
     * @description: 验证email
     * @param {string} email 邮箱账号 `必传参数`
     * @return {boolean} 是否验证成功
     * @author: dreamy-xay
     */
    function verifyEmail(email) {
      const emailReg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      return emailReg.test(email);
    }

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
      return confirmedPassword === password.value;
    }

    /**
     * @description: 递交注册
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      let success = true; // 所填信息是否有效
      if (!usernameInput.value.check({ message: '用户名不为空且仅由字母数字和 _- 特殊符号构成' })) success = false;
      if (!emailInput.value.check({ message: '邮箱格式不正确' })) success = false;
      if (!passwordInput.value.check({ message: '密码超过8位且由大小写字母和数字构成' })) success = false;
      if (!confirmedPasswordInput.value.check({ message: '密码不一致' })) success = false;

      // 如果验证成功
      if (success) {
        // 用户没用被注册过
        exist({
          username: username.value,
          email: email.value,
        })
          .then((data) => {
            if (data.usernameExist) msg.warning('该账户已被注册，请更换账户', { duration: 3000, closable: true });

            if (data.emailExist)
              setTimeout(() => {
                msg.warning('该邮箱已被注册，请更换邮箱', { duration: 3000, closable: true });
              }, 0);

            if (!data.usernameExist && !data.emailExist) {
              // 显示发送验证码
              let loading = msg.loading('验证码发送中', { duration: 0 });

              // 发送验证码
              emailSendVCode(email.value, {
                afterResopnse() {
                  loading.destroy();
                },
              })
                .then(() => {
                  const eventId = 'SignUp' + Math.floor(Math.random() * 1000);
                  // 路由跳转
                  router.push({
                    name: 'emailVerify',
                    params: {
                      enter: true,
                      email: email.value,
                      type: 0,
                      eventId,
                    },
                  });

                  // 一次性事件绑定
                  events.on(eventId, () => {
                    signUp(username.value, password.value, email.value)
                      .then((data) => {
                        events.off(eventId);
                        const eventId = 'backSignIn' + Math.floor(Math.random() * 1000);
                        // 路由跳转
                        router.push({
                          name: 'success',
                          params: {
                            enter: true,
                            eventId,
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
                      });
                  });
                })
                .catch((error) => {
                  console.log(error);
                  msg.error('发送验证码失败', { duration: 3000, closable: true });
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
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
