<!--
 * @Description: 邮箱验证页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-28 23:10:42
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-30 15:31:51
-->
<template>
  <div class="email-verify">
    <div class="email-verify-content">
      <i class="iconfont blog-email"></i>
      <span class="main-content">验证您的电子邮件地址</span>
      <span class="sub-content">一封包含验证码的电子邮件已发送至</span>
      <span class="email-content">{{email}}</span>
    </div>
    <div class="email-verify-input">
      <div class="content">请在此处输入验证码：</div>
      <div class="input">
        <input
          type="text"
          class="input-input"
          @input="input"
          :maxlength="6"
          @keydown="deleteNum"
          onkeyup="value=value.replace(/[^\d]/g,'')"
        >
        <div
          class="input-frame"
          v-for="index of 6"
          :key="index"
          :class="{'input-frame-active': code.length > index - 1}"
        >
          {{code.length > index - 1 ? code[index - 1] : ''}}
        </div>
      </div>
      <div class="other">
        <div
          class="right"
          :class="{'disable': count > 0}"
          role="button"
          @click="sendVCode"
        >
          {{countStr}}
        </div>
      </div>
    </div>
    <div class="email-verify-button">
      <login-button
        @click="submit"
        bind-class="submit"
      >
        继续
      </login-button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import LoginButton from '@/views/login/childComps/LoginButton';
import { emailSendVCode, emailValidate } from '@/network/api/user';
import events from '@/events';
import { ElNotification } from 'element-plus';

/**
 * @description: 邮箱验证页面
 * @param {{enter: boolean, eventId?: string | number, email: string}} params router传递params
 *  enter:为true时页面才不会被拦截
 *  eventId:一次性绑定事件的ID，在点击底部按钮时触发
 *  email: 需要注册的邮箱
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'emailVerify',
  components: {
    LoginButton,
  },
  beforeRouteEnter(to, from, next) {
    if (to.params['enter']) next();
    else next({ path: from.path });
  },
  setup() {
    const info = useRoute().params; // 上个页面 params
    const email = info['email']; // 邮箱号
    const code = ref(''); // 验证码
    const count = ref(0); // 时间计数器

    // 计算属性 count
    const countStr = computed(() => {
      return (count.value ? '(' + count.value + 's)' : '') + '发送新验证码';
    });

    /**
     * @description: 发送验证码
     * @return {void}
     * @author: dreamy-xay
     */
    function sendVCode() {
      if (email && count.value === 0) {
        emailSendVCode(email)
          .then(() => {
            count.value = 60;
            const timer = setInterval(() => {
              --count.value;
              if (count.value === 0) clearInterval(timer);
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
            ElNotification({
              type: 'error',
              message: '发送验证码失败',
              duration: 3000,
            });
          });
      }
    }
    // 发送
    sendVCode();

    /**
     * @description: 输入函数监听
     * @author: dreamy-xay
     */
    function input(e) {
      const value = e.target.value;
      if (code.value.length < 6 && /[\d]/.test(value[value.length - 1]) && code.value.length < value.length)
        code.value += value[value.length - 1];
    }

    /**
     * @description: 删除输入验证码
     * @author: dreamy-xay
     */
    function deleteNum(e) {
      if (e.keyCode === 8) {
        code.value = code.value.substring(0, code.value.length - 1);
      }
    }

    /**
     * @description: 返回指定页面,默认返回登陆页面
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      if (code.value.length === 6)
        emailValidate(email, code.value)
          .then((data) => {
            if (data.error) {
              ElNotification({
                type: 'error',
                message: '验证码错误，验证失败',
                duration: 3000,
              });
            } else if (info['eventId']) events.emit(info.eventId);
          })
          .catch((error) => {
            console.log(error);
            ElNotification({
              type: 'error',
              message: '服务器错误，验证失败',
              duration: 3000,
            });
          });
    }

    return {
      email,
      code,
      count,
      countStr,
      input,
      deleteNum,
      submit,
      sendVCode,
    };
  },
});
</script>

<style lang="scss" scoped>
.email-verify {
  width: 100%;
  height: 100%;

  .email-verify-content {
    width: 100%;
    height: 195px;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .iconfont {
      font-size: 100px;
      line-height: 60px;
      color: $green-1;
    }

    .main-content {
      margin-top: 24px;
      font-size: 24px;
      color: $green-1;
    }

    .sub-content {
      margin-top: 20px;
      font-size: 14px;
      color: $grey-8;
    }

    .email-content {
      margin-top: 10px;
      margin-bottom: 23px;
      font-size: 14px;
      font-weight: bold;
      color: $grey-8;
    }
  }

  .email-verify-input {
    width: 100%;
    height: 140px;
    overflow: hidden;

    .content {
      width: 100%;
      height: 21px;
      text-align: center;
      line-height: 21px;
      font-size: 16px;
      color: $grey-8;
    }

    .input {
      margin-top: 11px;
      width: 100%;
      height: 50px;
      padding: 5px 30px;
      box-sizing: border-box;
      position: relative;

      .input-input {
        position: absolute;
        top: 5px;
        left: 30px;
        width: 290px;
        height: 40px;
        appearance: none;
        outline: none;
        caret-color: #ffffff;
        opacity: 0;
        z-index: 50;
      }

      .input-frame {
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        border: 2px solid $grey-5;
        border-radius: $border-radius-1;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        margin-right: 10px;
        transition: 0.4s;
        color: $green-1;
        font-size: 20px;
        // font-weight: bold;

        &:last-child {
          margin-right: 0;
        }

        &.input-frame-active {
          box-shadow: $shadow-2;
          border-color: $green-1;
        }
      }
    }

    .other {
      width: 100%;
      height: 19px;
      line-height: 19px;
      font-size: 14px;
      margin-top: 15px;

      .right {
        height: 100%;
        float: right;
        color: $green-0;
        transition: all 0.4s;

        &:hover {
          color: $green-1;
        }

        &.disable {
          color: $grey-8;

          &:hover {
            color: $grey-10;
          }
        }
      }
    }
  }

  .email-verify-button {
    width: 100%;
    height: 45px;
    overflow: hidden;
  }
}
</style>
