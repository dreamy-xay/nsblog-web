<!--
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-29 17:08:41
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-15 23:38:10
-->

<template>
  <div
    class="blog-main-article"
    id="aaaaaa"
  >
    <div
      class="blog-main-article-context"
      v-for="(item, index) in data"
      :key="index"
      :class="index % 2 ? '' : 'reverse'"
    >
      <div class="image">
        <base-image
          class="image-inner"
          :src="item.cover_image ? item.cover_image :'/article/defaultCoverImage.jpg'"
          :loadError="'/article/defaultCoverImage.jpg'"
          :loading="2"
        />
      </div>
      <div class="context">
        <div class="context-top">
          <div class="time">
            <div class="time-icon"><i class="iconfont blog-time"></i></div>
            <div class="time-text">{{dateFormat("YY-mm-dd HH:MM",new Date(item.release_time))}}</div>
          </div>

          <div
            class="title"
            role="button"
            @click="changePage(0,index)"
          >
            {{item.title}}
          </div>

          <div class="number">
            <div
              v-for="(icon, i) in iconData"
              :key="i"
              class="number-context"
              @click="i==2 ? changePage(1,index):''"
              :role="i==2 ? 'button' : ''"
            >
              <div class="number-context-icon"><i :class="'iconfont blog-'+icon"></i></div>
              <div class="number-context-text">{{i==0 ? item.page_view + ' 热度' : i==1 ? item.comment_count+' 评论' : item.nickname}}</div>
            </div>
          </div>

          <div class="abstract">摘要：{{item.content}} </div>

        </div>
        <a
          class="context-bottom"
          role="button"
          @click="changePage(0,index)"
        >
          <div class="text">阅读全文</div>
          <div class="icon"><i class="iconfont blog-kuaijin"></i></div>
        </a>
      </div>

    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';
import router from '@/router';
import { dateFormat } from '@/util/date';

/**
 * @description:
 * @param {Array} data 展示文章数据 `必传参数`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'blogMainArticle',
  components: { BaseImage },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  setup(props) {
    const iconData = ['yulan', 'huifu1', 'ren'];

    /**
     * @description: 页面跳转
     * @param {Number} type 跳转类型 0：跳转全文 1：跳转主页
     * @param {Number} index 数据下标
     * @return {Void}
     * @author: Z_Y_C
     */
    function changePage(type, index) {
      if (type == 0) router.push('/article/' + props.data[index].id);
      else router.push('/user/' + props.data[index].username);
    }

    return {
      iconData,
      changePage,
      dateFormat,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-main-article {
  width: 100%;
  margin-top: 20px;
  transition: 0.25s;

  .blog-main-article-context {
    @include flex(center);
    width: 100%;
    height: 300px;
    background-color: $grey-0;
    border-radius: $border-radius-0;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
    margin-bottom: 40px;
    transition: 0.25s;
    overflow: hidden;

    &:hover .image .image-inner {
      transform: scale(1.2);
    }

    .image {
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: 0.25s;
      background-color: rgba($green-0, 0.5);

      .image-inner {
        transition: 0.25s;
      }
    }

    .context {
      width: calc(50% - 32px);
      height: calc(100% - 46px);
      padding: 16px 16px 30px 16px;
      @include flex(initial, space-between, column);

      .context-top {
        .time {
          @include flex(center);
          color: $grey-7;
          height: 16px;
          margin-bottom: 16px;

          .time-icon {
            @include flex(center);
            height: 16px;
            margin-right: 5px;

            .iconfont {
              font-size: 14px;
            }
          }

          .time-text {
            @include flex(center);
            font-size: 12px;
            height: 16px;
          }
        }

        .title {
          width: 100%;
          @include word-break;
          @include ellipsis(2);
          font-size: 18px;
          color: $grey-11;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .number {
          @include flex(center);
          height: 14px;
          margin-bottom: 20px;

          .number-context {
            @include flex(center);
            margin-right: 10px;
            color: $grey-7;
            height: 100%;

            .number-context-icon {
              @include flex(center);
              margin-right: 5px;
              height: 100%;

              .iconfont {
                font-size: 14px;
              }
            }

            .number-context-text {
              @include flex(center);
              font-size: 12px;
              height: 100%;
            }
          }
        }

        .abstract {
          width: 100%;
          @include word-break;
          @include ellipsis(3);
          color: $grey-7;
          font-size: 12px;
          line-height: 28px;
        }
      }

      .context-bottom {
        @include flex(center);
        color: $grey-10;
        height: 20px;
        width: 85px;
        transition: 0.25s;

        &:hover {
          color: $green-1;
        }

        .text {
          font-size: 15px;
          @include flex(center);
          margin-right: 5px;
        }

        .icon {
          height: 20px;
          @include flex(center);

          .iconfont {
            font-size: 18px;
          }
        }
      }
    }

    &:hover {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.48);
    }
  }

  .reverse {
    @include flex(center, initial, row-reverse);
  }
}
</style>
