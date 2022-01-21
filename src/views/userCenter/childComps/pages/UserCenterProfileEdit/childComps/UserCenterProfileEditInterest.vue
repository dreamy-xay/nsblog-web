<!--
 * @Description: 用户中心-个人资料-兴趣标签
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-28 14:54:52
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-20 21:51:24
-->

<template>
  <div
    class="user-center-profile-interest"
    id="interest-topics-tags"
  >
    <div class="user-center-profile-interest-top">
      兴趣标签
    </div>
    <div class="user-center-profile-interest-body">
      <div class="body-show">
        <div class="body-text">兴趣标签</div>
        <div class="body-show-tags">
          <el-tag
            closable
            v-for="(item, index) in selectedTags"
            :key="item"
            @close="deleteTag(index)"
            role="button"
          >
            {{ item }}
          </el-tag>
        </div>
      </div>
      <div class="body-select">
        <div class="body-text">选择标签</div>
        <div class="body-select-tags">
          <div class="select-topic">
            <el-tag
              v-for="(item, index) in allTopicsTags"
              :key="item"
              role="button"
              @click="selectTopic(index)"
              :class="topicActiveIndex === index ? 'active' : ''"
            >
              {{item.topic}}
            </el-tag>
          </div>

          <div class="select-tag">
            <el-tag
              v-for="item in (allTopicsTags.length ? allTopicsTags[topicActiveIndex].tags : [])"
              :key="item"
              role="button"
              @click="addTag(item)"
              :class="tagActiveIndexed(item) ? 'active' : ''"
            >
              {{item}}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { getTopics, getTopicTags } from '@/network/api/topics';
import events from '@/events';
import { useRoute } from 'vue-router';

/**
 * @description: 用户中心-基础资料-兴趣标签
 * @param {Array} selectedTags 选中的兴趣标签 `必传参数`
 * @event addTag 添加兴趣标签 (tag: string) => void
 * @event deleteTag 删除兴趣标签 (index: number) => void
 * @author: Ban
 */
export default defineComponent({
  name: 'UserCenterProfileInterest',
  props: {
    selectedTags: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const route = useRoute();
    const allTopicsTags = reactive([]); // 可选择标签
    const topicActiveIndex = ref(0); // 选中的标签

    /**
     * @description: 通知UserCenter滚动条到底部
     * @return {void}
     * @author: Z_Y_C
     */
    function toBottom() {
      if (route.params['toBottom']) {
        events.emit('UserCenter-toBottom');
      }
    }

    // 获取专题名
    getTopics()
      .then((data) => {
        for (const topic of data.topics)
          allTopicsTags.splice(0, 0, {
            topic: topic,
            tags: [],
          });
        getTopicTags(allTopicsTags[0].topic)
          .then((data) => {
            allTopicsTags[0].tags = data.tags;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(toBottom);
      })
      .catch((error) => {
        toBottom();
        console.log(error);
      });

    /**
     * @description: 删除兴趣标签
     * @param {number} index 选中标签索引 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function deleteTag(index) {
      context.emit('deleteTag', index);
    }

    /**
     * @description: 增加标签
     * @param {string} tag 标签名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function addTag(tag) {
      if (!tagActiveIndexed(tag)) context.emit('addTag', tag);
    }

    /**
     * @description: 选择专题
     * @param {number} index 专题索引 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function selectTopic(index) {
      // 获取标签名
      if (!allTopicsTags[index].tags.length)
        getTopicTags(allTopicsTags[index].topic)
          .then((data) => {
            allTopicsTags[index].tags = data.tags;
            topicActiveIndex.value = index;
          })
          .catch((error) => {
            console.log(error);
          });
      else topicActiveIndex.value = index;
    }

    /**
     * @description: 判断标签是否被选中
     * @param {string} tag 标签名 `必传参数`
     * @return {boolean} 返回标签是否选中
     * @author: dreamy-xay
     */
    function tagActiveIndexed(tag) {
      return props.selectedTags.indexOf(tag) !== -1;
    }

    return {
      deleteTag,
      allTopicsTags,
      topicActiveIndex,
      selectTopic,
      addTag,
      tagActiveIndexed,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-center-profile-interest {
  margin: 16px 0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background: $grey-0;
  // height: 500px;

  .user-center-profile-interest-top {
    @include flex(center);
    height: 44px;
    font-size: 16px;
    box-sizing: border-box;
    padding-left: 24px;
    border-bottom: 1px solid $grey-4;
  }

  .user-center-profile-interest-body {
    box-sizing: border-box;
    padding: 24px 0 24px 24px;

    .body-show-tags {
      margin-left: 24px;
      width: 798px;
      border-bottom: 1px solid $grey-3;
      min-height: 29px;

      ::v-deep(.el-tag) {
        background: $blue-0;
        color: $blue-1;
        border-radius: 13px;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        margin-right: 9px;
        margin-bottom: 4px;
        box-shadow: $shadow-0;

        .el-tag__close {
          &:hover {
            color: $blue-0;
          }
        }
      }
    }
    .body-show,
    .body-select {
      display: flex;
      align-content: flex-start;
      font-size: 14px;
    }

    .body-text {
      color: $grey-7;
    }

    .body-select {
      margin-top: 24px;
      line-height: 25px;

      .body-select-tags {
        margin-left: 12px;
        max-width: 798px;

        .select-topic {
          ::v-deep(.el-tag) {
            background: $grey-1;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            margin-bottom: 14px;
            margin-right: 12px;
            margin-left: 12px;
            border-radius: $border-radius-0;
            color: $grey-7;
            border: none;
            box-shadow: $shadow-0;
            transition: 0.25s;

            &:hover {
              box-shadow: $shadow-2;
              color: $green-1;
            }
          }

          .active {
            box-shadow: $shadow-2;
            color: $green-1;
          }
        }

        .select-tag {
          box-sizing: border-box;
          padding: 0 10px 0 10px;
          width: 798px;
          border-radius: $border-radius-0;
          box-shadow: $shadow-0;
          // margin-right: 24px;
          margin-left: 12px;

          :deep(.el-tag) {
            background: $grey-0;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            margin-bottom: 6px;
            margin-top: 6px;
            margin-right: 10px;
            border-radius: 11px;
            color: $grey-8;
            border: none;
            box-shadow: $shadow-0;
            transition: 0.25s;

            &:hover {
              background: $green-0;
              color: $green-3;
            }
          }

          .active {
            background: $green-0;
            color: $green-3;
            box-shadow: $shadow-0;
          }
        }
      }
    }
  }
}
</style>
