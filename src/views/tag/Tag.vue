<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-24 18:20:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-25 21:33:51
-->
<template>
  <div class="tag">
    <!-- <div class="tag-top">
      <div class="tag-top-text">
        <div class="tag">
          <div class="tag-text">SpringBoot</div>
        </div>
        <div class="content">
          <div class="content-text">Web前端开发是从网页制作演变而来的，名称上有很明显的时代特征。在互联网的演化进程中，网页制作是Web 1.0时代在互联网的演化进程中，网页制作是Web 1.0时代 </div>
        </div>
      </div>
      <div class="message">
        <div class="attention">13600关注</div>
        <div class="dot"></div>
        <div class="article">122文章</div>
      </div>
    </div>

    <div class="home-page-tag-bottom">
      <div class="home-page-tag-bottom-top">
        <div
          class="home-page-tag-bottom-top-list"
          v-for="(item,index) in topList"
          :key="index"
          :class="{active:index === listIndex}"
          role="button"
          @click="changeList(index)"
        >
          {{item}}
        </div>
        <base-select
          v-if="listIndex === 2"
          :swidth="74"
          :spaddingTop="8"
          :spaddingLeft="10"
          :showText="selectTag"
          :sdata="timeList"
          @changeItem="changeTime($event)"
        />
      </div>

      <div class="home-page-tag-bottom-middle">
        <home-item
          v-for="article in articles[typeIndex]"
          :key="article"
          :articleItem="article"
          :swidth="960"
        />
      </div>
    </div> -->

  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseSelect from '@/components/content/baseSelect/BaseSelect.vue';
import HomeItem from '@/views/home/childComps/HomeItem.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'tag',
  components: {
    // BaseSelect,
    // HomeItem,
  },
  setup() {
    const route = useRoute(); // route
    const tagName = route.params.tagName;
    const topList = reactive(['热门', '最新', '排行']);
    const listIndex = ref(0);
    const timeList = reactive(['3天内', '7天内', '30天内', '全部']);
    const selectTag = ref('3天内');
    const timeIndex = ref(0);

    console.log(tagName);

    function changeList(index) {
      listIndex.value = index;
    }

    function changeTime($event) {
      timeIndex.value = $event;
      selectTag.value = timeList[$event];
    }

    return {
      topList,
      listIndex,
      timeList,
      selectTag,
      timeIndex,
      changeList,
      changeTime,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-page-tag {
  .home-page-tag-top {
    .home-page-tag-top-text {
      .tag {
        .tag-text {
          height: 30px;
          font-size: 26px;
          font-weight: 700;
          text-align: left;
          color: #595959;
        }
      }

      .content {
        .content-text {
          width: 800px;
          height: 18px;
          font-size: 15px;
          font-weight: Narrow;
          text-align: left;
          color: #8c8c8c;
          line-height: 18px;
        }
      }

      .message {
        height: 19px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #707070;
      }
    }
  }

  .home-page-tag-bottom {
    width: 700px;
    .home-page-tag-bottom-top {
      height: 46px;
      @include flex(center);
      .home-page-tag-bottom-top-list {
        margin: 16px;
        font-size: 14px;
        font-weight: 400;

        &.active {
          color: #4bd8aa;
        }
      }
    }
  }
}
</style>
