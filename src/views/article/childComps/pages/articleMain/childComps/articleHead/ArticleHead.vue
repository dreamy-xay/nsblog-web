<!--
 * @Description: 文章页面头部
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 17:51:15
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-27 16:55:18
-->
<template>
  <div class="article-head">
    <article-head-background :background-image="data.cover_image" />
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
          :href="`/blog/${data.username}?category=${item.id}`"
          :target="`/blog/${data.username}?category=${item.id}`"
          :text="item.name"
          :key="index"
          :style="{borderRadius: '3px', letterSpacing: '1.5px'}"
        />
        <base-tag
          :color="styles.blue0"
          :hover-color="styles.blue1"
          v-for="(item, index) in data.tags"
          :href="`/blog/${data.username}?tag=${item.id}`"
          :target="`/blog/${data.username}?tag=${item.id}`"
          :text="item.name"
          :key="index"
          :style="{borderRadius: '3px', letterSpacing: '1.5px'}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import ArticleHeadBackground from '@/views/article/childComps/pages/articleMain/childComps/articleHead/childComps/ArticleHeadBackground.vue';
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
      required: true,
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
    function typingRun(value) {
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

    // dom加载完后执行
    onMounted(() => {
      if (props.data.title) typingRun(props.data.title);
    });

    // 监听标题，执行打字效果
    watch(
      () => props.data.title,
      (value) => {
        if (value) typingRun(value);
      }
    );

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
          value: props.data.nickname,
        },
        {
          icon: 'blog-time',
          value: dateFormat('YY/mm/dd HH:MM', new Date(props.data.release_time)),
        },
        {
          icon: 'blog-browse',
          value: getSplitNum(props.data.page_view),
        },
        {
          icon: 'blog-interactive',
          value: getSplitNum(props.data.comment_count),
        },
        {
          icon: 'blog-hot',
          value: getSplitNum(props.data.recommend_count),
        },
        {
          icon: 'blog-wenzi',
          value: getSplitNum(props.data.length),
        },
        {
          icon: 'blog-zhuanlan',
          value: props.data.topic_tag,
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
      else if (index === infoList.value.length - 1) console.log('click topics tags' + props.data.topic_tag);
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
  background-color: $grey-0;
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
