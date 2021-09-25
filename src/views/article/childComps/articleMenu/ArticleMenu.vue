<!--
 * @Description: 基础blog菜单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-20 20:28:35
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-25 12:31:46
-->
<template>
  <div
    class="base-blog-menu"
    :class="{'base-blog-menu-change': buttonChange}"
    role="button"
    @click="showMenu"
  >
    <div class="base-blog-menu-icon">
      <i class="iconfont blog-menu"></i>
    </div>
    <div
      class="base-blog-menu-text"
      v-show="!buttonChange"
    >
      MENU
    </div>
    <n-drawer
      v-model:show="show"
      :width="380"
      placement="left"
      :style="{padding: '24px'}"
    >
      <div class="">
        <article-menu-avatar :data="avatarData" />
      </div>
    </n-drawer>
  </div>
</template>

<script>
import { computed, defineComponent, inject, onMounted, reactive, ref } from 'vue';
import { getArticlesUsers } from '@/network/api/articles';
import { mapState } from '@/util/store';
import ArticleMenuAvatar from '@/views/article/childComps/articleMenu/childComps/ArticleMenuAvatar.vue';

/**
 * @description: 基础blog菜单
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'articleMenu',
  components: {
    ArticleMenuAvatar,
  },
  setup() {
    const show = ref(false); // 是否显示侧边栏菜单
    const buttonChange = ref(false); // 菜单按钮是否改变状态
    const articlePage = inject('articlePage'); // 获取主页面 ref (dom)
    const height = 288 - 30; // 标题图片高度
    const { tokenInfo } = mapState('global', ['tokenInfo']);
    const menuData = reactive({
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

    getArticlesUsers(tokenInfo.value.username).then((data) => {
      console.log(data);
      menuData.username = data.username;
      menuData.nickname = data.nickname;
      menuData.avatar = data.avatar;
      menuData.signature = data.signature;
      menuData.tag_count = data.tag_count;
      menuData.article_count = data.article_count;
      menuData.category_count = data.category_count;
      menuData.friend_chain.splice(0, 0, ...data.friend_chain);
      menuData.recent_article.splice(0, 0, ...data.recent_article);
    });

    return {
      show,
      showMenu,
      buttonChange,
      avatarData,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-blog-menu {
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

  .base-blog-menu-icon {
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

  &.base-blog-menu-change {
    width: 30px;
    background-color: $grey-0;
    box-shadow: $shadow-0;

    .base-blog-menu-icon {
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
</style>
