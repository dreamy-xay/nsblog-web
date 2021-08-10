<!--
 * @Description:  首页顶部之右边部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-20 11:01:33
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-09 18:25:56
-->

<template>
  <div class="top-bar-head-right">
    <div class="top-bar-head-right-menu">
      <div class="top-bar-head-right-menu-div">
        <top-bar-avatar />
      </div>
      <div
        @click="routeToMessage"
        class="top-bar-head-right-menu-div"
      >消息</div>
      <div class="top-bar-head-right-menu-div">
        <top-bar-not-login-in title="动态">动态
        </top-bar-not-login-in>
      </div>
      <div class="top-bar-head-right-menu-div">收藏</div>
      <div class="top-bar-head-right-menu-div">历史</div>
      <div class="top-bar-head-right-menu-div">创作中心</div>
      <div class="top-bar-head-right-menu-div">
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
import TopBarNotLoginIn from '@/components/content/baseTopBar/childComps/TopBarNotLoginIn.vue';

/**
 * @description:  首页顶部之右边部分组件
 * @author: Ban
 */

export default defineComponent({
  name: 'TopBarHeadRight',
  components: {
    TopBarAvatar,
    TopBarNoteShare,
    TopBarNotLoginIn,
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

    .top-bar-head-right-menu-div {
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
