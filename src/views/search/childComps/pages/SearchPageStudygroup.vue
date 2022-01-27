<!--
 * @Description:搜索学习小组
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-14 18:52:17
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-27 16:54:02
-->
<template>
  <div class="search-page-studygroup">
    <div class="search-page-studygroup-less">
      <div
        v-for="(group,index) in groups"
        :key="index"
      >
        <div class="groups">
          <div class="name">
            {{group.name}}
            <div
              class="join"
              role="button"
              @click="joinGroup(group)"
              v-show="group.join===0"
            >
              <i class="iconfont blog-daochu1024-29"></i>
              加入
            </div>
            <div
              v-show="group.join===1"
              class="join"
              role="button"
              @click="exitGroup(group)"
            >
              已加入
            </div>
          </div>
          <div class="remark">{{group.remark}}</div>
          <div class="category-member-count">
            <div class="category">
              <i class="iconfont blog-zhu"></i>
              {{group.topic_name}}
            </div>
            <div class="member-count">
              <i class="iconfont blog-xiaozu1"></i>
              {{group.member_count}}
            </div>
          </div>
          <hr
            v-if="show?index!=studyGroups.length-1:index!=5"
            style="background-color: #e5e5e5;height:0.5px; border:none;"
          >
        </div>
      </div>
    </div>
    <search-page-to-load-more @onButtonClick="getData"></search-page-to-load-more>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted, watch } from 'vue';
import { useMessage } from 'naive-ui';
import { search } from '@/network/api/search';
import { useRoute } from 'vue-router';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';

/**
 * @description:搜索学习小组
 * @author: xiao
 */

export default defineComponent({
  name: 'searchPageStudygroup',
  components: {
    SearchPageToLoadMore,
  },
  setup(_, context) {
    const msg = useMessage(); // naive-ui 组件
    const groups = reactive([]); //学习小组数据
    const show = ref(false); //是否加载更多
    const change = ref(true); //是否加入
    const route = useRoute(); // route

    /**
     * @description: 获取数据
     * @author: Ban
     */
    function getData() {
      search(route.query.keyword, 3)
        .then((data) => {
          console.log('data', data);
          data.gropus.forEach((item) => {
            groups.push(item);
            context.emit('changeLoadingState', 3, true);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    onMounted(() => {
      context.emit('changeActiveIndex', 3);
      getData();
    });

    watch(
      () => route.query.keyword,
      () => {
        context.emit('changeLoadingState', 3, false); // 改变数据加载状态
        groups.splice(0, groups.length); // 清空数组
        getData(); // 重新获取数据
      }
    );

    /**
     * @description: 加入学习小组
     * @param {*} index 选择点击的小组
     * @return {void}
     * @author: xiao
     */
    function joinGroup(group) {
      group.join = 1;
    }

    /**
     * @description: 退出学习小组
     * @param {*} index 选择点击的小组
     * @return {void}
     * @author: xiao
     */
    function exitGroup(group) {
      group.join = 0;
    }

    return {
      groups,
      getData,
      joinGroup,
      exitGroup,
      show,
      change,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-page-studygroup {
  @include flex(center, center, column);
  margin-bottom: 40px;

  .search-page-studygroup-less {
    width: 660px;
    height: 100%;
    background: $grey-0;
    border-radius: $border-radius-0; //圆角
    box-shadow: $shadow-0;
    padding: 16px 20px;
    margin-bottom: 10px;
    & > div {
      &:nth-child(1) div {
        margin-top: 0px;
      }
    }

    .groups {
      widows: 660px;
      height: 84px;
      margin-top: 24px;

      .name {
        height: 24px;
        margin-bottom: 11px;
        font-size: 16px;
        font-weight: bold;
        @include flex(center, center);
        justify-content: space-between;

        .join {
          font-size: 14px;
          color: $grey-7;
          height: 24px;
          width: 66px;
          border-radius: 4px;
          border: solid 1px $grey-7;
          @include flex(center, center);
          transition: 0.25s;

          .iconfont {
            margin-right: 4.78px;
          }

          &:hover {
            border-color: $green-1;
            color: $green-1;
          }
        }
      }

      .remark {
        height: 22px;
        margin-bottom: 10px;
        width: 571px;
        @include ellipsis(1);
        font-size: 13px;
        color: $grey-7;
      }

      .category-member-count {
        height: 20px;
        margin-bottom: 11.8px;
        @include flex(center, flex-start);

        .category {
          border-radius: $border-radius-1; //圆角
          border: 1px solid $green-1;
          box-shadow: $shadow-0;
          color: $green-1;
          margin-right: 24px;
          font-size: 14px;
          padding: 0px 4px;
        }

        .member-count {
          font-size: 14px;
          color: $grey-7;
        }
      }
    }
  }
}
</style>
