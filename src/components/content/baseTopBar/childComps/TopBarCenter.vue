
<!--
 * @Description 首页顶部之中间部分组件
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-07-22 17:52:26
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-31 17:43:29
-->
<template>
  <div
    class="top-bar-center"
    v-click-outside="closeHistory"
  >
    <div class="top-bar-center-middle">
      <input
        @focus="showHistory"
        type="text"
        v-model="inputText"
        @keyup.enter="search(inputText)"
        maxlength="50"
      />
      <i
        v-show="inputText !== ''"
        role="button"
        class="iconfont blog-close-circle"
        @click="clearInputText"
      ></i>
      <div
        class="top-bar-center-button"
        role="button"
        @click="search(inputText)"
      >
        <i class="iconfont blog-sousuo"></i>
      </div>
    </div>

    <div
      class="search-history"
      v-show="visible && List.length"
    >
      <div class="history-top">
        <div class="search-text">搜索历史</div>
        <div
          class="delect"
          role="button"
          @click="del()"
        >清空</div>
      </div>
      <div class="history-line"></div>
      <div class="history-bottom">
        <el-scrollbar :max-height="160">
          <div
            class="history-content"
            v-for="(item, index) in List"
            :key="index"
          >
            <div
              class="content"
              role="button"
              @click="search(item)"
            >
              <div>
                {{item}}
              </div>
              <i
                role="button"
                class="iconfont blog-close"
                @click.stop="del(index)"
              ></i>
            </div>
          </div>
        </el-scrollbar>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { mapState, mapMutations } from '@/util/store';

/**
 * @description: 首页顶部之中间部分组件
 * @author: continue-hs
 */

export default defineComponent({
  name: 'topBarCenter',
  setup() {
    const visible = ref(false);
    const inputText = ref('');
    const { List } = mapState('globalStore', { List: 'searchHistory' });
    const { set, del } = mapMutations('globalStore', { set: 'setSearchHistory', del: 'deleteSearchHistory' });

    /**
     * @description: 显示历史记录框
     * @return {void}
     * @author: continue-hs
     */
    function showHistory() {
      visible.value = true;
    }

    /**
     * @description: 关闭历史记录框
     * @return {void}
     * @author: continue-hs
     */
    function closeHistory() {
      visible.value = false;
    }

    /**
     * @description: 清空输入内容
     * @return {void}
     * @author: dreamy-xay
     */
    function clearInputText() {
      inputText.value = '';
    }

    /**
     * @description: 搜索
     * @param {string} value 搜索的内容 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function search(value) {
      if (value) {
        visible.value = false;
        set(value);
        console.log(`search: ${value}`);
      }
    }

    return {
      visible,
      inputText,
      List,
      del,
      showHistory,
      closeHistory,
      focus,
      set,
      search,
      clearInputText,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.top-bar-center {
  box-sizing: border-box;
  flex: 1;
  padding-right: 13px;
  width: 373px;
  @include flex(center);
  position: relative;

  .top-bar-center-middle {
    width: 100%;
    height: 36px;
    border-radius: $border-radius-1;
    overflow: hidden;
    position: relative;
    @include flex(center, center);

    .blog-close-circle {
      position: absolute;
      line-height: 36px;
      top: 0;
      right: 54px;
      color: $grey-7;
    }

    input {
      height: 100%;
      padding: 0 24px 0 10px;
      width: calc(100% - 48px);
      background-color: $grey-2;
      border: 1px solid $grey-4;
      border-right: 0;
      border-radius: $border-radius-1 0 0 $border-radius-1;
      box-sizing: border-box;
      outline: 0;
      letter-spacing: 0.5px;

      &:focus {
        border-color: $green-1;
      }
    }

    .top-bar-center-button {
      width: 48px;
      height: 36px;
      @include flex(center, center);
      background: $green-0;
      transition: 0.25s;

      &:hover {
        background: $green-1;
      }

      .blog-sousuo {
        font-size: 24px;
        color: $grey-0;
      }
    }
  }

  .search-history {
    width: 347px;
    overflow: hidden;
    background-color: $grey-0;
    opacity: 1;
    border-radius: 4px;
    box-shadow: $shadow-0;
    position: absolute;
    top: 57px;

    .history-top {
      @include size(314px, 24px);
      padding-top: 14px;
      margin-bottom: 9px;
      margin-left: 16px;

      .search-text {
        float: left;
      }

      .delect {
        float: right;
        color: $green-0;
        transition: 0.25s;

        &:hover {
          color: $green-1;
        }
      }
    }

    .history-line {
      @include size(347px, 1px);
      background: $grey-3;
    }
  }

  .history-bottom {
    margin: 10px 0;
    width: 100%;
    max-height: 160px;
    overflow: hidden;
    background-color: $grey-0;
    z-index: 10001;

    .history-content {
      @include size(347px, 32px);

      .content {
        padding: 0 16px;
        width: calc(100% - 32px);
        @include flex(center, space-between);
        background-color: $grey-0;
        transition: 0.25s;

        &:hover {
          background-color: $grey-2;
        }

        div {
          @include ellipsis(1);
          width: calc(100% - 20px);
          height: 32px;
          line-height: 32px;
          color: $grey-9;
        }

        .iconfont {
          color: $grey-7;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
