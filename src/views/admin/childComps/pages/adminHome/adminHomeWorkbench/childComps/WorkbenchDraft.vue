<!--
 * @Description: 工作台草稿台
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-21 18:37:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-22 17:52:58
-->

<template>
  <div class="workbench-draft">
    <div class="workbench-draft-head">
      <div class="left">
        <div class="icon">
          <i class="iconfont blog-caogaoxiang"></i>
        </div>
        草稿
      </div>
      <div
        class="right"
        role="button"
        v-show="draft.length > 6"
        @click="moreClick"
      >
        更多
      </div>
    </div>
    <div class="workbench-draft-body">
      <div
        class="draft-info"
        v-for="(item, index) in draftList"
        :key="item.id"
        @click="draftClick(item.id)"
        :role="item.id !== null ? 'button' : null"
      >
        <div class="head">
          <div class="emoji">
            {{emoji[index]}}
          </div>
          <div class="title">
            {{item.title}}
          </div>
        </div>
        <div class="content">
          {{item.content}}
        </div>
        <div class="footer">
          <div class="tag">
            <div class="icon">
              <i
                class="iconfont"
                :class="item.id !== null ? 'blog-label_fill' : 'blog-emoji'"
              ></i>
            </div>
            {{item.id !== null ? ['博文','笔记','日志','随笔','作品'][item.type - 1] : '空'}}
          </div>
          <div class="date">
            {{item.id !== null ? dateFormat("YYYY-mm-dd" , new Date(item.release_time)) : ''}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { shuffle } from 'lodash';
import { dateFormat } from '@/utils/date';

/**
 * @description: 工作台草稿台
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'workbenchDraft',
  props: {
    draft: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const emoji = shuffle([
      '🍇',
      '🍈',
      '🍉',
      '🍊',
      '🍋',
      '🍌',
      '🍍',
      '🥭',
      '🍎',
      '🍏',
      '🍐',
      '🍑',
      '🍒',
      '🍓',
      '🫐',
      '🥝',
      '🍅',
      '🫒',
      '🥥',
      '🥑',
      '🍆',
      '🥔',
      '🥕',
      '🌽',
      '🌶️',
      '🫑',
      '🥒',
      '🥬',
      '🥦',
      '🧄',
      '🧅',
      '🍄',
      '🥜',
    ]); // 随机水果表情
    const contentList = shuffle([
      '不要等待机会，而要创造机会。',
      '现在的你决定将来的你。',
      '热情和欲望可以突破一切难关。',
      '路是走出来的，而不是空想出来的。',
      '绳锯木断,水滴石穿。',
      '成名每在穷苦日，败事多因得意时。',
    ]); // 随机励志内容

    /**
     * @description: 随机生成空白的草稿信息
     * @return {Record<string, unkonwn>} 返回空白草稿信息
     * @author: dreamy-xay
     */
    function randomDraftInfo() {
      return {
        id: null,
        title: '暂无内容',
        content: contentList.pop(),
        type: null,
        release_time: '',
      };
    }

    // 计算需要展示的草稿信息
    const draftList = computed(() => {
      const len = props.draft.length;
      if (len <= 6) return [...props.draft, ...[...new Array(6 - len)].map(() => randomDraftInfo())];
      else return props.draft.slice(0, 6);
    });

    /**
     * @description: 点击更多触发函数
     * @return {void}
     * @author: dreamy-xay
     */
    function moreClick() {
      console.log('草稿更多');
    }

    /**
     * @description: 点击了草稿
     * @param {number} draftId 草稿id（文章id） `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function draftClick(draftId) {
      if (draftId !== null)
        // 正常点击
        console.log(`选择草稿:${draftId}`);
    }

    return {
      emoji,
      dateFormat,
      draftList,
      moreClick,
      draftClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.workbench-draft {
  margin-top: 16px;
  height: 354px;
  width: 100%;
  border-radius: $border-radius-1;
  background-color: $grey-0;
  @include flex(center, center, column);
  overflow: hidden;

  & > div {
    width: 100%;
    box-sizing: border-box;
  }

  .workbench-draft-head {
    height: 58px;
    font-size: 16px;
    color: $grey-10;
    border-bottom: 1px solid $grey-4;
    padding: 0 24px;
    @include flex(center, space-between);

    .left,
    .right {
      height: 100%;
      @include flex(center);
    }

    .icon {
      margin-right: 6px;
      width: 16px;
      height: 16px;
      @include flex(center, center);

      .iconfont {
        font-size: 18px;
        margin-bottom: 1px;
      }
    }

    .right {
      color: $blue-1;
      transition: 0.25s;

      &:hover {
        color: $blue-2;
      }
    }
  }

  .workbench-draft-body {
    @include flex(center, center);
    flex-wrap: wrap;
    height: 296px;

    .draft-info {
      height: 148px;
      width: 33.333333333334%;
      box-sizing: border-box;
      padding: 24px;
      background-color: $grey-0;
      transition: 0.25s;
      @include flex(center, center, column);
      user-select: none;

      & > div {
        width: 100%;
      }

      &[role='button']:hover {
        background-color: $grey-1;

        .title {
          color: $blue-1;
          transform: scale(1.05);
        }
      }

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        border-bottom: 1px solid $grey-4;
      }

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(4),
      &:nth-child(5) {
        border-right: 1px solid $grey-4;
      }

      .head {
        height: 30px;
        line-height: 30px;
        margin-bottom: 8px;
        @include flex(center);

        .emoji {
          font-size: 28px;
          margin-left: -4px;
          margin-right: 8px;
        }

        .title {
          font-size: 18px;
          font-weight: 700;
          color: $grey-10;
          @include ellipsis(1);
          transition: 0.25s;
        }
      }

      .content {
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        color: $grey-10;
        @include ellipsis(1);
        margin-bottom: 20px;
      }

      .footer {
        height: 22px;
        @include flex(center, space-between);
        color: $grey-8;
        font-size: 14px;

        & > div {
          height: 100%;
          @include flex(center);
        }

        .icon {
          margin-right: 6px;
          width: 16px;
          height: 16px;
          @include flex(center, center);

          .iconfont {
            font-size: 16px;
            margin-bottom: 1px;
          }
        }
      }
    }
  }
}
</style>
