<!--
 * @Description: 页脚
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-10 20:39:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-07-04 14:39:21
-->

<template>
  <div
    class="base-footer"
    :style="{height: showAll ? '122px' : '50px'}"
  >
    <div v-if="showAll">
      <div class="base-footer-first">
        <a v-prefix
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
        <a v-prefix
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
      <div>© 2022 ·</div>
      <a v-prefix
        href="/"
        target="/"
      >笔记分享部落阁</a>
      <div>· ALL RIGHTS RESERVED</div>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 页脚
 * @param {Boolean} showAll 是否全部 `默认为true`
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

    return {
      titles,
      contents,
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
