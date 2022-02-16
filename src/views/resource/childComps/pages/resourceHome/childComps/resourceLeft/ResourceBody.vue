<!--
 * @Description: 资源body样式
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-25 13:17:52
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-16 13:07:57
-->
<template>
  <div
    class="resource-body"
    :style="bodyStyle"
    v-if="resourceData.length"
  >
    <div
      class="resource-body-context"
      v-for="(item , index) in resourceData"
      :key="index"
    >
      <div
        class="context-top"
        role="button"
        @click="clickButton(0,index)"
      >
        {{item.name}}
      </div>
      <div class="context-center"> {{item.remark}}</div>

      <div class="context-bottom">
        <div
          class="bottom-left"
          role="button"
          @click="clickButton(1,index)"
        >
          <div class="icon"><i class="iconfont blog-xiazai"></i></div>
          <div class="text">前往下载</div>
        </div>
        <div class="bottom-right">
          <div
            class="name"
            role="button"
            @click="clickButton(2,index)"
          >{{item.nickname}}</div>
          <div class="time">{{dateFormat('YY-mm-dd',new Date(item.upload_time))}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router';
import { defineComponent } from 'vue';
import { dateFormat } from '@/util/date';

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
  setup(props) {
    /**
     * @description: 按钮跳转
     * @param {Number} type 0:标题,1:下载,2:名称
     * @param {Number} index 下标
     * @return {Void}
     * @author: Z_Y_C
     */
    function clickButton(type, index) {
      if (type == 0)
        window.open('/resource/' + props.resourceData[index].id, '/resource/' + props.resourceData[index].id);
      else if (type == 1) window.open(props.resourceData[index].link, props.resourceData[index].link);
      else router.push('/user/' + props.resourceData[index].username);
    }

    return { clickButton, dateFormat };
  },
});
</script>

<style lang="scss" scoped>
.resource-body {
  width: 100%;

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
      transition: 0.25s;

      &:hover {
        color: $grey-8;
      }
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
        transition: 0.25s;

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
          transition: 0.25s;

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
