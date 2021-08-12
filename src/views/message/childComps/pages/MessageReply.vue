<!--
 * @Description:回复我的页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 19:25:27
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-11 23:45:51
-->

<template>
  <div
    class="message-reply"
    role="button"
    v-for="item in replyData"
    :key="item.message_id"
  >

    <div class="message-reply-avator">
      <a :href="'/auth'+item.content.username">
        <el-avatar
          :size='46'
          :src="item.content.avatar"
        >
          user
        </el-avatar>
      </a>

    </div>

    <div class="message-reply-right">

      <div class="message-reply-right-top">
        <span class="message-reply-right-top-name">ZZ</span>
        <span class="message-reply-right-top-type">回复我的评论</span>
      </div>

      <div class="message-reply-right-text">加油</div>

      <div
        class="message-reply-right-center"
        v-if="true"
      >
        <span>XX：</span>
        <span>加油</span>
      </div>

      <div class="message-reply-right-bottom">
        <span class="message-reply-right-bottom-time">2021年8月5日 16:34</span>

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

        <div class="message-reply-right-bottom-delete">
          <i class="iconfont blog-shanchu message-reply-right-bottom-delete-iconfont"></i>
          <span>删除该通知</span>
        </div>

      </div>

    </div>

  </div>

  <message-empty v-if="replyData=== undefined ||replyData === null || replyData.length <= 0 " />

</template>
<script>
import { defineComponent, reactive } from 'vue';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';
import { getMessages } from '@/network/api/messages.ts';

/**
 * @description: 回复我的页面
 * @param {*}
 * @return {*}
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'messagereply',
  components: {
    MessageEmpty,
  },
  setup() {
    const replyData = reactive([]);
    console.log(replyData);
    getMessages(2)
      .then((data) => {
        replyData.splice(0, 0, ...data.messages);
        console.log(data);
        console.log(replyData);
      })
      .catch((error) => console.log(error));
    return { replyData };
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
    width: 60px;
    height: 46px;
  }
  .message-reply-right {
    .message-reply-right-top {
      display: flex;
      align-items: center;
      color: $grey7;
      font-size: 16px;
      margin-bottom: 5px;

      .message-reply-right-top-name {
        font-weight: 700;
        font-size: 17px;
        margin-right: 20px;
        color: $grey10;
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
      align-items: center;
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
