<!--
 * @Description:展示收藏夹
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-14 18:01:22
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-17 18:18:28
-->

<template>
  <div class="show-collection">
    <div
      v-for="(item , index) in data"
      :key="index"
      class="show-collection-context"
    >
      <div class="first">
        <base-tag
          :hollow="true"
          :color="styles.pink0"
          :size="22"
          :text="item.type === 1 ?'文章' : ( item.type === 2 ? '问答' : '资源')  "
          :style="{borderRadius: '11px'}"
        />
        <div
          class="text"
          role="button"
        > <a
            class="link"
            :href="(item.type === 1 ?'/article/' : ( item.type === 2 ? '/question/' : '/resource/')) + item.content_id"
            :target="(item.type === 1 ?'/article/' : ( item.type === 2 ? '/question/' : '/resource/')) + item.content_id"
          >{{item.title}}</a> </div>
      </div>

      <div class="icon"><i class="iconfont blog-fav"></i></div>
    </div>
    <div
      v-if="loading"
      role="button"
      class="show-collection-button"
      @click="addCollections"
    >点击加载</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 展示收藏夹
 * @param {Array} data 收藏夹收藏数据
 * @param {Boolean} loading 加载按钮状态
 * @event addCollections 点击按钮加载收藏夹数据
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'showCollection',
  components: { BaseTag },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    /**
     * @description: 发送事件给父组件加载收藏夹数据
     * @author: Z_Y_C
     */
    function addCollections() {
      context.emit('clickLoading');
    }
    return { styles, addCollections };
  },
});
</script>

<style lang="scss" scoped>
.show-collection {
  width: 826px;
  margin: 6px;
  margin-bottom: 16px;
  background-color: $grey-1;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  padding: 16px;
  @include flex(center, center, column);

  .show-collection-context {
    @include flex(center, initial, row);
    height: 36px;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    .first {
      @include flex(center, initial, row);
      width: 798px;

      .text {
        margin-left: 12px;
        width: 732px;
        margin-right: 16px;

        .link {
          display: block;
          @include ellipsis(1);
          font-size: 16px;
          height: 36px;
          line-height: 36px;
          color: $grey-11;
          transition: all 0.25s;

          &:hover {
            color: $pink-0;
          }
        }
      }
    }

    .icon {
      height: 22px;
      width: 22px;
      color: $orange-0;

      .iconfont {
        font-size: 22px;
      }
    }
  }

  .show-collection-button {
    @include flex(center, center);
    height: 28px;
    width: 100px;
    background-color: $grey-1;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    font-size: 14px;
    color: $grey-9;
    transition: 0.25s;

    &:hover {
      color: $grey-10;
      background-color: $grey-3;
    }
  }
}
</style>
