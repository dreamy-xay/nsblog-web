<!--
 * @Description:回复我的页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 19:25:27
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-19 21:18:02
-->

<template>
  <el-scrollbar max-height="calc(100vh - 108px)">
    <div
      v-infinite-scroll="getMessagesList"
      infinite-scroll-delay="300"
    >
      <div
        class="message-reply"
        role="button"
        v-for="(item , index) in replyData"
        :key="item.message_id"
        @click="changePages('/article/'+item.content.id)"
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
              class="message-reply-right-top-name"
              @click.stop="changePages('/user/' + item.content.username)"
            >{{item.content.nickname}}</span>
            <span v-if="item.content.type===1">回复我的文章</span>
            <span v-else-if="item.content.type===2">回复我的问答</span>
            <span v-else-if="item.content.type===3">回复我的文章评论</span>
            <span v-else>回复我的问答评论</span>
          </div>

          <div
            class="message-reply-right-text"
            v-html="item.content.content"
          ></div>

          <div
            class="message-reply-right-center"
            v-if="item.content.reply_username!==''"
          >
            <span>{{item.content.reply_username}}：</span>
            <span v-html="item.content.reply_content"></span>
          </div>

          <div class="message-reply-right-bottom">
            <span class="message-reply-right-bottom-time">{{getDate(item.time)}}</span>

            <div class="message-reply-right-bottom-reply">
              <i class="iconfont blog-huifu1 message-reply-right-bottom-reply-iconfont"></i>
              <span>回复</span>
            </div>

            <div class="message-reply-right-bottom-reply">
              <i class="iconfont blog-dianzan1 message-reply-right-bottom-reply-iconfont"></i>
              <span>点赞</span>
            </div>

            <div class="message-reply-right-bottom-reply">
              <i class="iconfont blog-dianzan1 message-reply-right-bottom-reply-iconfont"></i>
              <span>反对</span>
            </div>

            <div
              class="message-reply-right-bottom-delete"
              @click.stop="deleteItem(index)"
            >
              <i class="iconfont blog-shanchu message-reply-right-bottom-delete-iconfont"></i>
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
import { defineComponent, ref } from 'vue';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import { getMessages, deleteMessages } from '@/network/api/messages.ts';
import { dateFormat } from '@/util/date.ts';
import { useMessage } from 'naive-ui';

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
  emits: ['add-data', 'delete-data', 'change-atteneion'],

  props: {
    replyData: {
      type: Array,
      default: () => [],
    },
    attentionData: {
      type: Array,
      default: () => [],
    },
    likeData: {
      type: Array,
      default: () => [],
    },
    systemData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui mssage

    let offset = 0; // 偏移量

    const deleteTag = ref(true); // 判断数据是否全部加载的标志

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
      getMessages(2, offset, 10)
        .then((data) => {
          if (data.messages.length < 10) {
            deleteTag.value = false;
          }
          offset += data.messages.length;
          context.emit('add-data', data);
        })
        .catch((error) => {
          console.log(error), msg.error('获取消息失败，请重试', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 得到删除消息索引
     * @param {Number} index 该消息索引
     * @return {void}
     * @author: Z_Y_C
     */

    function deleteItem(index) {
      deleteMessages(props.replyData[index].message_id)
        .then(() => {
          context.emit('delete-data', index);
          if (deleteTag.value && props.replyData.length === 6) {
            getMessagesList();
          }
        })
        .catch((error) => {
          console.log(error), msg.error('删除消息失败，请重试', { duration: 2000, closable: true });
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

    return {
      getMessagesList,
      deleteItem,
      getDate,
      changePages,
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
    }

    .message-reply-right-center {
      display: flex;
      border-left: 1px solid $grey7;
      padding-left: 15px;
      font-size: 14px;
      color: $grey7;
      margin-bottom: 5px;
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

        .message-reply-right-bottom-reply-iconfont {
          margin-right: 5px;
        }

        &:hover {
          color: $green0;
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
