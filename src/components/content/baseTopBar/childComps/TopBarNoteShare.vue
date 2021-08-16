<!--
 * @Description: TopBar_笔记分享
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-29 15:53:25
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-16 17:25:42
-->

<template>
  <div class="top-bar-note-share">
    <el-popover
      placement="bottom"
      :width="null"
      trigger="hover"
      popper-class="top-bar-note-share-inner"
      :offset="10"
      :show-after="200"
    >
      <a
        v-for="(item, index) in menu"
        :href="item.url"
        class="note-share-item"
        :key="index"
      >
        <i
          class="iconfont"
          :class="item.iconfont"
        ></i>
        <div>
          {{ item.name }}
        </div>
      </a>
      <template #reference>
        <a href="/admin">
          <div
            class="button"
            role="button"
          >
            笔记分享
          </div>
        </a>
      </template>
    </el-popover>
  </div>

</template>

<script>
import { defineComponent, computed } from 'vue';
import { mapGetters } from '@/util/store';

/**
 * @description:  TopBar_笔记分享
 * @author: Ban
 */

export default defineComponent({
  name: 'topBarNoteShare',
  setup() {
    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录
    // 菜单
    const menu = computed(() => {
      return [
        {
          name: '写笔记',
          iconfont: 'blog-edit-article',
          url: isLogin.value ? '#' : '/login/signIn',
        },
        {
          name: '提问题',
          iconfont: 'blog-wenti',
          url: isLogin.value ? '#' : '/login/signIn',
        },
        {
          name: '享资源',
          iconfont: 'blog-shangchuan',
          url: isLogin.value ? '#' : '/login/signIn',
        },
        {
          name: '传图片',
          iconfont: 'blog-icons01',
          url: isLogin.value ? '#' : '/login/signIn',
        },
      ];
    });

    return {
      menu,
      isLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-bar-note-share {
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;

  .button {
    background: $green-0;
    width: 96px;
    height: 36px;
    border-radius: $border-radius-1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $grey-0;
    font-size: 16px;
    transition: 0.25s;

    &:hover {
      background: $green-1;
    }
  }
}

.top-bar-note-share-inner {
  .note-share-item {
    display: inline-block;
    height: 72px;
    width: 72px;
    color: $grey-9;
    text-align: center;
    font-weight: 600;
    transition: 0.25s;

    &:hover {
      background: $grey-2;
      color: $green-0;
    }

    i.iconfont {
      display: inline-block;
      margin-top: 2px;
      font-size: 32px;
    }
  }
}
</style>
