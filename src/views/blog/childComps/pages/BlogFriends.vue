<!--
 * @Description: 博客全部友链页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-24 18:26:04
 * @LastEditors: xiao
 * @LastEditTime: 2022-02-14 14:27:23
-->
<template>
  <div class="blog-friends">
    <div class="blog-friends-head">
      <div class="left-icon">
        <i class="iconfont blog-shuye1"></i>
      </div>
      <div class="blog-friends-content">小伙伴们</div>
    </div>
    <div class="blog-friends-body">
      <div
        class="link-item"
        v-for="(friendChain,index) in friendChains"
        :key="index"
      >
        <a
          :href="friendChain.link"
          class="link"
        >
          <div class="back"></div>
          <img
            src="../../../../../public/blog/none.jpg"
            class="img"
          >
          <div class="name">{{friendChain.title}}</div>
          <hr class="hr" />
          <div class="describe">{{friendChain.describe}}</div>
        </a>
      </div>
    </div>
  </div>

</template>

<script>
import { defineComponent, reactive } from 'vue';
import { getChains } from '@/network/api/chains';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';

/**
 * @description: 博客全部友链页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'blogFriends',
  setup() {
    const friendChains = reactive([]);
    const msg = useMessage(); // naive-ui
    const route = useRoute(); // route
    const username = route.params.username; // 获取博客用户名
    const limit = 999999; //限制获取友链的数量

    //获取友链信息
    getChains(username, limit, 0)
      .then((data) => {
        friendChains.splice(0, 0, ...data.chains);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取友链信息失败');
      });

    return {
      friendChains,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-friends {
  @include flex(center, flex-start, column);
  width: 100%;

  .blog-friends-head {
    margin-top: 31px;
    width: 800px;
    height: 80px;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    box-shadow: $shadow-0;
    @include flex(center, center, row);

    .left-icon {
      height: 100%;
      margin-right: 16px;
      @include flex(center);

      .iconfont {
        font-size: 35px;
        color: $grey-8;
      }
    }

    .blog-friends-content {
      font-size: 32px;
      font-weight: bold;
      color: $grey-8;
    }
  }

  .blog-friends-body {
    @include flex(first-start, first-start);
    align-content: flex-start;
    flex-wrap: wrap;
    margin: 16px 16px;
    width: 784px;
    height: auto !important;
    height: 828px;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0; //阴影
    padding-left: 16px;
    padding-top: 16px;
    background-color: $grey-0;
    transition: 0.25;

    .link-item {
      width: 183px;
      height: 80px;
      border: 1px solid $grey-3;
      transition: 0.25s;
      border-radius: $border-radius-0;
      overflow: hidden;
      padding: 10px 30px;
      margin-bottom: 16px;
      margin-right: 16px;

      &:hover {
        border: 1px solid $green-1;
      }

      .back {
        animation: last 1.5s ease;

        @keyframes last {
          from {
            transform: translate(700px, -300px) rotate(45deg);
          }
          to {
            transform: translate(0px, 100px) rotate(45deg);
          }
        }
      }

      &:hover {
        .back {
          animation: first 1.5s ease;
          animation-fill-mode: forwards;

          @keyframes first {
            from {
              transform: translate(0px, 100px) rotate(45deg);
            }
            to {
              transform: translate(700px, -300px) rotate(45deg);
            }
          }
        }
      }

      .img {
        animation: imgFirst 1.5s ease;

        @keyframes imgFirst {
          from {
            transform: rotate(359deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      }

      &:hover img {
        animation: imgLast 1.5s ease;
        animation-fill-mode: forwards;

        @keyframes imgLast {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(359deg);
          }
        }
      }
      .link {
        position: relative;

        .back {
          width: 500px;
          height: 500px;
          background: rgba(133, 232, 199, 0.16);
          position: absolute;
          top: 100px;
          left: -700px;
        }

        .img {
          float: right;
          background: rgba(0, 0, 0, 0);
          border: 1px solid $grey-3;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-top: 10px;
        }

        .name {
          @include ellipsis(1);
          height: 20px;
          font-size: 15px;
          color: $green-1;
          margin-bottom: 6px;
          margin-top: 10px;
        }

        .hr {
          width: 125px;
          height: 1px;
          border: none;
          border-top: 1px dashed $grey-6;
          margin-bottom: 10px;
        }

        .describe {
          height: 32px;
          font-size: 13px;
          color: $grey-7;
          @include ellipsis(2);
        }
      }
    }
  }
}
</style>
