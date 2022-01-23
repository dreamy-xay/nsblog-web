<!--
 * @Description:资源页面左边
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-22 12:12:35
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-23 20:44:39
-->
<template>
  <div class="resource-left">

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
        <div class="bottom-left">
          <div class="icon"><i class="iconfont blog-xiazai"></i></div>
          <div class="text">前往下载</div>
        </div>
        <div class="bottom-right">
          <div class="name">Build</div>
          <div class="time">{{new Date()}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

/**
 * @description:资源页面左边
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceLeft',
  props: {},
  setup(props) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.resource-left {
  width: calc(100% - 40px);
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;
  padding: 16px 20px;
  .resource-left-context {
    height: 108px;

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
          height: 12px;
          line-height: 12px;

          .iconfont {
            font-size: 12px;
          }
        }

        .text {
        }
      }

      .bottom-right {
        @include flex(center);
      }
    }
  }
}
</style>
