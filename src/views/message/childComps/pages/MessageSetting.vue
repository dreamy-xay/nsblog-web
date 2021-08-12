<!--
 * @Description:消息设置
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-28 13:02:11
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-10 20:32:50
-->
<template>
  <div
    class="message-setting"
    v-for="item,index in textmenu"
    :key="item.text1"
  >

    <div class="message-setting-text">
      <span class="message-setting-text1">{{item.text1}}</span>
      <span class="message-setting-text2">{{item.text2}}</span>
    </div>

    <div class="message-setting-radio">
      <el-radio-group
        v-model="messageData[index].value"
        @change="changeSetting(index)"
      >
        <el-radio
          :label="radio.value"
          v-for="radio in radiomenu[index]"
          :key='radio.value'
        >{{radio.lable}}
        </el-radio>
      </el-radio-group>
    </div>

  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { getMessageSetting, modifySetting } from '@/network/api/setting.ts';
/**
 * @description: 消息设置页面
 * @param {*}
 * @return {*}
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'messageSeting',
  setup() {
    const textmenu = [
      { text1: '消息提醒', text2: '（关闭后，所有消息将不再提醒）' },
      { text1: '评论消息提醒', text2: '（关闭后，将不再接收别人对我的评论提醒）' },
      { text1: '关注消息提醒', text2: '（关闭后，将不再接收别人对我的关注提醒）' },
      { text1: '点赞消息提醒', text2: '（关闭后，将不再接收别人对我的点赞提醒）' },
      { text1: '我的消息提醒', text2: '（接收谁发给我的消息提醒）' },
    ];

    const messageData = reactive([
      { key: 'message_prompt', value: 1 },
      { key: 'comment_message_prompt', value: 1 },
      { key: 'attention_message_prompt', value: 1 },
      { key: 'like_message_prompt', value: 1 },
      { key: 'chat_message_prompt', value: 1 },
    ]);

    const radiomenu = [
      [
        { lable: '开启', value: 1 },
        { lable: '关闭', value: 0 },
      ],
      [
        { lable: '开启', value: 1 },
        { lable: '关闭', value: 0 },
      ],
      [
        { lable: '开启', value: 1 },
        { lable: '关闭', value: 0 },
      ],
      [
        { lable: '开启', value: 1 },
        { lable: '关闭', value: 0 },
      ],
      [
        { lable: '所有人', value: 1 },
        { lable: '关注的人', value: 2 },
        { lable: '不接收任何消息', value: 3 },
      ],
    ];

    getMessageSetting()
      .then((data) => {
        messageData[0].value = data.message_prompt;
        messageData[1].value = data.comment_message_prompt;
        messageData[2].value = data.attention_message_prompt;
        messageData[3].value = data.like_message_prompt;
        messageData[4].value = data.chat_message_prompt;
      })
      .catch((error) => {
        console.log(error);
      });

    function changeSetting(index) {
      // console.log(index);
      // console.log(messageData[index].value);
      modifySetting(messageData[index].key);
    }

    return {
      textmenu,
      radiomenu,
      messageData,
      changeSetting,
    };
  },
});
</script>

<style lang='scss' scoped>
$border-radius0: $border-radius-0;
$shadow0: $shadow-0;
$grey10: $grey-10;
$grey7: $grey-7;
$grey0: $grey-0;
$green0: $green-0;
$green1: $green-1;
$shadow2: $shadow-2;

::v-deep(.el-radio) {
  color: $grey7;

  .el-radio__inner {
    width: 20px;
    height: 20px;
    background: transparent;
    box-sizing: border-box;
    border: 2px solid $grey7;
    border-color: $grey7;
    box-shadow: $shadow0;

    &::after {
      box-shadow: $shadow2;
      background-color: $green1;
      width: 10px;
      height: 10px;
    }
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: $green1;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background: $grey0;
    border-color: $green1;
    box-shadow: $shadow2;
  }
}

.message-setting {
  width: 944px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 16px 24px;
  background-color: $grey0;
  border-radius: $border-radius0;
  box-shadow: $shadow0;
  height: 50px;

  .message-setting-text {
    font-size: 16px;
    line-height: 21px;
    margin-bottom: 10px;

    .message-setting-text1 {
      color: $grey10;
    }

    .message-setting-text2 {
      color: $grey7;
    }
  }

  .message-setting-radio {
    font-size: 14px;
    line-height: 19px;
    color: $grey10;
  }
}
</style>
