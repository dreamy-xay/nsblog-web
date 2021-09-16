<!--
 * @Description: 用户主页收藏记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-16 19:29:37
-->
<template>
  <div
    class="user-collection"
    v-if="collectionData.length"
  >
    <div
      v-for="(item, index) in collectionData"
      :key="index"
      class="user-collection-context"
    >
      <div class="user-collection-context-top">
        <div class="icon1"><i class="iconfont blog-folder_special"></i></div>
        <div class="text1">{{item.name}}</div>
      </div>

      <div class="user-collection-context-bottom">

        <div class="info">
          <div class="first">
            <div class="icon2"><i class="iconfont blog-fontAwesome_file"></i></div>
            <div class="text2">{{item.count+'内容'}}</div>
            <div class="line"></div>
            <div
              v-if="item.collections.length > 0"
              class="center"
              role="button"
              @click="changeOpenFavorites(index)"
            >
              <div class="text2">{{openFavorites[index] ? '收起' : '展开'}}</div>
              <div
                class="icon3"
                :class="openFavorites[index] ? 'rotation' : ''"
              ><i class="iconfont blog-FontAwesomechevroncircledown"></i></div>
            </div>
          </div>
        </div>

        <div class="last">
          <div class="icon4"><i class="iconfont blog-lishijilu-copy"></i></div>
          <div class="time">{{"创建于 "+dateFormat('YY-mm-dd HH:MM', new Date(item.time))}}</div>
        </div>

      </div>
      <div
        class="collection"
        :style="{height: openFavorites[index] ? (82 + 46 * item.collections.length - (loading[index] ? 0 : 38) + 'px') : '6px', opacity: Number(openFavorites[index])}"
      >
        <show-collection
          :data="item.collections"
          :loading="loading[index]"
          @clickLoading="addCollections(index)"
        />
      </div>
    </div>
  </div>

  <user-null
    v-else
    :select="true"
  />
</template>

<script>
import { getFavorites } from '@/network/api/favorites';
import { dateFormat } from '@/util/date';
import { useMessage } from 'naive-ui';
import { defineComponent, reactive } from 'vue';
import { useRoute } from 'vue-router';
import ShowCollection from '@/views/user/childComps/pages/userCollection/childComps/ShowCollection.vue';
import UserNull from '@/views/user/childComps/UserNull.vue';

/**
 * @description: 用户主页收藏记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userCollection',
  components: {
    ShowCollection,
    UserNull,
  },
  setup() {
    const msg = useMessage(); // naive-ui
    const route = useRoute(); // 路由
    const collectionData = reactive([]);
    const loading = reactive([]); // 显示加载按钮
    const username = route.params.username; // 获取路由的username
    const openFavorites = reactive([]);
    const limit = 15; // 拿去数据条数

    // 获取数据
    getFavorites(username, limit, 0, 0, 1)
      .then((data) => {
        collectionData.splice(0, 0, ...data.favorites);
        for (let i = 0; i < data.favorites.length; i++) {
          openFavorites.splice(openFavorites.length, 0, false);
          loading.splice(loading.length, 0, data.favorites[i].collections.length === limit);
        }
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取收藏夹信息失败', { duration: 2000, closable: true });
      });

    /**
     * @description: 展开和关闭按钮状态
     * @param {Number} index 数据在数组中下标
     * @author: Z_Y_C
     */
    function changeOpenFavorites(index) {
      openFavorites[index] = !openFavorites[index];
    }

    /**
     * @description: 加载该收藏夹收藏数据
     * @param {Number} index 收藏夹下标
     * @author: Z_Y_C
     */
    function addCollections(index) {
      getFavorites(username, limit, collectionData[index].collections.length, 0, 0, collectionData[index].id)
        .then((data) => {
          if (data.collections.length < 10) loading[index] = false;
          collectionData[index].collections.splice(collectionData[index].collections.length, 0, ...data.collections);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取收藏信息失败', { duration: 2000, closable: true });
        });
    }

    return {
      collectionData,
      dateFormat,
      openFavorites,
      changeOpenFavorites,
      loading,
      addCollections,
    };
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
    padding-bottom: 0;

    .user-collection-context-top {
      @include flex(center, initial, row);
      margin-bottom: 16px;

      .icon1 {
        line-height: 20px;
        height: 20px;
        margin-right: 8px;

        .iconfont {
          font-size: 16px;
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
      @include flex(center, space-between, row);
      .info {
        .first {
          @include flex(center, initial, row);
          .icon2 {
            line-height: 20px;
            height: 20px;
            margin-right: 8px;

            .iconfont {
              font-size: 16px;
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
              line-height: 20px;
              height: 20px;
              margin-left: 8px;

              .iconfont {
                font-size: 16px;
                color: $grey-7;
              }
            }

            .rotation {
              transform: rotate(180deg);
            }
          }
        }
      }

      .last {
        @include flex(center, initial, row);

        .icon4 {
          line-height: 20px;
          height: 20px;
          margin-right: 8px;

          .iconfont {
            font-size: 16px;
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
      width: calc(100% + 12px);
      margin-left: -6px;
      transition: 0.4s;
      margin-top: 10px;
      overflow: hidden;
    }
  }
}
</style>
