<!--
 * @Description: 资源body样式
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-25 13:17:52
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-25 13:52:05
-->
<template>
  <div
    class="resource-body"
    :style="bodyStyle"
  >
    <div
      class="resource-body-context"
      v-for="(item , index) in [1,2,3]"
      :key="index"
    >
      <div
        class="context-top"
        role="button"
      >
        健康和生产效率管理PPT
      </div>
      <div class="context-center">接上文SpringBoot集成markdown实现文档管理，对于表格的支持markdown不是特别友好，同时内部文档管理需,接上文SpringBoot集成markdown实现文档管理，对于表格的支持markdown不是特别友好，同时内部文档管理需...</div>

      <div class="context-bottom">
        <div
          class="bottom-left"
          role="button"
        >
          <div class="icon"><i class="iconfont blog-xiazai"></i></div>
          <div class="text">前往下载</div>
        </div>
        <div class="bottom-right">
          <div
            class="name"
            role="button"
          >Build</div>
          <div class="time">{{new Date()}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

/**
 * @description: 资源body样式
 * @param {Array} resourceData 显示数据 `默认为[]`
 * @param {Object} bodyStyle 最外层样式 `默认为null`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceBody',
  props: {
    resourceData: {
      type: Array,
      defaule: () => [],
    },
    bodyStyle: {
      type: Object,
      defaule: null,
    },
  },
});
</script>

<style lang="scss" scoped>
.resource-body {
  padding: 0 20px;

  .resource-body-context {
    padding: 12px 0;
    border-top: 1px solid $grey-4;

    &:first-child {
      border-top: none;
    }

    .context-top {
      height: 24px;
      color: $grey-10;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
    }

    .context-center {
      margin-top: 8px;
      height: 22px;
      @include ellipsis(1);
      font-size: 13px;
      color: $grey-7;
      line-height: 22px;
    }

    .context-bottom {
      @include flex(center, space-between);
      margin-top: 10px;
      height: 20px;

      .bottom-left {
        @include flex(center);
        color: $grey-7;

        .icon {
          height: 20px;
          line-height: 20px;
          margin-right: 4px;

          .iconfont {
            font-size: 14px;
          }
        }

        .text {
          font-size: 14px;
          line-height: 20px;
        }

        &:hover {
          color: $green-1;
        }
      }

      .bottom-right {
        @include flex(center);

        .name {
          margin-right: 20px;
          font-size: 14px;
          line-height: 20px;
          color: $grey-7;

          &:hover {
            color: $green-1;
          }
        }

        .time {
          color: $grey-7;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
