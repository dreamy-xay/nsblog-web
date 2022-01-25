
<!--
 * @Description:资源页面左边
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-22 12:12:35
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-24 00:28:42
-->
<template>
  <div class="resource-left">
    <base-select-head />
    <div
      class="resource-left-context"
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
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';

/**
 * @description:资源页面左边
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceLeft',
  components: { BaseSelectHead },
  props: {
    resourceData: {
      type: Array,
      defaule: () => [],
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.resource-left {
  width: 100%;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;
  margin-bottom: 4px;

  .resource-left-context {
    height: 108px;
    width: calc(100% - 40px);
    margin: 0 20px;
    border-top: 1px solid $grey-4;

    &:nth-child(2) {
      border-top: 0;
    }

    .context-top {
      margin-top: 12px;
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
