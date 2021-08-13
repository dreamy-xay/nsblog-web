<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-05 21:23:32
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-13 15:32:04
-->

<template>
  <div class=top-bar-message>
    <div
      class=top-bar-message-menu
      v-for="(item,index) in menuList"
      :key="index"
    >
      <a
        :underline=false
        :href="item.url"
        :class="content"
        target="_blank"
      >
        <i :class="item.icon"></i>
        <span class="contents">{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
/**
 * @description:  消息栏弹窗
 * @author: continue-hs
 */

export default defineComponent({
  name: 'topBarMessage',
  setup() {
    const menuList = [
      {
        title: '回复我的',
        icon: 'iconfont blog-huifu',
        url: '/message/reply',
      },
      {
        title: '收到的赞',
        icon: 'iconfont blog-dianzan1',
        url: '/message/like',
      },
      {
        title: '关注我的',
        icon: 'iconfont blog-guanzhu',
        url: '/message/attention',
      },
      {
        title: '系统通知',
        icon: 'iconfont blog-tongzhi',
        url: '/message/system',
      },
      {
        title: '我的消息',
        icon: 'iconfont blog-xiaoxi',
        url: '/message/my',
      },
      {
        title: '消息设置',
        icon: 'iconfont blog-shezhi',
        url: '/message/setting',
      },
    ];
    return {
      menuList,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin font-style($size: 16px, $color: $grey-11) {
  font-size: $size;
  font-weight: 400;
  text-align: center;
  color: $color;
}

@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.top-bar-message {
  .top-bar-message-menu {
    @include size(172px, 35px);
    text-align: center;
  }

  a {
    color: #000000;
    text-align: center;
    &:hover {
      color: $green-0;

      .contents {
        color: $green-0;
      }
    }
  }

  .contents {
    margin-left: 12px;
    @include font-style;
    @include size(64px, 35px);
  }
}

:deep(.iconfont) {
  font-size: 20px;
}
</style>
