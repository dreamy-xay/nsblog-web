<!--
 * @Description: 对话框对话记录显示
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-19 16:18:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-20 22:30:02
-->
<template>
  <div class="dialogue-record">
    <el-scrollbar
      ref="scrollbarRef"
      @scroll="scroll"
    >
      <div class="dialogue-record-inner">
        <div class="dialogue-record-none">
          没有更多消息了~
        </div>
        <div
          class="dialogue-record-item"
          v-for="(item, index) in data.records"
          :key="index"
        >
          <div
            class="date"
            v-if="dateShow(index)"
          >
            {{dateFormat('YY年mm月dd日 HH:MM', new Date(item.time))}}
          </div>
          <div class="inner clearfix">
            <base-avatar
              :size="34"
              :src="item.is_me ? data.avatar : data.friendAvatar"
              :style="{float: item.is_me ? 'right' : 'left'}"
              alt="avatar"
            />
            <div
              class="inner-content"
              :class="{right: item.is_me}"
              v-html="item.content"
            >
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent, nextTick, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import { dateFormat } from '@/util/date';
import { throttle } from 'lodash';
import events from '@/events';

/**
 * @description: 对话框对话记录显示
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'dialogueRecord',
  components: {
    BaseAvatar,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    /**
     * @description: 是否显示日期
     * @param {number} index
     * @return {void}
     * @author: dreamy-xay
     */
    function dateShow(index) {
      return (
        index === 0 ||
        new Date(props.data.records[index].time).getTime() - new Date(props.data.records[index - 1].time).getTime() >=
          300000
      );
    }

    const scrollbarRef = ref(null); // 滚动条ref
    /**
     * @description: 到底部函数
     * @return {void}
     * @author: dreamy-xay
     */
    function scrollToBottom() {
      nextTick(() => {
        scrollbarRef.value.setScrollTop(scrollbarRef.value.wrap.scrollHeight);
      });
    }

    // 滚动到最底部
    scrollToBottom();

    // 全局事件监听滚动到底部
    events.on('DialogueRecord-scrollToBottom', scrollToBottom);

    // 滚动到顶部触发函数
    const toTop = throttle((top) => {
      if (top === 0) context.emit('toTop');
    }, 300);

    /**
     * @description: 监听滚动
     * @param {any} e el-scrollbar滚动参数 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function scroll(e) {
      toTop(e.scrollTop);
    }

    return {
      dateShow,
      dateFormat,
      scrollbarRef,
      scroll,
    };
  },
});
</script>

<style lang="scss" scoped>
.dialogue-record {
  width: 100%;
  height: 100%;
  overflow: hidden;

  :deep(.el-scrollbar__thumb) {
    background-color: $grey-7 !important;
  }

  .dialogue-record-inner {
    width: 100%;
    @include flex(center, center, column);

    .dialogue-record-none,
    .dialogue-record-item .date {
      height: 16px;
      color: $grey-7;
      font-size: 12px;
      @include flex(center);
      margin-top: 10px;
    }

    .dialogue-record-item {
      padding: 8px 24px;
      width: calc(100% - 48px);
      @include flex(center, center, column);

      .date {
        margin-bottom: 16px;
      }

      .inner {
        width: 100%;
        display: inline-block;

        .inner-content {
          margin: 0 14px;
          max-width: calc(90% - 76px);
          background-color: $grey-0;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);
          box-sizing: border-box;
          padding: 6px 16px;
          font-size: 14px;
          color: $grey-10;
          position: relative;
          border-radius: 6px;
          float: left;

          &::before {
            content: '';
            width: 10px;
            height: 10px;
            transform: rotate(45deg);
            box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.08);
            background-color: $grey-0;
            position: absolute;
            left: -5.5px;
            top: 11.5px;
          }

          &.right {
            float: right;

            &::before {
              box-shadow: 2px -2px 4px rgba(0, 0, 0, 0.08);
              left: auto;
              right: -5.5px;
            }
          }
        }
      }
    }
  }
}
</style>
