<!--
 * @Description: 文章目录头像
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-24 20:40:42
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-26 12:23:02
-->
<template>
  <div class="article-menu-avatar">
    <div class="article-menu-avatar-top">

      <div
        class=" avatar"
        @click="clickAvatar('/user/'+data.username)"
      >
        <base-avatar
          :src="data.avatar"
          :size="98"
          :href="`/user/${data.username}`"
          :target="`/user/${data.username}`"
        />
      </div>
      <div
        class="close"
        role="button"
        @click="close"
      ><i class="iconfont blog-close"></i></div>

    </div>
    <div class="article-menu-avatar-nickname">{{data.nickname}}</div>

    <div class="article-menu-avatar-signature">{{data.signature}}</div>

    <div
      class="article-menu-avatar-number"
      role="button"
    >
      <div
        class="article"
        @click="clickAvatar('/blog/' + data.username)"
      >
        <div class="number">{{data.article_count}}</div>
        <div class="text">文章</div>
      </div>
      <div
        class="article line"
        @click="clickAvatar('/blog/'+data.username+'/categories')"
      >
        <div class="number">{{data.category_count}}</div>
        <div class="text">分类</div>
      </div>
      <div
        class="article"
        @click="clickAvatar('/blog/'+data.username+'/tags')"
      >
        <div class="number">{{data.tag_count}}</div>
        <div class="text">标签</div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';

/**
 * @description:文章目录头像
 * @param {Object} data 需要显示的数据 `必传参数`
 * @event closeMenu 点击关闭按钮关闭抽屉
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'articleMenuAvatar',
  components: { BaseAvatar },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    /**
     * @description: 点击关闭
     * @return {Void}
     * @author: Z_Y_C
     */
    function close() {
      context.emit('closeMenu');
    }

    /**
     * @description: 点击跳转
     * @param {String} path 跳转路径
     * @return {Void}
     * @author: Z_Y_C
     */
    function clickAvatar(path) {
      window.open(path, path);
    }

    return {
      close,
      clickAvatar,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-menu-avatar {
  @include flex(center, center, column);
  padding-bottom: 24px;
  border-bottom: 1px solid $grey-2;

  .article-menu-avatar-top {
    @include flex(initial, center);
    width: 100%;
    position: relative;

    .avatar {
      @include flex(center, center);
      width: 104px;
      height: 104px;
      margin-top: 8px;
      background-color: $grey-0;
      border-radius: 52px;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
      transition: 0.8s;

      &:hover {
        transform: rotate(360deg);
      }
    }

    .close {
      position: absolute;
      height: 16px;
      line-height: 16px;
      color: $grey-5;
      right: 0;
      transition: 0.25s;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
      }
    }
  }

  .article-menu-avatar-nickname {
    margin-top: 12px;
    font-family: 'Lucida Handwriting', Cursive;
    font-size: 18px;
    height: 20px;
    line-height: 20px;
    color: $grey-7;
  }

  .article-menu-avatar-signature {
    margin-top: 16px;
    text-align: center;
    font-family: '楷体';
    font-size: 16px;
    color: $grey-10;
    line-height: 21px;
  }

  .article-menu-avatar-number {
    @include flex(center);
    margin-top: 16px;
    height: 58px;
    width: 100%;

    .article {
      @include flex(center, center, column);
      width: calc(100% / 3);
      color: $grey-10;
      transition: 0.25s;

      .number {
        font-size: 18px;
        height: 20px;
        line-height: 20px;
        font-weight: 700;
        margin-bottom: 5px;
      }

      .text {
        font-size: 16px;
        height: 21px;
        line-height: 21px;
      }

      &:hover {
        color: $green-0;
      }
    }

    .line {
      border-right: 1px solid $grey-5;
      border-left: 1px solid $grey-5;
    }
  }
}
</style>
