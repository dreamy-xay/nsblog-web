<!--
 * @Description: 收藏夹页面
 * @Version:
 * @Autor: xiao
 * @Date: 2021-09-27 17:17:24
 * @LastEditors: xiao
 * @LastEditTime: 2022-02-11 23:44:14
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
          @click="addCollection()"
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
import { addCollections } from '@/network/api/favorites';
import { mapState } from '@/util/store';

/**
 * @description: 收藏夹界面
 * @param {Boolean} isShow 是否显示收藏夹界面 `默认为false`
 * @param {number | string} type 收藏的类型1为文章、2为问答、3为资源 `必传参数`
 * @param {number | string} cid 要收藏的内容的id `必传参数`
 * @event addCollection 添加收藏成功 (id: string) => void
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
    type: {
      type: String,
      default: '',
    },
    cid: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui 组件
    const favorites = reactive([]); // 收藏夹数据
    const id = ref(null); // 收藏夹id
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const username = tokenInfo.value.username; // 登录用户名

    // 获取收藏夹数据
    getFavorites(username, 0)
      .then((data) => {
        console.log(data);
        favorites.splice(0, 0, ...data.favorites);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取收藏夹数据失败', { duration: 2000, closable: true });
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
      console.log('id.value', id.value);
    }

    /**
     * @description: 添加收藏
     * @return {Void}
     * @author: xiao
     */
    function addCollection() {
      if (id.value != null) {
        addCollections(props.type, props.cid, id.value)
          .then((data) => {
            msg.success(`收藏成功`);
            context.emit('addCollection', data.id);
          })
          .catch((err) => {
            console.log(err);
            msg.error(`收藏失败`, { duration: 2000, closable: true });
          });
      }
      context.emit('update:isShow', false);
    }

    /**
     * @description: 新建一个收藏夹
     * @param {String} e 收藏夹名称
     * @param {String} id 收藏夹名称
     * @return {Void}
     * @author: xiao
     */
    function newFavorite(e, id) {
      let f = 1;
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].name == e) f = 0;
      }
      if (f) {
        favorites.splice(favorites.length, 0, {
          collections: [],
          favorite_id: id,
          name: e,
          count: 0,
          is_private: false,
        });
      } else {
        msg.error('不能重名', { duration: 2000, closable: true });
      }
    }

    return {
      favorites,
      close,
      id,
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
