<!--
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-06-27 20:21:16
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-07-02 17:05:10
-->
<template>
  <div class="admin-tools-automatic-generation">
    <div class="centent">
      <div class="left">
        <div class="summary">摘要配置参数</div>

        <div class="slider-demo-block">
          <div class="demonstration">句子使用比率<div class="english">ratio</div>
          </div>
          <el-slider
            v-model="value1"
            :min="0"
            :max="1"
            :step="0.01"
            :marks="{0:'0',1:'1'}"
          />
        </div>

        <div class="slider-demo-block">
          <div class="demonstration">句子最小长度<div class="english">min_length</div>
          </div>
          <el-input-number
            v-model="num1"
            :min="4"
            :max="100"
          />
        </div>

        <div class="slider-demo-block">
          <div class="demonstration">句子最大长度<div class="english">max_length</div>
          </div>
          <el-input-number
            v-model="num2"
            :min="4"
            :max="400"
          />
        </div>
        <div class="line"></div>
        <div class="summary">标题配置参数</div>

        <div class="slider-demo-block">
          <div class="demonstration">top_k</div>
          <el-slider
            v-model="value2"
            :min="10"
            :max="4000"
            :marks="{10:'10',4000:'4000'}"
          />
        </div>
        <div class="slider-demo-block">
          <div class="demonstration">top_p</div>
          <el-slider
            v-model="value3"
            :min="0"
            :max="1"
            :step="0.01"
            :marks="{0:'0',1:'1'}"
          />
        </div>

        <div
          class="slider-demo-block"
          :style="{marginBottom:0}"
        >
          <div class="demonstration">标题最大长度<div class="english">max_length</div>
          </div>
          <el-input-number
            v-model="num3"
            :min="6"
            :max="42"
          />
        </div>

      </div>

      <div class="right">
        <div class="automatic-generation-article">
          <div class="name">内容</div>
          <el-input
            class="input-remark"
            v-model="inputArticle"
            type="textarea"
            :rows="10"
            show-word-limit
          />
        </div>

        <div class="generation-button">
          <div
            class="button"
            role="button"
            @click="generateTitle"
          >生成标题</div>
          <div
            class="button"
            role="button"
            @click="generateSummary"
          >生成摘要 </div>
        </div>

        <div
          class="automatic-generation-title"
          v-show="showTitle"
        >
          <div class="name">标题</div>
          <el-input
            v-model="inputValue"
            class="input-remark"
            type="textarea"
            :rows="1"
            readonly
          />
        </div>

        <div
          class="automatic-generation-abstract"
          v-show="showContent"
        >
          <div class="name">摘要</div>
          <el-input
            class="input-remark"
            v-model="inputRemark"
            type="textarea"
            :rows="7"
            show-word-limit
            readonly
          />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
import { useMessage } from 'naive-ui';
import { defineComponent, ref } from 'vue';

