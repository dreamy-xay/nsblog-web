<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-05 21:23:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-13 16:57:54
-->

<template>
  <div class=top-bar-message>
    <div
      class=top-bar-message-menu
      v-for="(item, index) in menuList"
      :key="index"
    >
      <a v-prefix
        :href="item.url"
        class="content"
        role="button"
      >
        <div>
          <div>
            <i :class="item.icon"></i>
          </div>
          {{item.title}}
        </div>
        <div class="badge">
          <n-badge
            :value="countList[index]"
            :max="99"
            :color="styles.pink0"
            v-if="countList[index] > 0"
          />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import styles from '@/assets/style/define.scss';
import { getMessages } from '@/network/api/messages';

/**
 * @description:  消息栏弹窗
 * @author: continue-hs
 */

export default defineComponent({
  name: 'topBarMessage',
  setup() {
    // 菜单
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

    // 消息记录数量统计
    const countList = reactive([0, 0, 0, 0, 0, 0]);
    // 获取数量信息
    getMessages()
      .then((data) => {
        countList.splice(0, 5, data.count[0]);
        countList.splice(0, 0, ...data.count.slice(1, 4));
        countList.splice(4, 0, data.count[4]);
      })
      .catch((error) => {
        console.log(error);
      });

    return {
      styles,
      menuList,
      countList,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

@mixin flex() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-bar-message {
  @include size(172px, 234px);
  padding: 7px 0;
  @include flex();
  flex-direction: column;

  .top-bar-message-menu {
    @include size(100%, 40px);

    .content {
      @include size(calc(100% - 40px), 100%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      color: $grey-11;
      transition: 0.25s;
      letter-spacing: 1px;

      & > div {
        height: 100%;
        @include flex();

        div {
          height: 20px;
          width: 20px;
          @include flex();

          .iconfont {
            font-size: 20px;
            color: $grey-11;
            margin-right: 12px;
            transition: 0.25s;
          }
        }
      }

      &:hover {
        color: $green-0;
        background-color: $grey-2;

        .iconfont {
          color: $green-0;
        }
      }
    }
  }
}
</style>
