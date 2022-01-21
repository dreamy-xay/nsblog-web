<!--
 * @Description: 创建问答模态框
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-20 17:15:26
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-21 21:53:36
-->
<template>
  <n-modal
    display-directive="show"
    :show="modelValue"
  >
    <div class="question-create-question">
      <div class="question-create-question-header">
        <div
          class="close-btn"
          role="button"
          @click="closeModel"
        >
          <i class="iconfont blog-cha"></i>
        </div>
        <div class="title">提问题</div>
      </div>
      <div class="question-create-question-body">
        <div class="body-top">
          <base-input :style="{width: '100%',height: '36px'}" />
        </div>
        <div class="body-middle">
          <div class="title">添加标签</div>
          <div class="select">
            <base-select :swidth="150" />
          </div>
          <div class="select">
            <base-select :swidth="150" />
          </div>
        </div>
        <div class="body-bottom body-bottom-edit-shadow">
          <v-md-editor
            v-model="text"
            mode="edit"
            left-toolbar="undo redo clear| bold link code quote"
            height="320px"
          />
        </div>
      </div>
      <div class="question-create-question-footer">
        <div
          class="btn"
          role="button"
        >发布提问</div>
      </div>
    </div>
  </n-modal>
</template>

<script>
import { defineComponent } from 'vue';
import BaseSelect from '@/components/content/baseSelect/BaseSelect.vue';
import BaseInput from '@/components/content/baseInput/BaseInput.vue';
/**
 * @description: 创建问答模态框
 * @param {Boolean} modelValue 模态框显示绑定值，使用v-model指令即可 `默认为false`
 * @author: clq
 */

export default defineComponent({
  name: 'questionCreateQuestion',
  components: {
    BaseSelect,
    BaseInput,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    /**
     * @description: 关闭窗口
     * @return {void}
     * @author: clq
     */
    function closeModel() {
      context.emit('update:modelValue', false);
    }
    return { closeModel };
  },
});
</script>

<style lang="scss" scoped>
.question-create-question {
  width: 800px;
  border-radius: $border-radius-0;
  background-color: $grey-0;

  & > div {
    width: 100%;
  }

  .question-create-question-header {
    @include flex(center, initial, row-reverse);
    box-sizing: border-box;
    height: 54px;
    padding: 16px 18px 15px;
    border-bottom: 1px solid $grey-2;
    text-align: center;
    line-height: 54px;

    .title {
      margin-right: 340px;
      font-size: 16px;
      font-weight: 700;
      color: $grey-11;
      line-height: 22px;
    }

    .close-btn {
      width: 28px;
      height: 28px;
      border-radius: $border-radius-1;
      color: $grey-7;
      line-height: 28px;
      text-align: center;
      transition: all 0.25s;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
        background-color: $grey-2;
      }
    }
  }

  .question-create-question-body {
    box-sizing: border-box;
    width: 100%;
    padding: 16px 24px 30px;
    border-bottom: 1px solid $grey-2;

    .body-top {
      margin-bottom: 16px;
    }

    .body-middle {
      @include flex(center);
      height: 36px;
      margin-bottom: 16px;

      .title {
        margin-right: 32px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: $grey-8;
        line-height: 36px;
      }

      .select {
        margin-right: 16px;
      }
    }

    .body-bottom {
      :deep(.v-md-editor) {
        width: 100%;
        z-index: 9999999999;
        box-shadow: $shadow-0;
        border-radius: $border-radius-0;
        transition: 0.25s;
        overflow: hidden;
      }

      &.body-bottom-edit-shadow :deep(.v-md-editor) {
        &:focus-within {
          box-shadow: $shadow-2;
        }

        &:hover {
          box-shadow: $shadow-2;
        }
      }
    }
  }

  .question-create-question-footer {
    box-sizing: border-box;
    width: 100%;
    height: 58px;
    padding-top: 10px;
    .btn {
      width: 100px;
      height: 32px;
      margin: auto;
      background-color: $green-1;
      border-radius: $border-radius-0;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      color: $grey-0;
      line-height: 32px;
      transition: 0.25s;

      &:hover {
        background-color: $green-2;
      }
    }
  }
}
</style>
