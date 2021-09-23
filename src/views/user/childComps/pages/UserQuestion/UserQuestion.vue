<!--
 * @Description: 用户主页问答记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-20 17:16:11
-->
<template>
  <div class="user-question">
    <div class="user-question-top">
      <div class="user-question-top-left">
        <div
          class="text"
          role="button"
          @click="changeQuestionSwitch(true)"
          :class="questionSwitch ? 'text-click ' :''"
        >回答的问题</div>
        <div class="line"></div>
        <div
          class="text"
          role="button"
          @click="changeQuestionSwitch(false)"
          :class="questionSwitch ? '' : 'text-click'"
        >发布的提问</div>
      </div>
      <user-sort
        @changeSort="Sort"
        :sortFlag="questionSwitch ? sorts[0]:sorts[1]"
      />

    </div>

    <user-question-switch
      v-if="questionSwitch"
      :question="questionSwitch"
      :self="isSelf"
      :data="answerData"
      :privacy="Boolean(privacySetting.view_ask)"
      :loading="loading[0]"
      @addData="addDatas"
    />

    <user-question-switch
      v-else
      :question="questionSwitch"
      :self="isSelf"
      :data="questionData"
      :privacy="Boolean(privacySetting.view_ask)"
      :loading="loading[1]"
      @addData="addDatas"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { mapState } from '@/util/store';
import { useRoute } from 'vue-router';
import UserSort from '@/views/user/childComps/UserSort.vue';
import UserQuestionSwitch from '@/views/user/childComps/pages/UserQuestion/childComps/UserQuestionSwitch.vue';
import { getQuestions, getReplies } from '@/network/api/questions';
import { useMessage } from 'naive-ui';

/**
 * @description: 用户主页问答记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userQuestion',
  components: { UserSort, UserQuestionSwitch },
  setup() {
    const msg = useMessage(); // naive-ui
    const questionSwitch = ref(true); // true 回答页面 false 提问页面
    const answerData = reactive([]); //回答数据
    const questionData = reactive([]); // 提问数据
    const route = useRoute(); // route
    const username = route.params.username; // 获取路由的username
    const { tokenInfo } = mapState('global', ['tokenInfo']);
    const isSelf = username === tokenInfo.value.username; // 判断是否自己登录
    const loading = reactive([false, false]); // 按钮状态
    const sorts = reactive([1, 1]); // 排序方法 sorts[0]:回答页面 sorts[1]:提问页面
    const limit = 5; // 获取数据数量

    /**
     * @description: 改变页面
     * @param {Boolean} data true 回答页面 false 提问页面
     * @return {Void}
     * @author: Z_Y_C
     */
    function changeQuestionSwitch(data) {
      questionSwitch.value = data;
    }

    /**
     * @description: 排序方式
     * @param {Number} index 1: 时间升序 2:时间降序 3:访问量升序 4:访问量降序
     * @return {Void}
     * @author: Z_Y_C
     */
    function Sort(index) {
      if (questionSwitch.value) {
        if (sorts[0] !== index) {
          sorts[0] = index;
          getReplies(username, 0, limit, getSort(1, sorts[0]), getSort(2, sorts[0]))
            .then((data) => {
              loading[0] = data.replies.length === limit;
              answerData.splice(0, answerData.length, ...data.replies);
            })
            .catch((error) => {
              console.log(error);
              msg.error('获取回答的问题失败', { duration: 2000, closable: true });
            });
        }
      } else {
        if (sorts[1] !== index) {
          sorts[1] = index;
          getQuestions(username, 0, limit, getSort(1, sorts[1]), getSort(2, sorts[1]))
            .then((data) => {
              loading[1] = data.questions.length === limit;
              questionData.splice(0, questionData.length, ...data.questions);
            })
            .catch((error) => {
              console.log(error);
              msg.error('获取发布的提问失败', { duration: 2000, closable: true });
            });
        }
      }
    }

    /**
     * @description: 处理排序标记
     * @param {Number} type 第几个参数 1:按时间排序 2:按访问量排序
     * @param {Number} data 处理的排序数据 sorts[0]:回答页面 sorts[1]:提问页面
     * @return {Number} type=1:按时间排序 data(1: 时间升序 2:时间降序) type=2:按访问量排序 data(3:访问量升序 4:访问量降序)
     * @author: Z_Y_C
     */
    function getSort(type, data) {
      if (type === 1) {
        if (data === 1) return 1;
        else if (data === 2) return -1;
        else return 0;
      } else if (type === 2) {
        if (data === 3) return 1;
        else if (data === 4) return -1;
        else return 0;
      } else return 0;
    }

    // 获取回答页面数据
    getReplies(username, 0, limit, getSort(1, sorts[0]), getSort(2, sorts[0]))
      .then((data) => {
        loading[0] = data.replies.length === limit;
        answerData.splice(0, 0, ...data.replies);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取回答的问题失败', { duration: 2000, closable: true });
      });

    // 获取提问页面数据
    getQuestions(username, 0, limit, getSort(1, sorts[1]), getSort(2, sorts[1]))
      .then((data) => {
        loading[1] = data.questions.length === limit;
        questionData.splice(0, 0, ...data.questions);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取发布的提问失败', { duration: 2000, closable: true });
      });

    /**
     * @description: 点击添加数据
     * @param {Boolean} data 添加哪个页面数据 true 回答页面 false 提问页面
     * @return {Void}
     * @author: Z_Y_C
     */
    function addDatas(data) {
      if (data) {
        getReplies(username, answerData.length, limit, getSort(1, sorts[0]), getSort(2, sorts[0]))
          .then((data) => {
            loading[0] = data.replies.length === limit;
            answerData.splice(0, 0, ...data.replies);
          })
          .catch((error) => {
            console.log(error);
            msg.error('获取回答的问题失败', { duration: 2000, closable: true });
          });
      } else {
        getQuestions(username, questionData.length, limit, getSort(1, sorts[1]), getSort(2, sorts[1]))
          .then((data) => {
            console.log(data);
            loading[1] = data.questions.length === limit;
            questionData.splice(0, 0, ...data.questions);
          })
          .catch((error) => {
            console.log(error);
            msg.error('获取发布的提问失败', { duration: 2000, closable: true });
          });
      }
    }

    return {
      ...mapState('user', ['privacySetting'], addDatas),
      isSelf,
      questionSwitch,
      changeQuestionSwitch,
      Sort,
      answerData,
      questionData,
      loading,
      addDatas,
      sorts,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-question {
  width: 100%;

  .user-question-top {
    @include flex(center, space-between);
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    height: 36px;
    padding: 0 16px;
    margin-bottom: 16px;

    .user-question-top-left {
      @include flex(center);

      .text {
        font-size: 14px;
        color: $grey-7;
        transition: 0.25s;

        &:hover {
          color: $green-0;
        }
      }

      .line {
        margin: 0 16px;
        height: 14px;
        border-left: 1px solid $grey-4;
      }

      .text-click {
        color: $green-0;
      }
    }
  }
}
</style>
