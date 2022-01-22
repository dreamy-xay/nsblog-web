<!--
 * @Description: 问答主体头部筛选组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-19 19:24:08
 * @LastEditors: clq
 * @LastEditTime: 2022-01-20 19:54:14
-->
<template>
  <div class="question-header">
    <div
      v-for="(item,index) in filterRules"
      :key="index"
      :class="{'active': activeIndex == index}"
      role="button"
      @click="changeFilterRule(index)"
    >{{item}}</div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

/**
 * @description: 问答主体头部筛选组件
 * @author: clq
 * @event changeFilterRule 更改问答过滤规则，回调{filterRule}
 */

export default defineComponent({
  name: 'questionHeader',
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const filterRules = reactive(['最新', '最热', '待回答', '周榜', '月榜']); //问答过滤规则

    /**
     * @description: 更改过滤规则
     * @param {number} newIndex 新规则对应索引
     * @return {void}
     * @author: clq
     */
    function changeFilterRule(newIndex) {
      context.emit('changeFilterRule', newIndex);
    }

    return {
      filterRules,
      changeFilterRule,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-header {
  @include flex(center);
  box-sizing: border-box;
  width: 100%;
  height: 46px;
  padding: 16px 12px;
  border-bottom: 1px solid $grey-2;

  & > div {
    width: 58px;
    height: 14px;
    font-size: 14px;
    color: $grey-7;
    text-align: center;
    line-height: 14px;
    border-right: 1px solid $grey-4;
    transition: 0.25s;

    &:hover {
      color: $green-1;
    }
  }

  .active {
    color: $green-1;
  }

  div:last-child {
    border-right: 0px;
  }
}
</style>
