<!--
 * @Description: 创建问答模态框
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-20 17:15:26
 * @LastEditors: clq
 * @LastEditTime: 2022-01-25 21:29:30
-->
<template>
  <n-modal
    display-directive="show"
    :show="modelValue"
  >
    <div class="question-create-question">
      <div class="question-create-question-header">
        <div
          class="close-btn"
          role="button"
          @click="closeModel"
        >
          <i class="iconfont blog-cha"></i>
        </div>
        <div class="title">提问题</div>
      </div>
      <div class="question-create-question-body">
        <div class="body-top">
          <base-input
            v-model="title"
            :style="{width: '100%',height: '36px'}"
          />
        </div>
        <div class="body-tags">
          <div class="title">问题标签</div>
          <div class="tags-container">
            <template v-if="selectTags.length == 0">最多选择3个标签</template>
            <template v-else>
              <div
                v-for="(item,index) in selectTags"
                :key="index"
                class="tag-item"
              >
                <div>{{item.tag}}</div>
                <div
                  class="icon"
                  role="button"
                  @click="deleteTag(index)"
                >
                  <i class="iconfont blog-cha"></i>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="body-middle">
          <div class="title">添加标签</div>
          <div class="select">
            <base-select
              :sdata="topics"
              :show-text="topicShowText"
              :swidth="150"
              @changeItem="changeTopic"
            />
          </div>
          <div class="select">
            <base-select
              :sdata="topicTags"
              :show-text="tagShowText"
              :swidth="150"
              :disabled="tagdisable"
              @changeItem="changeTag"
            />
          </div>
        </div>
        <div class="body-bottom body-bottom-edit-shadow">
          <v-md-editor
            v-model="text"
            mode="edit"
            left-toolbar="undo redo clear| bold link code quote"
            height="320px"
          />
        </div>
      </div>
      <div class="question-create-question-footer">
        <div
          class="btn"
          role="button"
          @click="release"
        >发布提问</div>
      </div>
    </div>
  </n-modal>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseSelect from '@/components/content/baseSelect/BaseSelect.vue';
import BaseInput from '@/components/content/baseInput/BaseInput.vue';
import { getTopics, getTopicTags } from '@/network/api/topics';
import { releaseQuestion } from '@/network/api/questions';
import { mapState } from '@/util/store';
import { useMessage } from 'naive-ui';

/**
 * @description: 创建问答模态框
 * @param {Boolean} modelValue 模态框显示绑定值，使用v-model指令即可 `默认为false`
 * @author: clq
 */

