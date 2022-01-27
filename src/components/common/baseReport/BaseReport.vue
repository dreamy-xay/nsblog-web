<!--
 * @Description:举报页面
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-19 22:18:34
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-27 13:35:39
-->
<template>
  <n-modal
    display-directive="show"
    :show="isShow"
  >
    <div class="report">
      <div class="report-head">
        <div class="title">举报</div>
        <div
          class="top-icon"
          role="button"
          @click="close"
        ><i class="iconfont blog-close"></i></div>
      </div>
      <hr class="report-hr">
      <div class="report-body">
        <div class="text">我要举报，理由是：</div>
        <el-radio-group
          class="reports"
          v-model="radio"
          v-for="report in reports"
          :key="report.id"
        >
          <el-radio
            class="label"
            :label="report.id"
          >
            <div class="label-content">
              <div class="report-title">{{report.title}}</div>
              <div class="report-content"> {{report.content}}</div>
            </div>
          </el-radio>
        </el-radio-group>
        <div class="input-title">补充说明</div>
        <el-input
          class="input-remark"
          v-model="textarea"
          type="textarea"
          maxlength="128"
          :rows="4"
        />

      </div>
      <hr class="report-hr">
      <div class="report-foot">
        <div
          class="button"
          role="button"
          @click="close"
        >取消</div>
        <div
          class="button"
          role="button"
          @click="commit"
        >提交</div>
      </div>
    </div>
  </n-modal>

</template>

<script>
import { defineComponent, ref } from 'vue';

/**
 * @description:举报页面
 * @param {Boolean} isShow 是否显示举报界面 `默认为false`
 * @author: xiao
 */

export default defineComponent({
  name: 'Report',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, context) {
    const radio = ref(-1); //选择的内容
    const textarea = ref(''); //输入的内容
    const reports = [
      {
        id: '0',
        title: '需要关闭：',
        content: '请选择理由',
      },
      {
        id: '1',
        title: '推广广告信息：',
        content: '广告、招聘、推广、测试等内容',
      },
      {
        id: '2',
        title: '违规内容：',
        content: '色情、暴力、血腥、敏感信息等',
      },
      {
        id: '3',
        title: '违规内容：',
        content: '含有法律、法规禁止的其他内容',
      },
      {
        id: '4',
        title: '不友善内容：',
        content: '人身攻击、挑衅辱骂、恶意行为',
      },
      {
        id: '5',
        title: '其他：',
        content: '请补充说明',
      },
    ];

    /**
     * @description: 点击关闭触发函数
     * @author: xiao
     */
    function close() {
      context.emit('update:isShow', false);
    }

    /**
     * @description: 提交举报信息
     * @return {void}
     * @author: xiao
     */
    function commit() {
      console.log(reports[radio.value].title);
      console.log(reports[radio.value].content);
      console.log(textarea.value);
    }
    return {
      radio,
      reports,
      textarea,
      close,
      commit,
    };
  },
});
</script>

<style lang="scss" scoped>
.report {
  width: 450px;
  height: 481px;
  background: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  .report-hr {
    height: 1px;
    border: none;
    border-top: 1px;
    background: $grey-2;
  }

  .report-head {
    @include flex(center, center, column);
    height: 51px;
    position: relative;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: $grey-10;
    }

    .top-icon {
      color: $grey-7;
      position: absolute;
      right: 24px;
      transition: 0.25s;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
      }
    }
  }

  .report-body {
    .text {
      font-size: 16px;
      font-weight: 700;
      color: $grey-8;
      margin-top: 16px;
      margin-bottom: 9px;
      margin-left: 24px;
    }

    :deep(.el-radio) {
      color: $grey-7;
      margin-bottom: 5px;

      .el-radio__inner {
        width: 19px;
        height: 19px;
        background: transparent;
        box-sizing: border-box;
        border: 1px solid $grey-7;
        border-color: $grey-7;
        box-shadow: $shadow-0;

        &::after {
          box-shadow: $shadow-2;
          background-color: $green-1;
          width: 10px;
          height: 10px;
        }

        &:hover {
          border: 2px solid $green-1;
        }
      }

      .el-radio__input.is-checked + .el-radio__label {
        color: $green-1;
      }

      .el-radio__input.is-checked .el-radio__inner {
        background: $grey-0;
        border-color: $green-1;
        box-shadow: $shadow-2;
      }
    }

    .input-title {
      font-size: 16px;
      font-weight: 700;
      color: $grey-8;
      margin-top: 6px;
      margin-left: 24px;
    }

    .input-remark {
      width: 402px;
      margin: 10px 24px 23px 24px;
      border-radius: 4px;
      box-shadow: 0 0 6px 0 $green-0;

      :deep(.el-textarea__inner) {
        resize: none;
        padding: 6px 8px;
        transition: 0.25s;

        &:hover,
        &:focus {
          color: $green-1;
          box-shadow: $shadow-2;
          border-color: $grey-0;
        }
      }
    }
  }

  .reports {
    @include flex(center, flex-start);
    margin-left: 24px;

    .label {
      @include flex(center, flex-start);

      .label-content {
        @include flex(center, flex-start);
        height: 21px;

        .report-title {
          font-size: 16px;
          font-weight: 700;
          color: $grey-8;
        }
        .report-content {
          font-size: 16px;
          font-weight: 400;
          color: $grey-7;
        }
      }
    }
  }

  .report-foot {
    @include flex(center, flex-end);
    height: 62px;

    .button {
      @include flex(center, center);
      font-size: 16px;
      font-weight: 400;
      color: $grey-0;
      width: 67px;
      height: 30px;
      background: $green-0;
      border-radius: $border-radius-0;
      box-shadow: $shadow-0;
      transition: 0.25s;

      &:last-child {
        margin-right: 24px;
        margin-left: 8px;
      }

      &:hover {
        background-color: $green-1;
        box-shadow: $shadow-2;
      }
    }
  }
}
</style>
