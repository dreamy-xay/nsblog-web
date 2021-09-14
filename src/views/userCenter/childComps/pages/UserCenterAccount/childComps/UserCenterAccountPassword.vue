<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-26 15:11:17
 * @LastEditors: Ban
 * @LastEditTime: 2021-09-14 21:11:15
-->
<template>
  <div @click="init">{{ title }}</div>

  <n-modal
    :title="title"
    :show="showModal"
    preset="card"
    style="width : 400px"
    closable
    @close="showModal = false"
  >
    <div class="user-center-account-change">
      <div v-if="title === '修改密码'">
        <div>原密码
          <user-center-input
            placeholder="原密码"
            v-model="oldPassword"
            clearable
            class="input"
            :maxlength="255"
            @enter="submit"
          >
          </user-center-input>
        </div>
        <div>新密码
          <user-center-input
            placeholder="新密码"
            v-model="password"
            showPassword
            ref="passwordInput"
            :maxlength="255"
            :verify="verifyPassword"
            @enter="passwordEnter"
          >
          </user-center-input>
        </div>
        <div>确认新密码
          <user-center-input
            placeholder="确认新密码"
            v-model="confirmedPassword"
            showPassword
            ref="confirmedPasswordInput"
            :maxlength="255"
            :verify="verifyConfirmedPassword"
            @enter="submit"
          >
          </user-center-input>
        </div>
      </div>
      <div v-else-if="title === '换绑邮箱' || title === '绑定邮箱'">
        <div>邮箱</div>
        <user-center-input
          placeholder="邮箱"
          v-model="oldData"
          clearable
          class="input"
        >
        </user-center-input>
        <div>验证码</div>
        <user-center-input
          placeholder="验证码"
          v-model="newData1"
          clearable
          class="input"
          style="width: 200px; margin-right: 20px"
        >
        </user-center-input>
        <el-button>发送验证码</el-button>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <div
          role="button"
          @click="submit"
          class="button"
        >确 定</div>
        <div
          role="button"
          @click="showModal = false"
          class="button"
        >取 消</div>
      </span>
    </template>
  </n-modal>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput';
import { forgotPasswordChange } from '@/network/api/user';
import events from '@/events';
import { useMessage } from 'naive-ui';
import router from '@/router';
import { mapState } from '@/util/store';
/**
 * @description:
 * @param {*}
 * @return {*}
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
    const showModal = ref(false);
    const oldPassword = ref('');
    const password = ref(''); // 密码
    const confirmedPassword = ref(''); // 验证密码（重复密码）

    const passwordInput = ref(null); // 密码ref
    const confirmedPasswordInput = ref(null); // 验证密码ref
    const msg = useMessage(); // naive-ui mssage
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const email = tokenInfo.value.email;
    //获取元素高度
    // const dialogHeight = computed(() => {
    //   return this.$refs.elDialog.offsetHeight;
    // });

    /**
     * @description: 账号输入框按下回车键执行函数
     * @return {void}
     * @author: dreamy-xay
     */
    function passwordEnter() {
      confirmedPassword.value !== '' ? submit() : confirmedPasswordInput.value.userCenterInput.focus();
    }

    function submit() {
      let success = true; // 所填信息是否有效
      if (password.value === '' || !passwordInput.value.check({ message: '密码超过8位且由大小写字母数字构成' }))
        success = false;
      if (confirmedPassword.value === '' || !confirmedPasswordInput.value.check({ message: '密码不一致' }))
        success = false;
      // console.log('change password');
      // 如果验证成功
      if (success) {
        // 修改密码
        forgotPasswordChange(tokenInfo.value.username, password.value, oldPassword.value)
          .then(() => {
            console.log('success');

            // // 路由跳转
            // router.push({
            //   name: 'success',
            //   params: {
            //     // email,
            //     // eventId,
            //     mainContent: '您已成功重置密码',
            //     subContent: '请仔细保管好您的账户信息，重新登录确认账户信息',
            //   },
            // });
            // 一次性事件绑定
          })
          .catch((error) => {
            console.log(error);
            msg.error('重置密码失败', { duration: 3000, closable: true });
          });
      }
    }
    /**
     * @description: 验证密码，由大小写字母和数字组成，且大于8位
     * @param {string} password 密码 `必传参数`
     * @return {boolean} 是否验证成功
     * @author: dreamy-xay
     */
    function verifyPassword(password) {
      if (password === '') return true;
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
      if (confirmedPassword === '') return true;
      return confirmedPassword === password.value;
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
     * @description: 换行
     * @author: Ban
     */
    // function IFocus() {
    //   passwordInput.value.loginInput.focus();
    //   console.log('11111');
    // }
    return {
      showModal,
      password,
      confirmedPassword,
      passwordInput,
      confirmedPasswordInput,
      oldPassword,
      submit,
      init,
      verifyPassword,
      verifyConfirmedPassword,
      passwordEnter,
      // IFocus,
    };
  },
});
</script>

<style lang='scss' scoped>
.user-center-account-change {
  div {
    padding: 5px 0;
  }
}
.button {
  background: $green-0;
  border: none;
  color: $grey-0;
  font-size: 16px;
  display: inline-block;
  margin-right: 48px;
  height: 36px;
  line-height: 36px;
  padding: 0 14px;
  border-radius: $border-radius-0;
  transition: 0.25s;

  &:hover {
    background: $green-1;
  }
}
</style>
<style lang="scss">
.el-overlay {
  cursor: default;
}
</style>
