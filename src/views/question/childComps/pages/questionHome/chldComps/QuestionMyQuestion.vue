<!--
 * @Description: 我的问答组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-19 19:24:33
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-03 14:08:37
-->
<template>
  <div class="question-my-question">
    <div
      v-if="isLogin"
      class="question-my-question-container"
    >
      <div class="top">
        <div class="icon">
          <i class="iconfont blog-wenda" />
        </div>
        我的问答
      </div>
      <div class="middle">
        <div class="middle-item">
          <div class="item-left"><i class="iconfont blog-tiwen1" />提问</div>
          <div class="item-right">{{getDivisionFormatNum(myQuestion.question_count)}}</div>
        </div>
        <div class="middle-item">
          <div class="item-left"><i class="iconfont blog-huida1" />问答</div>
          <div class="item-right">{{getDivisionFormatNum(myQuestion.reply_count)}}</div>
        </div>
        <div class="middle-item">
          <div class="item-left"><i class="iconfont blog-dianzan1" />被点赞</div>
          <div class="item-right">{{getDivisionFormatNum(myQuestion.like_count)}}</div>
        </div>
        <div class="middle-item">
          <div class="item-left"><i class="iconfont blog-huida" />被采纳</div>
          <div class="item-right">{{getDivisionFormatNum(myQuestion.accept_count)}}</div>
        </div>
      </div>
    </div>
    <div
      class="question-my-question-btn"
      role="button"
      @click="showModal"
    >
      <i class="iconfont blog-daochu1024-29" />
      提问题
    </div>
    <question-create-question v-model:modelValue="isModalShow" />

  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { mapGetters } from '@/util/store';
import QuestionCreateQuestion from '@/views/question/childComps/pages/questionHome/chldComps/QuestionCreateQuestion.vue';
import { getMyQuestion } from '@/network/api/user';
import { useMessage } from 'naive-ui';
import { getDivisionFormatNum } from '@/util/util';

/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'questionMyQuestion',
  components: {
    QuestionCreateQuestion,
  },
  setup() {
    const msg = useMessage(); // naive-ui 消息组件
    const { isLogin } = mapGetters('global', ['isLogin']);
    let isModalShow = ref(false); //创建问答模态框显示控制
    let myQuestion = reactive({});

    // 初始化数据
    // console.log('isLogin: ' + isLogin.value);
    if (isLogin.value)
      getMyQuestion()
        .then((data) => {
          // console.log('getMyQuestion');
          // console.log(data);
          myQuestion.question_count = data.question_count;
          myQuestion.reply_count = data.reply_count;
          myQuestion.like_count = data.like_count;
          myQuestion.accept_count = data.accept_count;
          // console.log(myQuestion);
        })
        .catch((error) => {
          console.log(error);
          msg.error('我的问答数据获取失败', { duration: 2000, closable: true });
        });

    /**
     * @description: 更爱模态框显示状态
     * @return {void}
     * @author: clq
     */
    function showModal() {
      if (isLogin.value) isModalShow.value = !isModalShow.value;
      else msg.error('请先登录');
    }

    return {
      myQuestion,
      isLogin,
      isModalShow,
      showModal,
      getDivisionFormatNum,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-my-question {
  box-sizing: border-box;
  padding: 16px;
  background: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  .question-my-question-container {
    width: 100%;
    & > div {
      width: 100%;
    }

    .top {
      height: 24px;
      margin-bottom: 16px;
      font-size: 14px;
      font-weight: 700;
      line-height: 24px;
      color: $grey-10;
      @include flex(center);

      .icon {
        margin-right: 10px;
        line-height: 24px;
        font-weight: normal;

        .iconfont {
          color: $green-1;
          font-size: 15px;
        }
      }
    }

    .middle {
      @include flex(center, space-between);
      flex-wrap: wrap;

      .middle-item {
        @include flex(center, space-between);
        height: 22px;
        width: 115px;
        margin-bottom: 10px;

        .item-left {
          font-size: 14px;
          text-align: left;
          line-height: 22px;
          color: $grey-9;

          .iconfont {
            margin-right: 6px;
            font-size: 14px;
            color: $grey-7;
          }
        }

        .item-right {
          height: 18px;
          padding: 0px 4px;
          background: rgba($grey-5, 0.4);
          border-radius: $border-radius-1;
          font-size: 15px;
          line-height: 18px;
          color: $grey-8;
        }
      }

      div:nth-child(3),
      div:nth-child(4) {
        margin-bottom: 16px;
      }
    }
  }

  .question-my-question-btn {
    width: 100%;
    // margin-top: 6px;
    height: 40px;
    background: $grey-0;
    border: 1px solid $green-1;
    border-radius: $border-radius-1;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 40px;
    color: $green-1;
    transition: 0.25s;

    .iconfont {
      font-size: 14px;
      color: $green-1;
    }

    &:hover {
      color: $grey-0;
      background-color: $green-1;

      .iconfont {
        color: $grey-0;
      }
    }
  }
}
</style>
