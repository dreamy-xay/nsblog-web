<!--
 * @Description: TopBar_笔记分享
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-29 15:53:25
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-12 21:51:10
-->

<template>
  <div class="top-bar-note-share">
    <!-- 登录时加载 -->
    <el-popover
      placement="bottom"
      :width="288"
      trigger="hover"
      popper-class="top-bar-note-share-noteshare"
      :offset="10"
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
          {{ item.name }}
        </div>
      </a>
      <template #reference>
        <el-button
          @click="visible = true"
          class="noteShare"
        >笔记分享
        </el-button>
      </template>
    </el-popover>
  </div>

</template>

<script>
import { defineComponent } from 'vue';
// import TopBarNotLogin from '@/components/content/baseTopBar/childComps/TopBarNotLogin.vue';
import { verifyToken } from '@/network/token';
/**
 * @description:  TopBar_笔记分享
 * @author: Ban
 */

export default defineComponent({
  components: {
    // TopBarNotLogin,
  },
  setup() {
    const isLogin = verifyToken().status;
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
      noteshare,
      isLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-bar-note-share {
  .noteShare {
    background: $green-0;
    color: $grey-0;
    font-size: 16px;
    border: 0;

    &:hover {
      background: $green-1;
    }
  }
}
.top-bar-note-share-noteshare {
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
}
.top-bar-note-share-not-in {
  background: $green-0;
  color: $grey-0;
  font-size: 16px;
  border: 0;
  padding: 0;

  &:hover {
    background: $green-1;
  }

  .not-login-in {
    line-height: 30px;
    margin: 0 20px;
  }
}
</style>
