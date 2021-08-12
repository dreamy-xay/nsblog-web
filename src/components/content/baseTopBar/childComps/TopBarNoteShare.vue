<!--
 * @Description: TopBarNoteShare
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-29 15:53:25
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-12 10:38:42
-->

<template>

  <div
    class="top-bar-collection-content"
    v-if="!isLogin"
  >
    <top-bar-not-login-in :title="title">
      <el-button class="noteShare">笔记分享</el-button>
    </top-bar-not-login-in>
  </div>

  <el-popover
    placement="bottom"
    :width="288"
    trigger="hover"
    popper-class="el-noteshare"
    style="padding : 0"
    v-if="isLogin"
  >
    <a
      href=""
      class="noteshare-item"
      v-for="item in noteshare"
      :key="item.name"
    >
      <i
        class="iconfont"
        :class="item.iconfont"
      ></i>
      <div>
        {{  item.name  }}
      </div>
    </a>
    <template #reference>
      <el-button
        @click="visible = true"
        class="noteShare"
      >笔记分享</el-button>
    </template>
  </el-popover>
</template>

<script>
import { defineComponent, ref } from 'vue';
import TopBarNotLoginIn from '@/components/content/baseTopBar/childComps/TopBarNotLoginIn.vue';
import { verifyToken } from '@/network/token';
/**
 * @description:  TopBar_笔记分享
 * @author: Ban
 */

export default defineComponent({
  name: 'TopBarNoteShare',
  components: { TopBarNotLoginIn },
  setup() {
    const title = ref('笔记分享');
    const isLogin = ref(verifyToken().status);
    const noteshare = [
      {
        name: '写笔记',
        iconfont: 'blog-edit-article',
      },
      {
        name: '提问题',
        iconfont: 'blog-wenti',
      },
      {
        name: '享资源',
        iconfont: 'blog-shangchuan',
      },
      {
        name: '传图片',
        iconfont: 'blog-icons01',
      },
    ];
    return {
      title,
      noteshare,
      isLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.noteShare {
  background: $green-0;
  color: $grey-0;
  font-size: 16px;
  border: 0;

  &:hover {
    background: $green-1;
  }
}

.noteshare-item {
  display: inline-block;
  height: 72px;
  width: 72px;
  color: $grey-9;
  text-align: center;
  font-weight: 700;

  &:hover {
    background: $grey-2;
    color: $green-0;
  }

  i.iconfont {
    display: inline-block;
    margin-top: 2px;
    font-size: 32px;
    font-weight: 400;
  }
}

.el-popper {
  padding: 0;
}
</style>
<style>
.el-noteshare {
  padding: 0px !important;
}
</style>
