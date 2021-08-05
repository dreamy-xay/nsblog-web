<!--
 * @Description: 历史记录内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-05 15:56:58
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 19:56:39
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
    </div>
    <div class="history-item-content">

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

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
});
</script>

<style lang="scss" scoped>
.history-item {
  position: relative;
  margin: 0 auto 30px;
  padding: 0 10px;

  &::before {
    display: block;
    position: absolute;
    right: -28px;
    top: -42px;
    content: '';
    content: '';
    height: 6px;
    width: 15px;
    border: 4px solid $grey-4;
    border-radius: $border-radius-0;
    background: $green-1;
  }

  &.history-item-odd::before {
    right: -28px;
  }

  &.history-item-even::before {
    left: -28px;
  }

  .history-item-info {
    width: 198px;
    height: 30px;
    background: $grey-0;
    font-size: 13px;
    box-shadow: $shadow-0;
    color: $grey-10;
    line-height: 100%;
    border-radius: $border-radius-0;
    position: absolute;
    top: -40px;

    &.history-item-info-odd::before {
      right: -2px;
    }

    &.history-item-info-even::before {
      left: -2px;
    }
  }

  .history-item-content {
    background: $grey-0;
    width: 553px;
    margin-top: 20px;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    overflow: hidden;
    padding-bottom: 20px;
  }
}
</style>
