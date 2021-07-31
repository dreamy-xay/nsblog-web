<!--
 * @Description:消息页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-28 13:11:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-07-30 23:26:26
-->
<template>

  <div :class="'message'">
    <div class='message-center'>
      <div class="message-center-left">
        <!-- 由MessageLeft组件传输数据到父组件 -->
        <message-menu @sendMsg="sendMsg"></message-menu>
      </div>
      <div class="message-center-right">
        <!-- 由MessageLeft组件传输数据到父组件，再将该数据传输到MessageTop子组件 -->
        <message-top :messagetag="messagetag"> -->
        </message-top>
        <div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import MessageMenu from '@/views/message/childComps/MessageMenu';
import MessageTop from '@/views/message/childComps/MessageTop';

/**
 * @description: 消息页面
 * @param {*}
 * @return {*}
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'message',
  components: {
    MessageMenu,
    MessageTop,
  },
  setup(props, context) {
    const messagetag = ref('');
    /**
     * @description: 绑定子组件，将子组件的数据传输到父组件
     * @param {value} 得到该页面名称
     * @return {*}
     * @author: Z_Y_C
     */
    const sendMsg = (value) => {
      messagetag.value = value;
    };
    return {
      messagetag,
      sendMsg,
    };
  },
});
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  height: 100%;
  overflow: auto;

  .message-center {
    width: 1154px;
    margin: 0 auto;
    display: flex;
    overflow: hidden;

    .message-center-left {
      width: 146px;
      background-color: transparent;
    }

    .message-center-right {
      width: 1008px;
      background-color: transparent;
    }
  }
}
</style>
