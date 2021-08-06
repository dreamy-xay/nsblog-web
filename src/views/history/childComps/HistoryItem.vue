<!--
 * @Description: 历史记录单条内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-05 15:56:58
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-06 12:25:02
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
      <base-tag
        :text="data.type === 1 ? '文章' : '问答'"
        :color="styles.pink0"
        :hollow="true"
        role="button"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { dateFormat } from '@/util/util';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 历史记录单条内容
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'historyItem',
  components: {
    BaseTag,
  },
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
    /**
     * @description: 形式化日期
     * @param {Date} date 形式化日期对象 `必传参数`
     * @return {string} 返回形式化字符串
     * @author: dreamy-xay
     */
    function dateGetText(date) {
      const current = new Date();
      const time = parseInt((current.getTime() - date.getTime()) / 1000 + '');
      if (time <= 86400) {
        if (current.getDay() !== date.getDay()) return '昨天' + ' ' + dateFormat('HH:MM', date);
        else return '今天' + ' ' + dateFormat('HH:MM', date);
      } else if (time <= 172800) {
        if (new Date(current.getTime() - 86400000).getDay() === date.getDay())
          return '昨天' + ' ' + dateFormat('HH:MM', date);
        else return dateFormat('m月d日 HH:MM', date);
      } else return dateFormat('m月d日 HH:MM', date);
    }

    return {
      styles,
      firstTime: dateGetText(new Date(props.data.time)),
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
    padding: 10px;
    box-sizing: border-box;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    overflow: hidden;
  }
}
</style>
