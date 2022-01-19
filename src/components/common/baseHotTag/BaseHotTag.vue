<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-15 15:07:06
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-19 13:45:05
-->
<template>
  <div class="base-hot-tag">
    <div class="base-hot-tag-top">
      <div class="base-hot-tag-top-text">
        {{text}}
      </div>
    </div>
    <div class="base-hot-tag-bottom">
      <div class="base-hot-tag-list">
        <el-tag
          v-for="(item,index) in hotTags"
          :key="index"
          role="button"
        >
          {{item.name}}
          <i
            v-if=" index <= 2 && Isimage"
            class="iconfont blog-hot1"
          ></i>
        </el-tag>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

/**
 * @description: 右侧标签榜
 * @param {String} text 顶部文字 `默认为null`
 * @param {Boolean} Isimage 前三标签是否含图标 `默认为true`
 * @param {Array} hotTags 内容列表 `默认为null`
 * @author: continue-hs
 */
export default defineComponent({
  name: 'baseHotTag',
  props: {
    text: {
      type: String,
      default: null,
    },
    Isimage: {
      type: Boolean,
      default: true,
    },
    hotTags: {
      type: Array,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.base-hot-tag {
  margin-top: 16px;
  width: 284px;
  background: $grey-0;
  border-radius: 8px;
  box-shadow: $shadow-0;

  .base-hot-tag-top {
    @include size(252px, 24px);
    padding: 16px 16px 0 16px;

    .base-hot-tag-top-text {
      @include size(56px, 19px);
      font-size: 14px;
      font-weight: 700;
      text-align: left;
      color: $grey-10;
    }
  }

  .base-hot-tag-bottom {
    width: 252px;
    padding: 16px;

    .base-hot-tag-list {
      ::v-deep(.el-tag) {
        height: 25px;
        background: $grey-2;
        border-radius: 9px;
        color: $grey-7;
        border: none;
        margin: 0 12px 12px 0;

        &:hover {
          color: $grey-10;
        }
      }

      i {
        color: $orange-0;
        padding: 4px 7px 4px 4px;
      }
    }
  }
}
</style>
