<!--
 * @Description: 基础模态框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-16 14:57:54
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-15 11:40:13
-->
<template>
  <n-modal
    class="base-modal"
    :display-directive="displayDirective"
    :mask-closable="maskClosable"
    :preset="preset !== 'default' ? preset : undefined"
    :show="show"
    @update="$emit($event)"
  >
    <div
      class="base-modal-inner"
      v-if="preset === 'default'"
      :style="{'--default-color': color, '--hover-color': hoverColor}"
    >
      <slot name="default-inner"></slot>
      <div
        class="base-modal-content"
        v-if="content"
      >
        {{content}}
      </div>
      <div class="base-modal-button">
        <div
          class="confirm"
          role="button"
          @click="$emit('confirm')"
        >
          {{confirmeText}}
        </div>
        <div
          class="cancel"
          role="button"
          @click="$emit('cancel')"
        >
          {{cancelText}}
        </div>
      </div>
    </div>
    <slot v-else></slot>
  </n-modal>
</template>

<script>
import { defineComponent } from 'vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 基础模态框
 * @param {'if' | 'show'} displayDirective 使用何种指令控制模态框主体的条件渲染 `默认show`
 * @param {Boolean} maskClosable 点击遮罩时是否发出 update:show 事件 `默认为true`
 * @param {String} preset 模态框使用何种预设，具体参考n-modal，如果想重写内容则置为undefined即可 `默认为default`
 * @param {Boolean} show 是否展示 Modal `默认false`
 * @param {String} content 仅当preset为default时提示框内容 `默认为null`
 * @param {String} confirmeText 仅当preset为default时确认按钮内容 `默认为'确认'`
 * @param {String} cancelText 仅当preset为default时取消按钮内容 `默认为'取消'`
 * @param {String} color 按钮颜色 `默认为null`
 * @param {String} hoverColor 鼠标 hover 按钮后标签颜色 `默认为null`
 * @event update 模态框更新是否展示状态的回调 (isShow: boolean) => void
 * @event confirm 仅当preset为default时点击确认按钮的回调 () => void
 * @event cancel 仅当preset为default时点击取消按钮的回调 () => void
 * @slot 默认插槽 仅当preset为 undefined 时生效
 * @slot name="inner"插槽 仅当preset为 default 时生效
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseModal',
  props: {
    displayDirective: {
      type: String,
      default: 'show',
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    preset: {
      type: String,
      default: 'default',
    },
    show: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: null,
    },
    confirmeText: {
      type: String,
      default: '确认',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    color: {
      type: String,
      default: styles.green0,
    },
    hoverColor: {
      type: String,
      default: styles.green1,
    },
  },
});
</script>

<style lang="scss" scoped>
.base-modal {
  overflow: hidden;
}

.base-modal-inner {
  width: 310px;
  height: 190px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  border: 1px solid $grey-4;

  .base-modal-content {
    height: 132px;
    width: 100%;
    font-size: 14px;
    color: $grey-10;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .base-modal-button {
    width: 220px;
    margin: 0 auto;
    overflow: hidden;

    div {
      width: 100px;
      height: 32px;
      font-size: 14px;
      border-radius: 4px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
      float: left;
      transition: 0.4s;

      &.confirm {
        background-color: var(--default-color);
        color: $grey-0;
        margin-right: 20px;

        &:hover {
          background-color: var(--hover-color);
        }
      }

      &.cancel {
        border: 1px solid $grey-6;
        color: $grey-9;
        width: 98px;
        height: 30px;

        &:hover {
          border: 1px solid var(--hover-color);
          color: var(--hover-color);
        }
      }
    }
  }
}
</style>
