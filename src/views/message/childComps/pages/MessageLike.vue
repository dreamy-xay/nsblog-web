<!--
 * @Description:收到的赞页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 19:31:44
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-10 20:32:46
-->
<template>
  <div
    role="button"
    class="message-like"
    v-for="item in data"
    :key="item"
    @click="ChangePages('/message')"
  >

    <div class="message-like-avator">
      <el-avatar
        :size='46'
        @click.stop="ChangePages('/message')"
      >
        user
      </el-avatar>
    </div>

    <div class="message-like-right">

      <div class="message-like-right-text">
        <span
          class="message-like-right-text-name"
          @click.stop="changePages('/message')"
        >
          ZZ
        </span>
        <span>赞了我的评论</span>
      </div>

      <div class="message-like-right-bottom">
        <span class="message-like-right-bottom-time">2021年8月4日 12:12</span>

        <div class="message-like-right-bottom-delete">
          <i class="iconfont blog-shanchu message-like-right-bottom-delete-iconfont"></i>
          <span @click.stop="GetId(item)">删除该通知</span>
        </div>

      </div>

    </div>

  </div>

  <message-empty v-if="data=== undefined ||data === null || data.length <= 0 " />

</template>
<script>
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MessageEmpty from '@/views/message/childComps/MessageEmpty.vue';
/**
 * @description: 收到的赞页面
 * @param {*}
 * @return {*}
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'messagelike',
  components: {
    MessageEmpty,
  },
  setup() {
    const router = useRouter(),
      route = useRoute();
    const data = [];

    /**
     * @description: 跳转界面
     * @param {*} path 路由
     * @author: Z_Y_C
     */
    function ChangePages(path) {
      router.push(path);
    }

    /**
     * @description: 得到删除1消息id
     * @param {*} id 该消息id
     * @author: Z_Y_C
     */
    function GetId(id) {
      console.log(id);
    }
    return {
      data,
      ChangePages,
      GetId,
      //  styles
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
  transition: all 0.4s;

  .message-like-avator {
    width: 60px;
    height: 46px;
  }

  .message-like-right {
    display: flex;
    flex-direction: column;

    .message-like-right-text {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 16px;
      color: $grey-7;

      .message-like-right-text-name {
        display: flex;
        color: $grey10;
        font-size: 17px;
        font-weight: 700;
        margin-right: 20px;
        &:hover {
          color: $green0;
        }
      }
    }

    .message-like-right-bottom {
      display: flex;
      font-size: 14px;
      align-items: center;

      .message-like-right-bottom-time {
        color: $grey-7;
        margin-right: 20px;
      }

      .message-like-right-bottom-delete {
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
