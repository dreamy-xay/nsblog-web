<!--
 * @Description: 用户主页收藏记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-14 21:13:00
-->
<template>
  <div class="user-collection">
    <div
      v-for="(item , index) in collectionData"
      :key=index
      class="user-collection-context"
    >
      <div class="user-collection-context-top">
        <div class="icon1"><i class="iconfont blog-folder_special"></i></div>
        <div class="text1">{{item.name}}</div>
      </div>

      <div class="user-collection-context-bottom">
        <div class="first">
          <div class="icon2"><i class="iconfont blog-fontAwesome_file"></i></div>
          <div class="text2">{{item.count+'内容'}}</div>
          <div class="line"></div>
          <div
            class="center"
            role="button"
            @click="changeOpenFavorites(index)"
          >
            <div class="text2">{{openFavorites[index] ? '收起' : '展开'}}</div>
            <div class="icon3"><i
                class="iconfont blog-FontAwesomechevroncircledown"
                :class="openFavorites[index] ? 'rotation' : ''"
              ></i></div>
          </div>

        </div>
        <div class="last">
          <div class="icon4"><i class="iconfont blog-lishijilu-copy"></i></div>
          <div class="time">{{"创建于 "+dateFormat('YY-mm-dd HH:MM', new Date())}}</div>
        </div>
      </div>
      <div
        class="collection"
        :class="{'collection-down': openFavorites[index]}"
      >
        <show-collection :data="item.collections" />
      </div>
    </div>
  </div>
</template>

<script>
import { getFavorites } from '@/network/api/favorites';
import { dateFormat } from '@/util/date';
import { useMessage } from 'naive-ui';
import { defineComponent, reactive } from 'vue';
import { useRoute } from 'vue-router';
import ShowCollection from '@/views/user/childComps/pages/userCollection/childComps/ShowCollection.vue';

/**
 * @description: 用户主页收藏记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userCollection',
  components: {
    ShowCollection,
  },
  setup() {
    const msg = useMessage(); // naive-ui
    const route = useRoute(); // 路由
    const collectionData = reactive([]);
    const username = route.params.username; // 获取路由的username
    const openFavorites = reactive([]);

    getFavorites(username, 5, 0)
      .then((data) => {
        collectionData.splice(0, 0, ...data.favorites);
        for (let i = 0; i < data.favorites.length; i++) {
          openFavorites.push(false);
        }
        console.log(openFavorites);
        console.log(collectionData);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取关注信息失败', { duration: 2000, closable: true });
      });

    function changeOpenFavorites(index) {
      openFavorites[index] = !openFavorites[index];
    }

    return { collectionData, dateFormat, openFavorites, changeOpenFavorites };
  },
});
</script>

<style lang="scss" scoped>
.user-collection {
  width: 100%;
  @include flex(initial, center, column);

  .user-collection-context {
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    margin-bottom: 16px;
    padding: 16px;

    .user-collection-context-top {
      @include flex(center, initial, row);
      margin-bottom: 16px;

      .icon1 {
        @include flex(center, initial);
        width: 20px;
        height: 20px;
        margin-right: 8px;

        .iconfont {
          font-size: 20px;
          color: $grey-9;
        }
      }

      .text1 {
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        color: $grey-10;
      }
    }

    .user-collection-context-bottom {
      @include flex(center, initial, row);

      .first {
        width: 658px;
        @include flex(center, initial, row);
        .icon2 {
          @include flex(center);
          width: 20px;
          height: 20px;
          margin-right: 8px;

          .iconfont {
            font-size: 20px;
            color: $grey-7;
          }
        }

        .text2 {
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          color: $grey-10;
        }

        .line {
          height: 14px;
          border-left: 1px solid $grey-3;
          margin: 0 16px;
        }

        .center {
          @include flex(center, initial, row);
          .icon3 {
            @include flex(center);
            width: 20px;
            height: 20px;
            margin-left: 8px;

            .iconfont {
              font-size: 19px;
              color: $grey-7;
            }

            .rotation {
              transform: rotate(180deg);
            }
          }
        }
      }

      .last {
        width: 200px;
        @include flex(center, flex-end, row);

        .icon4 {
          @include flex(center);
          width: 20px;
          height: 20px;
          margin-right: 8px;

          .iconfont {
            font-size: 20px;
            color: $grey-7;
          }
        }

        .time {
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          color: $grey-7;
        }
      }
    }
    .collection {
      height: 0;
      transition: 0.4s;
      overflow: hidden;

      &.collection-down {
        height: 100%;
        margin-top: 16px;
      }
    }
  }
}
</style>
