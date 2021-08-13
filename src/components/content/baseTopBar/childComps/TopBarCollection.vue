<!--
 * @Description:basetopbarcollection
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-05 18:50:30
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-13 18:39:07
-->

<template>
  <div class="top-bar-collection">

    <div class="top-bar-collection-content">
      <div class="top-bar-collection-content-left">
        <div class="content-menu">
          <el-scrollbar height="401px">
            <div
              class="menu-content"
              v-for="(item,index) in favorites"
              :key="index"
              :class="{active: index === isActive}"
              @click="chooseClick(index)"
              role="button"
            >
              <div class="collections-menu">
                <div class="left">{{item.name}}</div>
                <div class="right">{{item.count}}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>

      <div class="line"></div>

      <div class="top-bar-collection-content-right">
        <el-scrollbar height="401px">
          <div
            class="blank"
            v-if="List !== undefined && List.length === 0"
          >
            该收藏夹还没有收藏内容哦~
          </div>
          <div
            class="content"
            v-for="(value,index) in List"
            :key=index
          >
            <a
              :href="(value.type === 1 ? '/article' : '/question') + value.id"
              target="_blank"
            >
              <div class="collections-content">
                <base-tag
                  :text="value.type === 1 ? '问答' : '文章'"
                  :color="styles.pink0"
                  :hollow="true"
                  role="button"
                />
                <div
                  class="collectioncontent"
                  role="button"
                > {{value.title}}</div>
              </div>
            </a>
          </div>
        </el-scrollbar>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { getCollections } from '@/network/api/collections';
import BaseTag from '../../baseTag/BaseTag.vue';
import styles from '@/assets/style/define.scss';
import { verifyToken } from '@/network/token';

/**
 * @description:  收藏栏弹窗
 * @author: continue-hs
 */

export default defineComponent({
  name: 'topBarCollection',
  components: {
    BaseTag,
  },
  setup() {
    const isActive = ref(0);
    let favorites = reactive([]);
    let List = reactive([]);
    const username = verifyToken().username;
    /**
     * @description: 获取指定用户所有收藏夹信息
     * @return {void}
     * @author: continue-hs
     */
    getCollections(username, 100000).then((res) => {
      favorites.splice(0, 0, ...res.favorites);
      List.splice(0, 0, ...res.favorites[0].collections);
    });

    /**
     * @description: 改变右侧收藏夹内容
     * @return {void}
     * @author: continue-hs
     */
    function chooseClick(index) {
      List.splice(0, 100000);
      this.isActive = index;
      List.splice(0, 0, ...this.favorites[index].collections);
    }

    return {
      chooseClick,
      styles,
      isActive,
      List,
      favorites,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin font-style($size: 16px, $color: $grey-11) {
  font-size: $size;
  font-weight: 400;
  color: $color;
}

@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.top-bar-collection {
  padding: 7px 0;

  .top-bar-collection-content {
    display: flex;

    .top-bar-collection-content-left {
      @include size(161px, 401px);

      .menu-content {
        @include size(161px, 44px);
        @include font-style();

        &:hover {
          background: $grey-2;
        }

        &.active {
          background: $green-0;
          color: $grey-0;
          transition: all 200;

          .left {
            color: $grey-0;
          }

          .right {
            color: $grey-0;
          }
        }

        .collections-menu {
          display: inline-block;
          position: relative;
          @include size(161px, 44px);
          @include font-style();
          height: 21px;
          line-height: 21px;

          .left {
            top: 12px;
            position: absolute;
            left: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 121px;
          }

          .right {
            top: 12px;
            position: absolute;
            right: 12px;
          }
        }
      }
    }

    .line {
      display: inline-block;
      height: 401px;
      width: 1px;
      background: #e7e7e7;
    }

    .top-bar-collection-content-right {
      @include size(337px, 401px);

      .blank {
        @include font-style();
        display: inline-block;
        position: absolute;
        top: 45%;
        left: 25%;
        line-height: 44px;
        font-family: Arial, Arial-Regular;
        color: $grey-11;
      }

      .content {
        @include size(337px, 44px);
        @include font-style();

        &:hover {
          background: $grey-2;
        }

        .base-tag {
          top: 12px;
          left: 20px;
          position: relative;
        }

        .collections-content {
          display: inline-block;
          position: relative;
          @include size(337px, 44px);
          @include font-style();
          line-height: 21px;

          .collectioncontent {
            position: absolute;
            top: 12px;
            left: 67px;
            height: 21px;
            line-height: 21px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 248px;
          }
        }
      }
    }
  }
}
</style>
