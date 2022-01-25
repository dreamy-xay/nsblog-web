<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-25 15:23:24
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    :footer="true"
    bind-class="home"
  >
    <template #top-bar-bottom>
      <base-topic-bar
        @selectTag="selectTag"
        @selectTopic="selectTopic"
      />
    </template>
    <base-topic-tags
      @selectTag="selectTag"
      @selectTopic="selectTopic"
    />
    <div class="home-container">
      <div class="left">
        <home-left
          :topic="topicSelect"
          :tag="tagSelect"
          :isclick="isClick"
        />
      </div>
      <div class="right">
        <home-right />
      </div>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseTopicBar from '@/components/common/baseTopicBar/BaseTopicBar.vue';
import BaseTopicTags from '@/components/common/baseTopicBar/BaseTopicTags.vue';
// import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import HomeRight from '@/views/home/childComps/homeRight/HomeRight.vue';
import HomeLeft from '@/views/home/childComps/HomeLeft.vue';

/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Home',
  components: {
    BaseView,
    BaseTopicBar,
    BaseTopicTags,
    HomeLeft,
    HomeRight,
  },
  setup() {
    const topicSelect = ref('');
    const tagSelect = ref('');
    const isClick = ref(false);
    /**
     * @description: 选择了专题
     * @param {string} topic 专题名
     * @return {void}
     * @author: dreamy-xay
     */
    function selectTopic(topic) {
      if (topicSelect.value === topic) isClick.value = true;
      else {
        topicSelect.value = topic;
        isClick.value = false;
      }
      console.log(`select Topic: ${topic}`);
    }

    /**
     * @description: 选择了标签
     * @param {string} topic 专题名
     * @return {void}
     * @author: dreamy-xay
     */
    function selectTag(tag) {
      tagSelect.value = tag;
      isClick.value = false;
      console.log(`select Tag: ${tag}`);
    }

    return {
      selectTopic,
      selectTag,
      topicSelect,
      tagSelect,
      isClick,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.home) {
  @include flex(center, center, column);

  .home-container {
    width: 1000px;
    margin-top: 16px;
    margin-bottom: 6px;
    @include flex(initial, space-between);

    .left {
      width: 700px;
      background: $grey-0;
      border-radius: $border-radius-0;
      box-shadow: $shadow-0;
    }

    .right {
      width: 284px;
    }
  }
}
</style>
