<!--
 * @Description: 帐号安全-绑定邮箱
 * @Version:
 * @Autor: Ban
 * @Date: 2021-09-14 19:08:58
 * @LastEditors: Ban
 * @LastEditTime: 2021-09-27 15:10:17
-->
<template>
  <div class="user-center-account-email">
    <div
      @click="init"
      class="user-center-account-change-title"
    >
      {{title}}
    </div>
    <n-modal
      :title="title"
      :show="showModal"
      class="user-center-account-email-modal"
      preset="card"
      style="width : 400px"
      :closable="true"
      @close="close"
    >
      <div class="user-center-account-email-inner">
        <div>邮箱
          <user-center-input
            placeholder="邮箱"
            :clearable="true"
            ref="emailInput"
            v-model="email"
            :verify="verifyEmail"
            @enter="emailEnter"
          >
          </user-center-input>
        </div>
        <div>验证码
          <div class="verification">
            <user-center-input
              placeholder="验证码"
              style="width: 200px; margin: 0px;"
              :maxlength="6"
              v-model="verificationCode"
              ref="verificationCodeInput"
              @enter="verificationCodeEnter"
              :verify="verifyVerificationCode"
            >
            </user-center-input>
            <div
              class="verification-code"
              role="button"
              @click="sendVerificationCode"
            >
              {{verificationCodeContent}}
            </div>
          </div>

        </div>

      </div>
      <template #footer>
        <div class="user-center-account-email-footer">
          <div
            role="button"
            @click="submit"
          >确定</div>
          <div
            role="button"
            @click="close"
          >取消</div>
        </div>
      </template>
    </n-modal>

  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput.vue';
import { useMessage } from 'naive-ui';
import { emailSendVCode } from '@/network/api/user';
import { emailValidate } from '@/network/api/user';
/**
 * @description: 帐号安全-绑定邮箱
 * @param {String} title 标题内容 `必传参数`
 * @author: Ban
 */
export default defineComponent({
  name: 'UserCenterAccountEmail',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    UserCenterInput,
  },
  setup() {
    const showModal = ref(false); // 是否显示模态框
    const email = ref(''); //邮箱
    const verificationCode = ref(''); //验证码

    const emailInput = ref(''); //邮箱ref
    const verificationCodeInput = ref(''); //验证码ref
    const verificationCodeCount = ref(0); //计时器
    const message = useMessage();
    const verificationCodeContent = computed(() => {
      return verificationCodeCount.value === 0 ? '发送验证码' : verificationCodeCount.value;
    });
    /**
     * @description: 初始化（清空数据）
     * @author: Ban
     */
    function init() {
      showModal.value = true;
      email.value = '';
      verificationCode.value = '';
    }

    /**
     * @description: 邮箱输入框按下回车键执行函数
     * @return {void}
     * @author: Ban
     */
    function emailEnter() {
      if (email.value === '') emailInput.value.userCenterInput.focus();
      else if (verificationCode.value === '') verificationCodeInput.value.userCenterInput.focus();
      else submit();
    }

    /**
     * @description: 验证码输入框按下回车键执行函数
     * @return {void}
     * @author: Ban
     */
    function verificationCodeEnter() {
      if (verificationCode.value === '') verificationCodeInput.value.userCenterInput.focus();
      else submit();
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
     * @description: 验证验证码
     * @param {String} verificationCode 验证码 `必传参数`
     * @return {boolen} 是否验证成功
     * @author: Ban
     */
    function verifyVerificationCode(code) {
      const codeReg = /^\d{6}$/;
      return codeReg.test(code);
    }

    /**
     * @description: 计数器
     * @return {void}
     * @author: dreamy-xay
     */
    function startTime() {
      verificationCodeCount.value = 60;
      const timer = setInterval(() => {
        --verificationCodeCount.value;
        if (verificationCodeCount.value === 0) clearInterval(timer);
      }, 1000);
    }

    /**
     * @description: 发送验证码
     * @param {String} 邮箱
     * @return {void}
     * @author: Ban
     */
    function sendVerificationCode() {
      const emailStuts = verifyEmail(email.value); //邮箱是否有效
      if (emailStuts && verificationCodeCount.value === 0) {
        let loading = message.loading('验证码发送中', { duration: 0 });
        //发送验证码
        emailSendVCode(email.value, {
          afterResopnse() {
            loading.destroy();
          },
        })
          .then(() => {
            startTime();
          })
          .catch((error) => {
            console.log(error);
            message.error('发送失败', { duration: 3000, closable: true });
          });
      } else if (!emailStuts) {
        message.error('请检查邮箱是否正确。', { duration: 3000, closable: true });
        emailInput.value.userCenterInput.focus();
      } else {
        message.error(`请${verificationCodeCount.value}秒后再试一次`, { duration: 3000, closable: true });
      }
    }

    /**
     * @description: 提交
     * @return {void}
     * @author: Ban
     */
    function submit() {
      let success = true; //所填信息是否有效
      if (!emailInput.value.check({ message: '请输入有效邮箱' })) success = false;
      else if (verificationCode.value.length < 6) {
        message.error('请输入有效验证码', { duration: 3000, closable: true });
        success = false;
      }
      if (success) {
        emailValidate(email.value, verificationCode.value)
          .then(() => {
            message.success('修改成功', { duration: 3000, closable: true });
            showModal.value = false;
          })
          .catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 403)
              message.error('验证码错误，验证失败', { duration: 3000, closable: true });
            else message.error('服务器错误，验证失败', { duration: 3000, closable: true });
          });
      }
    }

    /**
     * @description: 关闭模态框
     * @return {void}
     * @author: Ban
     */
    function close() {
      showModal.value = false;
    }
    return {
      showModal,
      init,
      verifyEmail,
      email,
      emailInput,
      verificationCode,
      verificationCodeInput,
      verificationCodeCount,
      sendVerificationCode,
      verificationCodeContent,
      close,
      submit,
      emailEnter,
      verificationCodeEnter,
      verifyVerificationCode,
    };
  },
});
</script>

<style lang='scss' scoped>
.user-center-account-email-modal {
  .user-center-account-email-inner {
    @include flex(initial, center, column);
    div {
      padding: 5px 0;
    }
    .verification {
      @include flex();
      .verification-code {
        @include flex(center, center);
        margin-top: 3px;
        margin-left: 20px;
        height: 24px;
        width: 80px;
        border: 1px solid $green-0;
        border-radius: $border-radius-0;
        color: $grey-0;
        background: $green-0;
        transition: 0.25s;

        &:hover {
          background: $green-1;
        }
      }
    }
  }

  .user-center-account-email-footer {
    height: 30px;
    width: 100%;
    @include flex(center, flex-end);

    div {
      height: 100%;
      @include flex(center);
      padding: 0 15px;
      background-color: $green-0;
      transition: 0.25s;
      box-shadow: $shadow-0;
      color: $grey-0;
      border-radius: $border-radius-0;
      letter-spacing: 1px;

      &:hover {
        background-color: $green-1;
      }

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
