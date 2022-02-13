<!--
 * @Description: 页脚
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-10 20:39:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-13 21:14:16
-->

<template>
  <div
    class="base-footer"
    :class="{'base-footer-fixed': fixedFooter}"
    ref="footer"
    :style="{height: showAll ? '122px' : '50px'}"
    v-resize="changeFooterStatus"
  >
    <div v-if="showAll">
      <div class="base-footer-first">
        <a
          v-for="(content, index) in contents"
          :key="index"
          :href="content.url"
          :target="content.url"
          role="button"
        >
          {{content.name}}
        </a>
      </div>
      <div class="base-footer-second">
        <a
          v-for="(title, index) in titles"
          :href="title.url"
          :target="title.url"
          :key="index"
          role="button"
        >
          <i :class="title.icon"></i>
        </a>
      </div>
    </div>

    <div
      class="base-footer-third"
      :style="{marginBottom: showAll ? '12px' : null}"
    >
      <div>© 2021 ·</div>
      <a
        href="/"
        target="/"
      >笔记分享部落阁</a>
      <div>· ALL RIGHTS RESERVED</div>
    </div>
  </div>
  <div
    class="base-footer-empty"
    :style="{height: showAll ? '122px' : '50px'}"
    v-show="fixedFooter"
  ></div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { getRelativeDocumentPosition } from '@/util/dom';

/**
 * @description: 页脚
 * @param {Boolean} showAll 是否全部 `默认为true`
 * @method changeFooterStatus 重新修改底部栏状态 () => {}
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseFooter',
  props: {
    showAll: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const titles = [
      //图标
      {
        name: '微博',
        url: '',
        icon: 'iconfont blog-weibo',
      },
      {
        name: '邮箱',
        url: 'mailto:nsblog@163.com',
        icon: 'iconfont blog-email',
      },
    ];
    const contents = [
      //第一行文字
      {
        name: '关于',
        url: '/user/nsblog',
      },
      {
        name: '博客',
        url: '/blog/nsblog',
      },
      {
        name: '网站',
        url: '/',
      },
    ];

    const footer = ref(null); // footer dom
    const fixedFooter = ref(false); // 是否固定footer在底部

    /**
     * @description: 修改底部栏状态
     * @return {void}
     * @author: dreamy-xay
     */
    function changeFooterStatus() {
      const windowHeight = document.body.clientHeight; // 窗口高度
      const footerHeight = footer.value.offsetHeight; // 底部栏高度
      console.log(getRelativeDocumentPosition(footer.value).top, windowHeight - footerHeight);
      fixedFooter.value = Math.ceil(getRelativeDocumentPosition(footer.value).top) < windowHeight - footerHeight;
    }

    // 初始加载
    onMounted(changeFooterStatus);

    // 窗口修改改变
    window.onresize = function () {
      changeFooterStatus();
    };

    return {
      titles,
      contents,
      footer,
      fixedFooter,
      changeFooterStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-footer {
  width: 100%;
  background: $grey-0;
  box-shadow: $shadow-0;
  margin-top: 20px;
  @include flex(center, center, column);

  &.base-footer-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .base-footer-empty {
    width: 100%;
  }

  .base-footer-first {
    font-size: 15px;
    height: 20px;
    margin-top: 16px;

    a {
      color: $grey-7;
      margin-right: 20px;

      &:last-child {
        margin-right: 0px;
      }
    }
  }

  .base-footer-second {
    height: 28px;
    margin-top: 10px;
    margin-bottom: 14px;
    @include flex(center, center);

    .blog-weibo {
      margin-right: 20px;
    }

    .iconfont {
      font-size: 20px;
      color: $grey-8;
    }
  }

  .base-footer-third {
    @include flex(center, center, row);
    font-size: 14px;
    color: $grey-7;
    height: 20px;

    a {
      color: $grey-7;
      margin: 0px 5px;
      transition: 0.25s;

      &:hover {
        color: $grey-10;
      }
    }
  }
}
</style>
