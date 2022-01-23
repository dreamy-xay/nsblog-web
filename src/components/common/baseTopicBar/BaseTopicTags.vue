<!--
 * @Description: 基础专题条对应的专题标签
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-20 20:52:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-22 20:56:21
-->
<template>
  <div
    class="base-topic-tags"
    v-if="currentTags.length"
  >
    <div class="base-topic-tags-inner">
      <div
        class="tag"
        v-for="(tag, index) in currentTags"
        :class="{'tag-active': tagActiveIndex === index}"
        :key="tag"
        role="button"
        @click="clickTag(index)"
      >
        {{ tag }}
      </div>
      <div
        class="tag"
        role="button"
        @click="selectAllTags"
        v-if="!currentTagsAll"
      >
        展开
        <div class="icon">
          <i class="iconfont blog-down"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed, watch } from 'vue';
import { getTopicTags } from '@/network/api/topics';
import { useRoute } from 'vue-router';
import router from '@/router';
import events from '@/events';

/**
 * @description: 基础专题条对应的专题标签
 * @event selectTopic 选择了专题 (topic: string) => void
 * @event selectTag 选择了专题标签 (tag: string) => void
 * @emits BaseTopicTags-addTags 更新topic tags (topic_name: string, tags: string[]) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseTopicTags',
  setup(_, context) {
    const route = useRoute(); // route
    const tagsLimit = 10; // 最初tag限制显示数量
    const currentTopic = ref(route.query.topic || 'none'); // 选中专题
    const currentTagsAll = ref(false); // 是否显示全部tags
    const tagActiveIndex = ref(0); // 专题标签激活
    const allTopicTags = reactive({});

    /**
     * @description: 获取tags
     * @param {string} topic_name 专题名 `必传参数`
     * @param {boolean} newTopic 是否新专题 `默认未true`
     * @return {void}
     * @author: dreamy-xay
     */
    function getTags(topic_name, newTopic = true) {
      getTopicTags(topic_name)
        .then((data) => {
          allTopicTags[topic_name] = data.tags;
          events.emit('BaseTopicTags-addTags', topic_name, data.tags); // 发出全局事件更新tags
          updateCurrentTag(data.tags, newTopic);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // 初始化tag
    if (currentTopic.value !== 'none') getTags(currentTopic.value);

    // 监听路由变化，更新topic
    watch(
      () => route.query,
      (args) => {
        if (args.topic) {
          const newTopic = currentTopic.value !== args.topic;
          currentTopic.value = args.topic;
          if (!allTopicTags[currentTopic.value]) getTags(currentTopic.value, newTopic);
          else updateCurrentTag(allTopicTags[currentTopic.value], newTopic);
        } else currentTopic.value = 'none';
      }
    );

    // 激活的专题标签
    const currentTags = computed(() => {
      const tags = allTopicTags[currentTopic.value];
      return tags ? ['全部', ...(currentTagsAll.value ? tags : tags.slice(0, tagsLimit))] : [];
    });

    /**
     * @description: 更新当前标签状态
     * @param {string[]} tags 标签列表 `必传参数`
     * @param {boolean} newTopic 是否为新的topic `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function updateCurrentTag(tags, newTopic) {
      if (newTopic) currentTagsAll.value = tags.length <= tagsLimit;
      tagActiveIndex.value = tags.indexOf(route.query.tag) + 1;
    }

    /**
     * @description: 点击专题标签
     * @param {Number} index 专题标签索引号 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickTag(index) {
      if (index === tagActiveIndex.value) return;
      if (index === 0) {
        context.emit('selectTopic', currentTopic.value);
        router.push({
          name: route.name,
          query: {
            topic: currentTopic.value,
          },
        });
      } else {
        context.emit('selectTag', currentTags.value[index]);
        router.push({
          name: route.name,
          query: {
            topic: currentTopic.value,
            tag: currentTags.value[index],
          },
        });
      }
    }

    /**
     * @description: 选择查看全部标签
     * @return {void}
     * @author: dreamy-xay
     */
    function selectAllTags() {
      currentTagsAll.value = true;
    }

    // 更新所有tags
    events.on('BaseTopicBar-addTags', (topic_name, tags) => {
      allTopicTags[topic_name] = tags;
    });

    return {
      currentTagsAll,
      tagActiveIndex,
      currentTags,
      clickTag,
      selectAllTags,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-topic-tags {
  width: 100%;
  @include flex(center, center);
  transition: 0.25s;

  .base-topic-tags-inner {
    width: 1000px;
    @include flex(flex-start);
    align-content: flex-start;
    flex-wrap: wrap;

    .tag {
      @include flex(center, center);
      padding: 0 8px;
      margin-top: 12px;
      margin-right: 12px;
      font-size: 14px;
      height: 24px;
      border-radius: $border-radius-0;
      background-color: $grey-0;
      overflow: hidden;
      box-shadow: $shadow-0;
      color: $grey-9;
      transition: box-shadow 0.25s, color 0.25s;

      &:hover {
        color: $green-1;
      }

      &.tag-active {
        color: $green-1;
        box-shadow: $shadow-2;
      }

      &:last-child {
        margin-right: 0;
      }

      .icon {
        width: 8px;
        height: 8px;
        margin-left: 6px;
        @include flex(center, center);

        .iconfont {
          font-size: 10px;
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>
