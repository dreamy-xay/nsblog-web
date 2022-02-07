<!--
 * @Description: 基础专题条
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-17 20:58:36
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-29 14:20:00
-->
<template>
  <div class="base-topic-bar">
    <div class="base-topic-bar-inner">
      <div class="left">
        <template v-if="details">
          <el-popover
            v-for="(topic, index) in currentTopics"
            :key="topic"
            placement="bottom-start"
            trigger="hover"
            :disabled="index < (isLogin ? 2 : 1)"
            :width="null"
            :show-after="200"
            :show-arrow="false"
            @show="getTags(topic)"
            popper-class="base-topic-bar-popover"
          >
            <template #reference>
              <div
                class="topic"
                :class="{'topic-active': topicActiveName === topic}"
                role="button"
                @click="clickTopic(topic)"
              >
                {{ topic }}
              </div>
            </template>
            <div
              class="base-topic-bar-popover-inner"
              v-if="allTopicTags[topic] && allTopicTags[topic].length"
            >
              <div class="tags">
                <div
                  class="tag"
                  v-for="tag in allTopicTags[topic]"
                  :class="{'tag-active': tagActiveName === tag}"
                  :key="tag"
                  role="button"
                  @click="clickTag(topic, tag)"
                >
                  {{ tag }}
                </div>
              </div>
            </div>
          </el-popover>
        </template>
        <template v-else>
          <div
            class="topic"
            v-for="topic in currentTopics"
            :key="topic"
            :class="{'topic-active': topicActiveName === topic}"
            role="button"
            @click="clickTopic(topic)"
          >
            {{ topic }}
          </div>
        </template>
        <div class="other">
          其他
          <div
            class="topic-button"
            role="button"
          >
            <div
              class="up"
              @click="changePage(true)"
            >
              <i class="iconfont blog-down"></i>
            </div>
            <div
              class="down"
              @click="changePage(false)"
            >
              <i class="iconfont blog-down"></i>
            </div>
          </div>
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
</template>

<script>
import { defineComponent, reactive, ref, computed, watch } from 'vue';
import { getTopics, getTopicTags } from '@/network/api/topics';
import { mapGetters } from '@/util/store';
import { useRoute } from 'vue-router';
import router from '@/router';
import events from '@/events';

