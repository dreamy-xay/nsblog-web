<!--
 * @Description:展示收藏夹
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-14 18:01:22
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-14 20:58:55
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
            :href="`/article/${item.content_id}`"
            :target="`/article/${item.content_id}`"
          >{{item.title}}</a> </div>
      </div>

      <div class="icon"><i class="iconfont blog-fav"></i></div>
    </div>
    <div
      role="button"
      class="show-collection-button"
    >点击加载</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import styles from '@/assets/style/define.scss';

export default defineComponent({
  name: 'showCollection',
  components: { BaseTag },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return { styles };
  },
});
</script>

<style lang="scss" scoped>
.show-collection {
  width: 826px;
  background-color: $grey-1;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  padding: 24px 16px 16px 16px;
  @include flex(center, center, column);

  .show-collection-context {
    @include flex(center, initial, row);
    height: 22px;
    margin-bottom: 24px;

    .first {
      @include flex(center, initial, row);
      width: 798px;

      .text {
        margin-left: 12px;

        .link {
          @include ellipsis(1);
          font-size: 16px;
          height: 22px;
          line-height: 22px;
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
  }
}
</style>
