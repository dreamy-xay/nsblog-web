<!--
 * @Description:展示收藏夹
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-14 18:01:22
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-14 19:45:44
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
        >{{item.title}}</div>
      </div>

      <div class="icon"><i class="iconfont blog-fav"></i></div>
    </div>
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
  width: 818px;
  background-color: $grey-1;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  padding: 24px 16px 16px 16px;
  @include flex(initial, center, column);

  .show-collection-context {
    @include flex(center, initial, row);
    height: 22px;
    margin-bottom: 24px;

    .first {
      @include flex(center, initial, row);
      width: 798px;

      .text {
        @include ellipsis(1);
        font-size: 16px;
        height: 22px;
        line-height: 22px;
        color: $grey-11;
        margin-left: 12px;
        transition: all 0.25s;

        &:hover {
          color: $pink-0;
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
}
</style>
