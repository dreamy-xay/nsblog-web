<!--
 * @Description: 忘记密码页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 18:56:07
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-27 23:43:36
-->

<template>
  <div class="forgot-password">
    <div class="forgot-password-content">
      <i class="iconfont blog-tiwen"></i>
      <span class="main-content">忘记密码了？</span>
      <span class="sub-content">不慌，简单操作就能找回</span>
      <span class="en-content">Don't panic, simple operation can get back</span>
    </div>
    <div class="forgot-password-input">
      <login-input
        class="email"
        v-model="email"
        placeholder="请输入注册邮箱"
        :maxlength="255"
        @enter="submit"
      />
      <div class="other">
        <div
          class="right"
          role="button"
          @click="signIn"
        >
          登录已存在账户
        </div>
      </div>
    </div>
    <div class="forgot-password-button">
      <login-button
        bind-class="submit"
        @click="submit"
      >
        验证邮箱
      </login-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import router from '@/router';
import LoginInput from '@/views/login/childComps/LoginInput';
import LoginButton from '@/views/login/childComps/LoginButton';
import { ElNotification } from 'element-plus';

/**
 * @description: 忘记密码页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'forgotPassword',
  components: {
    LoginInput,
    LoginButton,
  },
  setup() {
    const email = ref(''); // 邮箱号

    /**
     * @description: 递交邮箱号
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      const emailReg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      if (emailReg.test(email.value)) {
        console.log('submit');
      } else
        ElNotification({
          type: 'error',
          message: '邮箱格式不正确',
          duration: 3000,
        });
    }

    /**
     * @description: 返回登陆页面
     * @return {void}
     * @author: dreamy-xay
     */
    function signIn() {
      router.push({ name: 'signIn' });
    }

    return {
      email,
      submit,
      signIn,
    };
  },
});
</script>

<style lang="scss" scoped>
.forgot-password {
  width: 100%;
  height: 100%;

  .forgot-password-content {
    width: 100%;
    height: 238px;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    .iconfont {
      font-size: 168px;
      line-height: 168px;
      color: $green-1;
    }

    .main-content {
      font-size: 24px;
      color: $green-1;
    }

    .sub-content {
      margin-top: 10px;
      font-size: 16px;
      color: $grey-6;
      letter-spacing: 1.2px;
    }

    .en-content {
      font-size: 12px;
      transform: scale(0.84);
      color: $grey-6;
    }
  }

  .forgot-password-input {
    width: 100%;
    height: 97px;
    overflow: hidden;

    .email {
      margin-top: 16px;
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

  .forgot-password-button {
    width: 100%;
    height: 45px;
    overflow: hidden;
  }
}
</style>
