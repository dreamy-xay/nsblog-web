<!--
 * @Description: 标签页面头部
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-25 13:51:50
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-13 15:11:54
-->
<template>
  <div class="tag-top">
    <div class="tag-top-text">
      <div class="tag-top-text-tag">
        <div class="tag-text">{{detail.name}}</div>
      </div>
      <div class="tag-top-text-content">
        <div
          class="content-text"
          role="button"
          :class="showAll ? '' : 'show-one'"
          @click="showAll = !showAll"
        >{{detail.remark}}</div>
      </div>
      <div class="tag-top-text-message">
        <div class="message-text">
          <div>{{detail.attention_count}}关注</div>
          <div class="dot">•</div>
          <div>{{detail.article_count}}文章</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

/**
 * @description: 标签页面头部
 * @param {Object} detail 内容 `必传参数`
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'tagTop',
  props: {
    detail: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const showAll = ref(false); // 显示全部remark
    return { showAll };
  },
});
</script>
<style lang="scss" scoped>
.tag-top {
  width: 800px;
  margin: 34px 0 28px 0;

  .tag-top-text {
    .tag-top-text-tag {
      @include flex(center, center);
      height: 30px;

      .tag-text {
        font-size: 26px;
        font-weight: 700;
        text-align: left;
        color: $grey-9;
      }
    }

    .tag-top-text-content {
      padding-top: 20px;
      @include flex(center, center);

      .content-text {
        font-size: 15px;
        font-weight: Narrow;
        text-align: left;
        color: $grey-7;
        line-height: 18px;
      }

      .show-one {
        @include ellipsis(1);
      }
    }

    .tag-top-text-message {
      @include flex(center, center);
      padding-top: 12px;
      height: 20px;

      .message-text {
        @include flex(center, center);
        height: 19px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: $grey-8;

        .dot {
          width: 6px;
          height: 17px;
          font-size: 16px;
          font-weight: 700;
          padding: 0 7px;
          @include flex(center, center);
        }
      }
    }
  }
}
</style>
