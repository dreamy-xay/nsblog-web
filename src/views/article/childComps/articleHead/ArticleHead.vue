<!--
 * @Description: 文章页面头部
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 17:51:15
<<<<<<< HEAD
 * @LastEditors: clq
 * @LastEditTime: 2021-09-20 19:51:29
=======
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-20 17:56:10
>>>>>>> 85dc7c38633746f591ea8de41709462c1132f7f7
-->
<template>
  <div class="article-head">
    <article-head-background />
    <div class="article-head-inner">
      <div class="title">
        <span>{{articleTitle}}</span>
        <span :style="{visibility: visibility ? 'visible' : 'hidden'}">_</span>
      </div>
      <div class="info">
        <div
          class="info-item"
          v-for="(item, index) in infoList"
          :key="index"
          :role="index === infoList.length - 1 || index === 0 ? 'button' : null"
          @click="clickInfoItem(index)"
        >
          <div>
            <i
              class="iconfont"
              :class="item.icon"
            ></i>
          </div>
          {{item.value}}
        </div>
      </div>
      <div class="tags">
        <base-tag
          :color="styles.orange0"
          :hover-color="styles.orange1"
          v-for="(item, index) in data.categories"
          :text="item"
          :key="index"
          :style="{borderRadius: '3px', letterSpacing: '1.5px'}"
        />
        <base-tag
          :color="styles.blue0"
          :hover-color="styles.blue1"
          v-for="(item, index) in data.tags"
          :text="item"
          :key="index"
          :style="{borderRadius: '3px', letterSpacing: '1.5px'}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import ArticleHeadBackground from '@/views/article/childComps/articleHead/childComps/ArticleHeadBackground.vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import { dateFormat } from '@/util/date';
import { getSplitNum } from '@/util/util';
import styles from '@/assets/style/define.scss';

/**
 * @description: 文章页面头部
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'articleHead',
  components: {
    ArticleHeadBackground,
    BaseTag,
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
          username: 'dreamy',
          categories: ['测试进阶知识系列 - PYTHON'],
          tags: ['PYTHON'],
        };
      },
    },
  },
  setup(props) {
    const articleTitle = ref(''); // 文章标题

    /**
     * @description: 标题打字效果
     * @param {string} value 需要打字的文字 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function typingRun(value = '比培训机构还详细的 Python 学习路线，你信吗 0^0') {
      let timer = null;
      let index = 0;
      function typing() {
        if (index < value.length) {
          articleTitle.value = value.slice(0, index++);
          timer = setTimeout(typing, 200);
        } else {
          articleTitle.value = value;
          clearTimeout(timer);
        }
      }

      typing();
    }

    // dom加载完成后，执行打字效果
    onMounted(() => {
      typingRun();
    });

    // 打字闪烁
    const visibility = ref(true);
    setInterval(() => {
      visibility.value = !visibility.value;
    }, 400);

    // infoList 详细信息
    const infoList = computed(() => {
      return [
        {
          icon: 'blog-zuozhe',
          value: props.data.username,
        },
        {
          icon: 'blog-time',
          value: dateFormat('YY/mm/dd HH:MM', new Date()),
        },
        {
          icon: 'blog-browse',
          value: 28,
        },
        {
          icon: 'blog-interactive',
          value: 3,
        },
        {
          icon: 'blog-hot',
          value: 15,
        },
        {
          icon: 'blog-wenzi',
          value: getSplitNum(5876),
        },
        {
          icon: 'blog-zhuanlan',
          value: 'Python',
        },
      ];
    });

    /**
     * @description: 点击infoItem触发事件
     * @param {number} index 点击icon的索引 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickInfoItem(index) {
      if (index === 0) window.open(`/user/${props.data.username}`, `/user/${props.data.username}`);
      else if (index === infoList.value.length - 1) console.log('click topics tags');
    }

    return {
      styles,
      articleTitle,
      visibility,
      infoList,
      clickInfoItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-head {
  width: 100%;
  height: 288px;
  position: relative;
  @include flex(center, center);
  box-shadow: 0 1px 2px rgba($grey-8, 70%);

  .article-head-inner {
    position: relative;
    width: 80%;
    padding: 10px;
    @include flex(center, center, column);

    .title {
      font-size: 35px;
      font-weight: 700;
      color: $grey-0;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);

      span:last-child {
        margin-left: 8px;
      }
    }

    .info {
      width: 100%;
      @include flex(center, center);
      flex-flow: row wrap;
      margin-top: 10px;
      color: $grey-0;
      transform: scale(1, 1.1);

      .info-item {
        user-select: all;
        height: 100%;
        @include flex(center, center);
        margin-right: 12px;
        font-size: 16px;
        font-weight: 700;
        color: rgba($grey-0, 0.9);
        text-shadow: 0 3px 6px rgb(0 0 0 / 50%);

        div {
          height: 14px;
          width: 14px;
          margin-right: 4px;
          @include flex(center, center);

          .iconfont {
            font-size: 13px;
            font-weight: 600;
          }
        }
      }
    }

    .tags {
      width: 100%;
      margin-top: 7.5px;
      @include flex(center, center);
      flex-flow: row wrap;
      font-family: Arial, 'Microsoft YaHei', '微软雅黑', sans-serif;

      & > div {
        margin: 2.5px 0;
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
