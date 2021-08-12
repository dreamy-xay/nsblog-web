<!--
 * @Description:  首页顶部之右边部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-20 11:01:33
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-12 10:37:59
-->

<template>
  <div class="top-bar-head-right">
    <div class="top-bar-head-right-menu">
      <div>
        <top-bar-avatar />
      </div>
      <div>
        <top-bar-message />
      </div>
      <div>动态</div>
      <div>
        <top-bar-collection />
      </div>
      <div>历史</div>
      <div>创作中心</div>
      <div>
        <top-bar-note-share />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineComponent } from '@vue/runtime-core';
import TopBarAvatar from './TopBarAvatar.vue';
import TopBarNoteShare from './TopBarNoteShare.vue';
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
    const router = useRouter();
    /**
     * @description: 路由跳转到Message页面
     * @author: Ban
     */
    function routeToMessage() {
      router.push('/message');
    }
    return {
      isNoteshare,
      routeToMessage,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-bar-head-right {
  display: flex;
  line-height: 56px;

  .top-bar-head-right-menu {
    height: 58px;
    display: inline-block;
    letter-spacing: 1px;

    div {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
      padding: 0 13px;
      cursor: pointer;
      transition: all 0.1s linear;

      &:hover {
        color: $green-0;
      }
    }
  }
}
</style>
