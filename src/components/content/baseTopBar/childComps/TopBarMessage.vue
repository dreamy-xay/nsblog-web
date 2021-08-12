<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-05 21:23:32
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-12 10:15:25
-->

<template>
  <div class=top-bar-message>

    <div v-if="!isLogin">
      <top-bar-not-login-in :title="title">
        消息
      </top-bar-not-login-in>
    </div>

    <el-popover
      placement="bottom"
      trigger="hover"
      hide-after="100"
      :popper-class="topbarmessage"
      :width=172
      v-if="isLogin"
    >

      <template #reference>
        <div
          class="top-bar-message-header"
          @click="messageclick"
        >
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
        >
          <i
            :class="item.icon"
            role="button"
          ></i>
          <span
            class="contents"
            role="button"
          >{{item.title}}</span>
        </el-link>
      </div>

    </el-popover>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { verifyToken } from '@/network/token';
import TopBarNotLoginIn from '@/components/content/baseTopBar/childComps/TopBarNotLoginIn.vue';
/**
 * @description:  消息栏弹窗
 * @author: continue-hs
 */

export default defineComponent({
  name: 'topBarMessage',
  components: { TopBarNotLoginIn },
  setup() {
    const isLogin = ref(verifyToken().status);
    const title = ref('消息');
    const router = useRouter();
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

    /**
     * @description: 点击跳转路由(已登录跳至消息页面，否则跳登录页面)
     * @return {void}
     * @author: continue-hs
     */
    function messageclick() {
      if (isLogin.value) router.push('/message');
      else router.push('/login/Signin');
    }

    return {
      isLogin,
      title,
      messageclick,
      menuList,
    };
  },
});
</script>
<style lang="scss">
.el-popover.el-popper.is-light {
  border: 0;
  padding: 0;
  text-align: center;
  color: #000000;
}
</style>
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

.top-bar-message-header {
  &:hover {
    color: $green-0;
  }
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
      font-size: 19px;
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
