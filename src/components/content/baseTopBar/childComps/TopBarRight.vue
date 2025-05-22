<!--
 * @Description: 首页顶部之右边部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-20 11:01:33
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-03-15 22:29:28
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
        :width="null"
        :show-after="200"
        :offset="13"
        popper-class="top-bar-right-inner"
      >
        <template #reference>
          <a v-prefix :href="item.url">
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
          :content="item.content"
        />
      </el-popover>
      <a v-prefix
        v-else
        :href="item.url"
      >
        <div
          class="button"
          role="button"
        >
          {{item.name}}
        </div>
      </a>
    </div>
    <div class="top-bar-right-menu-child">
      <top-bar-note-share />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import TopBarAvatar from '@/components/content/baseTopBar/childComps/TopBarAvatar.vue';
import TopBarMessage from '@/components/content/baseTopBar/childComps/TopBarMessage.vue';
import TopBarCollection from '@/components/content/baseTopBar/childComps/TopBarCollection.vue';
import TopBarHistory from '@/components/content/baseTopBar/childComps/TopBarHistory.vue';
import TopBarNoteShare from '@/components/content/baseTopBar/childComps/TopBarNoteShare.vue';
import TopBarNotLogin from '@/components/content/baseTopBar/childComps/TopBarNotLogin.vue';
import { mapState } from '@/utils/store';

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
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 拿到token验证信息

    // 左侧菜单按钮
    const menu = computed(() => {
      return [
        {
          name: '消息',
          url: tokenInfo.value.status ? '/message' : '/login',
          component: tokenInfo.value.status ? 'TopBarMessage' : 'TopBarNotLogin',
          content: '登录即可查看消息',
        },
        {
          name: '动态',
          url: tokenInfo.value.status ? '/user/' + tokenInfo.value.username + '/dynamic' : '/login',
          component: tokenInfo.value.status ? '' : 'TopBarNotLogin',
          content: '登录即可查看动态',
        },
        {
          name: '收藏',
          url: tokenInfo.value.status ? '/userCenter/collection' : '/login',
          component: tokenInfo.value.status ? 'TopBarCollection' : 'TopBarNotLogin',
          content: '登录即可查看收藏',
        },
        {
          name: '历史',
          url: tokenInfo.value.status ? '/history' : '/login',
          component: tokenInfo.value.status ? 'TopBarHistory' : 'TopBarNotLogin',
          content: '登录即可查看历史',
        },
        {
          name: '创作中心',
          url: tokenInfo.value.status ? '/admin/creation' : '/login',
          component: tokenInfo.value.status ? '' : 'TopBarNotLogin',
          content: '登录即可进入创作中心',
        },
      ];
    });

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
