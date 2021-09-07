<!--
 * @Description:收到的赞页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 19:31:44
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-07 19:05:42
-->
<template>
  <el-scrollbar max-height="calc(100vh - 108px)">
    <div
      v-infinite-scroll="getMessagesList"
      infinite-scroll-delay="300"
    >
      <div
        role="button"
        class="message-like"
        v-for="(item , index) in likeData"
        :key="item.messages_id"
        @click="changePages('/article/'+item.content.id)"
      >
        <div class="message-like-avator">
          <base-avatar
            :size='46'
            :src="item.content.avatar"
            :href="'/user/'+item.content.username"
            :target="'/user/'+item.content.username"
          ></base-avatar>
        </div>

        <div class="message-like-right">

          <div class="message-like-right-text">

            <span
              class="message-like-right-text-name"
              @click.stop="changePages('/user/' + item.content.username)"
            >{{item.content.nickname}}</span>
            <span v-if="item.content.type === 1">赞了我的文章</span>
            <span v-else-if="item.content.type === 2">赞了我的问答</span>
            <span v-else-if="item.content.type === 3">赞了我的文章评论</span>
            <span v-else>赞了我的问答评论</span>
          </div>

          <div class="message-like-right-bottom">
            <span class="message-like-right-bottom-time">{{getDate(item.time)}}</span>

            <div
              class="message-like-right-bottom-delete"
              @click.stop="deleteItem(index)"
            >
              <i class="iconfont blog-shanchu message-like-right-bottom-delete-iconfont"></i>
              <span>删除该通知</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  </el-scrollbar>

  <message-empty v-if="likeData.length <= 0" />

</template>
<script>
import { defineComponent, ref, reactive, watch } from 'vue';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import { getMessages, deleteMessages } from '@/network/api/messages';
import { dateFormat } from '@/util/date.ts';
import { mapMutations, mapState } from '@/util/store';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';

/**
 * @description: 收到的赞页面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'messageLike',
  components: {
    MessageEmpty,
    BaseAvatar,
  },
  setup() {
    const route = useRoute();
    const msg = useMessage(); // naive-ui mssage
    let offset = 0; // 偏移量
    const deleteTag = ref(true); // 判断数据是否全部加载的标志
    const likeData = reactive([]); // 收到的赞界面数据
    const { updateMessageCount } = mapMutations('message', ['updateMessageCount']);
    const { messageCount } = mapState('message', ['messageCount']); // 获取tokenInfo

    // 进入计数清空
    updateMessageCount({ type: 3, count: 0 });

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
     * @description: element-ui无限滚动自动获取数据
     * @return {void}
     * @author: Z_Y_C
     */

    function getMessagesList() {
      getMessages(3, offset, 10)
        .then((data) => {
          if (data.messages.length < 10) {
            deleteTag.value = false;
          }
          offset += data.messages.length;
          likeData.splice(likeData.length, 0, ...data.messages);
        })
        .catch((error) => {
          console.log(error), msg.error('获取消息失败，请重试', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 跳转界面
     * @param {String} path 路由id
     * @return {void}
     * @author: Z_Y_C
     */

    function changePages(path) {
      window.open(path, path);
    }

    /**
     * @description: 得到删除消息索引
     * @param {Number} index 该消息索引
     * @return {void}
     * @author: Z_Y_C
     */

    function deleteItem(index) {
      deleteMessages(likeData[index].message_id)
        .then(() => {
          likeData.splice(index, 1);
          if (deleteTag.value && likeData.length === 6) {
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
      updateMessageCount({ type: 3, count: 0 });
      getMessages(3, 0, limit)
        .then((data) => {
          offset++;
          likeData.splice(0, 0, ...data.messages);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    //监听未读消息变化，得到未读消息
    watch(
      () => messageCount.value[1],
      (value, oldValue) => {
        if (value === oldValue + 1 && new RegExp('/message/like' + '(/|$|\\?)').test(route.path)) getSelfMessage();
      }
    );

    // 监听路由变化更新数据
    watch(
      () => route.path,
      (path) => {
        if (messageCount.value[1] > 0 && new RegExp('/message/like' + '(/|$|\\?)').test(path))
          getSelfMessage(messageCount.value[1]);
      }
    );

    return {
      likeData,
      changePages,
      deleteItem,
      getDate,
      getMessagesList,
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
$grey10: $grey-10;
$pink0: $pink-0;

.message-like {
  width: 920px;
  display: flex;
  margin: 10px;
  padding: 24px 36px;
  background-color: $grey0;
  border-radius: $border-radius0;
  box-shadow: $shadow0;
  color: $grey0;
  transition: all 0.25s;

  .message-like-avator {
    width: 46px;
    height: 46px;
    padding-right: 14px;
  }

  .message-like-right {
    display: flex;
    flex-direction: column;

    .message-like-right-text {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-size: 16px;
      color: $grey-7;
      line-height: 21px;

      .message-like-right-text-name {
        display: flex;
        color: $grey10;
        font-size: 17px;
        font-weight: 700;
        margin-right: 20px;
        transition: all 0.25s;

        &:hover {
          color: $green0;
        }
      }
    }

    .message-like-right-bottom {
      display: flex;
      font-size: 14px;
      align-items: center;
      line-height: 19px;

      .message-like-right-bottom-time {
        color: $grey-7;
        margin-right: 20px;
      }

      .message-like-right-bottom-delete {
        transition: all 0.25s;

        .message-like-right-bottom-delete-iconfont {
          margin-right: 5px;
        }

        &:hover {
          color: $green0;
        }
      }
    }
  }

  &:hover {
    color: $grey7;
  }
}
</style>
