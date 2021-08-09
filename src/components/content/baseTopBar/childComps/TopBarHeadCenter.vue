<!--
 * @Description 首页顶部之中间部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-22 17:52:26
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-06 14:04:04
-->
<template>
  <div class="top-bar-head-center">
    <div class="top-bar-head-center-middle">
      <input
        type="text"
        v-model="searchText"
      >
      <div
        class="top-bar-head-center-button"
        @click="search(searchText)"
      >
        <i class="iconfont blog-sousuo"></i>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: The center of TopBar
 * @author: Ban
 */

export default defineComponent({
  name: 'TopBarHeadCenter',
  setup() {
    let searchText;

    /**
     * @description: 搜索
     * @param {*} search 关键字
     * @author: Ban
     */
    function search(search) {
      console.log(search);
    }

    return {
      searchText,
      search,
    };
  },
});
</script>


<style lang="scss" scoped>
.top-bar-head-center {
  box-sizing: border-box;
  flex: 1;
  padding-right: 13px;
  width: 373px;

  .top-bar-head-center-middle {
    transform: translate(0, 10px);

    input {
      height: 36px;
      width: calc(100% - 48px);
      max-width: 325px;
      border: 1px solid $grey-4;
      border-radius: 3px 0 0 3px;
      background: $grey-2;
      text-indent: 16px;
      vertical-align: top;
      outline: 0;
      transition: border 0.1s linear;
      &:focus {
        box-sizing: border-box;
        border: 1px solid $green-0;
        //border-right: none;
      }
      &:focus + div {
        background: $green-1;
      }
    }

    .top-bar-head-center-button {
      width: 48px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      display: inline-block;
      border-radius: 0 3px 3px 0;
      border: 0;
      cursor: pointer;
      background: $green-0;
      //box-sizing: border-box;
      transition: background 0.1s linear;

      &:hover {
        background: $green-1;
      }

      .blog-sousuo {
        font-size: 24px;
        text-align: center;
        color: $grey-0;
      }
    }
  }
}
</style>
