<!--
 * @Description: 问答条目组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-19 19:21:05
 * @LastEditors: clq
 * @LastEditTime: 2022-01-25 12:41:13
-->
<template>
  <div class="question-item">
    <div
      class="question-item-left"
      :class="{'question-item-border': question.reply_count>0, 'question-item-bgc':question.solution>0}"
    >
      <div class="left-top">
        {{numberFormat(question.reply_count)}}
      </div>
      <div class="left-bottom">
        {{question.solution? "解决":"回答"}}
      </div>
    </div>
    <div
      class="question-item-middle"
      :class="{'question-item-color': question.browsing_count >= 100}"
    >
      <div class="middle-top">{{numberFormat(question.browsing_count)}}</div>
      <div class="middle-bottom">阅读</div>
    </div>
    <div class="question-item-right">
      <div
        class="right-top"
        role="button"
        @click="toResourceDetailPage(question.id)"
      >{{question.title}}</div>
      <div class="right-middle">{{question.content}}</div>
      <div class="right-bottom">
        <div class="bottom-left">
          <div
            class="tag"
            v-for="(item) in question.tags"
            :key="item.id"
            role="button"
          >{{item.name}}</div>
        </div>
        <div class="bottom-right">
          <div
            class="nickname"
            role="button"
            @click="toUserPage(question.username)"
          >{{question.nickname}}</div>
          <div class="point"></div>
          <div class="release-time">{{question.release_time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

/**
 * @description: 问答条目组件
 * @author: clq
 * @param {Object} question 问答信息
 */

export default defineComponent({
  name: 'questionItem',
  props: {
    question: {
      type: Object,
      required: true,
      default: null,
    },
  },
  setup() {
    const route = useRoute(); //route

    /**
     * @description: 将大于1000的数转化为以k为单位的字符串
     * @param {number} num 待处理的数据
     * @return {void}
     * @author: clq
     */
    function numberFormat(num) {
      if (num > 1000) {
        return `${Math.floor(num / 1000)}.${Math.floor((num % 1000) / 100)}k`;
      } else {
        return num;
      }
    }

    /**
     * @description: 跳转到问答详情页面
     * @param {number} questionId 问答id
     * @return {void}
     * @author: clq
     */
    function toResourceDetailPage(questionId) {
      console.log('questionId: ' + questionId);
      // this.$router.push({ name: 'questionDetail', query: { id: questionId } });
      window.open(`/question/detail?id=${questionId}`);
      // window.open(`/question/${questionId}`);
    }

    /**
     * @description: 跳转到用户主页
     * @param {string} username
     * @return {void}
     * @author: clq
     */
    function toUserPage(username) {
      console.log('username: ' + username);
      // this.$router.push({ name: 'question', params: { username: username } });
      window.open(`/user/${username}`);
    }

    return {
      numberFormat,
      toResourceDetailPage,
      toUserPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-item {
  @include flex(center, space-between);
  box-sizing: border-box;
  // width: 660px;
  width: 100%;
  // height: 80px;
  margin: 0px auto;
  padding: 12px 18px 11px;
  border-bottom: 1px solid $grey-4;
  transition: 0.25s;

  // &:hover {
  //   background-color: $grey-1;
  // }

  .question-item-left {
    box-sizing: border-box;
    width: 56px;
    height: 56px;
    padding: 6px 0px;
    border-radius: 4px;

    & > div {
      width: 100%;
      font-weight: 400;
      text-align: center;
      color: $grey-8;
    }

    .left-top {
      font-size: 16px;
      height: 24px;
      line-height: 24px;
    }

    .left-bottom {
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }
  }

  .question-item-border {
    border: 1px solid $green-1;
    & > div {
      color: $green-1;
    }
  }

  .question-item-bgc {
    background-color: $green-1;
    & > div {
      color: $grey-0;
    }
  }

  .question-item-middle {
    width: 56px;
    height: 44px;

    & > div {
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      color: $grey-8;
    }

    .middle-top {
      height: 24px;
      line-height: 24px;
    }

    .middle-bottom {
      height: 20px;
      line-height: 20px;
    }
  }

  .question-item-color {
    & > div {
      color: $red-4;
    }
  }

  .question-item-right {
    @include flex(initial, space-between, column);
    width: 524px;
    height: 100%;

    & > div {
      width: 100%;
    }

    .right-top {
      @include ellipsis(1);
      height: 24px;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      line-height: 24px;
      color: $grey-10;

      &:hover {
        color: $green-0;
      }
    }

    .right-middle {
      @include ellipsis(1);
      height: 17px;
      font-size: 13px;
      font-weight: 400;
      text-align: left;
      line-height: 17px;
      color: $grey-7;
    }

    .right-bottom {
      @include flex(initial, space-between);
      height: 24px;

      .bottom-left {
        @include flex();
        height: inherit;

        .tag {
          box-sizing: border-box;
          height: inherit;
          margin-right: 8px;
          padding: 3px 8px;
          background: rgba(133, 232, 199, 0.3);
          border-radius: 4px;
          font-size: 14px;
          font-weight: 400;
          color: $green-1;
          transition: 0.25s;

          &:hover {
            color: $green-2;
            background-color: rgba(133, 232, 199, 0.7);
          }
        }
      }

      .bottom-right {
        @include flex(center);
        height: inherit;

        .nickname {
          height: 14px;
          font-size: 12px;
          text-align: center;
          line-height: 14px;
          color: $grey-7;

          &:hover {
            color: $green-0;
          }
        }

        .point {
          height: 3px;
          width: 3px;
          margin: 0px 6px;
          background: $grey-7;
          border: 1px solid $grey-8;
          border-radius: 50%;
        }

        .release-time {
          height: 14px;
          font-size: 12px;
          color: $grey-7;
        }
      }
    }
  }
}
</style>
