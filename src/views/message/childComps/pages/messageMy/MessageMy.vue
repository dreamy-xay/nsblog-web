<!--
 * @Description: 我的消息页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-18 12:49:53
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-18 22:00:29
-->

<template>
  <div
    class="message-my"
    v-if="isLogin"
  >
    <message-my-friend
      :friend-list="friendList"
      @clickItem="clickItem"
      @deleteItem="deleteItem"
    />
    <message-my-content
      :name="activeDialogueNickname"
      :data="activeDialogueRecords"
    />
  </div>
  <message-empty v-else />
</template>
<script>
import { defineComponent, ref, reactive, computed } from 'vue';
import MessageMyFriend from '@/views/message/childComps/pages/messageMy/childComps/MessageMyFriend.vue';
import MessageMyContent from '@/views/message/childComps/pages/messageMy/childComps/MessageMyContent.vue';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';
import { getDialogue, deleteDialogue } from '@/network/api/dialogues';
import { mapGetters } from '@/util/store';
import { useMessage } from 'naive-ui';

/**
 * @description: 我的消息页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'messageMy',
  components: {
    MessageMyFriend,
    MessageMyContent,
    MessageEmpty,
  },
  setup() {
    const msg = useMessage(); // naivue-ui message
    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录
    const dialogues = reactive([]); // 所有对话记录

    // 我的消息列表
    const friendList = computed(() => {
      const ans = [];
      for (let item of dialogues) {
        ans.push({
          username: item.username,
          nickname: item.nickname,
          avatar: item.avatar,
          count: item.count,
          content: item.records.length ? item.records[0].content : '',
        });
      }
      return ans;
    });

    const activeDialogueNickname = ref(''); // 激活对话用户名
    const activeDialogueRecords = reactive(); // 激活对话消息

    // 如果已登录则获取消息
    if (isLogin.value)
      getDialogue()
        .then((data) => {
          dialogues.splice(0, 0, ...data.dialogues);
        })
        .catch((error) => {
          console.log(error);
        });

    /**
     * @description: 点击好友对话项时触发
     * @param {number} index 对于对话好友数组索引 `子组件回调参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickItem(index) {
      activeDialogueNickname.value = dialogues[index].nickname;
      activeDialogueRecords.splice(0, activeDialogueRecords.length, dialogues[index].records);
    }

    /**
     * @description: 删除单条对话消息
     * @param {number} index 对于对话好友数组索引 `子组件回调参数`
     * @param {Function} next 回调下一步函数 `子组件回调参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function deleteItem(index, next) {
      deleteDialogue(dialogues[index].username)
        .then(() => {
          dialogues.splice(index, 1);
          next();
        })
        .catch((error) => {
          console.log(error);
          msg.error('删除对话失败，请重试', { duration: 2000, closable: true });
        });
    }

    return {
      isLogin,
      friendList,
      clickItem,
      deleteItem,
      activeDialogueNickname,
      activeDialogueRecords,
    };
  },
});
</script>

<style lang="scss" scoped>
.message-my {
  width: 992px;
  height: calc(100vh - 128px);
  margin: 10px 0 10px 10px;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;
  overflow: hidden;
  @include flex(center, center);
}
</style>
