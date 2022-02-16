<!--
 * @Description: 登录日志界面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-24 18:17:15
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-13 15:33:24
-->
<template>
  <n-modal
    display-directive="show"
    :show="isShow"
    @update:show="close"
  >

    <div class="user-center-login">
      <div class="user-center-login-top">
        <div class="title">若发现异常登录，请尽快修改密码</div>
        <div
          class="close"
          role="button"
          @click="close"
        ><i class="iconfont blog-close"></i></div>
      </div>

      <div
        v-for="(item, index) in LogData"
        :key="index"
        class="user-center-login-context"
        :class="index % 2 ? '' : 'color'"
      >
        <div class="time">{{item.time}}</div>
        <div class="content">{{item.content}}</div>
        <div class="ip">{{item.ip}}</div>
      </div>

    </div>
  </n-modal>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { getLogs } from '@/network/api/log';
import { useMessage } from 'naive-ui';

/**
 * @description: 登录日志界面
 * @param {Boolean} isShow 是否显示登录日志界面 `默认为false`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'userCenterAccountLoginRecord',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui 组件
    const LogData = reactive([]); // 登录日志数据

    // 获取登录日志数据
    getLogs()
      .then((data) => {
        LogData.splice(0, 0, ...data.logs);
        console.log(LogData);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取登录日志失败');
      });

    /**
     * @description: 点击关闭触发函数
     * @author: Z_Y_C
     */
    function close() {
      context.emit('update:isShow', false);
    }

    return { LogData, close };
  },
});
</script>

<style lang="scss" scoped>
.user-center-login {
  width: 597px;
  height: 493px;
  background-color: $grey-0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  padding: 24px;

  .user-center-login-top {
    @include flex(center, center);
    position: relative;
    width: 100%;
    height: 21px;
    margin-bottom: 24px;

    .title {
      line-height: 21px;
      font-size: 16px;
      color: $grey-11;
      font-weight: 700;
    }

    .close {
      position: absolute;
      right: 0;
      height: 16px;
      line-height: 16px;
      color: $grey-7;
      transition: 0.25s;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
      }
    }
  }

  .user-center-login-context {
    width: calc(100% - 32px);
    height: 40px;
    background-color: $grey-0;
    border-radius: $border-radius-0;
    padding: 0 16px;
    @include flex(center);
    font-size: 14px;
    color: $grey-7;

    .time {
      width: 40%;
      text-align: left;
    }

    .content {
      width: 20%;
      text-align: center;
    }

    .ip {
      width: 40%;
      text-align: right;
    }
  }

  .color {
    background-color: $grey-2;
  }
}
</style>
