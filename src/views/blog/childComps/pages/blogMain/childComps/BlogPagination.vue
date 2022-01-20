<!--
 * @Description:分页组件
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-12 16:07:55
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-18 20:12:20
-->
<template>
  <div class="blog-pagination">
    <div
      class="left blog-pagination-left"
      :class="leftButton ? 'enable':'disable'"
      role="button"
      @click="upPage"
    >
      <i class="iconfont blog-arrow-down"></i>
    </div>

    <div
      class="blog-pagination-center"
      v-for="item in pageShow"
      :key="item"
      :class="page==item ? 'select':''"
      @click="selectPage(item)"
      role="button"
    >
      {{item}}
    </div>

    <div
      class="blog-pagination-right"
      :class="rightButton ? 'enable':'disable'"
      role="button"
      @click="nextPage"
    >
      <i class="iconfont blog-arrow-down"></i>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

/**
 * @description:分页组件
 * @param {Number} page 当前所在页数 `默认为1`
 * @param {Number} pageCount 总页数 `默认为3`
 * @event changePage 换页 {page:页数}
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'blogPagination',
  props: {
    page: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
      default: 3,
    },
  },
  setup(props, context) {
    const pageShow = ref([]); // 显示的页数
    const leftButton = ref(false); // 左按钮可用
    const rightButton = ref(true); // 右按钮可用

    if (props.page != 1) leftButton.value = true;

    if (props.page == props.pageCount) rightButton.value = false;

    // 初始显示页数
    if (props.pageCount <= 3) {
      for (let i = 1; i <= props.pageCount; i++) {
        pageShow.value.splice(pageShow.value.length, 0, i);
      }
    } else {
      if (props.page === 1)
        for (let i = 1; i <= 3; i++) {
          pageShow.value.splice(pageShow.value.length, 0, i);
        }
      else {
        pageShow.value.splice(0, 0, props.page);
        if (props.pageCount !== props.page) {
          pageShow.value.splice(0, 0, props.page - 1);
          pageShow.value.splice(pageShow.value.length, 0, props.page + 1);
        } else {
          pageShow.value.splice(0, 0, props.page - 1);
          pageShow.value.splice(0, 0, props.page - 2);
        }
      }
    }

    /**
     * @description: 点击上一页
     * @return {void}
     * @author: Z_Y_C
     */
    function upPage() {
      if (props.page !== 1) {
        rightButton.value = true;
        if (props.page - 1 == 1) leftButton.value = false;
        context.emit('changePage', { page: props.page - 1 });
        if (pageShow.value[0] !== 1) {
          if (pageShow.value[1] === props.page) {
            pageShow.value.splice(2, 1);
            pageShow.value.splice(0, 0, pageShow.value[0] - 1);
          }
        }
      } else {
        leftButton.value = false;
      }
    }

    /**
     * @description: 点击下一页
     * @return {void}
     * @author: Z_Y_C
     */
    function nextPage() {
      if (props.page !== props.pageCount) {
        leftButton.value = true;
        if (props.page + 1 == props.pageCount) rightButton.value = false;

        //还未到最后一页
        context.emit('changePage', { page: props.page + 1 });
        if (pageShow.value[pageShow.value.length - 1] !== props.pageCount) {
          if (pageShow.value[1] === props.page) {
            pageShow.value.splice(0, 1);
            pageShow.value.splice(pageShow.value.length, 0, pageShow.value[pageShow.value.length - 1] + 1);
          }
        }
      } else {
        rightButton.value = false;
      }
    }

    /**
     * @description: 直接点击页面
     * @param {Number} page 点击显示多少页
     * @return {void}
     * @author: Z_Y_C
     */
    function selectPage(page) {
      if (page !== props.page) {
        if (page > props.page) {
          leftButton.value = true;
          context.emit('changePage', { page: page });
          if (page !== props.pageCount) {
            if (pageShow.value[1] !== page) {
              pageShow.value.splice(0, 1);
              pageShow.value.splice(pageShow.value.length, 0, pageShow.value[pageShow.value.length - 1] + 1);
            }
          } else {
            rightButton.value = false;
            leftButton.value = true;
          }
        } else {
          rightButton.value = true;
          context.emit('changePage', { page: page });
          if (page !== 1) {
            if (pageShow.value[1] !== page) {
              pageShow.value.splice(2, 1);
              pageShow.value.splice(0, 0, pageShow.value[0] - 1);
            }
          } else {
            rightButton.value = true;
            leftButton.value = false;
          }
        }
      }
    }

    return {
      pageShow,
      leftButton,
      rightButton,
      upPage,
      nextPage,
      selectPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-pagination {
  @include flex(center, center);
  margin-bottom: 20px;
  height: 30px;

  .blog-pagination-left {
    height: 30px;
    width: 30px;
    line-height: 30px;
    @include flex(center, center);
    color: $grey-11;
    transform: rotate(90deg);
    margin-right: 10px;
    border-radius: 15px;

    .iconfont {
      font-size: 15px;
    }
  }

  .blog-pagination-center {
    @include flex(center, center);
    margin: 0px 5px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    transition: 0.5s;

    &:hover {
      background-color: $green-0;
      color: $grey-0;
    }
  }

  .select {
    background-color: $green-0;
    color: $grey-0;
  }

  .blog-pagination-right {
    height: 30px;
    width: 30px;
    line-height: 30px;

    @include flex(center, center);
    color: $grey-11;
    transform: rotate(-90deg);
    margin-left: 10px;
    border-radius: 15px;

    .iconfont {
      font-size: 15px;
    }
  }

  .enable {
    transition: 0.25s;

    &:hover {
      background-color: $green-0;
      color: $grey-0;
    }
  }

  .disable {
    cursor: not-allowed;
    color: $grey-6;
  }
}
</style>
