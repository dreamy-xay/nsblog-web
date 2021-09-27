<!--
 * @Description: 基础blog菜单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-20 20:28:35
 * @LastEditors: clq
 * @LastEditTime: 2021-09-26 17:23:27
-->
<template>
  <div
    class="article-menu"
    :class="{'article-menu-change': buttonChange}"
    role="button"
    @click="showMenu"
  >
    <div class="article-menu-icon">
      <i class="iconfont blog-menu"></i>
    </div>
    <div
      class="article-menu-text"
      v-show="!buttonChange"
    >
      MENU
    </div>
    <n-drawer
      v-model:show="show"
      :width="320"
      placement="left"
      class="article-menu-drawer"
    >
      <el-scrollbar class="article-menu-drawer-scrollbar">
        <div class="article-menu-body">
          <article-menu-avatar
            :data="avatarData"
            @closeMenu="close"
          />
          <article-menu-navigation :data="menuData.username" />
          <article-menu-publication :data="menuData.recent_article" />
          <article-menu-friend :data="menuData.friend_chain" />
        </div>
      </el-scrollbar>
    </n-drawer>
  </div>
</template>

<script>
import { computed, defineComponent, inject, onMounted, reactive, ref, watch } from 'vue';
import { getArticlesUsers } from '@/network/api/articles';
import { mapState } from '@/util/store';
import ArticleMenuAvatar from '@/views/article/childComps/articleMenu/childComps/ArticleMenuAvatar.vue';
import ArticleMenuNavigation from '@/views/article/childComps/articleMenu/childComps/ArticleMenuNavigation.vue';
import ArticleMenuPublication from '@/views/article/childComps/articleMenu/childComps/ArticleMenuPublication.vue';
import ArticleMenuFriend from '@/views/article/childComps/articleMenu/childComps/ArticleMenuFriend.vue';
import { useMessage } from 'naive-ui';

/**
 * @description: 基础blog菜单
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'articleMenu',
  components: {
    ArticleMenuAvatar,
    ArticleMenuNavigation,
    ArticleMenuPublication,
    ArticleMenuFriend,
  },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const msg = useMessage(); // naive-ui
    const show = ref(false); // 是否显示侧边栏菜单
    const buttonChange = ref(false); // 菜单按钮是否改变状态
    const articlePage = inject('articlePage'); // 获取主页面 ref (dom)
    const height = 288 - 30; // 标题图片高度
    const menuData = reactive({
      // 目录数据
      username: null,
      nickname: null,
      avatar: null,
      signature: null,
      article_count: null,
      tag_count: null,
      category_count: null,
      friend_chain: [],
      recent_article: [],
    });

    const avatarData = computed(() => {
      // 传入头部数据
      return {
        username: menuData.username,
        nickname: menuData.nickname,
        avatar: menuData.avatar,
        signature: menuData.signature,
        article_count: menuData.article_count,
        tag_count: menuData.tag_count,
        category_count: menuData.category_count,
      };
    });

    // dom 渲染完成
    onMounted(() => {
      buttonChange.value = articlePage.value.scrollTop > height;
      articlePage.value.addEventListener('scroll', (e) => {
        buttonChange.value = e.target.scrollTop > height;
      });
    });

    /**
     * @description: 点击打开抽屉菜单
     * @return {void}
     * @author: dreamy-xay
     */
    function showMenu() {
      show.value = true;
    }

    /**
     * @description: 获取菜单数据
     * @param {string} username 用户名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function getMenuData(username) {
      if (username)
        getArticlesUsers(username)
          .then((data) => {
            menuData.username = data.username;
            menuData.nickname = data.nickname;
            menuData.avatar = data.avatar;
            menuData.signature = data.signature;
            menuData.tag_count = data.tag_count;
            menuData.article_count = data.article_count;
            menuData.category_count = data.category_count;
            menuData.friend_chain.splice(0, 0, ...data.friend_chain);
            menuData.recent_article.splice(0, 0, ...data.recent_article);
          })
          .catch((error) => {
            console.log(error);
            msg.error('获取菜单目录失败', { duration: 2000, closable: true });
          });
    }

    // 获取menu数据
    getMenuData(props.username);

    // 监听更新获取
    watch(
      () => props.username,
      (username) => {
        getMenuData(username);
      }
    );

    /**
     * @description: 点击关闭抽屉
     * @return {void}
     * @author: Z_Y_C
     */
    function close() {
      show.value = false;
    }

    return {
      show,
      showMenu,
      buttonChange,
      avatarData,
      menuData,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-menu {
  position: fixed;
  top: 18px;
  left: 22px;
  width: 84px;
  height: 30px;
  border: 1px solid $grey-0;
  border-radius: $border-radius-1;
  @include flex(center, center);
  background-color: transparent;
  color: $grey-0;
  font-size: 12px;
  font-family: 'Open Sans', Arial, serif;
  z-index: 2000;
  opacity: 1;
  transition: opacity 0.25s;
  transition: width 0.1s;
  transition: box-shadow 0.25s;
  overflow: hidden;

  &:hover {
    opacity: 0.8;
  }

  .article-menu-icon {
    width: 12px;
    height: 12px;
    margin-right: 8px;
    @include flex(center, center);

    .iconfont {
      font-size: 13px;
      color: $grey-0;
      transition: 0.25s;
    }
  }

  &.article-menu-change {
    width: 30px;
    background-color: $grey-0;
    box-shadow: $shadow-0;

    .article-menu-icon {
      margin-right: 0;

      .iconfont {
        color: $green-0;
      }
    }

    &:hover {
      opacity: 1;
      box-shadow: $shadow-2;

      .iconfont {
        color: $green-1;
      }
    }
  }
}

.article-menu-drawer {
  .article-menu-drawer-scrollbar {
    :deep(.el-scrollbar__thumb) {
      background-color: $grey-7;
    }
  }

  .article-menu-body {
    padding: 24px;
  }
}
</style>
