<!--
 * @Description: SearchPageResource子组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-17 17:50:48
 * @LastEditors: clq
 * @LastEditTime: 2022-01-29 13:02:01
-->
<template>
  <div class="search-page-resource-item">
    <div
      class="search-page-resource-item-header"
      role="button"
      @click="toResourceDetail(resource.id)"
    >{{resource.name}}</div>
    <div class="search-page-resource-item-body">{{resource.remark}}</div>
    <div class="search-page-resource-item-footer">
      <div
        class="left"
        role="button"
        @click="toResourcePage(resource.link)"
      >
        <i class="iconfont blog-xiazai" />
        前往下载
      </div>
      <div class="right">
        <div
          class="author"
          role="button"
          @click="touserCenter(resource.username)"
        >{{resource.nickname}}</div>
        <div class="upload-time">{{resource.upload_time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description:
 *  * @param {Arrey} sdata 可供选择的数据 `默认为[]`
 * @param {Array} resourceList 资源列表
 * @author: clq
 */

export default defineComponent({
  name: 'searchPageResourceItem',
  props: {
    resource: {
      type: Object,
      required: true,
      default: null,
    },
  },
  setup() {
    /**
     * @description: 前往下载页面
     * @param {string} link 资源链接
     * @return {void}
     * @author: clq
     */
    function toResourcePage(link) {
      console.log('resourceLink: ' + link);
      window.open(link);
    }

    /**
     * @description: 跳转到用户主页
     * @param {string} username
     * @return {void}
     * @author: clq
     */
    function touserCenter(username) {
      window.open(`/user/${username}`);
    }

    /**
     * @description: 跳转到资源详情页面
     * @param {number} id 资源id
     * @return {void}
     * @author: clq
     */
    function toResourceDetail(id) {
      window.open(`/resource/${id}`);
    }
    return {
      toResourcePage,
      touserCenter,
      toResourceDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-page-resource-item {
  box-sizing: border-box;
  padding: 14px 0;
  border-bottom: 0.5px solid $grey-4;

  .search-page-resource-item-header {
    @include ellipsis(1);
    font-size: 16px;
    font-weight: 700;
    color: $grey-10;
    transition: 0.25s;

    &:hover {
      color: $grey-8;
    }
  }

  .search-page-resource-item-body {
    @include ellipsis(1);
    margin: 12px 0px;
    font-size: 13px;
    font-weight: 400;
    color: $grey-7;
  }

  .search-page-resource-item-footer {
    @include flex(center, space-between);

    .left {
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: $grey-7;
      transition: 0.25s;

      .iconfont {
        font-size: 13px;
        color: $grey-7;
      }

      &:hover {
        color: $green-1;
        .iconfont {
          color: $green-1;
        }
      }
    }

    .right {
      @include flex(center, space-between);
      // width: 150px;

      .author {
        transition: 0.25s;

        &:hover {
          color: $green-1;
        }
      }

      .upload-time {
        margin-left: 20px;
      }
    }
  }
}
</style>
