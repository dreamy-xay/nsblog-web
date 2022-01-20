<!--
 * @Description: 基础专题条
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-17 20:58:36
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-20 18:53:35
-->
<template>
  <div class="base-topic-bar">
    <div class="base-topic-bar-container">
      <div class="container-inner">
        <div class="left">
          <div
            class="topic"
            v-for="(item, index) in allTopicTags"
            :class="{'topic-active': topicActiveIndex === index}"
            :key="item.topic"
            role="button"
            @click="clickTopic(index)"
          >
            {{ item.topic }}
          </div>
        </div>
        <div
          v-if="details"
          class="right"
          role="button"
          @click="tagManageClick"
        >标签管理</div>
        <div v-else></div>
      </div>
    </div>
    <div
      class="base-topic-bar-details"
      v-if="details && currentTags.length"
    >
      <div class="details-inner">
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
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed } from 'vue';
import { getTopics, getTopicTags } from '@/network/api/topics';
import { mapGetters } from '@/util/store';
import { useRoute } from 'vue-router';
import router from '@/router';

/**
 * @description: 基础专题条
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseTopicBar',
  props: {
    details: {
      type: Boolean,
      default: true,
    },
    firstItem: {
      type: String,
      default: '推荐',
    },
  },
  setup(props, context) {
    const route = useRoute(); // route
    const topicActiveIndex = ref(0); // 专题激活
    const currentTagsAll = ref(false); // 是否显示全部tags
    const tagActiveIndex = ref(0); // 专题标签激活
    const allTopicTags = reactive([
      {
        topic: props.firstItem,
        tags: [],
        all: false,
      },
      {
        topic: '关注',
        tags: [],
        all: false,
      },
      {
        topic: '其他',
        tags: [],
        all: true,
      },
    ]); // 专题列表，已编辑的三个为非专题

    // 激活的专题标签
    const currentTags = computed(() => [
      ...(allTopicTags[topicActiveIndex.value].all ? ['全部'] : []),
      ...(currentTagsAll.value
        ? allTopicTags[topicActiveIndex.value].tags
        : allTopicTags[topicActiveIndex.value].tags.slice(0, 10)),
    ]);

    // 获取专题
    getTopics()
      .then((data) => {
        const all = [];
        for (const topic of data.topics) all.push({ topic, tags: [], all: true });
        allTopicTags.splice(2, 0, ...all);
      })
      .catch((error) => {
        console.log(error);
      });

    /**
     * @description: 点击专题
     * @param {Number} index 专题索引号 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickTopic(index) {
      topicActiveIndex.value = index;
      currentTagsAll.value = false; // 每次切换置为false
      tagActiveIndex.value = 0; // 每次切换置为0
      // 获取新的标签
      if (!allTopicTags[index].tags.length && allTopicTags[index].all) {
        getTopicTags(allTopicTags[index].topic)
          .then((data) => {
            allTopicTags[index].tags.splice(0, 0, ...data.tags);
            if (allTopicTags[index].tags.length <= 10) currentTagsAll.value = true;
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (allTopicTags[index].tags.length <= 10) currentTagsAll.value = true;
      context.emit('selectTopic', index, allTopicTags[index].topic);
    }

    /**
     * @description: 点击专题标签
     * @param {Number} index 专题标签索引号 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickTag(index) {
      tagActiveIndex.value = index;
      if (index === 0) context.emit('selectTopic', topicActiveIndex.value, allTopicTags[topicActiveIndex.value].topic);
      else context.emit('selectTag', index - 1, currentTags.value[index]);
    }

    /**
     * @description: 标签管理点击
     * @return {void}
     * @author: dreamy-xay
     */
    function tagManageClick() {
      const { isLogin } = mapGetters('global', ['isLogin']);
      window.open(isLogin ? '/userCenter/profile#interest-topics-tags' : '/login/signIn?back', '_self');
    }

    /**
     * @description: 选择查看全部标签
     * @return {void}
     * @author: dreamy-xay
     */
    function selectAllTags() {
      currentTagsAll.value = true;
    }

    return {
      allTopicTags,
      currentTags,
      currentTagsAll,
      tagActiveIndex,
      topicActiveIndex,
      clickTopic,
      clickTag,
      tagManageClick,
      selectAllTags,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-topic-bar {
  width: 100%;
  @include flex(initial, initial, column);

  .base-topic-bar-container {
    width: 100%;
    height: 44px;
    @include flex(center, center);
    background-color: $grey-0;
    border-top: 1px solid $grey-3;
    box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.08);

    .container-inner {
      height: 100%;
      width: 1000px;
      @include flex(center, space-between);

      .left {
        height: 100%;
        @include flex(center, flex-start);

        .topic {
          margin: 0 12px;

          &:first-child {
            margin-left: 0;
          }

          &.topic-active {
            color: $green-1;
          }
        }
      }

      .left .topic,
      .right {
        font-size: 15px;
        color: $grey-9;
        transition: 0.25s;

        &:hover {
          color: $green-0;
        }
      }
    }
  }

  .base-topic-bar-details {
    width: 100%;
    @include flex(center, center);

    .details-inner {
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
}
</style>
