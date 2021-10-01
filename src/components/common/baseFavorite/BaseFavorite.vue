<!--
 * @Description: 收藏夹页面
 * @Version:
 * @Autor: xiao
 * @Date: 2021-09-27 17:17:24
 * @LastEditors: xiao
 * @LastEditTime: 2021-10-01 15:25:53
-->
<template>
  <n-modal
    display-directive="show"
    :show="isShow"
  >
    <div class="base-favorite">
      <div class="base-favorite-top">
        <div class="top-text">添加到收藏夹</div>
        <div
          class="top-icon"
          role="button"
          @click="close"
        ><i class="iconfont blog-close"></i></div>
      </div>

      <div>
        <el-scrollbar height="300px">
          <base-favorite-list
            :favorites="favorites"
            @newFavorite="newFavorite"
            @childFavorite="childFavorite"
          ></base-favorite-list>
        </el-scrollbar>
      </div>

      <div class="base-favorite-bottom">
        <div
          class="bottom-button"
          role="button"
          @click="addCollection"
        >
          <div class="buttom-button-text">确定</div>
        </div>
      </div>
    </div>
  </n-modal>

</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseFavoriteList from '@/components/common/baseFavorite/childComps/BaseFavoriteList.vue';
import { getFavorites } from '@/network/api/favorites';
import { useMessage } from 'naive-ui';

/**
 * @description: 收藏夹界面
 * @param {Boolean} isShow 是否显示收藏夹界面 `默认为false`
 * @event closeFavorite 关闭收藏夹界面事件
 * @author: xiao
 */

export default defineComponent({
  name: 'baseFavorite',
  components: { BaseFavoriteList },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(params, context) {
    const msg = useMessage(); // naive-ui 组件
    const favorites = reactive([]); // 收藏夹数据
    const id = ref(null);

    // 获取收藏夹数据
    getFavorites('dreamy', 0)
      .then((data) => {
        console.log(data);
        favorites.splice(0, 0, ...data.favorites);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取登录日志失败', { duration: 2000, closable: true });
      });

    /**
     * @description: 点击关闭触发函数
     * @author: xiao
     */
    function close() {
      context.emit('update:isShow', false);
    }

    /**
     * @description: 获取被点击的收藏夹id
     * @param {String} e 被点击的收藏夹id
     * @return {Void}
     * @author: xiao
     */
    function childFavorite(e) {
      id.value = e;
    }

    /**
     * @description: 收藏数量加一
     * @return {Void}
     * @author: xiao
     */
    function addCollection() {
      let d = 0;
      favorites.some((item, i) => {
        d = i;
        return item.id === id.value;
      });
      favorites[d].count++;
    }

    /**
     * @description: 新建一个收藏夹
     * @param {String} e 收藏夹名称
     * @return {Void}
     * @author: xiao
     */
    function newFavorite(e) {
      let f = 1;
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].name == e) f = 0;
      }
      if (f) {
        favorites.splice(favorites.length, 0, { collections: [], id: '123', name: e, count: 0, is_private: false });
      } else {
        msg.error('不能重名', { duration: 2000, closable: true });
      }
    }

    return {
      favorites,
      close,
      addCollection,
      childFavorite,
      newFavorite,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-favorite {
  background: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  padding: 16px 0;

  .base-favorite-top {
    @include flex(center, center);
    background-color: $grey-0;
    position: relative;
    padding-bottom: 16px;
    border-bottom: 1px solid $grey-2;

    .top-text {
      font-size: 16px;
      font-weight: 700;
      color: $grey-10;
    }

    .top-icon {
      color: $grey-7;
      position: absolute;
      right: 24px;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
      }
    }
  }

  .base-favorite-bottom {
    @include flex(center, center);
    padding-top: 16px;
    background-color: $grey-0;
    border-top: 1px solid $grey-2;

    .bottom-button {
      @include flex(center, center);
      width: 100px;
      height: 32px;
      background-color: $green-0;
      border-radius: $border-radius-0; //圆角
      box-shadow: $shadow-0;

      &:hover {
        background-color: $green-1;
        box-shadow: $shadow-2;
      }

      .buttom-button-text {
        height: 19px;
        font-size: 14px;
        font-weight: 700;
        text-align: left;
        color: $grey-0;
        line-height: 19px;
      }
    }
  }
}
</style>
