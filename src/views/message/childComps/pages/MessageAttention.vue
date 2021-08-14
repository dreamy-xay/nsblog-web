<!--
 * @Description: message页面——关注我的
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-05 10:41:38
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-14 21:05:05
-->

<template>
  <el-scrollbar max-height="636px">
    <div
      v-infinite-scroll="getMessagesList"
      infinite-scroll-delay="300"
    >
      <div
        class="message-attention"
        v-for="(item , index) in attentionData"
        :key="item.message_id"
        role="button"
      >
        <div class="message-attention-avatar">
          <a :href="'/user/' + item.content.username">
            <el-avatar
              :size="46"
              :src="item.content.avatar"
            />
          </a>
        </div>

        <div class="message-attention-right">

          <div class="message-attention-right-name">
            <a
              :href="'/user/' + item.content.username"
              class="message-attention-right-name-text"
            >
              {{ item.content.nickname}}
            </a>
          </div>

          <div class="message-attention-right-bottom ">
            <span class="message-attention-right-bottom-time">{{getDate(item.time)}}</span>
            <span class="message-attention-right-bottom-text">关注了你</span>

            <div class="message-attention-right-bottom-iconfont1">
              <i class="iconfont blog-xiaoxi message-attention-right-bottom-iconfont1-xiaoxi"></i>
              <span>私信</span>
            </div>

            <div
              class="message-attention-right-bottom-iconfont2"
              @click="deleteItem(index)"
            >
              <i class="iconfont blog-shanchu message-attention-right-bottom-iconfont2-delete"></i>
              <span>删除该通知</span>
            </div>

          </div>

        </div>

        <div
          :class="item.content.attention ? 'message-attention-button1' : 'message-attention-button2'"
          role="button"
          @click="cancelAttention(index)"
        >
          <div v-text="item.content.attention ? '取消关注' : '互相关注'"></div>
        </div>

      </div>

    </div>
  </el-scrollbar>

  <!-- 确认取消关注 -->
  <n-modal
    display-directive="show"
    :show="modalShow"
  >
    <div class="message-modal">
      <div class="message-modal-centent">取消后可就伤感情了哦~</div>
      <div class="message-modal-button">
        <div
          class="message-modal-button-OK"
          role="button"
          @click="sureCancelAttention"
        >
          确定
        </div>
        <div
          class="message-modal-button-cancel"
          role="button"
          @click="modalShow=!modalShow"
        >
          取消
        </div>
      </div>
    </div>
  </n-modal>

  <message-empty v-if="attentionData.length <= 0 " />

</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';
import { getMessages, deleteMessages } from '@/network/api/messages.ts';
import { dateFormat } from '@/util/date.ts';

/**
 * @description: message页面——关注我的
 * @author: Ban
 */

export default defineComponent({
  name: 'messageAttention',
  components: {
    MessageEmpty,
  },
  setup() {
    let offset = 0; // 偏移量

    const deleteTag = ref(true); // 判断数据是否全部加载的标志

    const attentionData = reactive([]);

    const modalShow = ref(false); // 是否显示n-modal

    const sureCancel = ref(0); // 记录取消关注下标

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
      getMessages(4, offset, 10)
        .then((data) => {
          if (data.messages.length < 10) {
            deleteTag.value = false;
          }
          offset += data.messages.length;
          attentionData.splice(attentionData.length, 0, ...data.messages);
          console.log(attentionData);
        })
        .catch((error) => console.log(error));
    }

    /**
     * @description: 得到删除消息索引
     * @param {Number} index 该消息索引
     * @return {void}
     * @author: Z_Y_C
     */

    function deleteItem(index) {
      deleteMessages(attentionData[index].message_id)
        .then(() => {
          attentionData.splice(index, 1);
          if (deleteTag.value && attentionData.length === 6) {
            getMessagesList();
            console.log(attentionData);
          }
        })
        .catch((error) => console.log(error));
    }

    /**
     * @description: 点击取消关注弹出对话框
     * @param {Number} index 数据在数组中索引
     * @return {void}
     * @author: Z_Y_C
     */

    function cancelAttention(index) {
      if (attentionData[index].content.attention === false) {
        attentionData[index].content.attention = true;
      } else {
        modalShow.value = !modalShow.value;
        sureCancel.value = index;
      }
    }

    /**
     * @description: 点击确认关注取消
     * @return {void}
     * @author: Z_Y_C
     */

    function sureCancelAttention() {
      modalShow.value = !modalShow.value;
      attentionData[sureCancel.value].content.attention = false;
    }

    return {
      attentionData,
      modalShow,
      sureCancel,
      getMessagesList,
      deleteItem,
      getDate,
      cancelAttention,
      sureCancelAttention,
    };
  },
});
</script>

