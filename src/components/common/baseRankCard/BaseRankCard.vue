<!--
 * @Description: 基础排行榜小组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-15 09:05:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-29 22:20:32
-->
<template>
  <div
    class="base-rank-card"
    :style="style"
  >
    <div class="base-rank-card-head">
      <div class="title">
        {{ title }}
      </div>
      <div
        class="menu"
        v-if="menuList.length"
      >
        <div
          class="menu-item"
          v-for="(item, index) in menuList"
          :class="{'menu-item-active': index === activeIndex}"
          :key="item"
          role="button"
          @click="clickMenuItem(index, item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="base-rank-card-body">
      <a
        class="info-item"
        v-for="(item, index) in data"
        :href="isUser ? `/user/${item[dataKey[0]]}` : item[dataKey[0]]"
        :target="isUser ? `/user/${item[dataKey[0]]}` : item[dataKey[0]]"
        :key="index"
        role="button"
      >
        <div class="info-item-inner">
          <div class="number">
            {{ index + 1 }}
          </div>
          <div
            class="user"
            v-if="isUser"
          >
            <base-avatar
              :src="item[dataKey[2]]"
              :alt="item[dataKey[1]]"
              :size="22"
            />
            <div class="user-info">
              <div class="nickname">
                {{ item[dataKey[1]] }}
              </div>
              <div class="count">
                {{ item[dataKey[3]] }}
              </div>
            </div>
          </div>
          <div
            class="content"
            v-else
          >
            {{ item[dataKey[1]] }}
          </div>
        </div>
      </a>
    </div>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';

/**
 * @description: 基础排行榜小组件
 * @param {String} title 小组件标题 `默认为 ''`
 * @param {Array} menuList 小组件菜单列表，为空时表示没有菜单 `默认为 []`
 * @param {Array} data 排行数据 `默认为 []`
 * @param {Array} dataKey 数据对象的key列表 1=>[obj.url, obj.title](内容排行) 2=>['obj.username, obj.nickname, obj.avatar, obj.count'](用户排行) `默认为 ['url', 'title']`
 * @param {Boolean} isUser 是否为用户列表模式 `默认为false`
 * @param {Object} style 最外层样式 `默认为 null`
 * @event clickMenuItem 选择某一项菜单时触发 (index: number, item: string) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseRankingList',
  components: {
    BaseAvatar,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    menuList: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    dataKey: {
      type: Array,
      default: () => ['url', 'title'],
    },
    isUser: {
      type: Boolean,
      default: false,
    },
    style: {
      type: Object,
      default: null,
    },
  },
  setup(_, context) {
    const activeIndex = ref(0); // 菜单当前激活索引

    /**
     * @description: 更新类型列表下标
     * @param {number} index 选择的下标 `必传参数`
     * @param {string} item 选中的菜单名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickMenuItem(index, item) {
      if (index === activeIndex.value) return;
      activeIndex.value = index;
      context.emit('clickMenuItem', index, item);
    }

    return {
      activeIndex,
      clickMenuItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-rank-card {
  width: 284px;
  background: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  @include flex(center, center, column);

  .base-rank-card-head {
    width: 252px;
    height: 24px;
    padding: 16px;
    @include flex(center, space-between);

    .title {
      font-size: 14px;
      font-weight: 700;
      color: $grey-10;
    }

    .menu {
      height: 100%;
      @include flex(center);

      .menu-item {
        height: 24px;
        width: 38px;
        margin-right: 4px;
        @include flex(center, center);
        background-color: $grey-0;
        font-size: 12px;
        color: $grey-7;
        border-radius: $border-radius-0;
        transition: 0.25s;

        &:last-child {
          margin-right: 0;
        }

        &.menu-item-active,
        &:hover {
          background-color: $grey-2;
          color: $grey-10;
        }
      }
    }
  }

  .base-rank-card-body {
    width: 276px;
    padding: 0 4px 16px 4px;
    @include flex(center, center, column);

    .info-item {
      width: 100%;
      @include flex(center, center);
      border-radius: $border-radius-0;
      background-color: $grey-0;
      transition: 0.25s;
      padding: 8px 0;

      &:hover {
        background-color: $grey-2;
      }

      .info-item-inner {
        width: 252px;
        @include flex(initial, space-between);

        .number {
          width: 18px;
          text-align: left;
          font-weight: 700;
          font-size: 16px;
          font-style: oblique;
          line-height: 22px;
          color: $grey-7;
        }

        .content {
          width: 234px;
          line-height: 22px;
          @include ellipsis;
          font-size: 14px;
          color: $grey-10;
        }

        .user {
          width: 234px;
          height: 22px;
          @include flex(center, space-between);

          .user-info {
            width: 204px;
            height: 100%;
            @include flex(center, space-between);

            & > div {
              height: 100%;
              line-height: 22px;
              color: $grey-10;
            }

            .nickname {
              width: 144px;
              font-size: 14px;
              @include ellipsis(1);
            }

            .count {
              font-size: 15px;
              font-weight: 700;
            }
          }
        }
      }

      &:nth-child(1) .info-item-inner .number {
        color: $red-2;
      }

      &:nth-child(2) .info-item-inner .number {
        color: $orange-1;
      }

      &:nth-child(3) .info-item-inner .number {
        color: $pink-0;
      }
    }
  }
}
</style>
