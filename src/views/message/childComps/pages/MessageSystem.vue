<!--
 * @Description:系统通知页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 19:34:31
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-14 19:26:29
-->
<template>
  <el-scrollbar max-height="636px">
    <div
      v-infinite-scroll="getMessagesList"
      infinite-scroll-delay="300"
    >
      <div
        class="message-system"
        v-for="(item,index) in systemData"
        :key="item.message_id"
      >

        <div class="message-system-title">
          <span v-if="gettext(item) !==false">
            {{title[0][0]}}【
            <a
              :href="item.link"
              class="message-system-title-link"
            >{{title[0][1]}}</a>
            】{{title[0][2]}}
          </span>

          <span v-else>
            {{item.content}}
          </span>
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
import { defineComponent, reactive, ref } from 'vue';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';
import { getMessages, deleteMessages } from '@/network/api/messages.ts';
import { dateFormat } from '@/util/date';

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
    let offset = 0; // 偏移量

    const deleteTag = ref(true); // 判断数据是否全部加载的标志

    const systemData = reactive([]);

    const title = reactive([]);

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
          console.log(systemData);
        })
        .catch((error) => console.log(error));
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
        .catch((error) => console.log(error));
    }

    function gettext(item) {
      return false;
      // if (item.link === '') return false;
      // title.push(item.text.split(/[【 】]/));
    }

    return {
      systemData,
      title,
      gettext,
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
