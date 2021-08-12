<!--
 * @Description: 历史记录模态框卡片
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-07 18:19:56
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-07 18:47:27
-->

<template>
  <div class="history-modal">
    <div class="history-modal-content">
      {{content}}
    </div>
    <div class="history-modal-button">
      <div
        class="confirm"
        role="button"
        @click="emit('confirm')"
      >
        {{confirmeText}}
      </div>
      <div
        class="cancel"
        role="button"
        @click="emit('cancel')"
      >
        取消
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 历史记录模态框卡片
 * @param {String} content 卡片内容 `必传参数`
 * @param {String} confirmeText 确认菜单内容 `必传参数`
 * @event confirm 点击确认后出发
 * @event cancel 点击取消后触发
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'historyModal',
  props: {
    content: {
      type: String,
      required: true,
    },
    confirmeText: {
      type: String,
      required: true,
    },
  },
  setup(_, context) {
    /**
     * @description: 点击发出事件
     * @param {string} event 事件名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function emit(event) {
      context.emit(event);
    }

    return {
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
.history-modal {
  width: 310px;
  height: 190px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  border: 1px solid $grey-4;

  .history-modal-content {
    height: 132px;
    width: 100%;
    font-size: 14px;
    color: $grey-10;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .history-modal-button {
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
        background-color: $green-0;
        color: $grey-0;
        margin-right: 20px;

        &:hover {
          background-color: $green-1;
        }
      }

      &.cancel {
        border: 1px solid $grey-6;
        color: $grey-9;
        width: 98px;
        height: 30px;

        &:hover {
          border: 1px solid $green-1;
          color: $green-1;
        }
      }
    }
  }
}
</style>
