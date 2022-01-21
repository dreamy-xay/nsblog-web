<!--
 * @Description: 我的问答组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-19 19:24:33
 * @LastEditors: clq
 * @LastEditTime: 2022-01-20 19:35:12
-->
<template>
  <div class="question-my-question">
    <div
      v-if="!isLogin.value"
      class="question-my-question-container"
    >
      <div class="top">
        <i class="iconfont blog-interactive" />
        我的问答
      </div>
      <div class="middle">
        <div class="middle-item">
          <div class="item-left"><i class="iconfont blog-tiwen1" />提问</div>
          <div class="item-right">23</div>
        </div>
        <div class="middle-item">
          <div class="item-left"><i class="iconfont blog-huida1" />问答</div>
          <div class="item-right">31</div>
        </div>
        <div class="middle-item">
          <div class="item-left"><i class="iconfont blog-dianzan1" />被点赞</div>
          <div class="item-right">1.1k</div>
        </div>
        <div class="middle-item">
          <div class="item-left"><i class="iconfont blog-huida" />被采访</div>
          <div class="item-right">0</div>
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
import { defineComponent, ref } from 'vue';
import { mapGetters } from '@/util/store';
import QuestionCreateQuestion from '@/views/question/chldComps/QuestionCreateQuestion.vue';

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
    const { isLogin } = mapGetters('global', ['isLogin']);
    let isModalShow = ref(false); //创建问答模态框显示控制

    /**
     * @description: 更爱模态框显示状态
     * @return {void}
     * @author: clq
     */
    function showModal() {
      isModalShow.value = !isModalShow.value;
      console.log('isModalShow.value: ' + isModalShow.value);
    }

    return { isLogin, isModalShow, showModal };
  },
});
</script>

<style lang="scss" scoped>
.question-my-question {
  box-sizing: border-box;
  padding: 16px;

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

      .iconfont {
        margin-right: 10px;
        color: $green-1;
      }
    }

    .middle {
      @include flex(center, space-between);
      flex-wrap: wrap;

      .middle-item {
        @include flex(center, space-between);
        height: 22px;
        width: 110px;
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
          opacity: 0.4;
          background: $grey-5;
          border-radius: $border-radius-1;
          font-size: 15px;
          line-height: 18px;
          color: $grey-8;
        }
      }
    }
  }

  .question-my-question-btn {
    width: 100%;
    margin-top: 6px;
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
