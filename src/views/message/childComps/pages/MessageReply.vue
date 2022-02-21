<!--
 * @Description:回复我的页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 19:25:27
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-17 14:47:40
-->

<template>
  <el-scrollbar max-height="calc(100vh - 108px)">
    <div
      v-infinite-scroll="getMessagesList"
      infinite-scroll-delay="300"
    >
      <div
        class="message-reply"
        v-for="(item , index) in replyData"
        :key="item.message_id"
      >

        <div class="message-reply-avator">
          <base-avatar
            :size='46'
            :src="item.content.avatar"
            :href="'/user/'+item.content.username"
            :target="'/user/'+item.content.username"
          ></base-avatar>
        </div>

        <div class="message-reply-right">

          <div class="message-reply-right-top">
            <span
              role="button"
              class="message-reply-right-top-name"
              @click.stop="changePages('/user/' + item.content.username)"
            >{{item.content.nickname}}</span>
            <div
              @click="changePages((item.content.type===1||item.content.type===3 ? '/article/' : '/question/')+item.content.id)"
              role="button"
            >
              <span v-if="item.content.type===1">回复我的文章</span>
              <span v-else-if="item.content.type===2">回复我的问答</span>
              <span v-else-if="item.content.type===3">回复我的文章评论</span>
              <span v-else>回复我的问答评论</span>
            </div>
          </div>

          <div class="message-reply-right-text">
            <v-md-preview :text="item.content.content" />
          </div>

          <div
            class="message-reply-right-center"
            v-if="item.content.reply_username!==''"
          >
            <div>{{item.content.reply_username}}：</div>
            <div class="message-reply-right-center-content">
              <v-md-preview :text="item.content.reply_content" />
            </div>
          </div>

          <div class="message-reply-right-bottom">
            <span class="message-reply-right-bottom-time">{{dateFormat('Y年m月d日 HH:MM', new Date(item.time))}}</span>

            <div
              class="message-reply-right-bottom-reply"
              role="button"
              @click="changePages((item.content.type===1||item.content.type===3 ? '/article/' : '/question/')+item.content.id)"
            >
              <i class="iconfont blog-huifu1"></i>
              <span>回复</span>
            </div>

            <div
              class="message-reply-right-bottom-reply"
              role="button"
              @click="changeEvaluation(index,1)"
              :class="replyData[index].content.evaluation==1 ? 'message-reply-right-bottom-reply-click':''"
            >
              <i class="iconfont blog-dianzan1"></i>
              <span>点赞</span>
            </div>

            <div
              class="message-reply-right-bottom-reply"
              role="button"
              @click="changeEvaluation(index,0)"
              :class="replyData[index].content.evaluation==0 ? 'message-reply-right-bottom-reply-click':''"
            >
              <i class="iconfont blog-dianzan1 message-reply-right-bottom-reply-iconfont"></i>
              <span>反对</span>
            </div>

            <div
              class="message-reply-right-bottom-delete"
              @click.stop="deleteItem(index)"
              role="button"
            >
              <i class="iconfont blog-shanchu "></i>
              <span>删除该通知</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  </el-scrollbar>

  <message-empty v-if="replyData.length <= 0 " />

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
import { modifyArticleCommentEvaluation } from '@/network/api/articles';

