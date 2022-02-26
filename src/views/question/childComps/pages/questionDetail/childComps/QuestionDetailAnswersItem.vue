<!--
 * @Description: 问答回答条目组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 19:18:14
 * @LastEditors: clq
 * @LastEditTime: 2022-02-26 21:58:31
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
        <div
          v-show="answer.reply_nickname"
          class="reply"
        >
          <div class="text">回复</div>
          <div
            class="reply-name"
            role="button"
            @click="toUserCenter(answer.reply_nickname)"
          >{{answer.reply_nickname}}</div>
        </div>
        <div class="release-time">{{answer.child_replies ? '发布于': '回复于'}} {{answer.time}}</div>
      </div>
      <div
        v-show="isBtn || isAccept"
        class="right"
        :class="isAccept? isBtn? 'isAccept-btn':'isAccept':''"
        :role="isBtn? 'button':''"
        @click="changeAccept(isBtn,answer.id)"
      >
        {{isBtn? isAccept? '已采纳':'采纳' : isAccept? '√已被采纳':''}}
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
          :class="{'active-support':answer.evaluation==1}"
          role="button"
          @click="changeStandpoint(1)"
        >
          <div class="icon"><i class="iconfont blog-tubiao73"></i></div>
          支持({{answer.support_count}})
        </div>
        <div
          class="oppose"
          :class="{'active-oppose':answer.evaluation==2}"
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
        @click="releaseReply()"
      >提交回复</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import { releaseQuestionReply, changeEvaluationOnReply } from '@/network/api/questions';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';
import { mapState } from '@/util/store';

/**
 * @description: 问答回答条目组件
 * @param parentId 上级回复id
 * @param {Object} answer 问答回答
 * @param {Number} solutionId 被采纳回答的id
 * @event addReply 添加回复 {praentId:一级回复id, replyId:回复对象id, text:回复文本信息}
 * @event changeAcceptValue 修改回答采纳状态 {answerId: 待修改的回答id}
 * @event changeEvaluation 修改回答评价{parentId:一级回答id, replyId: 回答id, newEvaluation: 新评价, newSupportCount: 新支持数, newOpposeCount: 新反对数}
 * @author: clq
 */

export default defineComponent({
  name: 'questionDetailAnswersItem',
  components: { BaseAvatar },
  emits: ['addReply', 'changeAcceptValue', 'changeEvaluation'],
  props: {
    parentId: {
      type: Number,
      default: -1,
    },
    answer: {
      type: Object,
      required: true,
    },
    solutionId: {
      type: Number,
      required: true,
    },
    isBtn: {
      type: Boolean,
      default: false,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const msg = useMessage();
    const route = useRoute(); //route
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 全局用户信息
    const questionId = route.params.questionId;
    let isShowEdit = ref(false); // 编辑框显示标志 `true:显示, false:不显示`
    let text = ref(''); // 回答内容
    // console.log('props.answer');
    // console.log(props.answer);

    // console.log('tokenInfo: ');
    //     console.log(tokenInfo);
    //     console.log(tokenInfo.value.username);

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
      let newEvaluation = props.answer.evaluation == newpoint ? 0 : newpoint;
      let newSupportCount;
      let newOpposeCount;
      changeEvaluationOnReply(props.answer.id, newEvaluation)
        .then(() => {
          if (props.answer.evaluation == 0) {
            if (newpoint == 1) {
              newSupportCount = props.answer.support_count + 1;
              newOpposeCount = props.answer.oppose_count;
            } else {
              newSupportCount = props.answer.support_count;
              newOpposeCount = props.answer.oppose_count + 1;
            }
          } else if (props.answer.evaluation == 1) {
            if (newpoint == 1) {
              newSupportCount = props.answer.support_count - 1;
              newOpposeCount = props.answer.oppose_count;
            } else {
              newSupportCount = props.answer.support_count - 1;
              newOpposeCount = props.answer.oppose_count + 1;
            }
          } else {
            if (newpoint == 1) {
              newSupportCount = props.answer.support_count + 1;
              newOpposeCount = props.answer.oppose_count - 1;
            } else {
              newSupportCount = props.answer.support_count;
              newOpposeCount = props.answer.oppose_count - 1;
            }
          }
          context.emit(
            'changeEvaluation',
            props.parentId,
            props.answer.id,
            newEvaluation,
            newSupportCount,
            newOpposeCount
          );
        })
        .catch((error) => {
          console.log(error);
          msg.error('评价修改失败');
        });
    }

    /**
     * @description: 改变编辑框显示状态
     * @return {void}
     * @author: clq
     */
    function ShowEdit() {
      isShowEdit.value = !isShowEdit.value;
      // console.log('isShowEdit: ' + isShowEdit.value);
    }

    /**
     * @description: 回复
     * @return {void}
     * @author: clq
     */
    function releaseReply() {
      // console.log('releaseReply');
      // console.log(questionId);
      // console.log(props.answer.id);
      // console.log(props.answer.username);
      // console.log(text.value);

      context.emit(
        'addReply',
        props.parentId == -1 ? props.answer.id : props.parentId,
        props.parentId == -1 ? -1 : props.answer.id,
        text.value,
        props.answer.username
      );
      text.value = '';
      isShowEdit.value = false;
    }

    /**
     * @description: 修改回答采纳状态
     * @param {boolean} isBtn 按扭点击是否有效
     * @param {number} answerId 回答id
     * @return {void}
     * @author: clq
     */
    function changeAccept(isBtn, answerId) {
      if (isBtn) {
        // console.log('changeAccept: ' + answerId);
        context.emit('changeAcceptValue', answerId);
      }
    }

    return {
      isShowEdit,
      text,
      tokenInfo,
      toUserCenter,
      changeStandpoint,
      ShowEdit,
      releaseReply,
      changeAccept,
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
        margin-left: 10px;
        font-size: 14px;
        font-weight: 400;
        color: $green-1;
        line-height: 32px;
      }

      .reply {
        @include flex(center);

        .text {
          margin: 0px 6px;
          font-size: 14px;
          color: $grey-6;
        }

        .reply-name {
          font-size: 14px;
          color: $grey-7;
          transition: 0.25s;

          &:hover {
            color: $green-1;
          }
        }
      }

      .release-time {
        margin-left: 20px;
        font-size: 14px;
        text-align: left;
        color: $grey-8;
        line-height: 32px;
      }
    }

    .right {
      height: 24px;
      padding: 0px 12px;
      background: $grey-0;
      border-radius: 12px;
      box-shadow: $shadow-0;
      font-size: 14px;
      text-align: center;
      color: $grey-8;
      line-height: 24px;
      transition: 0.25s;

      &:hover {
        background-color: $green-1;
        color: $grey-0;
      }
    }

    .isAccept {
      background-color: $green-1;
      color: $grey-0;
    }

    .isAccept-btn {
      background-color: $green-1;
      color: $grey-0;

      &:hover {
        background-color: $green-2;
      }
    }
  }

  .question-detail-answers-item-body {
    width: 100%;
    margin: 16px 0px;
    font-size: 14px;
    color: $grey-7;
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
        color: $grey-7;
        transition: 0.25s;
      }

      .support {
        margin-right: 20px;

        &:hover {
          color: $green-1;
        }

        .icon {
          margin-right: 4px;
        }
      }

      .active-support {
        color: $green-1;

        &:hover {
          color: $green-2;
        }
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

        &:hover {
          color: $orange-1;
        }
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
