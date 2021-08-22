<!--
 * @Description:basetopbarcollection
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-05 18:50:30
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-22 17:10:33
-->

<template>
  <div class="top-bar-collection">
    <div class="top-bar-collection-left">
      <div class="content-menu">
        <el-scrollbar height="401px">
          <div
            class="menu-content"
            v-for="(item, index) in favorites"
            :key="index"
            :class="{active: index === activeIndex}"
            @click="chooseClick(index)"
            role="button"
          >
            <div class="collections-menu">
              <div class="left">{{item.name}}</div>
              <div class="right">{{item.count > 99 ? '99+' : item.count}}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="top-bar-collection-line"></div>
    <div class="top-bar-collection-right">
      <el-scrollbar ref="scrollbarRef">
        <div
          class="blank"
          v-if="List !== undefined && List.length === 0"
        >
          该收藏夹还没有收藏内容哦~
        </div>
        <div
          class="content"
          v-for="(value, index) in List"
          :key="index"
        >
          <a
            :href="(value.type === 1 ? '/article' : '/question') + value.id"
            :target="(value.type === 1 ? '/article' : '/question') + value.id"
          >
            <div class="collections-content">
              <base-tag
                :text="value.type === 1 ? '文章' : (value.type === 2 ? '问答' : '资源')"
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
        <div
          class="bottom"
          role="button"
          v-show="favorites.length && List.length !== favorites[activeIndex].count"
        >
          <a href="/userCenter/collection">查看全部</a>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed } from 'vue';
import { getFavorites } from '@/network/api/favorites';
import BaseTag from '../../baseTag/BaseTag.vue';
import styles from '@/assets/style/define.scss';
import { mapState } from '@/util/store';

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
    const scrollbarRef = ref(null); // scrollbar ref
    const activeIndex = ref(0);
    let favorites = reactive([]);
    let List = computed(() => {
      if (favorites.length) return favorites[activeIndex.value].collections;
      else return [];
    });
    const { tokenInfo } = mapState('global', ['tokenInfo']);

    /**
     * @description: 获取指定用户所有收藏夹信息
     * @return {void}
     * @author: continue-hs
     */
    if (tokenInfo.value.status)
      getFavorites(tokenInfo.value.username)
        .then((res) => {
          favorites.splice(0, 0, ...res.favorites);
        })
        .catch((error) => {
          console.log(error);
        });

    /**
     * @description: 改变右侧收藏夹内容
     * @return {void}
     * @author: continue-hs
     */
    function chooseClick(index) {
      activeIndex.value = index;
      scrollbarRef.value.setScrollTop(0); // 滚动条重新置位
    }

    return {
      chooseClick,
      styles,
      activeIndex,
      List,
      favorites,
      scrollbarRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin font-style($size: 16px, $color: $grey-10) {
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .top-bar-collection-left {
    @include size(161px, 401px);
    margin-right: 1px;

    .menu-content {
      @include size(161px, 44px);
      @include font-style();
      transition: 0.25s;

      &:hover {
        background: $grey-2;
      }

      .collections-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include size(134px, 44px);
        @include font-style();
        padding: 0 12px 0 15px;

        .left {
          width: 100px;
          @include ellipsis(1);
        }

        .right {
          color: $grey-7;
        }
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
    }
  }

  .top-bar-collection-line {
    height: 415px;
    top: 0;
    left: 161px;
    position: absolute;
    width: 1px;
    background: $grey-4;
  }

  .top-bar-collection-right {
    @include size(337px, 401px);

    .blank {
      @include font-style();
      display: inline-block;
      position: absolute;
      top: 45%;
      left: 25%;
      line-height: 44px;
      color: $grey-11;
    }

    .content {
      @include size(337px, 44px);
      @include font-style();
      transition: 0.25s;

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
          @include ellipsis(1);
          width: 248px;
        }
      }
    }

    .bottom {
      width: 100%;
      height: 30px;
      margin-top: 7px;
      @include flex(center, center);

      a {
        @include flex(center, center);
        height: 100%;
        width: 50%;
        border-radius: $border-radius-1;
        background-color: $grey-3;
        color: $grey-9;
        font-size: 14px;
        transition: 0.25s;

        &:hover {
          background-color: $grey-4;
          color: $grey-11;
        }
      }
    }
  }
}
</style>
