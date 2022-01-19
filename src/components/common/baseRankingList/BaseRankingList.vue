<!--
 * @Description: 排行榜基础组件
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-15 09:05:31
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-19 12:29:18
-->
<template>
  <div
    class="base-ranking-list"
    :style="listStyle"
  >

    <div class="base-ranking-list-top">
      <span class="base-ranking-list-top-left">{{Lefttext}}</span>
      <div
        class="base-ranking-list-top-right"
        v-if="showTopright"
      >
        <div
          v-for="(item,index) in rightList"
          :key="index"
          @click="chooseActive(index)"
          :class="{'listType':true,'Choice':index === activeIndex}"
        >
          <span
            role="button"
            class="base-ranking-list-top-right-list"
          >
            {{item.name}}
          </span>
        </div>
      </div>
    </div>

    <div
      class="base-ranking-list-bottom"
      role="button"
    >
      <div v-if="showTopright">
        <div
          class="base-ranking-list-bottom-list"
          v-for="(item,index) in rankinglist[activeIndex]"
          :key="index"
        >
          <a
            :href="(item.type === 1 ? '/article' : (item.type === 2 ? '/question' : '/resource') )+ item.content_id"
            :target="(item.type === 1 ? '/article' : (item.type === 2 ? '/question' : '/resource') )+ item.content_id"
          >
            <div class="base-ranking-list-bottom-text">
              <div :class="{'index':true,'first':index === 0,'second':index ===1,'third':index === 2}">
                {{index+1}}
              </div>
              <div class="title">{{item.title}}</div>
            </div>
          </a>
        </div>
      </div>

      <div v-else>
        <div
          v-for="(item,index) in rankinglist"
          :key="index"
          class="base-ranking-list-bottom-list"
        >
          <a
            :href="(item.type === 1 ? '/article' : (item.type === 2 ? '/question' : '/resource') )+ item.content_id"
            :target="(item.type === 1 ? '/article' : (item.type === 2 ? '/question' : '/resource') )+ item.content_id"
          >
            <div class="base-ranking-list-bottom-text">
              <div :class="{'index':true,'first':index === 0,'second':index ===1,'third':index === 2}">
                {{index+1}}
              </div>
              <div class="title">{{item.title}}</div>
            </div>
          </a>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue';

/**
 * @description: 右侧排行榜
 * @param {String} Lefttext 顶部左侧文字 `默认为null`
 * @param {Boolean} showTopright 是否显示右侧类型选择 `默认为true`
 * @param {Array} rightList 顶部右侧类型列表 `默认为null`
 * @param {Array} rankinglist 排行榜内容列表 `默认为null`
 * @author: continue-hs
 */

export default defineComponent({
  name: 'baseRankingList',
  props: {
    Lefttext: {
      type: String,
      default: null,
    },
    showTopright: {
      type: Boolean,
      default: true,
    },
    rightList: {
      type: Array,
      default: null,
    },
    rankinglist: {
      type: Array,
      default: null,
    },
  },
  setup() {
    const activeIndex = ref(0);

    /**
     * @description: 更新类型列表下标
     * @param {number} index 选择的下标
     * @return {void}
     * @author: continue-hs
     */
    function chooseActive(index) {
      activeIndex.value = index;
    }

    return {
      activeIndex,
      chooseActive,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.base-ranking-list {
  width: 284px;
  background: $grey-0;
  border-radius: 8px;
  box-shadow: $shadow-0;

  .base-ranking-list-top {
    @include flex(center, space-between);
    color: $grey-10;
    padding: 16px;
    @include size(252px, 24px);

    .base-ranking-list-top-left {
      @include flex(center);
      height: 20px;
      font-size: 14px;
      font-weight: 700;
    }

    .base-ranking-list-top-right {
      @include flex(center, space-between);
      @include size(122px, 24px);

      .listType {
        @include flex(center, flex-end);
        @include size(38px, 24px);
        background: $grey-1;
        border-radius: 8px;
        font-size: 12px;
        font-weight: Narrow;
        text-align: center;
        color: $grey-7;

        &.Choice {
          color: $grey-10;
        }

        .base-ranking-list-top-right-list {
          @include size(24px, 16px);
        }
      }
    }
  }

  .base-ranking-list-bottom {
    width: 276px;
    @include flex(center, space-between);

    .base-ranking-list-bottom-list {
      width: 276px;
      padding: 0 4px 0 4px;

      .base-ranking-list-bottom-text {
        line-height: 22px;
        width: 252px;
        @include flex(center, space-between);
        padding: 8px 12px;

        .index {
          font-style: oblique;
          width: 10px;
          height: 100%;
          font-size: 16px;
          color: $grey-7;

          &.first {
            color: $red-2;
          }

          &.second {
            color: $orange-1;
          }

          &.third {
            color: $red-0;
          }
        }

        .title {
          @include flex(center);
          @include ellipsis(2);
          text-overflow: ellipsis;
          max-height: 44px;
          color: $grey-10;
          width: 234px;
          font-size: 14px;
          margin-left: 11px;
        }
      }
    }
  }
}
</style>
