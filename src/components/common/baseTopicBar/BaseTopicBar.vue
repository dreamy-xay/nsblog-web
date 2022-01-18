<!--
 * @Description: 基础专题条
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-17 20:58:36
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-17 22:13:56
-->
<template>
  <div class="base-topic-bar">
    <div class="base-topic-bar-container">
      <div class="container-inner">
        <div class="left">
          <div
            class="topic"
            v-for="(topic, index) in topics"
            :class="{'topic-active': topicActiveIndex === index}"
            :key="topic"
            role="button"
            @click="clickTopic(index)"
          >
            {{ topic }}
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
      v-if="details"
    >
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { getTopics } from '@/network/api/topics';
import { mapGetters } from '@/util/store';

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
  },
  setup() {
    const topics = reactive(['推荐', '关注', '其他']); // 专题列表，已编辑的三个为非专题

    // 获取专题
    getTopics()
      .then((data) => {
        topics.splice(2, 0, ...data.topics.slice(0, 8));
      })
      .catch((error) => {
        console.log(error);
      });

    const topicActiveIndex = ref(0); // 专题激活

    /**
     * @description: 点击专题
     * @param {Number} index 专题索引号 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickTopic(index) {
      topicActiveIndex.value = index;
      // console.log(index);
    }

    /**
     * @description: 标签管理点击
     * @return {void}
     * @author: dreamy-xay
     */
    function tagManageClick() {
      const { isLogin } = mapGetters('global', ['isLogin']);
      window.open(isLogin ? '/userCenter/profile#interest-topics-tags' : '/login', '_self');
    }

    return {
      topics,
      topicActiveIndex,
      clickTopic,
      tagManageClick,
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
}
</style>
