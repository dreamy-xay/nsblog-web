<!--
 * @Description: 重置密码
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-26 15:11:17
 * @LastEditors: Ban
 * @LastEditTime: 2021-09-16 20:48:05
-->
<template>
  <div class="user-center-account-change">
    <div
      @click="init"
      class="user-center-account-change-title"
    >
      {{title}}
    </div>
    <n-modal
      :title="title"
      :show="showModal"
      class="user-center-account-change-modal"
      preset="card"
      style="width : 400px"
      :closable="true"
      @close="showModal = false"
    >
      <div class="user-center-account-change-inner">
        <div v-if="title === '修改密码'">
          <div>原密码
            <user-center-input
              placeholder="原密码"
              ref="oldPasswordInput"
              v-model="oldPassword"
              :clearable="true"
              :show-password="true"
              class="input"
              type="password"
              :verify="verifyOldPassword"
              :maxlength="30"
              @enter="passwordEnter"
            >
            </user-center-input>
          </div>
          <div>新密码
            <user-center-input
              placeholder="新密码"
              v-model="password"
              :show-password="true"
              type="password"
              ref="passwordInput"
              :maxlength="30"
              :verify="verifyPassword"
              @enter="passwordEnter"
            >
            </user-center-input>
          </div>
          <div>确认新密码
            <user-center-input
              placeholder="确认新密码"
              v-model="confirmedPassword"
              :show-password="true"
              type="password"
              ref="confirmedPasswordInput"
              :maxlength="30"
              :verify="verifyConfirmedPassword"
              @enter="submit"
            >
            </user-center-input>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="user-center-account-change-footer">
          <div
            role="button"
            @click="submit"
          >确定</div>
          <div
            role="button"
            @click="closeModal"
          >取消</div>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput';
import { forgotPasswordChange } from '@/network/api/user';
import { useMessage } from 'naive-ui';
import router from '@/router';
import { mapState } from '@/util/store';
import { clearToken } from '@/network/token';

/**
 * @description: 重置密码
 * @param {String} title 标题内容 `必传参数`
 * @author: Ban
 */

export default defineComponent({
  name: 'UserCenterAccountChange',
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
    const showModal = ref(false); // 是否显示修改密码模态框
    const oldPassword = ref(''); // 老密码
    const password = ref(''); // 密码
    const confirmedPassword = ref(''); // 验证密码（重复密码）

    const oldPasswordInput = ref(null); // 老密码ref
    const passwordInput = ref(null); // 密码ref
    const confirmedPasswordInput = ref(null); // 验证密码ref
    const msg = useMessage(); // naive-ui mssage
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo

    /**
     * @description: 账号输入框按下回车键执行函数
     * @return {void}
     * @author: dreamy-xay
     */
    function passwordEnter() {
      if (password.value === '') password.value.userCenterInput.focus();
      else if (confirmedPassword.value === '') confirmedPasswordInput.value.userCenterInput.focus();
      else submit();
    }

    /**
     * @description: 递交注册
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      let success = true; // 所填信息是否有效
      if (!oldPasswordInput.value.check({ message: '原密码错误' })) success = false;
      if (!passwordInput.value.check({ message: '新密码不能和原密码相同且超过8位并由大小写字母数字构成' }))
        success = false;
      if (!confirmedPasswordInput.value.check({ message: '确认密码不一致' })) success = false;

      // 如果验证成功
      if (success) {
        // 修改密码
        forgotPasswordChange(tokenInfo.value.username, password.value, oldPassword.value)
          .then(() => {
            clearToken();
            msg.loading('修改成功，正在跳转到登录界面', { duration: 2000, closable: true });
            setTimeout(() => {
              router.push({ name: 'signIn' });
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response.status);
            if (error.response.status === 403) msg.error('原密码错误', { duration: 2000, closable: true });
            else msg.error('重置密码失败', { duration: 2000, closable: true });
          });
      }
    }

    /**
     * @description: 验证原密码，由大小写字母和数字组成，且大于8位
     * @param {string} password 密码 `必传参数`
     * @return {boolean} 是否验证成功
     * @author: dreamy-xay
     */
    function verifyOldPassword(password) {
      const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/;
      return passwordReg.test(password);
    }

    /**
     * @description: 验证新密码，由大小写字母和数字组成，且大于8位，不同于原密码
     * @param {string} password 密码 `必传参数`
     * @return {boolean} 是否验证成功
     * @author: dreamy-xay
     */
    function verifyPassword(password) {
      const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/;
      return passwordReg.test(password) && password !== oldPassword.value;
    }

    /**
     * @description: 验证重复密码
     * @param {string} confirmedPassword 重复密码 `必传参数`
     * @return {boolean} 是否验证成功
     * @author: dreamy-xay
     */
    function verifyConfirmedPassword(confirmedPassword) {
      return (
        confirmedPassword === password.value && confirmedPassword !== '' && confirmedPassword !== oldPassword.value
      );
    }

    /**
     * @description: 初始化（清空数据）
     * @author: Ban
     */
    function init() {
      showModal.value = true;
      password.value = '';
      confirmedPassword.value = '';
      oldPassword.value = '';
    }

    /**
     * @description: 关闭模态框
     * @return {void}
     * @author: dreamy-xay
     */
    function closeModal() {
      showModal.value = false;
    }

    return {
      showModal,
      password,
      confirmedPassword,
      oldPasswordInput,
      passwordInput,
      confirmedPasswordInput,
      oldPassword,
      submit,
      init,
      verifyOldPassword,
      verifyPassword,
      verifyConfirmedPassword,
      passwordEnter,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-center-account-change-modal {
  .user-center-account-change-inner {
    width: 100%;
    @include flex(initial, center, column);

    div {
      padding: 5px 0;
    }
  }

  .user-center-account-change-footer {
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