/**
 * @description: 基础专题条
 * @param {Boolean} details 是否显示细节（即显示专题标签） `默认为是`
 * @param {String} firstItem 第一项文字 `默认为推荐`
 * @event selectTopic 选择了专题 (topic: string) => void
 * @event selectTag 选择了专题标签 (tag: string) => void
 * @emits BaseTopicBar-addTags 更新topic tags (topic_name: string, tags: string[]) => void
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
    const topicsLimit = 8;
    const { isLogin } = mapGetters('global', ['isLogin']); // 获取是否登录
    const topicActiveName = ref(props.firstItem); // 专题激活
    const topicActivePage = ref(0); // 专题激活页面
    const topics = reactive([]); // 专题列表
    const allTopicTags = reactive({}); // 缓存所有专题标签
    const tagActiveName = ref(''); // 标签激活名

    // 监听当前路由变化
    watch(
      () => route.query,
      (args) => {
        tagActiveName.value = args.tag;
        updateCurrentTopic();
      }
    );

    // 获取专题
    getTopics()
      .then((data) => {
        topics.splice(0, 0, ...data.topics);
        updateCurrentTopic();
      })
      .catch((error) => {
        console.log(error);
      });

    // 计算当前topic
    const currentTopics = computed(() => [
      props.firstItem,
      ...(isLogin.value ? ['关注'] : []),
      ...topics.slice(topicActivePage.value * topicsLimit, (topicActivePage.value + 1) * topicsLimit),
    ]);

    /**
     * @description: 更新当前专题状态
     * @return {void}
     * @author: dreamy-xay
     */
    function updateCurrentTopic() {
      const currentTopic =
        route.query.topic ||
        (Object.prototype.hasOwnProperty.call(route.query, 'attention') ? 'attention' : props.firstItem);
      if (currentTopic === props.firstItem) topicActiveName.value = props.firstItem;
      else if (currentTopic === 'attention') topicActiveName.value = '关注';
      else {
        const index = topics.indexOf(currentTopic);
        if (index == -1) router.replace({ name: route.name });
        else {
          topicActiveName.value = currentTopic;
          topicActivePage.value = parseInt(Math.ceil((index + 1) / topicsLimit)) - 1;
        }
      }
    }

    /**
     * @description: 点击专题
     * @param {string} topic_name 当前专题索引号 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickTopic(topic_name) {
      if (topic_name === topicActiveName.value) return;
      context.emit('selectTopic', topic_name);
      if (topic_name === props.firstItem) router.push({ name: route.name });
      else if (topic_name === '关注')
        router.push({
          name: route.name,
          query: {
            attention: null,
          },
        });
      else
        router.push({
          name: route.name,
          query: {
            topic: topic_name,
          },
        });
    }

    /**
     * @description: 标签管理点击
     * @return {void}
     * @author: dreamy-xay
     */
    function tagManageClick() {
      window.open(isLogin.value ? '/userCenter/profile#interest-topics-tags' : '/login/signIn?back', '_self');
    }

    /**
     * @description: 获取tags
     * @param {string} topic_name 专题名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function getTags(topic_name) {
      if (!allTopicTags[topic_name]) {
        getTopicTags(topic_name)
          .then((data) => {
            allTopicTags[topic_name] = data.tags;
            events.emit('BaseTopicBar-addTags', topic_name, data.tags); // 发出全局事件
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    /**
     * @description: 点击专题标签
     * @param {string} topic_name 专题 `必传参数`
     * @param {string} tag_name 专题标签 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickTag(topic_name, tag_name) {
      if (tag_name === tagActiveName.value) return;
      context.emit('selectTag', tag_name);
      router.push({
        name: route.name,
        query: {
          topic: topic_name,
          tag: tag_name,
        },
      });
    }

    /**
     * @description: 改变专题页
     * @param {boolean} isPre 是否前一页 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function changePage(isPre) {
      if (isPre) {
        if (topicActivePage.value > 0) --topicActivePage.value;
      } else {
        const len = parseInt(Math.ceil(topics.length / topicsLimit));
        if (topicActivePage.value < len - 1) ++topicActivePage.value;
      }
    }

    // 更新所有tags
    events.on('BaseTopicTags-addTags', (topic_name, tags) => {
      allTopicTags[topic_name] = tags;
    });

    return {
      topicActiveName,
      currentTopics,
      allTopicTags,
      tagActiveName,
      isLogin,
      clickTopic,
      tagManageClick,
      getTags,
      clickTag,
      changePage,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-topic-bar {
  width: 100%;
  height: 44px;
  @include flex(center, center);
  background-color: $grey-0;
  border-top: 1px solid $grey-3;
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.08);

  .base-topic-bar-inner {
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

      .other {
        margin: 0 12px;
        @include flex(center, center);
        cursor: default;
        font-size: 15px;
        color: $grey-9;

        .topic-button {
          margin-left: 6px;
          height: 20px;
          @include flex(center, center, column);

          & > div {
            @include flex(center, center, center);
            width: 100%;
            height: 10px;
            transition: 0.25s;

            &:hover {
              color: $green-0;
            }

            &.up .iconfont {
              transform: rotate(180deg) scale(0.8);
              margin-bottom: -2px;
            }

            &.down .iconfont {
              margin-top: -2px;
            }

            .iconfont {
              font-size: 10px;
              transform: scale(0.8);
            }
          }
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

.base-topic-bar-popover-inner {
  width: 360px;
  overflow: hidden;
  background-color: $grey-0;
  border-radius: $border-radius-0;

  .tags {
    margin: 3px 3px 15px 15px;
    width: 330px;
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
      background-color: $grey-3;
      overflow: hidden;
      color: $grey-8;
      transition: 0.25s;

      &:hover {
        color: $green-1;
      }

      &.tag-active {
        color: $grey-0;
        background-color: $green-0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
