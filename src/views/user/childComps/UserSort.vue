<!--
 * @Description: 选择排序方式
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-17 19:52:51
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-20 17:13:36
-->
<template>
  <div class="user-sort">
    <div class="user-sort-label">发布时间</div>
    <div class="user-sort-btn-container">
      <div
        :class="{'active': sortFlag === 1}"
        class="iconfont blog-up"
        role="button"
        @click="timeIncrease"
      ></div>
      <div
        :class="{'active': sortFlag === 2}"
        class="iconfont blog-down"
        role="button"
        @click="timeDecrease"
      ></div>
    </div>

    <div class="user-sort-label">访问量</div>
    <div class="user-sort-btn-container">
      <div
        :class="{'active': sortFlag === 3}"
        class="iconfont blog-up"
        role="button"
        @click="viewIncrease"
      ></div>
      <div
        :class="{'active': sortFlag === 4}"
        class="iconfont blog-down"
        role="button"
        @click="viewDecrease"
      ></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 排序选择
 * @param {Number} 1: 时间升序 2:时间降序 3:访问量升序 4:访问量降序 `必传参数`
 * @event changeSort 排序标志 1: 时间升序 2:时间降序 3:访问量升序 4:访问量降序
 * @author: clq
 */

export default defineComponent({
  name: 'userSort',
  props: {
    sortFlag: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    /**
     * @description: 按发布时间升序排序
     * @return {void}
     * @author: clq
     */
    function timeIncrease() {
      context.emit('changeSort', 1);
    }

    /**
     * @description: 按发布时间降序排序
     * @return {void}
     * @author: clq
     */
    function timeDecrease() {
      context.emit('changeSort', 2);
    }

    /**
     * @description: 按访问量升序排序
     * @return {void}
     * @author: clq
     */
    function viewIncrease() {
      context.emit('changeSort', 3);
    }

    /**
     * @description: 按访问量降序排序
     * @return {void}
     * @author: clq
     */
    function viewDecrease() {
      context.emit('changeSort', 4);
    }

    return {
      timeIncrease,
      timeDecrease,
      viewIncrease,
      viewDecrease,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-sort {
  @include flex(center, flex-start);
  .user-sort-label {
    margin-right: 4px;
    margin-left: 8px;
    color: #8c8c8c;
  }

  .user-sort-btn-container {
    box-sizing: border-box;
    margin-right: 8px;
    @include flex(center, center, column);

    .iconfont {
      font-size: 12px;
      color: #bfbfbf;
      transition: all 0.25s;
      transform: scale(0.8);

      &:hover {
        color: $grey-7;
      }
    }

    .active {
      color: $grey-7;
    }
  }
}
</style>
