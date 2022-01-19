<!--
 * @Description:文章发布选择
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-16 16:19:53
 * @LastEditors: clq
 * @LastEditTime: 2022-01-17 20:43:33
-->
<template>
  <n-popover
    :width="92"
    trigger="hover"
    :raw="true"
    :offset="10"
    placement="bottom"
    class="user-article-select"
    ref="npopoverRef"
  >

    <el-scrollbar max-height="160px">

      <div
        class="user-article-select-content"
        v-for="(item,index) in sdata"
        :key="index"
        :class="index === selectTag && isActive ? 'user-article-select-content-ok' : ''"
        @click="changeSelect(index)"
        role="button"
      >{{ item.name }}</div>

    </el-scrollbar>

    <template #trigger>
      <div>
        <div
          v-if="category"
          role="button"
          class="user-article-button1"
        >
          <div class="icon1"><i class="iconfont blog-fenlei"></i></div>
          <div
            v-if="correntChoice && isActive"
            class="text1"
          >{{correntChoice}}</div>
          <div
            v-else
            class="text1"
          >选择分类</div>
        </div>

        <div
          v-else
          role="button"
          class="user-article-button2"
        >
          <div class="icon2"><i class="iconfont blog-label"></i></div>
          <div
            v-if="correntChoice  && isActive"
            class="text2"
          >{{correntChoice}}</div>
          <div
            v-else
            class="text2"
          >选择标签</div>
        </div>
      </div>
    </template>
  </n-popover>
</template>

<script>
import { defineComponent, nextTick, ref } from 'vue';
/**
 * @description: 文章发布选择
 * @param {Array} sdata 可供选择的数据 `默认为[]`
 * @param {Boolean} category true 为选择分类 false 为选择标签 `默认为false`
 * @param {Boolean} isActive true 有效 false 失效 `默认为false`
 * @event changeItem 改变选择数据 (item, index) => void
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'userArticleSelect',
  props: {
    sdata: {
      type: Array,
      default: () => [],
    },
    category: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const selectTag = ref(0);
    const npopoverRef = ref(null);
    const correntChoice = ref(''); //当前选择项

    /**
     * @description: 改变select选择数据
     * @param {Number} index 数据下标
     * @return {Void}
     * @author: Z_Y_C
     */

    function changeSelect(index) {
      selectTag.value = index;
      context.emit('changeItem', props.category, props.sdata[index].id);
      nextTick(() => {
        correntChoice.value = props.sdata[index].name;
        // console.log('correntChoice.value' + correntChoice.value);
      });
      npopoverRef.value.setShow(false);
    }

    return {
      selectTag,
      changeSelect,
      npopoverRef,
      correntChoice,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-article-select-content {
  border-radius: $border-radius-1;
  transition: all 0.25s;
  font-size: 14px;
  color: $grey-7;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  @include ellipsis(1);
  width: 72px;
  transition: 0.25s;

  &:hover {
    background-color: $grey-2;
  }
}

.user-article-select-content-ok {
  background-color: $grey-2;
  color: $green-0;
}

.user-article-button1 {
  @include flex(center, initial, row);
  width: 92px;
  transition: 0.25s;

  .icon1 {
    height: 20px;
    line-height: 20px;
    margin-right: 6px;

    .iconfont {
      color: $red-0;
      font-size: 20px;
      transition: 0.25s;

      &:hover {
        color: $pink-0;
        .text1 {
          color: $grey-9;
          @include ellipsis(1);
        }
      }
    }
  }
  .text1 {
    font-size: 14px;
    color: $grey-7;
    @include ellipsis(1);
  }

  &:hover {
    .text1 {
      color: $grey-9;
      @include ellipsis(1);
    }

    .iconfont {
      color: $pink-0;
    }
  }
}

.user-article-button2 {
  @include flex(center, initial, row);
  width: 92px;
  transition: 0.25s;

  .icon2 {
    height: 20px;
    line-height: 20px;
    margin-right: 6px;

    .iconfont {
      color: $orange-0;
      font-size: 20px;
      transition: 0.25s;

      &:hover {
        color: $orange-1;
        .text2 {
          color: $grey-9;
          @include ellipsis(1);
        }
      }
    }
  }

  .text2 {
    font-size: 14px;
    color: $grey-7;
    @include ellipsis(1);
  }

  &:hover {
    .text2 {
      color: $grey-9;
      @include ellipsis(1);
    }

    .iconfont {
      color: $orange-1;
    }
  }
}
</style>

<style lang="scss">
.user-article-select {
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
}
</style>
