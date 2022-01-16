<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-16 23:25:15
-->

<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    bind-class="home"
  >
    <template #top-bar-bottom>
      <div class="home-top-bar">
        <div class="home-top-bar-inner">
          <div class="left">
            <div
              class="topic"
              v-for="(item, index) in topics"
              :class="{'topic-active': topicActiveIndex === index}"
              :key="index"
              role="button"
              @click="clickTopic(index)"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            class="right"
            role="button"
          >标签管理</div>
        </div>
      </div>
    </template>
    <div style="width:100%; height: 3000px; background: #fff;">
      <button @click="gotoNewDialogue">前往新的对话</button><br />
      1 Test <br />2 Test<br />3 Test<br />4 Test<br />5 Test<br />6 Test<br />7 Test<br />8 Test<br />9 Test
      <div style="width: 50%; margin: 20px;">
        <base-content-loading />
      </div>
    </div>

  </base-view>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import router from '@/router';

/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Home',
  components: {
    BaseView,
    BaseContentLoading,
  },
  setup() {
    const topics = reactive([
      // 专题列表
      {
        name: '推荐',
      },
      {
        name: '关注',
      },
      {
        name: '编程开发',
      },
      {
        name: '经验人生',
      },
      {
        name: '设计',
      },
      {
        name: '数学',
      },
      {
        name: '自然学科',
      },
      {
        name: '人工智能',
      },
      {
        name: '工具',
      },
      {
        name: '阅读',
      },
      {
        name: '其他',
      },
    ]);
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

    // 仅供参考，测试私信
    function gotoNewDialogue() {
      router.push({
        name: 'messageMy',
        params: {
          dialogue: JSON.stringify({
            username: 'dreamy-test',
            nickname: '测试账号',
            avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=dreamy-test',
          }),
        },
      });
    }

    return {
      topics,
      topicActiveIndex,
      clickTopic,
      gotoNewDialogue,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-top-bar {
  width: 100%;
  height: 44px;
  @include flex(center, center);
  background-color: $grey-0;
  border-top: 1px solid $grey-3;
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.08);

  .home-top-bar-inner {
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

.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
