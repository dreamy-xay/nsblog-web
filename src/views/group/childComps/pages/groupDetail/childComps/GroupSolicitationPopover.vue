<!--
 * @Description: 创发布征集令
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-29 16:58:20
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-14 19:45:27
-->
<template>
  <n-modal
    display-directive="show"
    :show="modelValue"
  >
    <div class="group-solicitation-popover">
      <div class="group-solicitation-popover-head">
        <div class="title">
          发布征集令
        </div>
        <div
          class="close"
          role="button"
          @click="closeModal"
        >
          <i class="iconfont blog-cha"></i>
        </div>
      </div>
      <div class="group-solicitation-popover-body">
        <div class="item">
          <div class="name">
            征集令标题
          </div>
          <base-input
            v-model.trim="title"
            :maxlength="128"
            bind-class="group-solicitation-title-input"
            :show-close="true"
            :style="{width: '100%',height: '36px'}"
          />
        </div>
        <div class="item">
          <div class="name">
            征集令内容
          </div>
          <v-md-editor
            v-model.trim="content"
            mode="edit"
            left-toolbar="undo redo clear| bold link code quote"
            height="186px"
          />
        </div>
        <div class="item">
          <div class="name">
            截止时间
          </div>
          <n-date-picker
            v-model:value="deadline"
            class="group-solicitation-title-date"
            type="datetime"
            :clearable="true"
            :is-date-disabled="disableAfterDate"
            :is-time-disabled="disableAfterTime"
            :actions="['clear', 'confirm']"
          />
        </div>
      </div>
      <div class="group-solicitation-popover-footer">
        <div
          class="submit"
          role="button"
          @click="submit"
        >
          立即发布
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseInput from '@/components/content/baseInput/BaseInput.vue';
import { dateFormat } from '@/util/date';
import { useMessage } from 'naive-ui';
import { releaseGroupSolicitation } from '@/network/api/groups';

/**
 * @description: 创发布征集令
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'groupSolicitationPopover',
  components: {
    BaseInput,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, context) {
    const msg = useMessage(); // naive-ui message
    const title = ref(''); // 征集令标题
    const content = ref(''); // 征集令内容
    const deadline = ref(null); // 截至日期

    /**
     * @description: 关闭模态框
     * @return {void}
     * @author: dreamy-xay
     */
    function closeModal() {
      context.emit('update:modelValue', false);
    }

    /**
     * @description: 日期选择限制
     * @param {number} current 选择时间 `必传参数`
     * @return {boolean} 返回是否禁用
     * @author: dreamy-xay
     */
    function disableAfterDate(current) {
      return (
        new Date(current).getTime() < new Date(`${dateFormat('YYYY-mm-dd', new Date())} 00:00:00`).getTime() + 86400000
      );
    }

    /**
     * @description: 日期选择限制
     * @param {number} current 选择时间 `必传参数`
     * @return {{ isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }} 返回各时间参数是否禁用
     * @author: dreamy-xay
     */
    function disableAfterTime(current) {
      return {
        isHourDisabled(hour) {
          return (
            new Date(`${dateFormat('YY-mm-dd', new Date(current))} ${hour}:59:59`).getTime() <
            new Date().getTime() + 86400000
          );
        },
        isMinuteDisabled(min) {
          return (
            new Date(`${dateFormat('YY-mm-dd HH', new Date(current))}:${min}:59`).getTime() <
            new Date().getTime() + 86400000
          );
        },
        isSecondDisabled(sec) {
          return (
            new Date(`${dateFormat('YY-mm-dd HH:MM', new Date(current))}:${sec}`).getTime() <
            new Date().getTime() + 86400000
          );
        },
      };
    }

    /**
     * @description: 发布征集令
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      let success = true; // 是否验证成功
      if (!title.value) {
        success = false;
        msg.error('请输入征集令标题－O－');
      }
      if (!content.value) {
        success = false;
        msg.error('请输入征集令内容－O－');
      }
      if (!deadline.value) {
        success = false;
        msg.error('请选择征集令截至日期－O－');
      }
      if (success) {
        releaseGroupSolicitation(title.value, content.value, dateFormat('YY-mm-dd HH:MM:SS', new Date(deadline.value)))
          .then(() => {
            msg.success('征集令发布成功(～￣▽￣)～');
            // 清除内容
            title.value = '';
            content.value = '';
            deadline.value = null;
          })
          .catch((error) => {
            console.log(error);
            msg.success('征集令发布失败≧ ﹏ ≦');
          });
        closeModal();
      }
    }

    return {
      title,
      content,
      deadline,
      closeModal,
      disableAfterDate,
      disableAfterTime,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-solicitation-popover {
  width: 500px;
  height: 538px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  & > div {
    width: 100%;
  }

  .group-solicitation-popover-head {
    @include flex(center, center);
    box-sizing: border-box;
    height: 54px;
    border-bottom: 1px solid $grey-2;
    position: relative;

    .title {
      font-size: 16px;
      font-weight: 700;
      color: $grey-11;
      line-height: 22px;
    }

    .close {
      width: 28px;
      height: 28px;
      border-radius: $border-radius-1;
      color: $grey-7;
      @include flex(center, center);
      transition: all 0.25s;
      position: absolute;
      top: 13px;
      right: 16px;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
        background-color: $grey-2;
      }
    }
  }

  .group-solicitation-popover-body {
    height: 420px;
    @include flex(inherit, inherit, column);

    .item {
      width: calc(100% - 48px);
      margin: 0 24px;
      @include flex(initial, center, column);

      .name {
        height: 20px;
        width: 100%;
        @include flex(center);
        font-size: 15px;
        color: $grey-10;
        margin: 16px 0 10px 0;
      }

      :deep(.v-md-editor) {
        transition: 0.25s;
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

      :deep(.group-solicitation-title-date .n-input) {
        height: 36px;
        border-radius: $border-radius-1;
        box-shadow: $shadow-0;
        transition: 0.25s;

        --caret-color: transparent !important;
        --border-hover: 0 !important;
        --border-focus: 0 !important;
        --loading-color: transparent !important;

        div {
          border: 0 !important;
        }

        &:hover {
          box-shadow: $shadow-2;
        }
      }
    }
  }

  .group-solicitation-popover-footer {
    box-sizing: border-box;
    height: 64px;
    border-top: 1px solid $grey-2;
    @include flex(center, center);

    .submit {
      @include flex(center, center);
      width: 100px;
      height: 32px;
      background-color: $green-1;
      border-radius: $border-radius-0;
      font-size: 14px;
      font-weight: 400;
      color: $grey-0;
      transition: 0.25s;

      &:hover {
        background-color: $green-2;
      }
    }
  }
}
</style>
