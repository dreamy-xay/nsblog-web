<!--
 * @Description: 博客首页菜单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-10-03 17:31:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-15 16:58:22
-->
<template>
  <div
    class="blog-menu"
    :class="{'blog-menu-show': scrollShowMenu}"
  >
    <div class="blog-menu-inner">
      <a
        class="menu-item"
        v-for="(item, index) in menu"
        :key="index"
        role="button"
        :href="item.url"
        :target="item.target ? item.target : '_self'"
      >
        <div
          v-if="item.icon"
          class="icon"
        >
          <i
            class="iconfont"
            :class="item.icon"
          ></i>
        </div>
        {{item.name}}
        <div class="line"></div>
      </a>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, onMounted, ref } from 'vue';

/**
 * @description: 博客首页菜单
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'blogMenu',
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // 计算菜单
    const menu = computed(() => {
      return [
        {
          name: 'nsblog',
          url: '/',
          icon: null,
        },
        {
          name: '首页',
          url: `/blog/${props.username}`,
          icon: 'blog-bhome',
        },
        {
          name: '标签',
          url: `/blog/${props.username}/tags`,
          icon: 'blog-label',
        },
        {
          name: '分类',
          url: `/blog/${props.username}/categories`,
          icon: 'blog-category',
        },
        {
          name: '友链',
          url: `/blog/${props.username}/friends`,
          icon: 'blog-friend-link',
        },
        {
          name: '关于',
          url: `/user/${props.username}`,
          icon: 'blog-leaf',
          target: '_blank',
        },
        {
          name: '开往',
          url: 'https://travellings.now.sh/',
          icon: 'blog-emit',
          target: '_blank',
        },
      ];
    });

    const scrollShowMenu = ref(false); // 是否监听滚动显示顶部菜单
    const blogPage = inject('blogPage'); // 博客页面
    // dom 渲染完成
    onMounted(() => {
      // 初始化
      scrollShowMenu.value = blogPage.value.scrollTop !== 0;
      // 监听滚动
      blogPage.value.addEventListener('scroll', (e) => {
        scrollShowMenu.value = e.target.scrollTop !== 0;
      });
    });

    return {
      menu,
      scrollShowMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-menu {
  position: fixed;
  top: 0;
  left: 0;
  border-top: 0;
  background: $grey-0;
  box-shadow: $shadow-0;
  width: calc(100% - 8px);
  height: 56px;
  z-index: 999;
  opacity: 0;
  transition: all 0.4s ease;
  @include flex(center, center);

  &::before {
    display: none;
  }

  .blog-menu-inner {
    height: 100%;
    margin-left: 12vw;
    @include flex(center, center);
    transition: all 0.4s ease;

    .menu-item {
      @include flex(center);
      height: 100%;
      text-decoration: none;
      color: $grey-8;
      padding: 0 2px;
      margin: 0 10px;
      font-size: 17px;
      outline: none;
      width: auto;
      transition: 0.25s;
      box-sizing: border-box;
      position: relative;

      &:first-child {
        font-family: 'Lucida Handwriting';
        font-size: 20px;
        font-weight: 700;
        margin-right: 12px;
      }

      &:hover {
        color: $green-1;

        .line {
          width: 100%;
        }
      }

      .icon {
        height: 100%;
        width: 18px;
        @include flex(center, center);
        margin-right: 8px;

        .iconfont {
          font-size: 18px;
        }
      }

      .line {
        position: absolute;
        height: 3px;
        bottom: 0;
        left: 0;
        width: 0;
        transition: 0.25s;
        background-color: $green-1;
      }
    }
  }

  &:hover,
  &.blog-menu-show {
    opacity: 1;

    .blog-menu-inner {
      margin-left: 0;
    }
  }
}
</style>