<style lang="scss" scoped>
$border-radius0: $border-radius-0;
$shadow0: $shadow-0;
$shadow2: $shadow-2;
$grey7: $grey-7;
$grey0: $grey-0;
$green0: $green-0;
$green1: $green-1;
$grey10: $grey-10;
$grey4: $grey-4;
$grey6: $grey-6;
$grey9: $grey-9;

.message-attention {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 920px;
  padding: 24px 36px;
  margin: 10px;
  background-color: $grey0;
  border-radius: $border-radius0;
  box-shadow: $shadow0;
  color: $grey0;
  transition: all 0.25s;

  .message-attention-avatar {
    width: 46px;
    height: 46px;
    padding-right: 14px;
  }

  .message-attention-right {
    display: flex;
    flex-direction: column;
    width: 780px;

    .message-attention-right-name {
      display: flex;
      align-items: center;
      line-height: 21px;
      color: $grey10;
      margin-bottom: 5px;

      .message-attention-right-name-text {
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

    .message-attention-right-bottom {
      display: flex;
      align-items: center;
      line-height: 19px;
      font-size: 14px;

      .message-attention-right-bottom-time {
        color: $grey7;
        margin-right: 5px;
      }

      .message-attention-right-bottom-text {
        color: $grey7;
      }

      .message-attention-right-bottom-iconfont1 {
        margin: 0 20px;
        display: flex;
        align-items: center;
        color: $grey7;
        transition: all 0.25s;

        .message-attention-right-bottom-iconfont1-xiaoxi {
          margin-right: 5px;
        }

        &:hover {
          color: $green0;
        }
      }

      .message-attention-right-bottom-iconfont2 {
        display: flex;
        align-items: center;
        transition: all 0.25s;

        .message-attention-right-bottom-iconfont2-delete {
          margin-right: 5px;
        }

        &:hover {
          color: $green0;
        }
      }
    }
  }

  .message-attention-button1 {
    width: 80px;
    height: 30px;
    border-radius: 15px;
    box-shadow: $shadow0;
    font-size: 14px;
    color: $grey0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.25s;
    background-color: $green0;

    &:hover {
      box-shadow: $shadow2;
    }
  }

  .message-attention-button2 {
    width: 80px;
    height: 30px;
    border-radius: 15px;
    box-shadow: $shadow0;
    font-size: 14px;
    color: $grey9;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.25s;

    &:hover {
      box-shadow: $shadow2;
      color: $green1;
    }
  }

  &:hover {
    color: $grey7;
  }
}

.message-modal {
  width: 310px;
  height: 190px;
  background-color: $grey0;
  border-radius: $border-radius0;
  border: 1px solid $grey4;

  .message-modal-centent {
    height: 132px;
    width: 100%;
    font-size: 14px;
    color: $grey10;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .message-modal-button {
    width: 220px;
    margin: 0 auto;
    overflow: hidden;

    .message-modal-button-OK {
      width: 100px;
      height: 32px;
      font-size: 14px;
      border-radius: 4px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
      float: left;
      transition: 0.4s;
      background-color: $green0;
      color: $grey-0;
      margin-right: 20px;

      &:hover {
        background-color: $green1;
      }
    }
    .message-modal-button-cancel {
      width: 100px;
      height: 32px;
      font-size: 14px;
      border-radius: 4px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
      float: left;
      transition: 0.4s;
      border: 1px solid $grey6;
      color: $grey-9;
      width: 98px;
      height: 30px;
      &:hover {
        border: 1px solid $green1;
        color: $green1;
      }
    }
  }
}
</style>