export default defineComponent({
  name: 'questionCreateQuestion',
  components: {
    BaseSelect,
    BaseInput,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui 消息组件
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 用户数据
    const username = tokenInfo.value.username; // 用户名
    let title = ref('');
    let text = ref('');
    let selectTags = reactive([]); // 被选择的标签
    let topics = reactive([]); // 待选择的topic
    let topicIndex = ref(0); // 当前topic的索引
    let topicShowText = ref('请选择'); // 选择框显示文本
    let topicTags = reactive([]); // 被选择topic对应的tags
    let tagShowText = ref('请选择'); // 选择框显示文本
    let tagdisable = ref(true); // tag选择器禁用标志

    // 获取标签
    getTopics()
      .then((data) => {
        console.log('topics');
        console.log(data);
        for (let item of data.topics) {
          topics.splice(0, 0, item);
        }
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取topic失败');
      });

    /**
     * @description: 更新tags
     * @param {string} topicName
     * @return {void}
     * @author: clq
     */
    function updateTags(topicName) {
      getTopicTags(topicName)
        .then((data) => {
          console.log('topicTags');
          console.log(data);
          // 过滤topicTags中已被选择的tag
          for (let item of selectTags) {
            if (item.topic == topics[topicIndex.value])
              for (let i = 0; i < data.tags.length; i++) {
                if (item.tag == data.tags[i]) data.tags.splice(i, 1);
              }
          }
          // 更新topicTags
          topicTags.splice(0, topicTags.length);
          for (let item of data.tags) {
            topicTags.splice(0, 0, item);
          }
          tagdisable.value = false;
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取tag失败');
        });
    }

    /**
     * @description: 关闭窗口
     * @return {void}
     * @author: clq
     */
    function closeModel() {
      context.emit('update:modelValue', false);
    }

    /**
     * @description: 删除已选标签
     * @param {number} index 待删除标签对应数组下标
     * @return {void}
     * @author: clq
     */
    function deleteTag(index) {
      if (selectTags[index].topic == topics[topicIndex.value]) topicTags.splice(0, 0, selectTags[index].tag);
      selectTags.splice(index, 1);
    }

    /**
     * @description: 发布问答
     * @return {void}
     * @author: clq
     */
    function release() {
      console.log('title: ' + title.value);
      console.log('text: ' + text.value);
      console.log('tags');
      console.log(selectTags);
      let flag = true;
      if (!title.value) msg.error('标题不能为空'), (flag = false);
      if (!selectTags.length) msg.error('标签不能为空'), (flag = false);
      if (!text.value) msg.error('内容不能为空'), (flag = false);
      if (flag)
        releaseQuestion(username, title.value, text.value, selectTags)
          .then(() => {
            msg.success('发布成功');
            closeModel();
          })
          .catch((error) => {
            console.log(error);
            msg.error('发布失败');
          });
    }

    /**
     * @description: 更改topic
     * @param {number} newIndex 新选项索引
     * @return {void}
     * @author: clq
     */
    function changeTopic(newIndex) {
      console.log('newTopic: ' + topics[newIndex]);
      topicShowText.value = topics[newIndex];
      topicIndex.value = newIndex;
      updateTags(topics[newIndex]);
    }

    /**
     * @description: 更改tag
     * @param {number} newIndex 新选项索引
     * @return {void}
     * @author: clq
     */
    function changeTag(newIndex) {
      console.log('newTag: ' + topicTags[newIndex]);
      if (selectTags.length < 3) {
        tagShowText.value = topicTags[newIndex];
        let obj = {};
        obj.topic = topics[topicIndex.value];
        obj.tag = topicTags[newIndex];
        selectTags.push(obj);
        // 从可选项中删除tag
        topicTags.splice(newIndex, 1);
      } else {
        msg.warning('最多选择三个标签');
      }
    }

    return {
      title,
      text,
      selectTags,
      topics,
      topicTags,
      topicShowText,
      tagShowText,
      tagdisable,
      closeModel,
      deleteTag,
      release,
      changeTopic,
      changeTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-create-question {
  width: 800px;
  border-radius: $border-radius-0;
  background-color: $grey-0;

  & > div {
    width: 100%;
  }

  .question-create-question-header {
    @include flex(center, initial, row-reverse);
    box-sizing: border-box;
    height: 54px;
    padding: 16px 18px 15px;
    border-bottom: 1px solid $grey-2;
    text-align: center;
    line-height: 54px;

    .title {
      margin-right: 340px;
      font-size: 16px;
      font-weight: 700;
      color: $grey-11;
      line-height: 22px;
    }

    .close-btn {
      width: 28px;
      height: 28px;
      border-radius: $border-radius-1;
      color: $grey-7;
      line-height: 28px;
      text-align: center;
      transition: all 0.25s;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
        background-color: $grey-2;
      }
    }
  }

  .question-create-question-body {
    box-sizing: border-box;
    width: 100%;
    padding: 16px 24px 30px;
    border-bottom: 1px solid $grey-2;

    .body-top {
      margin-bottom: 16px;
    }

    .body-tags {
      @include flex(center);
      box-sizing: border-box;
      margin-bottom: 16px;

      .title {
        width: 56px;
        margin-right: 32px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: $grey-8;
        line-height: 36px;
      }

      .tags-container {
        @include flex(center);
        width: 664px;
        height: 36px;
        border-bottom: 1px solid $grey-8;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        line-height: 36px;
        color: $grey-6;

        .tag-item {
          @include flex(center);
          padding: 0px 10px;
          height: 25px;
          margin-right: 9px;
          background: $green-0;
          border-radius: 13px;
          box-shadow: $shadow-0;
          font-size: 14px;
          line-height: 25px;
          color: $green-2;

          .icon {
            width: 24px;
            height: 24px;
            margin-left: 5px;
            border-radius: 50%;
            transform: scale(0.583);
            font-size: 12px;
            line-height: 24px;
            transition: 0.25s;

            &:hover {
              background-color: $green-2;
              color: $green-0;
            }
          }
        }
      }
    }

    .body-middle {
      @include flex(center);
      height: 36px;
      margin-bottom: 16px;

      .title {
        margin-right: 32px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: $grey-8;
        line-height: 36px;
      }

      .select {
        margin-right: 16px;
      }
    }

    .body-bottom {
      :deep(.v-md-editor) {
        width: 100%;
        z-index: 9999999999;
        box-shadow: $shadow-0;
        border-radius: $border-radius-0;
        transition: 0.25s;
        overflow: hidden;
      }

      &.body-bottom-edit-shadow :deep(.v-md-editor) {
        &:focus-within {
          box-shadow: $shadow-2;
        }

        &:hover {
          box-shadow: $shadow-2;
        }
      }
    }
  }

  .question-create-question-footer {
    box-sizing: border-box;
    width: 100%;
    height: 58px;
    padding-top: 10px;
    .btn {
      width: 100px;
      height: 32px;
      margin: auto;
      background-color: $green-1;
      border-radius: $border-radius-0;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      color: $grey-0;
      line-height: 32px;
      transition: 0.25s;

      &:hover {
        background-color: $green-2;
      }
    }
  }
}
</style>
