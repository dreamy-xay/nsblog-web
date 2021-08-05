<!--
 * @Description: 历史记录单条内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-05 15:56:58
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 23:03:10
-->
<template>
  <div
    class="history-item clearfix"
    :class="'history-item-' + (index % 2 ? 'odd' : 'even')"
  >
    <div
      class="history-item-info"
      :class="'history-item-info-' + (index % 2 ? 'odd' : 'even')"
    >
      <span>🍀</span>
      <span>{{firstTime}}</span>
      <span>({{lastTime}})</span>
    </div>
    <div class="history-item-content">

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { dateFormat, dateGetText } from '@/util/util';

/**
 * @description: 历史记录单条内容
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'historyItem',
  props: {
    data: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return {
      firstTime: dateGetText(new Date(props.data.time)) + ' ' + dateFormat('HH:MM', new Date(props.data.time)),
      lastTime: dateFormat('YY-mm-dd', new Date(props.data.time)),
    };
  },
});
</script>

<style lang="scss" scoped>
.history-item {
  position: relative;

  &::before {
    display: block;
    position: absolute;
    top: -42px;
    content: '';
    content: '';
    height: 6px;
    width: 15px;
    border: 4px solid $grey-4;
    border-radius: $border-radius-0;
    background: $green-1;
  }

  &.history-item-odd {
    margin-left: 18px;

    &::before {
      left: -25px;
    }
  }

  &.history-item-even {
    margin-right: 18px;

    &::before {
      right: -25px;
    }
  }

  .history-item-info {
    // width: 198px;
    padding: 0 10px;
    height: 30px;
    background: $grey-0;
    font-size: 13px;
    box-shadow: $shadow-0;
    color: $grey-10;
    border-radius: $border-radius-0;
    position: absolute;
    top: -40px;
    overflow: hidden;
    display: flex;
    align-items: center;

    &.history-item-info-odd {
      left: 0;
    }

    &.history-item-info-even {
      right: 0;
    }

    span {
      margin-left: 8px;

      &:first-child {
        margin-left: 0;
      }

      &:nth-child(2) {
        color: $green-2;
      }

      &:last-child {
        color: $grey-10;
      }
    }
  }

  .history-item-content {
    background: $grey-0;
    width: 553px;
    height: 71px;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    overflow: hidden;
  }
}
</style>
