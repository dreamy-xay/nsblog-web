<!--
 * @Description: 我的消息页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-18 12:49:53
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-25 18:33:58
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
      @editSubmit="editSubmit"
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
import { getDialogue, deleteDialogue, clearDialogue } from '@/network/api/dialogues';
import { mapGetters, mapActions, mapMutations } from '@/util/store';
import { useMessage } from 'naive-ui';
import events from '@/events';
import { dateFormat } from '@/util/date';

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
    const { updateMessageCount } = mapMutations('message', ['updateMessageCount']); // 更新消息数量

    // 进入初始化消息数量
    updateMessageCount({ type: 5, count: 0 });

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
      all: false,
    });
    const modalShow = ref(false); // 是否显示模态框
    let deleteItemCallback = null; // 当前删除操作索引

    const offset = new Map(); // 对应消息偏移量
    const limit = 20; // 每次获取对话数量
    // 如果已登录则获取消息
    if (isLogin.value)
      getDialogue(0, limit)
        .then((data) => {
          dialogues.splice(0, 0, ...data.dialogues);
          activeDialogueData.avatar = data.avatar; // 当前聊天对象头像

          // 设置偏移量
          for (let item of data.dialogues) {
            offset.set(item.username, item.records.length);
            if (item.records.length < limit) item['all'] = true;
          }
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
      // 清除未读消息数量
      clearDialogue(dialogues[index].username)
        .then(() => {
          dialogues[index].count = 0;
        })
        .catch((error) => {
          console.log(error);
        });
      dialogues[index].count = 0;
      activeDialogueData.friendNickname = dialogues[index].nickname;
      activeDialogueData.friendAvatar = dialogues[index].avatar;
      activeDialogueData.all = dialogues[index]['all'];
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
            offset.delete(dialogues[index].username); // 删除偏移量
            dialogues.splice(index, 1); // 删除对话
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

    const firendListRef = ref(null); // 好友列表ref
    /**
     * @description: 对话记录滚动到最顶部
     * @return {void}
     * @author: dreamy-xay
     */
    function recordToTop() {
      const index = firendListRef.value.activeIndex;
      const offsetNum = offset.get(dialogues[index].username);
      getDialogue(offsetNum, limit, dialogues[index].username)
        .then((data) => {
          offset.set(dialogues[index].username, offsetNum + data.records.length);
          if (data.records.length < limit) {
            dialogues[index]['all'] = true;
            activeDialogueData['all'] = true;
          }
          dialogues[index].records.splice(0, 0, ...data.records);
          activeDialogueData.records.splice(0, activeDialogueData.records.length, ...dialogues[index].records);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const { receiveMessage, sendMessage } = mapActions('message', ['receiveMessage', 'sendMessage']); // 获取接收对话消息的api
    // socket接收消息
    receiveMessage((data) => {
      const { username, nickname, avatar, content, time } = data;
      let dialogueIndex = -1;
      for (let i = 0; i < dialogues.length; ++i)
        if (dialogues[i].username === username) {
          dialogueIndex = i;
          break;
        }
      if (dialogueIndex >= 0) {
        offset.set(username, offset.get(username) + 1);
        const data = {
          content,
          time,
          is_me: false,
        };
        dialogues[dialogueIndex].records.splice(dialogues[dialogueIndex].records.length, 0, data);
        // 如果当前索引是已经激活索引，需更新激活数据
        if (dialogueIndex === firendListRef.value.activeIndex) {
          // 清除未读消息数量
          clearDialogue(dialogues[dialogueIndex].username).catch((error) => {
            console.log(error);
          });
          activeDialogueData.records.splice(activeDialogueData.records.length, 0, data);
        } else ++dialogues[dialogueIndex].count;
      } else {
        offset.set(username, 1);
        dialogues.splice(0, 0, {
          username,
          nickname,
          avatar,
          count: 1,
          records: [
            {
              content,
              time,
              is_me: false,
            },
          ],
        });
      }
      // 滚动到最底部
      events.emit('DialogueRecord-scrollToBottom');
    });

    /**
     * @description: 发送消息触发事件
     * @param {any} content 发送消息的内容
     * @param {boolean} hasImage 是否上传图片 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function editSubmit(content, hasImage) {
      const index = firendListRef.value.activeIndex; // 聊天好友索引
      const time = dateFormat('YY-mm-dd HH:MM:SS', new Date()); // 获取当前时间
      sendMessage({
        to: dialogues[index].username,
        content,
        time,
      });
      console.log(content.length);
      const data = {
        content,
        time,
        is_me: true,
      };
      dialogues[index].records.splice(dialogues[index].records.length, 0, data);
      activeDialogueData.records.splice(activeDialogueData.records.length, 0, data);
      // 滚动到最底部
      events.emit('DialogueRecord-scrollToBottom');
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
      editSubmit,
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