/**
 * @description:
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'adminToolsAutomaticGeneration',
  setup() {
    const msg = useMessage();
    const inputRemark = ref('');
    const inputValue = ref('');
    const inputArticle = ref('');

    const showTitle = ref(false);
    const showContent = ref(false);

    function getPreProcessingContent() {
      return inputArticle.value
        .trim()
        .replace(/[ \t]+/g, '，')
        .replace(/(\n)+/g, '。')
        .replace(/[，。]{2,}/g, '。');
    }

    function generateTitle() {
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:3001/v1/generate/title',
        data: {
          content: getPreProcessingContent(),
          ai_token: 'as89as#5612&jhsgja$Jja90I7&sa712@asasjjj!',
          top_k: value2.value,
          top_p: value3.value,
          max_length: Math.max(num3.value, 32),
        },
      })
        .then((data) => {
          inputValue.value = data.data.title;
          showTitle.value = true;
        })
        .catch(() => {
          msg.error('生成标题失败');
        });
    }

    function generateSummary() {
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:3001/v1/generate/summary',
        data: {
          content: getPreProcessingContent(),
          ai_token: 'as89as#5612&jhsgja$Jja90I7&sa712@asasjjj!',
          ratio: value1.value,
          min_length: num1.value,
          max_length: num2.value,
        },
      })
        .then((data) => {
          inputRemark.value = data.data.summary;
          showContent.value = true;
        })
        .catch(() => {
          msg.error('生成摘要失败');
        });
    }

    const value1 = ref(0.2);
    const value2 = ref(3000);
    const value3 = ref(0.9);
    const num1 = ref(10);
    const num2 = ref(400);
    const num3 = ref(32);

    return {
      inputRemark,
      inputValue,
      inputArticle,
      generateTitle,
      generateSummary,
      value1,
      value2,
      value3,
      num1,
      num2,
      num3,
      showTitle,
      showContent,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-tools-automatic-generation {
  width: 100%;
  background: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $border-radius-0;
  @include flex(initial, initial, column);
  overflow: hidden;

  .top {
    @include flex(center, space-between);
    border-bottom: 1px solid $grey-4;
    padding: 0 16px 16px 16px;

    .title {
      font-weight: 700;
      font-size: 24px;
    }
  }

  .name {
    margin-bottom: 5px;
    color: $grey-9;
    text-indent: 3px;
  }

  .centent {
    @include flex(initial, space-between);

    .left {
      width: 260px;
      background-color: $grey-3;
      padding: 24px;

      .summary {
        margin-bottom: 16px;
        font-weight: 700;
        font-size: 18px;
      }

      .line {
        height: 1px;
        width: 100%;
        margin: 16px 0;
        background-color: $grey-4;
      }

      .slider-demo-block {
        @include flex(initial, initial, column);
        width: 100%;
        margin-bottom: 30px;

        .demonstration {
          margin-bottom: 5px;
          color: $grey-9;

          @include flex();
          .english {
            margin-left: 5px;
            color: $blue-1;
          }
        }
        .el-slider {
          width: 100%;

          :deep(.el-slider__runway) {
            background-color: $grey-0;
            margin: 10px 0;
          }
        }

        .el-input-number {
          width: 100%;
        }
      }
    }

    .right {
      width: calc(100% - 300px);
      padding: 24px;

      .automatic-generation-title {
        @include flex(initial, initial, column);
        margin-bottom: 20px;

        .input-remark {
          border-radius: $border-radius-1;
          width: 100%;

          :deep(.el-textarea__inner) {
            resize: none;
            padding: 6px 8px;
            border: 1px solid $grey-3;
            background-color: $grey-3;
            box-shadow: none;
            &:hover,
            &:focus {
              // color: $green-1;
              // box-shadow: $shadow-2;
              // border-color: $grey-0;
              border: 1px solid $grey-4;
            }
          }
        }
      }

      .generation-button {
        @include flex(center);
        margin-bottom: 20px;

        .button {
          @include flex(center, center);
          width: 100px;
          height: 32px;
          background: $grey-0;
          border-radius: $border-radius-1;
          color: $grey-9;
          margin-bottom: 3px;
          transition: 0.25s;
          margin-right: 10px;
          border: 1px solid $grey-4;
          box-sizing: border-box;
          transition: 0.25s;

          &:hover {
            color: $blue-2;
            border: 1px solid $blue-2;
          }
        }
      }

      .automatic-generation-abstract {
        @include flex(initial, initial, column);

        margin-bottom: 20px;

        .input-remark {
          border-radius: $border-radius-1;
          width: 100%;

          :deep(.el-textarea__inner) {
            resize: none;
            padding: 6px 8px;
            border: 1px solid $grey-3;
            background-color: $grey-3;
            box-shadow: none;
            &:hover,
            &:focus {
              // color: $green-1;
              // box-shadow: $shadow-2;
              // border-color: $grey-0;
              border: 1px solid $grey-4;
            }
          }
        }
      }

      .automatic-generation-article {
        @include flex(initial, initial, column);

        margin-bottom: 20px;

        .input-remark {
          border-radius: $border-radius-1;
          width: 100%;

          :deep(.el-textarea__inner) {
            resize: none;
            padding: 6px 8px;
            border: 1px solid $grey-3;
            background-color: $grey-3;
            box-shadow: none;
            &:hover,
            &:focus {
              // color: $green-1;
              // box-shadow: $shadow-2;
              // border-color: $grey-0;
              border: 1px solid $grey-4;
            }
          }
        }
      }
    }
  }
}
</style>
