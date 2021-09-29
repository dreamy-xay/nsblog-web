<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:57:42
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-27 20:27:52
-->
<template>
  <div class="user-center-account">
    <div class="user-center-account-header text">
      账号安全
    </div>
    <div
      class="user-center-account-body text"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="body-left">
        {{item.left}}
      </div>
      <div class="body-center">
        {{item.center}}
      </div>
      <div
        class="body-right"
        role="button"
        @click="openPage(index)"
      >
        {{item.right}}
      </div>
    </div>
    <user-center-account-password v-model:isShow="showPage[0]" />
    <user-center-account-email v-model:isShow="showPage[1]" />
    <user-center-account-login-record v-model:isShow="showPage[4]" />

  </div>
</template>

<script>
import { defineComponent, computed, ref, reactive } from 'vue';
import { getUserInfo } from '@/network/api/user';
import { mapState } from '@/util/store';
import UserCenterAccountPassword from '@/views/userCenter/childComps/pages/UserCenterAccount/childComps/UserCenterAccountPassword.vue';
import UserCenterAccountEmail from '@/views/userCenter/childComps/pages/UserCenterAccount/childComps/UserCenterAccountEmail.vue';
import UserCenterAccountLoginRecord from '@/views/userCenter/childComps/pages/UserCenterAccount/childComps/UserCenterAccountLoginRecord.vue';
import { useMessage } from 'naive-ui';

/**
 * @description:
 * @author: Ban
 */

export default defineComponent({
  name: 'userCenterAccount',
  components: {
    UserCenterAccountPassword,
    UserCenterAccountEmail,
    UserCenterAccountLoginRecord,
  },
  setup() {
    const email = ref(''); //邮箱
    const weibo = ref(''); // 微博
    const qq = ref(''); // QQ
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const message = useMessage();
    const showPage = reactive([false, false, false, false, false, false]); // 是否显示页面

    /**
     * @description: 获取用户相关信息
     * @author: Ban
     */
    if (tokenInfo.value.status) {
      getUserInfo(tokenInfo.value.username, 2)
        .then((data) => {
          email.value = data.email;
          if (data.weibo) weibo.value = '已授权绑定微博';
          if (data.qq) qq.value = '已授权绑定QQ';
        })
        .catch((error) => {
          console.log(error);
          message.error('数据加载异常，请刷新页面！', { duration: 3000, closable: true });
        });
    }

    const list = computed(() => {
      return [
        {
          left: '密码',
          center: '',
          right: '修改密码',
        },
        {
          left: '绑定邮箱',
          center: email.value == '' ? '未绑定' : email.value,
          right: email.value === '' ? '绑定邮箱' : '换绑邮箱',
        },
        {
          left: '绑定微博',
          center: weibo.value == '' ? '未绑定' : weibo.value,
          right: weibo.value === '' ? '绑定微博' : '解除绑定',
        },
        {
          left: '绑定QQ帐号',
          center: qq.value == '' ? '未绑定' : qq.value,
          right: qq.value === '' ? '绑定QQ' : '解除绑定',
        },
        {
          left: '登录记录',
          center: '',
          right: '查看记录',
        },
        {
          left: '帐号注销',
          center: '',
          right: '立即注销',
        },
      ];
    });

    /**
     * @description: 打开页面
     * @param {number} index 数组下标
     * @return {void}
     * @author: Z_Y_C
     */
    function openPage(index) {
      showPage[index] = true;
    }

    return {
      list,
      openPage,
      showPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-center-account {
  width: 926px;
  @include flex(initial, center, column);

  .user-center-account-header {
    height: 42px;
    line-height: 42px;
    color: $grey-7;
    user-select: none;
    font-size: 17px;
    margin-bottom: 8px;
  }

  .user-center-account-body {
    height: 53px;
    display: flex;
    flex-direction: row;
    margin: 8px 0;
    font-size: 16px;

    .body-left {
      @include flex(center);
      width: 100px;
    }

    .body-center {
      @include flex(center, center);
      flex: 1;
      color: $grey-7;
    }

    .body-right {
      @include flex(center, flex-end);
      width: 100px;
      color: $green-0;
      transition: 0.25s;

      &:hover {
        color: $green-1;
      }
    }
  }

  .text {
    background: $grey-0;
    border-radius: $border-radius-0;
    box-sizing: border-box;
    padding: 0 16px;
    box-shadow: $shadow-0;
  }
}
</style>
