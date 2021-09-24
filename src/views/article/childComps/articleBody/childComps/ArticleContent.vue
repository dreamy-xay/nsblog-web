<!--
 * @Description: 文章内容部分包括目录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-17 15:09:41
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 15:22:34
-->
<template>
  <div class="article-content">
    <div
      class="article-content-toc"
      :class="{'article-content-toc-show': tocShow}"
      :style="{maxHeight: showBackTop ? 'calc(100% - 46px)' : 'calc(100% - 330px)', top: tocTop + 'px'}"
      v-if="titles.length"
    >
      <div class="toc-head">
        <i class="iconfont blog-mulu"></i>
        目录
      </div>
      <div
        class="toc-body"
        role="button"
      >
        <el-scrollbar ref="scrollbar">
          <div
            class="anchor"
            v-for="(anchor, index) in titles"
            :class="{'anchor-active': activeIndex === index}"
            :key="index"
            @click="anchorClick(anchor.offset)"
          >
            <div :style="{ marginLeft: `${anchor.indent * 22}px` }">
              {{anchor.title}}
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <v-md-preview
      :text="content"
      ref="preview"
    />
    <div class="article-back-top-menu">
      <n-tooltip
        v-for="(item, index) in menuList"
        trigger="hover"
        display-directive="show"
        :key="index"
        placement="left"
        class="article-back-top-menu-tooltip"
      >
        {{item.content}}
        <template #trigger>
          <div
            class="menu-item"
            :class="item.class"
            role="button"
            @click="item.click"
          >
            <i
              class="iconfont"
              :class="item.icon"
            ></i>
          </div>
        </template>
      </n-tooltip>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, watch, reactive, ref } from 'vue';
import { binary_bound } from '@/util/algorithm';

