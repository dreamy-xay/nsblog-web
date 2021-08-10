<!--
 * @Description: TopBarNoteShare
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-29 15:53:25
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-10 19:58:17
-->

<template>
  <!-- 登录时加载 -->
  <el-popover
    placement="bottom"
    :width="288"
    trigger="hover"
    popper-class="top-bar-note-share"
    v-if="isLogin"
  >
    <div
      href=""
      class="top-bar-note-share-item"
      v-for="item in noteshare"
      :key="item.name"
      @click="hopRouting(item.url)"
    >
      <i
        class="iconfont"
        :class="item.iconfont"
      ></i>
      <div>
        {{  item.name  }}
      </div>
    </div>
    <template #reference>
      <el-button
        @click="visible = true"
        class="top-bar-note-share-share"
      >笔记分享
      </el-button>
    </template>
  </el-popover>
  <!-- 未登录时加载 -->
  <el-button
    @click="visible = true"
    v-if="!isLogin"
    class="top-bar-note-share-not-login"
  >
    <top-bar-not-login-in
      title="笔记分享"
      :offset="8"
    >
      <div class="top-bar-note-share-not-login-content">
        笔记分享
      </div>
    </top-bar-not-login-in>
  </el-button>

</template>

<script>
import { defineComponent, ref } from 'vue';
import { verifyToken } from '@/network/token';
import TopBarNotLoginIn from '@/components/content/baseTopBar/childComps/TopBarNotLoginIn.vue';

/**
 * @description:  TopBar_笔记分享
 * @author: Ban
 */

export default defineComponent({
  name: 'TopBarNoteShare',
  components: {
    TopBarNotLoginIn,
  },
  setup() {
    const noteshare = [
      {
        name: '写笔记',
        iconfont: 'blog-edit-article',
        url: '1',
      },
      {
        name: '提问题',
        iconfont: 'blog-wenti',
        url: '2',
      },
      {
        name: '享资源',
        iconfont: 'blog-shangchuan',
        url: '3',
      },
      {
        name: '传图片',
        iconfont: 'blog-icons01',
        url: '4',
      },
    ];
    const isLogin = ref(verifyToken().status); // 是否已登录
    /**
     * @description: 路由跳转
     * @author: Ban
     */
    function hopRouting(path) {
      console.log(path);
    }
    return {
      noteshare,
      hopRouting,
      isLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-bar-note-share {
  .top-bar-note-share-item {
    display: inline-block;
    height: 72px;
    width: 72px;
    color: $grey-9;
    text-align: center;
    font-weight: 700;
    transition: all 0.1s linear;

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
}

.top-bar-note-share-share {
  background: $green-0;
  color: $grey-0;
  font-size: 16px;
  border: 0;
  padding: 0 20px;

  &:hover {
    background: $green-1;
  }
}
.top-bar-note-share-not-login {
  background: $green-0;
  color: $grey-0;
  font-size: 16px;
  border: 0;
  padding: 0;

  &:hover {
    background: $green-1;
  }

  .top-bar-note-share-not-login-content {
    display: inline-block;
    line-height: 40px;
    padding: 0 20px;
  }
}
</style>

<style>
.top-bar-note-share {
  padding: 0px !important;
}
</style>
