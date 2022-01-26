<!--
 * @Description: 搜索-资源页面
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-17 17:46:10
 * @LastEditors: clq
 * @LastEditTime: 2022-01-25 20:36:43
-->
<template>
  <div class="search-page-resource">
    <div class="search-page-resource-body">
      <div class="header">
        <div class="left">
          <div
            role="button"
            :class="{'active': resourceType==0}"
            @click="filterByAll"
          >综合</div>
          <div
            role="button"
            :class="{'active': resourceType==1}"
            @click="filterByTime"
          >最新</div>
          <div
            role="button"
            :class="{'active': resourceType==2}"
            @click="filterByHot"
          >热门</div>
        </div>
        <n-popover
          placement="bottom"
          trigger="hover"
          ref="npopoverRef"
          :show-arrow="false"
          :style="{ marginTop: '1px' }"
        >
          <el-scrollbar max-height="160px">
            <div
              v-for="(item,index) in selectOptions"
              class="search-page-resource-body-header-select-item"
              :key="index"
              @click="changeSelect(index)"
              role="button"
            >
              {{item}}
            </div>
          </el-scrollbar>
          <template #trigger>
            <div
              class="right"
              role="button"
            >
              <div>{{currentOption}}</div>
              <div><i class="iconfont blog-down"></i></div>
            </div>
          </template>
        </n-popover>
      </div>

      <div class="content">
        <search-page-resource-item
          v-for="(item,index) in resourceList"
          :key="index"
          :resource="item"
        />
      </div>
    </div>
    <search-page-to-load-more
      class="search-page-resource-btn"
      @onButtonClick="loadMoreResource"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, renderList } from 'vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import SearchPageResourceItem from '@/views/search/childComps/pages/searchPageResource/childComps/SearchPageResourceItem.vue';
import { search } from '@/network/api/search';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';

/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'searchPageResource',
  components: {
    SearchPageToLoadMore,
    SearchPageResourceItem,
  },
  setup(props, context) {
    const route = useRoute(); //route
    const msg = useMessage(); // naive-ui 消息组件
    const selectOptions = reactive(['时间不限', '最近一天', '最近一周', '最近三月']);
    const npopoverRef = ref(null); //n-popover引用对象
    let resourceType = ref(0); // 0为综合，1为最新，2为热门
    let currentIndex = ref(0); //当前选定项索引
    let currentOption = ref('时间不限'); //当前选定项的值
    let limit = ref(10);
    let offset = ref(0);
    let resourceList = reactive([]);

    // console.log(route.query.keyword);

    //获取初始数据
    getResource(true);

    /**
     * @description: 获取资源
     * @param {boolean} clean 是否清空原始数据
     * @return {void}
     * @author: clq
     */
    function getResource(clean) {
      search(route.query.keyword, 4, resourceType.value, currentIndex.value, limit.value, offset.value)
        .then((data) => {
          console.log('getResource');
          console.log(data);
          //清空初始数据
          if (clean == true) resourceList.splice(0, resourceList.length);
          // console.log(resourceList);
          for (let resource of data.resources) {
            resource.upload_time = resource.upload_time.split(' ')[0];
            resourceList.splice(resourceList.length, 0, resource);
          }
          // console.log(resourceList);
          context.emit('changeLoadingState', 4, true);
          context.emit('changeAcitiveIndex', 4);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取资源失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 综合排序
     * @return {void}
     * @author: clq
     */
    function filterByAll() {
      // console.log('filterByAll');
      if (resourceType.value != 0) {
        resourceType.value = 0;
        offset.value = 0;
        getResource(true);
      }
    }

    /**
     * @description: 最新排序
     * @return {void}
     * @author: clq
     */
    function filterByTime() {
      // console.log('filterByTime');
      if (resourceType.value != 1) {
        resourceType.value = 1;
        offset.value = 0;
        getResource(true);
      }
    }

    /**
     * @description: 热门排序
     * @return {void}
     * @author: clq
     */
    function filterByHot() {
      // console.log('filterByHot');
      if (resourceType.value != 2) {
        resourceType.value = 2;
        offset.value = 0;
        getResource(true);
      }
    }

    /**
     * @description: 更改选项
     * @param {*} newIndex 新选择项索引
     * @return {*}
     * @author: clq
     */
    function changeSelect(newIndex) {
      if (currentIndex.value != newIndex) {
        currentIndex.value = newIndex;
        currentOption.value = selectOptions[currentIndex.value];
        // console.log('currentOption: ' + currentOption.value);
        // console.log('newIndex: ' + newIndex);
        npopoverRef.value.setShow(false); // 不显示 popover
        offset.value = 0;
        getResource(true);
      }
    }

    /**
     * @description: 加载更多资源
     * @return {void}
     * @author: clq
     */
    function loadMoreResource() {
      offset.value = resourceList.length;
      getResource(false);
    }

    return {
      selectOptions,
      resourceType,
      currentIndex,
      currentOption,
      npopoverRef,
      resourceList,
      filterByAll,
      filterByTime,
      filterByHot,
      changeSelect,
      loadMoreResource,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-page-resource {
  width: 700px;

  .search-page-resource-body {
    width: 100%;
    box-sizing: border-box;
    box-shadow: $shadow-0;
    background-color: $grey-0;
    border-radius: $border-radius-0;

    .header {
      @include flex(initial, space-between);
      padding: 16px 0px;
      border-bottom: 1px solid $grey-2;

      .left {
        padding-left: 12px;
        @include flex();

        div:nth-child(2) {
          border-left: 1px solid $grey-4;
          border-right: 1px solid $grey-4;
        }

        div {
          width: 58px;
          height: 14px;
          transition: 0.25s;
          text-align: center;
          line-height: 14px;

          &:hover {
            color: $green-1;
          }
        }

        .active {
          color: $green-1;
        }
      }

      .right {
        @include flex(initial, space-between);
        box-sizing: border-box;
        transition: 0.25s;
        width: 84px;
        height: 18px;
        margin-right: 20px;
        padding: 0px 10px;
        border: 1px solid $grey-4;
        border-radius: $border-radius-1;
        font-size: 12px;
        color: $grey-9;

        .iconfont {
          font-size: 12px;
          color: $grey-9;
        }

        &:hover {
          color: $green-1;

          .iconfont {
            color: $green-1;
          }
        }
      }
    }

    .content {
      box-sizing: border-box;
      width: 100%;
      padding: 0px 20px;
    }
  }

  .search-page-resource-btn {
    margin: 10px auto;
  }
}
</style>

<style lang="scss">
.n-popover:not(.n-popover--raw):not(.n-popover--show-header) {
  padding: 5px 0px;
  border-radius: $border-radius-0;
}

.search-page-resource-body-header-select-item {
  width: 84px;
  height: 32px;
  line-height: 32px;
  text-align: center;

  &:hover {
    background-color: $grey-1;
  }
}
</style>
