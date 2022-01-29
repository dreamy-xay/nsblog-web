<!--
 * @Description: 撰写回答组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 18:58:26
 * @LastEditors: clq
 * @LastEditTime: 2022-01-29 16:08:45
-->
<template>
  <div class="question-detail-write-answer">
    <div class="question-detail-write-answer-container">
      <div class="header">
        <div class="left">撰写回答</div>
        <div
          class="right"
          role="button"
          @click="showInvitation"
        >邀请回答</div>
      </div>
      <div class="body">
        <v-md-editor
          v-model="answerText"
          mode="edit"
          left-toolbar="undo redo clear| bold link code quote"
          height="200px"
        />
      </div>
      <div class="footer">
        <div
          class="btn"
          role="button"
        >提交回答</div>
      </div>
    </div>
    <quesition-detail-invitation v-model:isShow="isShowIncitation" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import QuesitionDetailInvitation from '@/views/question/childComps/pages/questionDetail/childComps/QuesitionDetailInvitation.vue';

/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'questionDetailWriteAnswer',
  components: {
    QuesitionDetailInvitation,
  },
  setup() {
    let answerText = ref(''); //回答内容
    let isShowIncitation = ref(false); // 邀请回答页面显示控制 `true：显示，false：不显示`

    /**
     * @description: 显示邀请回答页面
     * @param {*}
     * @return {*}
     * @author: clq
     */
    function showInvitation() {
      isShowIncitation.value = true;
    }

    return {
      answerText,
      isShowIncitation,
      showInvitation,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-detail-write-answer {
  width: 100%;
  margin-bottom: 16px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  .question-detail-write-answer-container {
    width: 100%;

    .header {
      @include flex(center, space-between);
      box-sizing: border-box;
      width: 100%;
      height: 54px;
      margin-bottom: 16px;
      padding: 12px 16px 11px;
      border-bottom: 1px solid $grey-3;

      .left {
        font-size: 16px;
        font-weight: 700;
        color: $grey-10;
        line-height: 30px;
      }

      .right {
        font-size: 16px;
        font-weight: 400;
        color: $green-1;
        line-height: 30px;
        transition: 0.25s;

        &:hover {
          color: $green-2;
        }
      }
    }

    .body {
      padding: 0px 16px;
      :deep(.v-md-editor) {
        width: 100%;
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
    }

    .footer {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 16px 16px;

      .btn {
        width: 80px;
        height: 32px;
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
}
</style>
