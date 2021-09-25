<!--
 * @Description: 用户主页问答记录数据组件
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-17 19:34:19
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-20 17:33:20
-->

<template>
  <div
    class="user-question-switch"
    v-if="(privacy || self) && data.length"
  >
    <div
      class="user-question-switch-context"
      v-for="(item , index) in data"
      :key="index"
    >
      <a
        v-if="!question"
        class="title"
        role="button"
        :href="'/question/'+item.id"
        :target="'/question/'+item.id"
      >{{item.title}}</a>

      <div :class="question ? 'markdown-false' : 'markdown-true'">
        <v-md-preview :text="item.content" />
      </div>

      <div class="bottom">
        <div class="left">
          <div class="left-icon"><i :class="question ? 'iconfont blog-wenti1' : 'iconfont blog-huida'"></i></div>
          <div class="left-text">
            <div :class="question ? 'left-text-false' : 'left-text-true'">
              {{question ?'回答的问题' : item.reply_count+'回答' }}</div>

            <a
              v-if="question"
              class="text"
              role="button"
              :href="'/question/'+item.question_id"
              :target="'/question/'+item.question_id"
            >{{item.question_title}}</a>

          </div>
        </div>

        <div class="right">
          <div class="right-icon"><i class="iconfont blog-lishijilu-copy"></i></div>
          <div class="right-text">{{question ? "回答于 " + dateFormat('YY-mm-dd HH:MM', new Date(item.reply_time)) : "发布于 " + dateFormat('YY-mm-dd HH:MM', new Date(item.release_time))}}</div>
        </div>
      </div>

    </div>

    <div
      v-if="loading"
      role="button"
      class="user-question-switch-button"
      @click="addData"
    >加载更多...</div>
  </div>

  <user-null
    v-else
    :select="self ? true : privacy"
  />

</template>
<script>
import { defineComponent } from 'vue';
import UserNull from '@/views/user/childComps/UserNull.vue';
import { dateFormat } from '@/util/date';

/**
 * @description: 用户主页问答记录数据组件
 * @param {Boolean} question true 回答页面 false 提问页面 `默认为false`
 * @param {Array} data 数据 `默认为[]`
 * @param {Boolean} self 是否是自己登录 `默认为false`
 * @param {Boolean} privacy 是否为隐私设置 `默认为false`
 * @param {Boolean} loading 加载按钮状态
 * @event addData 添加数据 `返回 props.question`
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'userQuestionSwitch',
  components: {
    UserNull,
  },
  props: {
    question: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    self: {
      type: Boolean,
      default: false,
    },
    privacy: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    /**
     * @description: 点击按钮加载数据
     * @author: Z_Y_C
     */
    function addData() {
      context.emit('addData', props.question);
    }
    return { dateFormat, addData };
  },
});
</script>

<style lang="scss" scoped>
.user-question-switch {
  width: 100%;
  @include flex(center, center, column);

  .user-question-switch-context {
    @include flex(initial, center, column);
    width: 858px;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    margin-bottom: 16px;
    padding: 16px;

    .title {
      font-size: 16px;
      color: $grey-11;
      font-weight: 700;
      margin-bottom: 5px;
      @include word-break;
      transition: 0.25s;

      &:hover {
        color: $green-0;
      }
    }

    .markdown-true {
      :deep(.github-markdown-body) {
        padding: 0;
      }
    }

    .markdown-false {
      margin-bottom: 16px;

      :deep(.github-markdown-body) {
        box-shadow: $shadow-0;
        border-radius: $border-radius-0;
        background-color: $grey-1;
        padding: 16px 16px 0 16px;
      }
    }

    .bottom {
      @include flex(center, space-between, row);
      height: 20px;
      width: 100%;

      .left {
        @include flex(center);

        .left-icon {
          line-height: 20px;
          height: 20px;
          color: $grey-7;
          margin-right: 5px;

          .iconfont {
            font-size: 16px;
          }
        }

        .left-text {
          @include flex(center);

          .left-text-true {
            line-height: 20px;
            height: 20px;
            color: $grey-10;
            font-size: 14px;
          }

          .left-text-false {
            @include flex(center);
            color: $grey-7;
            line-height: 20px;
            height: 20px;
            margin-right: 5px;
            font-size: 14px;
          }

          .text {
            line-height: 20px;
            height: 20px;
            color: $grey-10;
            font-size: 14px;
            transition: 0.25s;
            width: 580px;
            @include ellipsis(1);

            &:hover {
              color: $green-0;
            }
          }
        }
      }

      .right {
        @include flex(center);

        .right-icon {
          line-height: 20px;
          height: 20px;
          color: $grey-7;
          margin-right: 5px;

          .iconfont {
            font-size: 16px;
          }
        }

        .right-text {
          line-height: 20px;
          height: 20px;
          color: $grey-7;
          font-size: 14px;
        }
      }
    }
  }

  .user-question-switch-button {
    @include flex(center, center);
    height: 32px;
    width: 300px;
    background-color: $grey-1;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    font-size: 14px;
    color: $grey-9;
    transition: 0.25s;

    &:hover {
      color: $grey-10;
      background-color: $grey-3;
    }
  }
}
</style>