/**
 * @description: 文章内容部分包括目录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'articleContent',
  props: {
    username: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const preview = ref(null); // 预览组件 ref
    const scrollbar = ref(null); // 菜单滚动条 ref
    const titles = reactive([]); // 目录列表
    const showBackTop = ref(false); // 是否显示回顶部
    const tocTop = ref(304); // 菜单置顶距离
    const activeIndex = ref(0); // 菜单激活项
    const articlePage = inject('articlePage'); // 获取主页面 ref (dom)

    // watch content
    watch(
      () => props.content,
      (value) => {
        if (value) {
          // 锚点菜单
          const anchors = preview.value.$el.querySelectorAll('h2,h3,h4');
          const aTitles = Array.from(anchors).filter((title) => !!title.innerText.trim());

          if (aTitles.length) {
            const hTags = Array.from(new Set(aTitles.map((title) => title.tagName))).sort();
            let sum = 0;
            titles.splice(
              0,
              aTitles.length,
              ...aTitles.map((el) => {
                return {
                  title: el.innerText,
                  offset: preview.value.getOffsetTop(el, articlePage.value),
                  indent: hTags.indexOf(el.tagName),
                };
              })
            );
          }

          // 菜单高度滚动监听;
          showBackTop.value = articlePage.value.scrollTop > 288;
          articlePage.value.addEventListener('scroll', (e) => {
            if (scrollbar.value) scrollbar.value.update();
            showBackTop.value = e.target.scrollTop > 288;
            tocTop.value = Math.max(16, 304 - e.target.scrollTop);
            activeIndex.value = Math.max(
              0,
              binary_bound(titles, (value) => value.offset >= e.target.scrollTop + 2) - 1
            );
          });
        }
      }
    );

    /**
     * @description: 点击锚点触发滚动
     * @param {number} top 滚动的位置
     * @return {void}
     * @author: dreamy-xay
     */
    function anchorClick(top) {
      articlePage.value.scrollTo({ top, behavior: 'smooth' });
    }

    const tocShow = ref(true); // 菜单显示
    // 底部菜单
    const menuList = computed(() => {
      return [
        {
          content: '文章目录',
          class: titles.length ? null : 'none',
          icon: 'blog-mulu1',
          click() {
            if (titles.length) tocShow.value = !tocShow.value;
          },
        },
        {
          content: '访问主页',
          icon: 'blog-homepage',
          click() {
            window.open(`/blog/${props.username}`, '_self');
          },
        },
        {
          content: showBackTop.value ? '返回顶部' : '跳至底部',
          icon: 'blog-huidingbu',
          class: showBackTop.value ? null : 'to-bottom',
          click() {
            showBackTop.value
              ? articlePage.value.scrollTo({ top: 0, behavior: 'smooth' })
              : articlePage.value.scrollTo({ top: articlePage.value.scrollHeight, behavior: 'smooth' });
          },
        },
      ];
    });

    return {
      preview,
      scrollbar,
      titles,
      tocTop,
      showBackTop,
      activeIndex,
      anchorClick,
      tocShow,
      menuList,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-content {
  width: 100%;

  .article-content-toc {
    width: 260px;
    height: 100%;
    overflow: hidden;
    position: fixed;
    left: calc(50% + 460px);
    background-color: $grey-0;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;

    &.article-content-toc-show {
      opacity: 1;
      pointer-events: auto;
    }

    .toc-head {
      width: 100%;
      height: 39px;
      border-bottom: 1px solid $grey-3;
      @include flex(center);
      font-size: 14px;
      font-weight: 700;
      color: $grey-9;

      .iconfont {
        margin-left: 6px;
        margin-right: 7px;
        font-weight: normal;
        margin-top: 2px;
      }
    }

    .toc-body {
      width: 100%;
      margin: 5px 0;
      height: calc(100% - 50px);

      :deep(.el-scrollbar__thumb) {
        background-color: $grey-7;
      }

      .anchor {
        display: block;
        margin: 4px 6px;
        width: calc(100% - 15px);
        height: 24px;
        font-size: 15.5px;
        color: $grey-9;
        @include flex(center);
        border-left: 3px solid $grey-0;
        box-sizing: border-box;
        background-color: $grey-0;

        &.anchor-active {
          color: $green-1;
          background-color: $grey-2;
          border-left-color: $green-1;
        }

        &:hover {
          color: $green-1;
          background-color: $grey-2;
          border-left-color: $green-1;
        }

        & > div {
          padding-left: 8px;
          height: 100%;
          line-height: 24px;
          width: calc(100% - 8px);
          @include ellipsis(1);
        }
      }
    }
  }

  .article-back-top-menu {
    position: fixed;
    right: 40px;
    bottom: 40px;
    height: 124px;
    width: 36px;
    @include flex(center, center, column);

    .menu-item {
      height: 36px;
      width: 36px;
      background-color: $grey-0;
      border-radius: 50%;
      box-shadow: $shadow-0;
      margin-bottom: 8px;
      @include flex(center, center);
      transition: 0.25s;

      &.to-bottom .iconfont {
        transform: rotateZ(180deg);
      }

      &.none {
        opacity: 0;
        pointer-events: none;
      }

      &:first-child {
        font-weight: 600;

        &:hover .iconfont {
          @keyframes scale {
            0% {
              transform: scale(1);
            }
            30% {
              transform: scale(1.3);
            }
            60% {
              transform: scale(1);
            }
            80% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
          animation: scale 0.6s;
        }

        .iconfont {
          font-size: 19px;
        }
      }

      &:nth-child(2):hover .iconfont {
        @keyframes swing {
          0% {
            transform: rotate(0deg);
          }
          27% {
            transform: rotate(60deg);
          }
          54% {
            transform: rotate(-60deg);
          }
          80% {
            transform: rotate(15deg);
          }
          90% {
            transform: rotate(-15deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        animation: swing 0.6s;
      }

      &:last-child {
        margin-bottom: 0;

        .iconfont {
          transition: transform 0.6s ease-in-out;
        }
      }

      &:hover {
        box-shadow: $shadow-2;

        .iconfont {
          color: $green-1;
        }
      }

      .iconfont {
        transition: 0.25s;
        font-size: 18px;
        color: $green-0;
      }
    }
  }

  :deep(.v-md-editor-preview > div) {
    padding: 16px 20px;
  }
}
</style>

<style lang="scss">
.article-back-top-menu-tooltip {
  height: 20px;
  @include flex(center);
  padding: 4px 10px !important;
  font-weight: 300;
  font-size: 14px;
  letter-spacing: 1px;
  opacity: 0.9;

  .n-popover-arrow-wrapper {
    left: calc(100% - 0.5px) !important;
  }
}
</style>
