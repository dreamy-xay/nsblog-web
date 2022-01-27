<!--
 * @Description: 收藏夹列表
 * @Version:
 * @Autor: xiao
 * @Date: 2021-09-27 18:00:46
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-24 17:21:42
-->
<template>
  <div class="base-favorite-list">
    <div
      v-for="(favorite, index) in favorites"
      :key="index"
      @click="select(favorite, index)"
      role="button"
      class="base-favorite-list-item"
      :class="{'base-favorite-list-item-active': index === activeIndex}"
    >
      <div class="left">
        <div class="left-icon">
          <i
            class="iconfont"
            :class="favorite.is_private ? 'blog-a-shangsuowenjianjiatuozhan_caidan' : 'blog-icon-folder'"
          ></i>
        </div>
        <div class="name">{{favorite.name}}</div>
      </div>
      <div class="right">{{favorite.count}}</div>
    </div>
    <div
      class="base-favorite-list-button"
      role="button"
      v-show="isEdit"
      @click="inputFavorite"
    >
      <div class="left-icon">
        <i class="iconfont blog-daochu1024-29"></i>
      </div>
      <div class="name">新建收藏夹</div>
    </div>
    <div
      class="base-favorite-list-add"
      v-show="!isEdit"
    >
      <input
        type="text"
        ref="finput"
        class="base-favorite-list-input"
        placeholder="最多可输入20个字"
        v-model="favoriteName"
        @blur="handleBlur"
        style="padding-left:15px"
        maxlength="20"
      >
      <div
        class="button"
        role="button"
        @click="newFavorite"
      >
        <div class="text">新建</div>
      </div>
    </div>

  </div>
</template>

<script>
import { newFavorites } from '@/network/api/favorites';
import { ref, defineComponent, nextTick } from 'vue';
import { useMessage } from 'naive-ui';

/**
 * @description: 收藏夹列表
 * @param {Array} favorites 全部收藏夹信息
 * @author: xiao
 */

export default defineComponent({
  name: 'baseFavoriteList',
  props: {
    favorites: {
      type: Array,
      default: undefined,
    },
  },
  setup(props, context) {
    const isEdit = ref(true); // 是否被编辑
    const finput = ref(null); // 聚焦
    const favoriteName = ref(null); // 文件夹名
    const activeIndex = ref(-1); // 切换样式
    const msg = useMessage(); // naive-ui 组件

    /**
     * @description: 点击切换为输入框并聚焦
     * @return {Void}
     * @author: xiao
     */
    function inputFavorite() {
      isEdit.value = !isEdit.value;
      nextTick(() => {
        finput.value.focus();
      });
    }

    /**
     * @description: 失焦切换
     * @return {Void}
     * @author: xiao
     */
    function handleBlur() {
      setTimeout(() => {
        isEdit.value = !isEdit.value;
        favoriteName.value = null;
      }, 200);
    }

    /**
     * @description: 点击一个收藏夹
     * @param {Arrys} favorite 收藏夹数据
     * @param {Number} index 数据下标
     * @return {Void}
     * @author: xiao
     */
    function select(favorite, index) {
      context.emit('childFavorite', favorite.favorite_id);
      activeIndex.value = index;
    }

    /**
     * @description: 新建一个收藏夹
     * @return {Void}
     * @author: xiao
     */
    function newFavorite() {
      if (favoriteName.value != null) favoriteName.value = favoriteName.value.replace(/(^\s*)|(\s*$)/g, ''); //去除字符串前后的空格
      if (favoriteName.value === null || favoriteName.value == '') {
        msg.error('不能为空', { duration: 2000, closable: true });
      } else {
        context.emit('newFavorite', favoriteName.value);
        activeIndex.value = props.favorites.length - 1;
        newFavorites(favoriteName.value)
          .then(() => {
            console.log('创建成功');
          })
          .catch((error) => {
            console.log(error);
            msg.error('创建收藏夹失败', { duration: 2000, closable: true });
          });
      }
    }

    return {
      isEdit,
      newFavorite,
      handleBlur,
      finput,
      select,
      inputFavorite,
      favoriteName,
      activeIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-favorite-list {
  @include flex(center, initial, column);
  padding: 10px 24px;
  width: 372px;

  & > div {
    margin-top: 10px;

    &:first-child {
      margin-top: 0;
    }
  }

  .base-favorite-list-item {
    @include flex(center, space-between);
    width: 100%;
    height: 38px;
    background: $grey-0;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;
    transition: 0.25s;

    &:hover {
      background-color: $grey-2;
    }

    .left {
      height: 100%;
      margin-left: 16px;
      @include flex(center);

      .name {
        font-size: 14px;
        color: $grey-7;
        @include ellipsis(1);
        width: 200px;
        height: 100%;
        @include flex(center);
      }

      .left-icon {
        margin-right: 16px;
        height: 100%;
        width: 14px;
        @include flex(center, center);
        color: $grey-7;
      }
    }

    .right {
      margin-right: 16px;
      height: 100%;
      @include flex(center);
      font-size: 12px;
      color: $grey-7;
    }

    &.base-favorite-list-item-active {
      box-shadow: $shadow-2;
    }
  }

  .base-favorite-list-button {
    @include flex(center, initial);
    width: 100%;
    height: 36px;
    background: $grey-0;
    border: 1px solid $grey-7;
    border-radius: 8px;
    //margin-bottom: 14px;

    .left-icon {
      margin: 0 16px;
      color: $grey-7;
    }

    .name {
      font-size: 14px;
      color: $grey-7;
      @include ellipsis(1);
      width: 200px;
      height: 100%;
      @include flex(center);
    }

    &:hover {
      border-color: $green-1;
    }
  }

  .base-favorite-list-add {
    @include flex(center, space-between);
    width: calc(100% - 2px);
    height: 36px;
    border-radius: $border-radius-0;
    border: 1px solid $green-1;
    overflow: hidden;
    box-shadow: $shadow-0;
    transition: 0.25s;

    &:hover,
    &:focus-within {
      box-shadow: $shadow-2;
    }

    .base-favorite-list-input {
      width: calc(100% - 90px);
      height: 100%;
      padding: 6px 8px;
      background: $grey-0;
      border: 0;
      outline: none;
    }

    .button {
      @include flex(center, center);
      height: 100%;
      width: 89px;
      border-left: 1px solid $green-1;
      background-color: $green-0;

      &:hover {
        background-color: $green-1;
      }

      .text {
        color: $green-2;
        @include ellipsis(1);
      }
    }
  }
}
</style>
