<!--
 * @Description: 我的消息页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-18 12:49:53
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-20 22:42:36
-->

<template>
  <div
    class="message-my"
    v-if="isLogin"
  >
    <message-my-friend
      ref="firendListRef"
      :friend-list="friendList"
      @clickItem="clickItem"
      @deleteItem="deleteItem"
    />
    <message-my-content
      :data="activeDialogueData"
      @recordToTop="recordToTop"
    />
    <base-modal
      content="删除就没有咯(⊙o⊙)"
      confirmeText="确认删除"
      :show="modalShow"
      @confirm="modalClick(true)"
      @cancel="modalClick(false)"
    />
  </div>
  <message-empty v-else />
</template>
<script>
import { defineComponent, ref, reactive, computed } from 'vue';
import MessageMyFriend from '@/views/message/childComps/pages/messageMy/childComps/MessageMyFriend.vue';
import MessageMyContent from '@/views/message/childComps/pages/messageMy/childComps/MessageMyContent.vue';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import { getDialogue, deleteDialogue } from '@/network/api/dialogues';
import { mapGetters } from '@/util/store';
import { useMessage } from 'naive-ui';
import events from '@/events';

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
    BaseModal,
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

    // 激活对话消息
    const activeDialogueData = reactive({
      avatar: '',
      friendAvatar: '',
      friendNickname: '',
      records: [],
    });
    const modalShow = ref(false); // 是否显示模态框
    let deleteItemCallback = null; // 当前删除操作索引

    let offset = 0; // 对话获取偏移量

    // 如果已登录则获取消息
    if (isLogin.value)
      getDialogue()
        .then((data) => {
          dialogues.splice(0, 0, ...data.dialogues);
          activeDialogueData.avatar = data.avatar;
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
      dialogues[index].count = 0;
      activeDialogueData.friendNickname = dialogues[index].nickname;
      activeDialogueData.friendAvatar = dialogues[index].avatar;
      activeDialogueData.records.splice(0, activeDialogueData.records.length, ...dialogues[index].records);
      // 滚动到最底部
      events.emit('DialogueRecord-scrollToBottom');
    }

    /**
     * @description: 删除单条对话消息
     * @param {number} index 对于对话好友数组索引 `子组件回调参数`
     * @param {Function} next 回调下一步函数 `子组件回调参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function deleteItem(index, next) {
      modalShow.value = true;
      deleteItemCallback = () => {
        deleteDialogue(dialogues[index].username)
          .then(() => {
            next((isEqual) => {
              if (isEqual) {
                activeDialogueData.friendNickname = '';
                activeDialogueData.records.splice(0, activeDialogueData.records.length);
              }
            });
            dialogues.splice(index, 1);
          })
          .catch((error) => {
            console.log(error);
            msg.error('删除对话失败，请重试', { duration: 2000, closable: true });
          });
        deleteItemCallback = null;
      };
    }

    /**
     * @description: 点击弹出框按钮后触发
     * @param {boolean} isConfirm 是否确认删除 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function modalClick(isConfirm) {
      modalShow.value = false;
      if (isConfirm) deleteItemCallback && deleteItemCallback();
    }

    const firendListRef = ref(null);
    /**
     * @description: 对话记录滚动到最顶部
     * @return {void}
     * @author: dreamy-xay
     */
    function recordToTop() {
      const index = firendListRef.value.activeIndex;
      console.log(index);
    }

    return {
      isLogin,
      friendList,
      clickItem,
      deleteItem,
      activeDialogueData,
      modalShow,
      modalClick,
      recordToTop,
      firendListRef,
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
