<!--
 * @Description:系统通知页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 19:34:31
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-10 20:33:18
-->
<template>
  <div
    class="message-system"
    v-for="item in data"
    :key="item.id"
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
        {{item.text}}
      </span>
    </div>

    <div class="message-system-bottom">
      <span class="message-system-bottom-time">{{item.time}}</span>
      <i class="iconfont blog-shanchu message-system-bottom-iconfont"></i>
    </div>
  </div>
  <message-empty v-if="data=== undefined ||data === null || data.length <= 0 " />

</template>
<script>
import { defineComponent, reactive } from 'vue';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';

/**
 * @description: 系统通知页面
 * @param {*}
 * @return {*}
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'messagesystem',
  components: {
    MessageEmpty,
  },
  setup() {
    const data = [
      {
        id: '0',
        text: '欢迎你来到NS∞LOG这个大家庭',
        link: '',
        time: '2021年8月4日 22:53',
      },
      {
        id: '2',
        text: '叮！你的【NS∞LOG一周小结】新鲜出炉~',
        link: 'http://localhost:8888/message',
        time: '2021年8月4日 22:53',
      },
    ];
    const title = reactive([]);

    function gettext(item) {
      if (item.link === '') return false;
      title.push(item.text.split(/[【 】]/));
    }
    return {
      data,
      title,
      gettext,
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
        // cursor: pointer;
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
