<!--
 * @Description: 搜索主页-标签
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:32:07
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-21 20:07:39
-->
<template>
  <div class="search-page-tag">
    <div class="search-page-tag-list">
      <div
        class="search-page-tag-list-content"
        v-for="item, index in tagData"
        :key="index"
      >
        <div class="left">
          <div class="left-top">
            <div
              class="tag"
              role="button"
              @click="changePage(`/tag/${item.name}`)"
            >
              {{ item.name }}
            </div>
            <div class="center">
              {{ item.attention_count }}关注
              <div class="point"> · </div>
              {{ item.article_count }}文章
            </div>
          </div>
          <div class="left-bottom">
            {{ item.remark }}
          </div>
        </div>

        <div
          :class="item.attention == 1 ? 'cancel' : 'focus'"
          @click="item.attention == 1 ? modal(index) : focus(index)"
          role="button"
        >{{item.attention == 1 ? "取消关注" : "关注"}}</div>
      </div>
      <base-content-loading
        :style="{padding: '16px 20px', boxSizing: 'border-box',borderTop: tagData.length ? `1px solid ${styles.grey4}` : 0}"
        v-show="dataState"
      ></base-content-loading>
    </div>
    <search-page-to-load-more
      @click="getTag"
      v-show="!dataState && showButton"
    >
    </search-page-to-load-more>
    <base-modal
      content="确定要取消关注吗"
      :show="modalShow"
      @confirm="cancel"
      @cancel="close"
    />
  </div>

</template>

<script>
import { defineComponent, reactive, onMounted, watch, ref } from 'vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import { search } from '@/network/api/search';
import { useRoute } from 'vue-router';
import router from '@/router';
import { mapGetters } from '@/utils/store';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import { useMessage } from 'naive-ui';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import { addUserTag, delUserTag } from '@/network/api/user';
import styles from '@/assets/style/define.scss';

/**
 * @description: 搜索主页-标签
 * @author: Ban
 */

export default defineComponent({
  name: 'searchPageTag',
  components: {
    SearchPageToLoadMore,
    BaseContentLoading,
    BaseModal,
  },
  setup(_, context) {
    const tagData = reactive([]); // 数据
    const route = useRoute(); // 路由
    const dataState = ref(false); //是否在获取数据
    const msg = useMessage();
    const modalShow = ref(false); // 是否显示模态框
    const selectedTag = ref(-1); // 选中标签索引
    const showButton = ref(false); // 是否显示加载更多按钮
    const limit = 10; // 获取数据长度

    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    /**
     * @description:关注事件
     * @param {number} 索引 `必传参数`
     * @author: Ban
     */

    function focus(index) {
      if (isLogin.value)
        addUserTag(tagData[index].name)
          .then(() => {
            tagData[index].attention = 1;
            msg.success('关注成功');
          })
          .catch((error) => {
            console.log(error);
            msg.error('操作失败');
          });
      else msg.error('未登录');
    }

    /**
     * @description:取消关注事件
     * @author: Ban
     */
    function cancel() {
      if (isLogin.value)
        delUserTag(tagData[selectedTag.value].name)
          .then(() => {
            tagData[selectedTag.value].attention = 0;
            msg.success('取消成功');
            modalShow.value = false;
          })
          .catch((error) => {
            console.log(error);
            msg.error('操作失败');
          });
      else msg.error('未登录');
    }

    /**
     * @description: 获取标签搜索结果
     * @author: Ban
     */
    function getTag() {
      dataState.value = true;
      search(route.query.keyword, 5, limit, tagData.length)
        .then((data) => {
          showButton.value = data.tags.length === limit;
          data.tags.forEach((item) => {
            tagData.push(item);
          });
          // console.log(data);
          dataState.value = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // 请求搜索结果
    onMounted(() => {
      context.emit('changeActiveIndex', 5);
      getTag();
    });
    /**
     * @description: 监听路由query
     * @author: Ban
     */
    watch(
      () => route.query.keyword,
      () => {
        tagData.splice(0, tagData.length); // 清空数组
        getTag(); // 重新获取数据
      }
    );

    /**
     * @description: 跳转页面
     * @param {*}
     * @return {*}
     * @author: Ban
     */
    function changePage(url) {
      router.push(url);
    }

    /**
     * @description: 关闭模态框
     * @author: Ban
     */
    function close() {
      modalShow.value = false;
      selectedTag.value = -1;
    }

    /**
     * @description: 开启模态框
     * @param {number} index 选中标签索引
     * @author: Ban
     */
    function modal(index) {
      modalShow.value = true;
      selectedTag.value = index;
    }

    return {
      tagData,
      focus,
      cancel,
      getTag,
      changePage,
      dataState,
      modalShow,
      close,
      modal,
      showButton,
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-page-tag {
  width: 700px;
  @include flex(center, initial, column);

  .search-page-tag-list {
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background: $grey-0;
    overflow: hidden;
    width: 700px;
    margin-bottom: 10px;

    .search-page-tag-list-content {
      height: 83px;
      @include flex(center, space-between);
      box-sizing: border-box;
      padding: 0 24px;
      border-top: 1px solid $grey-4;

      &:nth-child(1) {
        border-top: none;
      }

      .left {
        width: 546px;
        height: 100%;
        @include flex(initial, space-between, column);
        box-sizing: border-box;
        padding: 16px 0;

        .left-top {
          @include flex();
          position: relative;

          .tag {
            height: 28px;
            box-sizing: border-box;
            padding: 5px 10px;
            background: rgba($green-0, 0.3);
            color: $green-1;
            border-radius: $border-radius-1;
            transition: 0.2s;
            font-size: 16px;

            &:hover {
              color: $green-2;
              background: rgba($green-0, 0.7);
            }
          }

          .center {
            color: $grey-8;
            @include flex(center);
            line-height: 28px;
            position: absolute;
            left: 220px;

            .point {
              font-size: 36px;
              color: $grey-8;
              margin: 0 16px;
            }
          }
        }

        .left-bottom {
          color: $grey-8;
          @include ellipsis(1);
        }
      }

      .focus {
        height: 28px;
        width: 82px;
        @include flex(center, center);
        background: $grey-0;
        box-shadow: $shadow-0;
        color: $grey-8;
        border-radius: 14px;
        transition: 0.25s;

        &:hover {
          box-shadow: $shadow-2;
          color: $green-0;
          transition: 0.25s;
        }
      }

      .cancel {
        height: 28px;
        width: 82px;
        @include flex(center, center);
        background: $green-0;
        box-shadow: $shadow-0;
        color: $grey-0;
        border-radius: 14px;
        transition: 0.25s;

        &:hover {
          background: $green-1;
          transition: 0.25s;
        }
      }
    }
  }
}
</style>
