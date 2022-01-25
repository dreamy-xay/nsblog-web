<!--
 * @Description: 资源详细信息页面top
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-24 21:42:19
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-25 20:11:34
-->
<template>
  <div class="resource-detail-top">
    <div class="title">springboot中如何设置pagehelper-spring-boot-starter分页时，若该页面无内容，则返回空？</div>
    <div class="user">
      <base-avatar
        role="button"
        :src="'https://s3.bmp.ovh/imgs/2021/09/7fc65c1d3e881ea5.jpg'"
        :size="32"
        :href="'http://localhost:8888/user/dreamy'"
        :target="'http://localhost:8888/user/dreamy'"
      />
      <div class="name">梦幻</div>
      <div class="time">{{new Date()+' 上架'}}</div>
    </div>
    <div class="text">springboot中如何设置pagehelper-spring-boot-starter分页时，若该页面无内容，则返回空？springboot中如何设置子pgaehelper-spring
      -boot-starter分页时，若该页面无内容，则返回空？</div>
    <div class="button">
      <div
        class="download"
        role="button"
      >
        <div class="download-icon"><i class="iconfont blog-xiazai"></i></div>
        <div class="download-text">下载</div>
      </div>

      <div
        class="collect"
        role="button"
      >
        <div class="collect-icon"><i class="iconfont blog-shoucang21"></i></div>
        <div class="collect-text">收藏</div>
      </div>

      <div
        class="collect"
        role="button"
      >
        <div class="collect-icon"><i class="iconfont blog-fenxiang"></i></div>
        <div class="collect-text">分享</div>
      </div>
    </div>

    <div class="bottom">
      <div>下载量 • {{251}} 下载</div>
      <div
        role="button"
        class="bottom-button"
      >举报</div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';

/**
 * @description: 资源详细信息页面top
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceDetailTop',
  components: { BaseAvatar },
});
</script>

<style lang="scss" scoped>
.resource-detail-top {
  width: calc(100% - 60px);
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;
  padding: 30px;
  margin: 16px 0;

  .title {
    font-size: 32px;
    color: $grey-10;
    margin-bottom: 16px;
  }

  .user {
    height: 32px;
    @include flex(center);

    .name {
      margin-left: 10px;
      font-size: 14px;
      color: $green-1;
    }

    .time {
      margin-left: 20px;
      font-size: 14px;
      color: $grey-8;
    }
  }

  .text {
    margin-top: 10px;
    font-size: 16px;
    color: $grey-8;
  }

  .button {
    margin-top: 24px;
    height: 32px;
    @include flex(center);

    .download {
      height: 32px;
      border-radius: 16px;
      padding: 0 10px;
      background-color: $green-0;
      @include flex(center);
      color: $grey-0;
      box-shadow: $shadow-0;
      transition: 0.25s;
      margin-right: 20px;

      &:hover {
        box-shadow: $shadow-2;
        background-color: $green-1;
      }

      .download-icon {
        .iconfont {
          font-size: 14px;
        }
      }

      .download-text {
        font-size: 14px;
        margin-left: 5px;
      }
    }

    .collect {
      height: 30px;
      border-radius: $border-radius-1;
      padding: 0 10px;
      @include flex(center);
      color: $grey-7;
      border: 1px solid $grey-7;
      transition: 0.25s;
      margin-right: 10px;

      &:hover {
        color: $grey-2;
        border: 1px solid $grey-8;
        background-color: $grey-8;
      }

      .collect-icon {
        .iconfont {
          font-size: 14px;
        }
      }

      .collect-text {
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }

  .bottom {
    margin-top: 16px;
    height: 20px;
    font-size: 14px;
    color: $grey-7;
    @include flex(center, space-between);

    .bottom-button {
      &:hover {
        color: $grey-9;
      }
    }
  }
}
</style>
