<!--
 * @Description: 博客全部标签页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-24 18:26:04
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-19 20:11:52
-->
<template>
  <div class="blog-tags">
    <div class="blog-tags-head">
      <div class="left-icon">
        <i class="iconfont blog-biaoqian"></i>
      </div>
      <div class="blog-tag-content">文章标签</div>
    </div>
    <div class="blog-tags-show">
      <div
        v-for="tag in randomTags"
        :key="tag.name"
        class="tag-item"
        :style="{left: `${tag.position.x}px`, top: `${tag.position.y}px`, fontSize: `${tag.size}px`, color: tag.color}"
      >
        {{tag.text}}
      </div>
    </div>
    <div class="blog-tags-all">
      <base-tag
        :size="38"
        v-for="tag in tags"
        :key="tag.name"
        :text="tag.name"
        :color="tag.color"
        :hover-color="tag.hoverColor"
        :style="{borderRadius: styles.borderRadius1, boxShadow: styles.shadow0, fontSize: '16px', marginRight: '20px', marginBottom: '20px'}"
        :href="tag.url"
      >
        <template #text-after>
          <div class="tags-count">
            {{tag.count}}
          </div>
        </template>
      </base-tag>
    </div>
  </div>

</template>

<script>
import { computed, defineComponent, reactive } from 'vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import { getTags } from '@/network/api/articles';
import { useMessage } from 'naive-ui';
import { circleRandomText } from '@/util/dom';
import styles from '@/assets/style/define.scss';
import { useRoute } from 'vue-router';

/**
 * @description: 博客全部标签页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'blogTags',
  components: {
    BaseTag,
  },
  setup() {
    const msg = useMessage(); // naive-ui 组件 消息
    const tags = reactive([]); //标签数据
    const route = useRoute(); // route
    const username = route.params.username; // 获取博客用户名

    const colorList = [
      // 颜色列表
      [styles.purple0, styles.purple1],
      [styles.orange0, styles.orange1],
      [styles.red0, styles.pink0],
      [styles.yellow0, styles.yellow1],
      [styles.green0, styles.green1],
      [styles.blue0, styles.blue1],
    ];

    /**
     * @description: 随机获取颜色
     * @return {[string, string]} 返回颜色和hover色
     * @author: dreamy-xay
     */
    function randomColor() {
      return colorList[Math.floor(Math.random() * colorList.length)];
    }

    // 生成随机标签位置及颜色
    const randomTags = computed(() => {
      const textList = [];
      for (let item of tags)
        textList.push({
          weight: item.count,
          text: item.name,
        });
      return circleRandomText(
        textList,
        [
          styles.purple0,
          styles.purple1,
          styles.orange0,
          styles.orange1,
          styles.red0,
          styles.pink0,
          styles.yellow0,
          styles.yellow1,
          styles.green0,
          styles.green1,
          styles.blue0,
          styles.blue1,
        ],
        [12, 54],
        {
          x: [0, 920],
          y: [0, 200],
        },
        false
      );
    });

    //获取标签数据
    getTags(username)
      .then((data) => {
        for (let tag of data.tags) {
          const color = randomColor();
          tag.color = color[0];
          tag.hoverColor = color[1];
          tag.url = `/blog/${username}?tag=${tag.id}`;
          delete tag['id'];
          tags.splice(0, 0, tag);
        }
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取标签失败');
      });

    return {
      styles,
      tags,
      randomTags,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-tags {
  @include flex(center, flex-start, column);
  width: 100%;

  .blog-tags-head {
    margin-top: 31px;
    width: 800px;
    height: 80px;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    box-shadow: $shadow-0;
    @include flex(center, center);

    .left-icon {
      height: 100%;
      margin-right: 16px;
      @include flex(center);

      .iconfont {
        font-size: 35px;
        color: $grey-8;
      }
    }

    .blog-tag-content {
      font-size: 32px;
      font-weight: bold;
      color: $grey-8;
    }
  }

  .blog-tags-show {
    margin-top: 16px;
    width: 920px;
    height: 200px;
    position: relative;

    .tag-item {
      position: absolute;
    }
  }

  .blog-tags-all {
    @include flex(flex-start);
    align-content: flex-start;
    flex-wrap: wrap;
    margin-top: 16px;
    margin-bottom: 100px;
    width: 800px;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0; //阴影
    padding: 24px 4px 4px 24px;
    background-color: $grey-0;

    .tags-count {
      margin-left: 6px;
    }
  }
}
</style>
