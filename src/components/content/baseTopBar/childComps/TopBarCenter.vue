
<!--
 * @Description 首页顶部之中间部分组件
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-07-22 17:52:26
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-24 14:50:08
-->
<template>
  <div
    class="top-bar-center"
    v-click-outside="showClickOutSide"
  >
    <div class="top-bar-center-middle">
      <input
        focus="change(true)"
        type="text"
        v-model="inputText"
        @click.prevent="change(true)"
      >
      <i
        v-show="inputText !== ''"
        role="button"
        class="iconfont blog-cha"
        @click="change(true);elimiante()"
      ></i>
      <button
        class="top-bar-center-button"
        @click="change(false);set(this.inputText);elimiante()"
      >
        <i class="iconfont blog-sousuo"></i>
      </button>
    </div>

    <div
      class="search-history"
      v-show="visible"
    >
      <div class="historytop">
        <div class="searchtext">搜索历史</div>
        <div
          class="delect"
          role="button"
          @click="del(-1)"
        >清空</div>
      </div>
      <div class="historyline"></div>
      <div class="historybottom">
        <el-scrollbar>
          <div
            class="historycontent"
            v-for="(item,index) in List"
            :key="index"
          >
            <div
              class="content"
              role="button"
              @click="goSearch"
            >
              {{item}}
              <i
                role="button"
                class="iconfont blog-cha"
                @click="del(index)"
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
    const { set } = mapMutations('globalStore', { set: 'setSearchHistory' });
    const { del } = mapMutations('globalStore', { del: 'deleteSearchHistory' });

    /**
     * @description: 清空输入
     * @return {void}
     * @author: continue-hs
     */
    function elimiante() {
      inputText.value = '';
      visible.value = true;
    }

    /**
     * @description: 点击区域外弹出框隐藏
     * @return {void}
     * @author: continue-hs
     */
    function showClickOutSide() {
      visible.value = false;
    }

    /**
     * @description: 弹出框的显示
     * @return {void}
     * @author: continue-hs
     */
    function change(isShow) {
      if (isShow) {
        setTimeout(() => {
          visible.value = true;
        }, 0);
      } else {
        setTimeout(() => {
          visible.value = false;
        }, 90);
      }
    }

    return {
      visible,
      inputText,
      List,

      del,
      showClickOutSide,
      focus,
      elimiante,
      set,
      change,
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

  .top-bar-center-middle {
    transform: translate(0, 10px);

    .blog-cha {
      position: absolute;
      top: 7px;
      right: 60px;
      color: $grey-7;
    }

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
    }

    .top-bar-center-button {
      width: 48px;
      height: 36px;
      display: inline-block;
      vertical-align: top;
      border-radius: 0 3px 3px 0;
      border: 0;
      cursor: pointer;
      background: $green-0;

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

  .search-history {
    @include size(347px, 230px);
    background-color: #ffffff;
    opacity: 1;
    border-radius: 4px;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
    position: relative;
    top: 20px;
    z-index: 999;

    .historytop {
      @include size(314px, 24px);
      padding-top: 14px;
      margin-bottom: 9px;
      margin-left: 16px;

      .searchtext {
        float: left;
      }

      .delect {
        float: right;
        color: #85e8c7;
      }
    }

    .historyline {
      @include size(347px, 1px);
      background: #f0f0f0;
    }
  }

  .historybottom {
    margin: 10px 0 16px;
    @include size(347px, 186px);

    .historycontent {
      @include size(347px, 32px);

      .content {
        padding-top: 7px;
        margin-left: 16px;
        color: #595959;

        i {
          float: right;
          margin-right: 16px;
          color: #8c8c8c;
        }
      }
    }
  }
}
</style>
