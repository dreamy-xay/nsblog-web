<!--
 * @Description:  首页顶部之右边部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-20 11:01:33
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-04 20:34:07
-->

<template>
  <div class="base-top-bar-right">
    <ul class="base-top-bar-right-menu">
      <li>
        <top-bar-avatar />
      </li>
      <li>消息</li>
      <li>动态</li>
      <li>收藏</li>
      <li>历史</li>
      <li>创作中心</li>
      <li>
        <top-bar-note-share />
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * @description:  The right of TopBar
 * @author: Ban
 */
import { ref } from 'vue';
import { defineComponent } from '@vue/runtime-core';
import TopBarAvatar from './TopBarAvatar.vue';
import TopBarNoteShare from './TopBarNoteShare';
export default defineComponent({
  name: 'TopBarHeadRight',
  components: {
    TopBarAvatar,
    TopBarNoteShare,
  },
  setup() {
    let isNoteshare = ref(true);
    return {
      isNoteshare,
    };
  },
});
</script>

<style lang="scss" scoped>
$green0: $green-0;
$green1: $green-1;
$grey0: $grey-0;

.base-top-bar-right {
  display: flex;
  line-height: 56px;

  .base-top-bar-right-menu {
    height: 58px;
    display: inline-block;
    letter-spacing: 1px;

    li {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
      padding: 0 13px;
      cursor: pointer;

      &:hover {
        color: $green0;
      }
    }

    .noteshare {
      display: inline-block;
      background: $green0;
      text-align: center;
      height: 36px;
      width: 96px;
      line-height: 36px;
      border-radius: 3px;
      color: $grey0;
      cursor: pointer;
      position: relative;
      &:hover {
        background: $green1;
      }
      li {
        color: $grey0;
      }
    }
  }
}
</style>
