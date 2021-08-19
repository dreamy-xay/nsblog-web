<!--
 * @Description: 对话框对话记录显示
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-19 16:18:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-19 19:57:13
-->
<template>
  <div class="dialogue-record">
    <el-scrollbar>
      <div class="dialogue-record-none">
        没有更多消息了~
      </div>
      <!-- <div
        class="dialogue-record-item"
        v-for="(item, index) in data.records"
        :key="index"
      >
        <div class="date">
          2021年7月16日 23:33
        </div>
        <div class="inner">
          {{item}}
        </div>
      </div> -->
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 对话框对话记录显示
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'dialogueRecord',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.dialogue-record {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include flex(center, center, column);

  .dialogue-record-none {
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
  }
}
</style>
