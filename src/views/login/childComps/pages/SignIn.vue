<!--
 * @Description: 登录卡片页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 14:41:12
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-16 18:06:42
-->
<template>
  <div class="sign-in">
    <login-logo>
      <div class="sign-in-input">
        <login-input
          class="username"
          v-model="username"
          :maxlength="30"
          placeholder="账号/邮箱"
          @enter="usernameEnter"
        />
        <login-input
          type="password"
          class="password"
          :maxlength="255"
          v-model="password"
          ref="passwordInput"
          placeholder="密码"
          show-password
          @enter="submit"
        />
        <div class="other">
          <div
            class="left"
            role="button"
            @click="forgotPassword"
          >
            忘记密码？
          </div>
          <div
            class="right"
            role="button"
            @click="signUp"
          >
            立即注册
          </div>
        </div>
      </div>
      <div class="sign-in-button">
        <login-button
          bind-class="submit"
          @click="submit"
        >
          登录
        </login-button>
        <div class="other">
          <i
            class="iconfont blog-qq"
            role="button"
            @click="qqSignIn"
          ></i>
          <i
            class="iconfont blog-weibo"
            role="button"
            @click="weiboSignIn"
          ></i>
        </div>
      </div>
    </login-logo>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import router from '@/router';
import { authLogin } from '@/network/api/auth';
import { setToken, clearToken } from '@/network/token';
import LoginLogo from '@/views/login/childComps/LoginLogo.vue';
import LoginInput from '@/views/login/childComps/LoginInput.vue';
import LoginButton from '@/views/login/childComps/LoginButton.vue';
import { useMessage } from 'naive-ui';
import { mapMutations } from '@/util/store';

/**
 * @description: 登录卡片页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'signIn',
  components: {
    LoginLogo,
    LoginButton,
    LoginInput,
  },
  setup() {
    const msg = useMessage(); // naive-ui message
    const username = ref(''); // 用户名
    const password = ref(''); // 密码
    const passwordInput = ref(null); // 密码输入框dom

    /**
     * @description: 账号输入框按下回车键执行函数
     * @return {void}
     * @author: dreamy-xay
     */
    function usernameEnter() {
      password.value !== '' ? submit() : passwordInput.value.loginInput.focus();
    }

    /**
     * @description: 忘记密码
     * @return {void}
     * @author: dreamy-xay
     */
    function forgotPassword() {
      router.push({ name: 'forgotPassword' });
    }

    /**
     * @description: 注册账号
     * @return {void}
     * @author: dreamy-xay
     */
    function signUp() {
      router.push({ name: 'signUp' });
    }

    /**
     * @description: qqSignIn
     * @return {void}
     * @author: dreamy-xay
     */
    function qqSignIn() {
      console.log('qqSignIn');
    }

    /**
     * @description: weiboSignIn
     * @return {void}
     * @author: dreamy-xay
     */
    function weiboSignIn() {
      console.log('weiboSignIn');
    }

    /**
     * @description: 递交登录信息
     * @return {void}
     * @author: dreamy-xay
     */
    const { updateTokenInfo } = mapMutations('global', ['updateTokenInfo']); // 更新登陆状态函数获取
    function submit() {
      const usernameReg = /^[a-zA-Z]([-_a-zA-Z0-9]{0,30})$/;
      const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/;
      const emailReg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      if ((usernameReg.test(username.value) || emailReg.test(username.value)) && passwordReg.test(password.value)) {
        authLogin(username.value, password.value)
          .then((data) => {
            setToken(data.token, data.username);
            updateTokenInfo();
            router.back();
          })
          .catch((error) => {
            console.log(error);
            clearToken();
            msg.error('用户不存在或密码错误', { duration: 3000, closable: true });
          });
      } else msg.error('用户不存在或密码错误', { duration: 3000, closable: true });
    }

    return {
      username,
      password,
      passwordInput,
      usernameEnter,
      forgotPassword,
      signUp,
      qqSignIn,
      weiboSignIn,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.sign-in {
  width: 100%;
  height: 100%;

  .sign-in-input {
    width: 100%;
    height: 208px;
    overflow: hidden;

    .username {
      margin-top: 47px;
    }

    .password {
      margin-top: 52px;
    }

    .other {
      width: 100%;
      height: 19px;
      line-height: 19px;
      font-size: 14px;
      margin-top: 8px;

      .left {
        height: 100%;
        float: left;
        color: $grey-9;
        transition: all 0.4s;

        &:hover {
          color: $grey-11;
        }
      }

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

  .sign-in-button {
    width: 100%;
    height: 120px;
    overflow: hidden;

    .other {
      width: 157px;
      height: 30px;
      margin: 45px auto 0 auto;
      line-height: 30px;

      .iconfont {
        color: $green-0;
        text-shadow: $shadow-0;
        transition: all 0.4s;

        &:first-child {
          float: left;
          font-size: 30px;
        }

        &:last-child {
          float: right;
          font-size: 37px;
        }

        &:hover {
          color: $green-1;
        }
      }
    }
  }
}
</style>
