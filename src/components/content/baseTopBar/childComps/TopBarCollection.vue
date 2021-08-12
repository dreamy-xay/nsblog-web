<!--
 * @Description:basetopbarcollection
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-05 18:50:30
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-12 20:30:04
-->

<template>
  <div class="top-bar-collection">
    <div class="top-bar-collection-content">
      <div class="top-bar-collection-content-left">
        <div class="content-menu">
          <el-scrollbar height="401px">
            <ul>
              <li
                class="menu-content"
                v-for="(item,index) in favorites"
                :key="index"
                :class="{active: index === isActive}"
                @click="chooseClick(index)"
                role="button"
              >
                <div class="collections-menu">
                  <span class="left">{{item.name}}</span>
                  <span class="right">{{item.count}}</span>
                </div>
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>

      <div class="top-bar-collection-content-right">
        <el-scrollbar height="401px">
          <div
            class="blank"
            v-if="List !== undefined && List.length === 0"
          >
            该收藏夹还没有收藏内容哦~
          </div>
          <ul>
            <li
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
                  <span
                    class="collectioncontent"
                    role="button"
                  > {{value.title}}</span>
                </div>
              </a>
            </li>
          </ul>
        </el-scrollbar>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { getCollections } from '@/network/api/collections';
import BaseTag from '../../baseTag/BaseTag.vue';
import styles from '@/assets/style/define.scss';
import { verifyToken } from '@/network/token';
import { useRouter } from 'vue-router';

/**
 * @description:  收藏栏弹窗
 * @author: continue-hs
 */

export default defineComponent({
  name: 'topBarCollection',
  components: { BaseTag },
  setup() {
    const title = ref('收藏');
    const isActive = ref(0);
    let favorites = ref();
    let List = ref();
    const router = useRouter();
    const isLogin = ref(verifyToken().status);
    const username = ref(verifyToken().username);

    /**
     * @description: 获取指定用户所有收藏夹信息
     * @return {void}
     * @author: continue-hs
     */
    if (isLogin.value) {
      getCollections(username.value).then((res) => {
        console.log(res);
        favorites.value = res.favorites;
        List.value = res.favorites[0].collections;
      });
    }

    /**
     * @description: 点击跳转路由(已登录跳至消息页面，否则跳登录页面)
     * @return {void}
     * @author: continue-hs
     */
    function onclick() {
      if (!isLogin.value) router.push('/login/Signin');
      else router.push('/collections');
    }

    /**
     * @description: 改变右侧收藏夹内容
     * @return {void}
     * @author: continue-hs
     */
    function chooseClick(index) {
      List.value = [];
      this.isActive = index;
      List.value = this.favorites[index].collections;
    }

    return {
      username,
      title,
      onclick,
      chooseClick,
      styles,
      isActive,
      List,
      isLogin,
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

.top-bar-collection-header {
  &:hover {
    color: $green-0;
  }
}

.top-bar-collection-content {
  display: flex;

  .top-bar-collection-content-left {
    @include size(161px, 401px);

    ul li {
      @include size(161px, 44px);
      @include font-style();

      &.active {
        background: #85e8c7;
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

    ul li {
      @include size(337px, 44px);
      @include font-style();

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

.menu-content {
  @include size(161px, 44px);
  &:hover {
    background: $grey-2;
  }
}
</style>
