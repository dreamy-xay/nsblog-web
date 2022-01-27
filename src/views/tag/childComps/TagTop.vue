<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-25 13:51:50
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-27 17:40:49
-->
<template>
  <div class="tag-top">
    <div class="tag-top-text">
      <div class="tag-top-text-tag">
        <div class="tag-text">{{detail.name}}</div>
      </div>
      <div class="tag-top-text-content">
        <div class="content-text">{{detail.remark}}</div>
      </div>
      <div class="tag-top-text-message">
        <div class="message-text">
          <div class="attention">{{detail.attention_count}}关注</div>
          <div class="dot">·</div>
          <div class="article">{{detail.article_count}}文章</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'tagTop',
  props: {
    detail: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.tag-top {
  width: 800px;
  height: 100px;
  margin-top: 34px;

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
        height: 18px;
        font-size: 15px;
        font-weight: Narrow;
        text-align: left;
        color: $grey-7;
        line-height: 18px;
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
        }
      }
    }
  }
}
</style>
