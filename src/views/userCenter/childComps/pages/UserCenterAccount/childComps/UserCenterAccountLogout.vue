<!--
 * @Description: 账号注销
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-13 15:32:53
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-14 15:16:16
-->
<template>
  <div>
    <n-modal
      :show="isShow"
      class="user-center-account-logout"
      preset="card"
      :style="{width: '400px'}"
      :closable="true"
      @close="closeModal"
    >
      <template #header>请验证您的身份</template>
      <div class="user-center-account-logout-text">
        账号
      </div>
      <user-center-input
        ref="usernameInput"
        :placeholder="'请输入账号'"
        :type="'text'"
        v-model="username"
        @enter="usernameEnter"
      ></user-center-input>

      <div class="user-center-account-logout-text">
        密码
      </div>
      <user-center-input
        ref="passwordInput"
        :placeholder="'请输入密码'"
        :type="'password'"
        v-model="password"
        :showPassword="true"
        @enter="passwordEnter"
      ></user-center-input>
      <template #footer>
        <div class="user-center-account-logout-footer">
          <div
            role="button"
            @click="beforeSubmit"
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
import { defineComponent, computed, ref, reactive } from 'vue';
import { getUserInfo } from '@/network/api/user';
import { mapState } from '@/util/store';
import { useDialog, useMessage } from 'naive-ui';
import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput.vue';
import { authLogoff } from '@/network/api/auth';
import { clearToken } from '@/network/token';
import router from '@/router';

export default defineComponent({
  name: 'UserCenterAccountLogout',
  components: {
    UserCenterInput,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const dialog = useDialog(); // 对话框api
    const username = ref(''); // 账号
    const usernameInput = ref(null); // 账号框ref
    const password = ref(''); // 密码
    const msg = useMessage(); //消息框api
    const passwordInput = ref(null); // 密码框ref

    /**
     * @description: 关闭模态框
     * @return {*}
     * @author: Ban
     */
    function closeModal() {
      context.emit('update:isShow', false);
      password.value = '';
    }

    /**
     * @description: 提交
     * @return {*}
     * @author: Ban
     */
    function submit() {
      let success = true; // 所填信息是否有效
      if (password.value === '') success = false;

      // 如果验证成功
      if (success) {
        // 修改密码
        authLogoff(password.value)
          .then(() => {
            clearToken();
            msg.loading('注销成功，正在跳转到登录界面', { duration: 2000, closable: true });
            setTimeout(() => {
              router.push({ name: 'signIn' });
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response.status);
            msg.error('注销失败', { duration: 2000, closable: true });
          });
      }
    }
    /**
     * @description: 确认注销
     * @return {*}
     * @author: Ban
     */
    function beforeSubmit() {
      if (username.value == tokenInfo.value.username)
        dialog.success({
          title: '警告',
          content: '注销不可逆，确定注销？',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            submit();
          },
          showIcon: false,
        });
      else {
        msg.error('账号不匹配');
      }
    }

    /**
     * @description: 密码框按下回车执行函数
     * @return {*}
     * @author: Ban
     */
    function passwordEnter() {
      if (password.value === '');
      else beforeSubmit();
    }

    /**
     * @description: 账号框按下回车执行函数
     * @return {*}
     * @author: Ban
     */
    function usernameEnter() {
      if (username.value === '');
      else if (password.value === '') passwordInput.value.userCenterInput.focus();
      else beforeSubmit();
    }
    return {
      closeModal,
      password,
      passwordInput,
      beforeSubmit,
      passwordEnter,
      submit,
      username,
      usernameInput,
      usernameEnter,
    };
  },
});
</script>

<style lang='scss' scoped>
.user-center-account-logout {
  .user-center-account-logout-text {
    margin: 10px 0;
  }

  .user-center-account-logout-footer {
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
