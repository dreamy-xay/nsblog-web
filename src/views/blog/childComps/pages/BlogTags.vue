<!--
 * @Description: 博客全部标签页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-24 18:26:04
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-15 17:06:29
-->
<template>
  <div class="blog-tags">
    <div class="blog-tag">
      <div class="left-icon">
        <i class="iconfont blog-biaoqian"></i>
      </div>
      <div class="blog-tag-content">文章标签</div>
    </div>
    <div class="blog-show">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="showtag"
        :class="col[index%4]"
        :style="{
            left:`${Math.random()*921}px`,
            top:`${Math.random()*150}px`,
            'font-size':`${10+Math.random()*51}px`,
            }"
      >
        <div>
          {{tag.name}}
        </div>
      </div>
    </div>
    <div class="blog-alltags">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="tag-name"
        :class="tagn[index%4]"
        role="button"
      >
        <div class="tag-name-content">{{tag.name}}</div>
        <div class="tag-name-number">117</div>
      </div>
    </div>
  </div>

</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { getTags } from '@/network/api/articles';
import { useMessage } from 'naive-ui';

/**
 * @description: 博客全部标签页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'blogTags',
  setup(props) {
    const tags = reactive([]); //标签数据
    const msg = useMessage(); // naive-ui 组件

    //获取标签数据
    getTags('dreamy', 0)
      .then((data) => {
        console.log(data);
        tags.splice(0, 0, ...data.tags);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取标签失败', { duration: 2000, closable: true });
      });

    return {
      tags,
      tagn: ['tag1', 'tag2', 'tag3', 'tag4'], //字体颜色
      col: ['col1', 'col2', 'col3', 'col4'], //背景颜色
    };
  },
});
</script>
g
<style lang="scss" scoped>
.blog-tags {
  @include flex(center, flex-start, column);
  width: 100%;

  .blog-tag {
    margin-top: 31px;
    width: 800px;
    height: 80px;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    box-shadow: $shadow-0; //阴影
    @include flex(center, center, row);

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
      font-family: Arial;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      color: $grey-8;
    }
  }

  .blog-show {
    margin-top: 16px;
    width: 920px;
    height: 200px;
    position: relative;

    .showtag {
      position: absolute;
    }
  }

  .blog-alltags {
    @include flex(first-start, center, row);
    align-content: flex-start;
    flex-wrap: wrap;
    margin-top: 16px;
    margin-bottom: 40px;
    width: 800px;
    height: 558px;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0; //阴影
    padding: 24px;
    padding-right: 4px;
    padding-bottom: 3px;
    background-color: $grey-0;

    .tag-name {
      width: auto;
      height: 38px;
      border-radius: $border-radius-0;
      margin-right: 20px;
      margin-bottom: 21px;
      box-shadow: $shadow-0; //阴影
      @include flex(center, center);

      .tag-name-content {
        font-size: 16px;
        color: $grey-10;
        margin-right: 5px;
        margin-left: 10px;
      }

      .tag-name-number {
        font-size: 16px;
        color: $grey-7;
        margin-right: 10px;
      }

      &.tag-name-item {
        box-shadow: $shadow-2;
      }
    }
  }

  .tag1 {
    background-color: $purple-0;
  }
  .tag2 {
    background-color: $orange-0;
  }
  .tag3 {
    background-color: $red-0;
  }
  .tag4 {
    background-color: $yellow-0;
  }

  .col1 {
    color: $green-1;
  }
  .col2 {
    color: $green-2;
  }
  .col3 {
    color: $green-3;
  }
  .col4 {
    color: $green-4;
  }
}
</style>