/**
 * @description: 回复我的页面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'messageReply',
  components: {
    MessageEmpty,
    BaseAvatar,
  },
  setup() {
    const route = useRoute();
    const msg = useMessage(); // naive-ui mssage
    const deleteTag = ref(true); // 判断数据是否全部加载的标志
    const replyData = reactive([]); // 回复我的界面数据
    const { updateMessageCount } = mapMutations('message', ['updateMessageCount']);
    const { messageCount } = mapState('message', ['messageCount']); // 获取tokenInfo
    const limit = 10; // 获取消息数量

    // 进入计数清空
    updateMessageCount({ type: 2, count: 0 });

    /**
     * @description: element-ui无限滚动自动获取数据
     * @return {void}
     * @author: Z_Y_C
     */

    function getMessagesList() {
      getMessages(2, replyData.length, limit)
        .then((data) => {
          if (data.messages.length < limit) {
            deleteTag.value = false;
          }
          replyData.splice(replyData.length, 0, ...data.messages);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取消息失败，请重试');
        });
    }

    /**
     * @description: 得到删除消息索引
     * @param {Number} index 该消息索引
     * @return {void}
     * @author: Z_Y_C
     */

    function deleteItem(index) {
      deleteMessages(replyData[index].message_id)
        .then(() => {
          replyData.splice(index, 1);
          if (deleteTag.value && replyData.length === 6) {
            getMessagesList();
          }
        })
        .catch((error) => {
          console.log(error);
          msg.error('删除消息失败，请重试');
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
     * @description: 获取自己类型的消息
     * @return {void}
     * @author: dreamy-xay
     */
    function getSelfMessage(limit = 1) {
      updateMessageCount({ type: 2, count: 0 });
      getMessages(2, 0, limit)
        .then((data) => {
          replyData.splice(0, 0, ...data.messages);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    //监听未读消息变化，得到未读消息
    watch(
      () => messageCount.value[0],
      (value, oldValue) => {
        if (value === oldValue + 1 && new RegExp('/message/reply' + '(/|$|\\?)').test(route.path)) getSelfMessage();
      }
    );

    // 监听路由变化更新数据
    watch(
      () => route.path,
      (path) => {
        if (messageCount.value[0] > 0 && new RegExp('/message/reply' + '(/|$|\\?)').test(path))
          getSelfMessage(messageCount.value[0]);
      }
    );

    /**
     * @description: 点赞或反对
     * @param {Number} index 该消息索引
     * @param {Number} num 0反对，1点赞，2无
     * @return {Void}
     * @author: Z_Y_C
     */
    function changeEvaluation(index, num) {
      modifyArticleCommentEvaluation(replyData[index].message_id, replyData[index].content.evaluation == num ? 2 : num)
        .then(() => {
          if (replyData[index].content.evaluation == num) replyData[index].content.evaluation = 2;
          else replyData[index].content.evaluation = num;
        })
        .catch((error) => {
          console.log(error);
          msg.error('评论失败，请重试');
        });
    }

    return {
      replyData,
      getMessagesList,
      deleteItem,
      changePages,
      changeEvaluation,
      dateFormat,
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
$grey9: $grey-9;

.message-reply {
  width: 920px;
  display: flex;
  margin: 10px;
  padding: 24px 36px;
  background-color: $grey0;
  border-radius: $border-radius0;
  box-shadow: $shadow0;
  color: $grey0;
  transition: all 0.4s;

  .message-reply-avator {
    width: 46px;
    height: 46px;
    padding-right: 14px;
  }

  .message-reply-right {
    .message-reply-right-top {
      display: flex;
      align-items: center;
      color: $grey7;
      font-size: 16px;
      margin-bottom: 5px;
      line-height: 21px;

      .message-reply-right-top-name {
        font-weight: 700;
        font-size: 17px;
        margin-right: 20px;
        color: $grey10;

        &:hover {
          color: $green0;
        }
      }
    }

    .message-reply-right-text {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: $grey9;
      margin-bottom: 5px;
      @include word-break;

      :deep(.v-md-editor-preview > div) {
        padding: 0;
        line-height: normal;

        & > p {
          margin-bottom: 0;
        }
      }
    }

    .message-reply-right-center {
      display: flex;
      border-left: 1px solid $grey7;
      padding-left: 15px;
      font-size: 14px;
      color: $grey7;
      margin-bottom: 5px;

      .message-reply-right-center-content {
        @include word-break;

        :deep(.v-md-editor-preview > div) {
          padding: 0;
          line-height: normal;
          font-size: 14px;

          & > p {
            margin-bottom: 0;
          }
        }
      }
    }

    .message-reply-right-bottom {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 19px;

      .message-reply-right-bottom-time {
        margin-right: 20px;
        color: $grey7;
      }

      .message-reply-right-bottom-reply {
        display: flex;
        align-items: center;
        margin-right: 20px;
        color: $grey7;

        .iconfont {
          margin-right: 5px;
        }

        .message-reply-right-bottom-reply-iconfont {
          transform: rotate(180deg);
        }

        &:hover {
          color: $green0;
        }
      }

      .message-reply-right-bottom-reply-click {
        color: $green0;

        &:hover {
          color: $green-1;
        }
      }

      .message-reply-right-bottom-delete {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .message-reply-right-bottom-delete-iconfont {
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
