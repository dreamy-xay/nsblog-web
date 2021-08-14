<!--
 * @Description:收到的赞页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 19:31:44
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-14 22:19:51
-->
<template>
  <el-scrollbar max-height="636px">
    <div
      v-infinite-scroll="getMessagesList"
      infinite-scroll-delay="300"
    >
      <div
        role="button"
        class="message-like"
        v-for="(item , index) in likeData"
        :key="item.messages_id"
        @click="ChangePages('/article/'+item.content.id)"
      >

        <div class="message-like-avator">
          <a :href="'/user/' + item.content.username">
            <el-avatar
              :size='46'
              :src="item.content.avatar"
            />
          </a>

        </div>

        <div class="message-like-right">

          <div class="message-like-right-text">

            <a
              class="message-like-right-text-name"
              :href="'/user/' + item.content.username"
            >{{item.content.nickname}}</a>
            <span v-if="item.content.type === 1">赞了我的文章</span>
            <span v-if="item.content.type === 2">赞了我的问答</span>
            <span v-if="item.content.type === 3">赞了我的文章评论</span>
            <span v-if="item.content.type === 4">赞了我的问答评论</span>
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
import { defineComponent, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';
import { getMessages, deleteMessages } from '@/network/api/messages.ts';
import { dateFormat } from '@/util/date.ts';

/**
 * @description: 收到的赞页面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'messageLike',
  components: {
    MessageEmpty,
  },
  setup() {
    let offset = 0; // 偏移量

    const deleteTag = ref(true); // 判断数据是否全部加载的标志

    const router = useRouter(),
      route = useRoute();

    const likeData = reactive([]);

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
          console.log(likeData);
        })
        .catch((error) => console.log(error));
    }

    /**
     * @description: 跳转界面
     * @param {String} path 路由id
     * @return {void}
     * @author: Z_Y_C
     */

    function ChangePages(path) {
      router.push(path);
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
        .catch((error) => console.log(error));
    }

    return {
      likeData,
      ChangePages,
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
