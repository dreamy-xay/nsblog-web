<!--
 * @Description: 搜索-资源页面
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-17 17:46:10
 * @LastEditors: clq
 * @LastEditTime: 2022-01-18 14:14:42
-->
<template>
  <div class="search-page-resource">
    <div class="search-page-resource-body">
      <div class="header">
        <div class="left">
          <div
            role="button"
            @click="sortByAll"
          >综合</div>
          <div
            role="button"
            @click="sortByTime"
          >最新</div>
          <div
            role="button"
            @click="sortByHot"
          >热门</div>
        </div>
        <n-popover
          placement="bottom"
          trigger="hover"
          ref="npopoverRef"
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
    <search-page-to-load-more class="search-page-resource-btn" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import SearchPageResourceItem from '@/views/search/childComps/pages/searchPageResource/childComps/SearchPageResourceItem.vue';
import { getResources } from '@/network/api/resources';
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
  setup() {
    const msg = useMessage(); // naive-ui 消息组件
    const selectOptions = reactive(['时间不限', '最近一天', '最近一周', '最近三月']);
    const npopoverRef = ref(null); //n-popover引用对象
    let currentIndex = ref(0); //当前选定项索引
    let currentOption = ref('时间不限'); //当前选定项的值
    let resourceList = reactive([
      {
        id: 1,
        name: '健康和生产效率管理PPT健康和生产效率管理PPT健康和生产效率管理PPT健康和生产效率管理PPT健康和生产效率管理PPT健康和生产效率管理PPT',
        content:
          '日常生活休闲中，相信不少小伙伴可能需要健康和生产效率管理，在这里，为大家整理发布了健康和为大家整理发布了健康和为大家整理发布了健康和...',
        author: 'Biutty',
        link: 'http://www.xxx',
        uploadTime: '2022-01-01',
      },
      {
        id: 2,
        name: '健康和生产效率管理PPT',
        content: '日常生活休闲中，相信不少小伙伴可能需要健康和生产效率管理，在这里，为大家整理发布了健康和...',
        author: 'Biutty',
        link: 'http://www.xxx',
        uploadTime: '2022-01-01',
      },
      {
        id: 3,
        name: '健康和生产效率管理PPT',
        content: '日常生活休闲中，相信不少小伙伴可能需要健康和生产效率管理，在这里，为大家整理发布了健康和...',
        author: 'Biutty',
        link: 'http://www.xxx',
        uploadTime: '2022-01-01',
      },
      {
        id: 4,
        name: '健康和生产效率管理PPT',
        content: '日常生活休闲中，相信不少小伙伴可能需要健康和生产效率管理，在这里，为大家整理发布了健康和...',
        author: 'Biutty',
        uploadTime: '2022-01-01',
      },
      {
        id: 5,
        name: '健康和生产效率管理PPT',
        content: '日常生活休闲中，相信不少小伙伴可能需要健康和生产效率管理，在这里，为大家整理发布了健康和...',
        author: 'Biutty',
        link: 'http://www.xxx',
        uploadTime: '2022-01-01',
      },
      {
        id: 6,
        name: '健康和生产效率管理PPT',
        content: '日常生活休闲中，相信不少小伙伴可能需要健康和生产效率管理，在这里，为大家整理发布了健康和...',
        author: 'Biutty',
        uploadTime: '2022-01-01',
      },
      {
        id: 7,
        name: '健康和生产效率管理PPT',
        content: '日常生活休闲中，相信不少小伙伴可能需要健康和生产效率管理，在这里，为大家整理发布了健康和...',
        author: 'Biutty',
        uploadTime: '2022-01-01',
      },
      {
        id: 8,
        name: '健康和生产效率管理PPT',
        content: '日常生活休闲中，相信不少小伙伴可能需要健康和生产效率管理，在这里，为大家整理发布了健康和...',
        author: 'Biutty',
        uploadTime: '2022-01-01',
      },
    ]);

    getResources('us1', 0, 10)
      .then((data) => {
        console.log('resourcesData');
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取标签失败', { duration: 2000, closable: true });
      });

    /**
     * @description: 综合排序
     * @return {void}
     * @author: clq
     */
    function sortByAll() {
      console.log('sortByAll');
    }

    /**
     * @description: 最新排序
     * @return {void}
     * @author: clq
     */
    function sortByTime() {
      console.log('sortByTime');
    }

    /**
     * @description: 热门排序
     * @return {void}
     * @author: clq
     */
    function sortByHot() {
      console.log('sortByHot');
    }

    /**
     * @description: 更改选项
     * @param {*} newIndex 新选择项索引
     * @return {*}
     * @author: clq
     */
    function changeSelect(newIndex) {
      currentIndex = newIndex;
      currentOption.value = selectOptions[currentIndex];
      console.log('currentOption: ' + currentOption.value);
      console.log('newIndex: ' + newIndex);
      npopoverRef.value.setShow(false); // 不显示 popover
    }

    return {
      selectOptions,
      currentIndex,
      currentOption,
      npopoverRef,
      resourceList,
      sortByAll,
      sortByTime,
      sortByHot,
      changeSelect,
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
