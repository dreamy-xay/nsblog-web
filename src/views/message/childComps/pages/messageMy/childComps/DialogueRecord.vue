<!--
 * @Description: 对话框对话记录显示
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-19 16:18:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-20 16:42:03
-->
<template>
  <div class="dialogue-record">
    <el-scrollbar>
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
            {{dateFormat('YY年mm月dd日 HH:MM', new Date(item.time),)}}
          </div>
          <div class="inner clearfix">
            <base-avatar
              :size="30"
              :src="item.is_me ? data.avatar : data.friendAvatar"
              :style="{float: item.is_me ? 'right' : 'left'}"
              alt="avatar"
            />
            <div
              class="inner-content"
              :style="{float: item.is_me ? 'right' : 'left', borderRadius: item.is_me ? '15px 0 15px 15px' : '0 15px 15px 15px'}"
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
import { defineComponent } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import { dateFormat } from '@/util/date';

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
  setup(props) {
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

    console.log(props.data);
    return {
      dateShow,
      dateFormat,
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
    background-color: $grey-7;
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
          margin: 0 8px;
          max-width: calc(90% - 76px);
          background-color: $grey-0;
          // box-shadow: $shadow-0;
          box-sizing: border-box;
          padding: 6px 16px;
        }
      }
    }
  }
}
</style>
