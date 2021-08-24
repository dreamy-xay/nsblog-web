<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:57:42
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-24 21:24:59
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
        {{ item.left }}
      </div>
      <div class="body-center">
        {{ item.center }}
      </div>
      <a
        class="body-right"
        role="button"
      >
        {{ item.right }}
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { getUserInfo, getPasswordStatus } from '@/network/api/user';
import { mapState } from '@/util/store';

/**
 * @description:
 * @param {*}
 * @return {*}
 * @author: Ban
 */
export default defineComponent({
  name: 'UserCenterAccount',
  setup() {
    let email = ref('');
    let weibo = ref('');
    let qq = ref('');
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    //获取数据
    if (tokenInfo.value.status) {
      getUserInfo(tokenInfo.value.username, 0)
        .then((data) => {
          if (0 !== data.email.length) email.value = data.email;

          if (0 !== data.weibo.length) weibo.value = '已授权绑定微博';

          if (0 !== data.qq.length) qq.value = '已授权绑定QQ';

          console.log(data);
        })
        .catch((error) => {
          console.log(error);
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
    return {
      list,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-center-account {
  width: 926px;

  .user-center-account-header {
    height: 42px;
    line-height: 42px;
    color: $grey-7;
    user-select: none;
    font-size: 17px;
  }

  .user-center-account-body {
    height: 53px;
    display: flex;
    margin: 16px 0;
    font-size: 16px;

    .body-left {
      width: 100px;
      box-sizing: border-box;
      padding: 14px 0;
    }

    .body-center {
      flex: 1;
      text-align: center;
      box-sizing: border-box;
      padding: 14px 0;
      color: $grey-7;
    }

    .body-right {
      width: 100px;
      box-sizing: border-box;
      margin: 14px 0;
      text-align: right;
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
