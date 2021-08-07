<!--
 * @Description: 历史记录顶部栏
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 18:45:12
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-07 13:07:56
-->

<template>
  <div class="history-bar">
    <div class="history-bar-left">
      <i class="iconfont blog-lishijilu-copy"></i>
      <div>历史记录</div>
    </div>
    <div class="history-bar-right">
      <div
        class="search"
        :class="{active: searchValue !== ''}"
      >
        <input
          type="text"
          placeholder="搜索历史记录"
          v-model.trim="searchValue"
          @keyup.enter="search"
        >
        <i
          class="iconfont blog-search"
          role="button"
          @click="search"
        ></i>
        <i
          class="iconfont blog-cha"
          role="button"
          @click="clear"
        ></i>
      </div>
      <div
        class="button"
        role="button"
        @click="stopHistory"
      >
        暂停历史记录
      </div>
      <div
        class="button"
        role="button"
        @click="clearHistory"
      >
        清空历史
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import events from '@/events';
import { modifySetting } from '@/network/api/setting';

/**
 * @description: 历史记录顶部栏
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'historyBar',
  setup() {
    const searchValue = ref(''); // 搜索输入框内容

    /**
     * @description: 开始搜索
     * @return {void}
     * @author: dreamy-xay
     */
    function search() {
      if (searchValue.value !== '') {
        console.log(searchValue.value);
      }
    }

    /**
     * @description: 清除搜索内容
     * @return {void}
     * @author: dreamy-xay
     */
    function clear() {
      searchValue.value = '';
    }

    /**
     * @description: 暂停历史记录
     * @return {void}
     * @author: dreamy-xay
     */
    function stopHistory() {
      modifySetting({
        history_record: false,
      }).catch((error) => {
        console.log(error);
      });
    }
    /**
     * @description: 清空全部历史记录
     * @return {void}
     * @author: dreamy-xay
     */
    function clearHistory() {
      events.emit('HistoryBar-clearAllHistory');
    }

    return {
      searchValue,
      search,
      clear,
      stopHistory,
      clearHistory,
    };
  },
});
</script>

<style lang="scss" scoped>
.history-bar {
  width: 100%;
  height: 42px;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;

  .history-bar-left,
  .history-bar-right {
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .history-bar-left {
    float: left;
    margin-left: 20px;
    user-select: none;

    .iconfont {
      display: inline-block;
      height: 22px;
      line-height: 22px;
      font-size: 22px;
      color: $green-1;
      margin-right: 8px;
    }

    div {
      font-size: 18px;
      color: $grey-10;
    }
  }

  .history-bar-right {
    float: right;
    margin-right: 20px;

    & > div {
      margin-left: 30px;
      height: 28px;
    }

    .search {
      width: 186px;
      border-radius: 50px;
      border: 1px solid $grey-7;
      box-sizing: border-box;
      padding: 3px 36px;
      position: relative;

      &:focus-within {
        border-color: $green-1;
      }

      &.active {
        border-color: $green-1;

        & .iconfont {
          display: inline-block;
          color: $green-1;
        }
      }

      input {
        width: 100%;
        height: 100%;
        outline: none;
        border: 0;
        font-size: 12px;
        color: $grey-7;
      }

      .iconfont {
        display: inline-block;
        height: 20px;
        font-size: 20px;
        line-height: 20px;
        position: absolute;
        color: $grey-7;
      }

      .blog-search {
        top: 3px;
        left: 7px;
      }

      .blog-cha {
        top: 4px;
        font-size: 13px;
        right: 12px;
        display: none;
      }
    }

    .button {
      padding: 6px 7px;
      font-size: 12px;
      color: $green-1;
      border: 1px solid $green-1;
      box-sizing: border-box;
      border-radius: 5px;
      background-color: $grey-0;
      transition: 0.4s;

      &:hover {
        background-color: $green-1;
        color: $grey-0;
      }
    }
  }
}
</style>
