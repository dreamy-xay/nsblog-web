<!--
 * @Description: 首页顶部之右边部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-20 11:01:33
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-12 21:48:09
-->

<template>
  <div class="top-bar-right">
    <div class="top-bar-right-menu-child">
      <top-bar-avatar />
    </div>
    <div
      class="top-bar-right-menu-child"
      v-for="(item, index) in menu"
      :key="index"
    >
      <el-popover
        v-if="item.component !== ''"
        placement="bottom"
        trigger="hover"
        :width="item.width"
        :show-after="200"
        :offset="13"
        popper-class="top-bar-right-inner"
      >
        <template #reference>
          <a :href="item.url">
            <div
              class="button"
              role="button"
            >
              {{item.name}}
            </div>
          </a>
        </template>
        <component
          :is="item.component"
          :title="item.name"
        />
      </el-popover>
    </div>
    <div class="top-bar-right-menu-child">
      <top-bar-note-share />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TopBarAvatar from '@/components/content/baseTopBar/childComps/TopBarAvatar.vue';
import TopBarMessage from '@/components/content/baseTopBar/childComps/TopBarMessage.vue';
import TopBarCollection from '@/components/content/baseTopBar/childComps/TopBarCollection.vue';
import TopBarHistory from '@/components/content/baseTopBar/childComps/TopBarHistory.vue';
import TopBarNoteShare from '@/components/content/baseTopBar/childComps/TopBarNoteShare.vue';
import TopBarNotLogin from '@/components/content/baseTopBar/childComps/TopBarNotLogin.vue';
import { verifyToken } from '@/network/token';

/**
 * @description: 首页顶部之右边部分组件
 * @author: Ban
 */

export default defineComponent({
  name: 'topBarRight',
  components: {
    TopBarAvatar,
    TopBarMessage,
    TopBarCollection,
    TopBarHistory,
    TopBarNoteShare,
    TopBarNotLogin,
  },
  setup() {
    const token = verifyToken(); // 拿到token验证信息
    const isLogin = token.status; // 是否登录
    // 左侧菜单按钮
    const menu = [
      {
        name: '消息',
        url: isLogin ? '/message' : '/login',
        component: isLogin ? 'TopBarMessage' : 'TopBarNotLogin',
        width: isLogin ? null : 328,
      },
      {
        name: '动态',
        url: isLogin ? '/user/' + token.username + '/dynamic' : '/login',
        component: isLogin ? '' : 'TopBarNotLogin',
        width: isLogin ? null : 328,
      },
      {
        name: '收藏',
        url: isLogin ? '/userCenter/collection' : '/login',
        component: isLogin ? 'TopBarCollection' : 'TopBarNotLogin',
        width: isLogin ? null : 328,
      },
      {
        name: '历史',
        url: isLogin ? '/history' : '/login',
        component: isLogin ? 'TopBarHistory' : 'TopBarNotLogin',
        width: isLogin ? null : 328,
      },
      {
        name: '创作中心',
        url: isLogin ? '/admin' : '/login',
        component: isLogin ? '' : 'TopBarNotLogin',
        width: isLogin ? null : 328,
      },
    ];

    return {
      menu,
    };
  },
});
</script>

<style lang="scss" scoped>
$green0: $green-0;
$green1: $green-1;
$grey0: $grey-0;

.top-bar-right {
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 100%;

  .top-bar-right-menu-child {
    height: 100%;
    margin: 0 13px;
    display: flex;
    align-items: center;

    .button {
      height: 30px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: $grey-11;
      transition: 0.25s;

      &:hover {
        color: $green-0;
      }
    }
  }
}
</style>

<style>
.top-bar-right-inner {
  margin-top: 10px;
}
</style>
