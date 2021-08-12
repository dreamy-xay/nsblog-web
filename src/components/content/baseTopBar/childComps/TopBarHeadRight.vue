<!--
 * @Description:  首页顶部之右边部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-20 11:01:33
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-12 14:45:42
-->

<template>
  <div class="base-top-bar-right">
    <div class="base-top-bar-right-menu">
      <div class="menu-child">
        <top-bar-avatar />
      </div>
      <div class="menu-child">
        <top-bar-message />
      </div>
      <div class="menu-child">动态</div>
      <div class="menu-child">
        <top-bar-collection />
      </div>
      <div class="menu-child">历史</div>
      <div class="menu-child">创作中心</div>
      <div class="menu-child">
        <top-bar-note-share />
      </div>
    </div>
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
import TopBarCollection from './TopBarCollection.vue';
import TopBarMessage from './TopBarMessage.vue';
export default defineComponent({
  name: 'TopBarHeadRight',
  components: {
    TopBarAvatar,
    TopBarNoteShare,
    TopBarMessage,
    TopBarCollection,
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

    .menu-child {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
      padding: 0 13px;
      cursor: pointer;

      &:hover {
        color: $green0;
      }
    }
  }
}
</style>
