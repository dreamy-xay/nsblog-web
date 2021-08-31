<!--
 * @Description:系统通知页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 19:34:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-31 10:21:53
-->
<template>
  <el-scrollbar max-height="calc(100vh - 108px)">
    <div
      v-infinite-scroll="getMessagesList"
      infinite-scroll-delay="300"
    >
      <div
        class="message-system"
        v-for="(item,index) in systemData"
        :key="item.message_id"
      >

        <div
          class="message-system-title"
          v-html="item.content"
        >
        </div>

        <div class="message-system-bottom">
          <span class="message-system-bottom-time">{{getDate(item.time)}}</span>
          <i
            class="iconfont blog-shanchu message-system-bottom-iconfont"
            @click="deleteItem(index)"
          ></i>
        </div>
      </div>
    </div>
  </el-scrollbar>

  <message-empty v-if="systemData.length <= 0 " />

</template>
<script>
import { defineComponent, ref, reactive, watch } from 'vue';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';
import { getMessages, deleteMessages } from '@/network/api/messages';
import { dateFormat } from '@/util/date';
import { mapMutations, mapState } from '@/util/store';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';

/**
 * @description: 系统通知页面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'messageSystem',
  components: {
    MessageEmpty,
  },
  setup() {
    const route = useRoute();
    const msg = useMessage(); // naive-ui mssage
    let offset = 0; // 偏移量
    const deleteTag = ref(true); // 判断数据是否全部加载的标志
    const systemData = reactive([]); //系统通知界面数据
    const { updateMessageCount } = mapMutations('message', ['updateMessageCount']);
    const { messageCount } = mapState('message', ['messageCount']); // 获取tokenInfo

    // 进入计数清空
    updateMessageCount({ type: 1, count: 0 });

    /**
     * @description: element-ui无限滚动自动获取数据
     * @return {void}
     * @author: Z_Y_C
     */

    function getMessagesList() {
      getMessages(1, offset, 10)
        .then((data) => {
          if (data.messages.length < 10) {
            deleteTag.value = false;
          }
          offset += data.messages.length;
          systemData.splice(systemData.length, 0, ...data.messages);
        })
        .catch((error) => {
          console.log(error), msg.error('获取消息失败，请重试', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 改变日期格式
     * @param {String} date 日期
     * @return {String} 返回日期格式 `Y年m月d日 HH:MM`
     * @author: Z_Y_C
     */

    function getDate(date) {
      date = new Date(date);
      return dateFormat('Y年m月d日 HH:MM', date);
    }

    /**
     * @description: 得到删除消息索引
     * @param {Number} index 该消息索引
     * @return {void}
     * @author: Z_Y_C
     */

    function deleteItem(index) {
      deleteMessages(systemData[index].message_id)
        .then(() => {
          systemData.splice(index, 1);
          if (deleteTag.value && systemData.length === 6) {
            getMessagesList();
          }
        })
        .catch((error) => {
          console.log(error), msg.error('删除消息失败，请重试', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 获取自己类型的消息
     * @return {void}
     * @author: dreamy-xay
     */
    function getSelfMessage(limit = 1) {
      updateMessageCount({ type: 1, count: 0 });
      getMessages(1, 0, limit)
        .then((data) => {
          offset++;
          systemData.splice(0, 0, ...data.messages);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    //监听未读消息变化，得到未读消息
    watch(
      () => messageCount.value[3],
      (value, oldValue) => {
        if (value === oldValue + 1 && new RegExp('/message/system').test(route.path)) getSelfMessage();
      }
    );

    // 监听路由变化更新数据
    watch(
      () => route.path,
      (path) => {
        if (messageCount.value[3] > 0 && new RegExp('/message/reply').test(path)) getSelfMessage(messageCount.value[3]);
      }
    );

    return {
      systemData,
      getMessagesList,
      getDate,
      deleteItem,
    };
  },
});
</script>

<style lang="scss" scoped>
$border-radius0: $border-radius-0;
$shadow0: $shadow-0;
$grey7: $grey-7;
$grey0: $grey-0;
$green0: $green-0;
$grey11: $grey-11;
$pink0: $pink-0;

.message-system {
  width: 944px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 16px 24px;
  background-color: $grey0;
  border-radius: $border-radius0;
  box-shadow: $shadow0;

  .message-system-title {
    color: $grey11;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 10px;
    transition: all 0.4s;
    @include word-break;

    .message-system-title-link {
      color: $pink0;
      &:hover {
        color: $green0;
      }
    }
  }

  .message-system-bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: $grey7;
    transition: all 0.4s;

    .message-system-bottom-time {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 928px;
    }

    .message-system-bottom-iconfont {
      &:hover {
        color: $green0;
        cursor: pointer;
      }
    }
  }
}
</style>
