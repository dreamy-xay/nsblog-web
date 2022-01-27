<!--
 * @Description: 问答回答条目组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 19:18:14
 * @LastEditors: clq
 * @LastEditTime: 2022-01-27 12:58:30
-->
<template>
  <div class="question-detail-answers-item">
    <div class="question-detail-answers-item-header">
      <div class="left">
        <div class="avatar">
          <base-avatar
            :src="answer.avatar"
            :size="32"
          />
        </div>
        <div
          class="nickname"
          role="button"
          @click="toUserCenter(answer.username)"
        >{{answer.nickname}}</div>
        <div class="release-time">{{answer.child_replies ? '发布于': '回复于'}} {{answer.time}}</div>
      </div>
      <div
        v-show="answer.child_replies"
        class="right"
        role="button"
      >
        采纳
      </div>
    </div>
    <div class="question-detail-answers-item-body">
      {{answer.content}}
    </div>
    <div class="question-detail-answers-item-footer">
      <div
        class="left"
        role="button"
        @click="ShowEdit"
      >
        <div class="icon">
          <i class="iconfont blog-reply" />
        </div>
        回复
      </div>
      <div class="right">
        <div
          class="support"
          :class="{'active-support':standpoint==1}"
          role="button"
          @click="changeStandpoint(1)"
        >
          <div class="icon"><i class="iconfont blog-tubiao73"></i></div>
          支持({{answer.support_count}})
        </div>
        <div
          class="oppose"
          :class="{'active-oppose':standpoint==2}"
          role="button"
          @click="changeStandpoint(2)"
        >
          <div class="icon"><i class="iconfont blog-tubiao73"></i></div>
          反对({{answer.oppose_count}})
        </div>
      </div>
    </div>
    <div
      v-show="isShowEdit"
      class="edit"
    >

      <v-md-editor
        v-model="text"
        mode="edit"
        left-toolbar="undo redo clear| bold link code quote"
        height="200px"
      />
      <div
        class="btn"
        role="button"
      >提交回答</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import { number } from 'echarts/core';

/**
 * @description: 问答回答条目组件
 * @param {Object} answer 问答回答
 * @author: clq
 */

export default defineComponent({
  name: 'questionDetailAnswersItem',
  components: { BaseAvatar },
  props: {
    parentId: {
      type: number,
    },
    answer: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    let isShowEdit = ref(false); // 编辑框显示标志 `true:显示, false:不显示`
    let text = ref(''); // 回答内容
    let standpoint = ref(0); // 当前用户对回答的态度 `0为无操作，1为推荐，2为反对`
    console.log('props.answer');
    console.log(props.answer);

    /**
     * @description: 跳转到用户zhuye
     * @param {string} username
     * @return {void}
     * @author: clq
     */
    function toUserCenter(username) {
      window.open(`/user/${username}`);
    }

    /**
     * @description: 修改观点
     * @param {number} newpoint  `0为无操作，1为推荐，2为反对`
     * @return {void}
     * @author: clq
     */
    function changeStandpoint(newpoint) {
      if (standpoint.value == newpoint) standpoint.value = 0;
      else standpoint.value = newpoint;
      // console.log('standpoint: ' + standpoint.value);
    }

    /**
     * @description: 改变编辑框显示状态
     * @return {void}
     * @author: clq
     */
    function ShowEdit() {
      isShowEdit.value = !isShowEdit.value;
      console.log('isShowEdit: ' + isShowEdit.value);
    }

    return {
      isShowEdit,
      text,
      standpoint,
      toUserCenter,
      changeStandpoint,
      ShowEdit,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-detail-answers-item {
  width: 100%;

  .question-detail-answers-item-header {
    width: 100%;
    height: 32px;
    @include flex(center, space-between);

    .left {
      @include flex(center);

      .nickname {
        margin: 0px 30px 0px 10px;
        font-size: 14px;
        font-weight: 400;
        color: #4bd8aa;
        line-height: 32px;
      }

      .release-time {
        font-size: 14px;
        text-align: left;
        color: #707070;
        line-height: 32px;
      }
    }

    .right {
      height: 24px;
      padding: 0px 12px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
      font-size: 14px;
      text-align: center;
      color: #707070;
      line-height: 24px;
    }
  }

  .question-detail-answers-item-body {
    width: 100%;
    margin: 16px 0px;
    font-size: 14px;
    color: #8c8c8c;
  }

  .question-detail-answers-item-footer {
    @include flex(center, space-between);
    width: 100%;
    height: 20px;
    margin-bottom: 16px;

    .left {
      @include flex(center);
      font-size: 14px;
      line-height: 20px;
      color: $green-0;
      transition: 0.25s;

      &:hover {
        color: $green-2;
      }
      .icon {
        margin-right: 4px;
      }
    }

    .right {
      @include flex(center);
      & > div {
        @include flex(center);
        font-size: 14px;
        line-height: 20px;
        color: #8c8c8c;
        transition: 0.25s;
      }

      .support {
        margin-right: 20px;

        &:hover {
          color: $green-2;
        }

        .icon {
          margin-right: 4px;
        }
      }

      .active-support {
        color: $green-2;
      }

      .oppose {
        &:hover {
          color: $orange-0;
        }

        .icon {
          margin-right: 4px;
        }
      }

      .active-oppose {
        color: $orange-0;
      }
    }
  }

  .edit {
    :deep(.v-md-editor) {
      width: 100%;
      margin-bottom: 16px;
      z-index: 9999999999;
      box-shadow: $shadow-0;
      border-radius: $border-radius-0;
      transition: 0.25s;
      overflow: hidden;

      &:focus-within {
        box-shadow: $shadow-2;
      }

      &:hover {
        box-shadow: $shadow-2;
      }
    }

    .btn {
      width: 80px;
      height: 32px;
      margin-bottom: 16px;
      background-color: $green-0;
      border-radius: $border-radius-1;
      box-shadow: $shadow-0;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      line-height: 32px;
      color: $grey-0;
      transition: 0.25s;

      &:hover {
        background-color: $green-1;
      }
    }
  }
}
</style>
