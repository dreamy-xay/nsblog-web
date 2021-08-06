<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-05 21:23:32
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-05 22:00:58
-->

<template>
  <div class=top-bar-message>

    <el-popover
      offset="18"
      placement="bottom"
      trigger="hover"
      hide-after="100"
      :popper-class="topbarmessage"
      :width=172
    >

      <template #reference>
        <div class="top-bar-message-header">
          消息
        </div>
      </template>

      <div
        v-for="(item,index) in menuList"
        :key="index"
      >
        <el-link
          :underline=false
          :href="item.url"
          :class="content"
          target="_blank"
        >
          <i :class="item.icon"></i>
          <span class="contents">{{item.title}}</span>
        </el-link>
      </div>

    </el-popover>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

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
        url: '#',
      },
      {
        title: '收到的赞',
        icon: 'iconfont blog-dianzan1',
        url: '#',
      },
      {
        title: '关注我的',
        icon: 'iconfont blog-guanzhu',
        url: '#',
      },
      {
        title: '系统通知',
        icon: 'iconfont blog-tongzhi',
        url: '#',
      },
      {
        title: '我的消息',
        icon: 'iconfont blog-xiaoxi',
        url: '#',
      },
      {
        title: '消息设置',
        icon: 'iconfont blog-shezhi',
        url: '#',
      },
    ];
    return {
      menuList,
    };
  },
});
</script>
<style lang="scss">
.el-popover.el-popper.is-light {
  border: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
@mixin font-style($size: 16px, $color: $grey-11) {
  font-size: $size;
  font-family: Arial, Arial-Regular;
  font-weight: 400;
  text-align: center;
  color: $color;
}

@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.top-bar-message-header {
  @include font-style;
}

.top-bar-message-contents {
  line-height: 35px;
  border: 0;
  @include size(172px, 35px);
  @include font-style;
}

::v-deep .el-link {
  font-weight: 400;
  padding-bottom: 2px;
  &.el-link--default {
    color: $grey-11;
    @include size(172px, 35px);
    i {
      font-size: 20px;
    }
    &:hover {
      background: $grey-2;
      color: $green-0;
      .contents {
        color: $green-0;
      }
    }
  }
}

::v-deep .iconfont {
  font-size: 20px;
}

.contents {
  margin-left: 12px;
  @include font-style;
  @include size(64px, 35px);
}
</style>
