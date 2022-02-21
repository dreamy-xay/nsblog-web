<!--
 * @Description: 学习小组征集令页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-29 16:44:56
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-16 15:00:28
-->
<template>
  <div class="group-detail-solicitation">
    <div class="group-detail-solicitation-inner">
      <div
        class="solicitation-item"
        v-for="(item, index) in solicitationList"
        :key="index"
        :class="{'solicitation-item-last': solicitationList.length - 1 === index}"
      >
        <a
          :href="`/solicitation/${item.id}`"
          :target="`/solicitation/${item.id}`"
          class="title"
          role="button"
        >
          {{ item.title }}
        </a>
        <div class="content">
          <div class="left">
            <base-avatar
              :src="item.avatar"
              :alt="item.username"
              :href="`/user/${item.username}`"
              :target="`/user/${item.username}`"
              :size="24"
            />
            <a
              class="username"
              :href="`/user/${item.username}`"
              :target="`/user/${item.username}`"
              role="button"
            >
              {{ item.nickname }}
            </a>
            <div class="point"></div>
            <div class="date">
              {{ dateFormat('Y年m月d日', new Date(item.release_time)) }}
            </div>
            <div class="count">
              <div class="icon">
                <i class="iconfont blog-renshu"></i>
              </div>
              已征集 {{item.agree_count}} 人
            </div>
          </div>
          <div class="right">
            <div class="icon">
              <i class="iconfont blog-lishijilu-copy"></i>
            </div>
            截至日期 {{dateFormat('Y年m月d日', new Date(item.deadline))}}
          </div>
        </div>
      </div>
      <base-content-loading
        v-show="showContentLoading"
        :style="{padding: '16px 0', borderTop: solicitationList.length ? `1px solid ${styles.grey4}` : 0}"
      />
    </div>
    <div
      v-if="showLoading && !showContentLoading"
      class="group-detail-solicitation-loading"
      role="button"
      @click="loadingSolicitationList"
    >
      加载更多...
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import { dateFormat } from '@/util/date';
import { getGroupSolicitations } from '@/network/api/groups';
import { useRoute } from 'vue-router';
import styles from '@/assets/style/define.scss';

/**
 * @description: 学习小组征集令页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'groupDetailSolicitation',
  components: {
    BaseAvatar,
    BaseContentLoading,
  },
  setup() {
    const route = useRoute(); // route
    const groupName = route.params.groupName; // 学习小组名
    const limit = 10; // 每次加载列表条数
    const solicitationList = reactive([]); // 征集令列表
    const showLoading = ref(true); // 是否显示加载按钮
    const showContentLoading = ref(false); // 是否显示加载内容过渡

    // 初始化征集令列表
    loadingSolicitationList();

    /**
     * @description: 加载征集令列表
     * @return {void}
     * @author: dreamy-xay
     */
    function loadingSolicitationList() {
      getGroupSolicitations(groupName, solicitationList.length, limit, {
        beforeRequest() {
          showContentLoading.value = true;
        },
        afterResponse() {
          showContentLoading.value = false;
        },
      })
        .then((data) => {
          if (data.solicitations.length < limit) showLoading.value = false;
          solicitationList.splice(solicitationList.length, 0, ...data.solicitations);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return {
      solicitationList,
      showLoading,
      showContentLoading,
      loadingSolicitationList,
      dateFormat,
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-detail-solicitation {
  width: 700px;
  @include flex(center, center, column);

  .group-detail-solicitation-inner {
    width: 660px;
    padding: 0 20px;
    @include flex(center, center, column);
    background: $grey-0;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;

    .solicitation-item {
      width: 100%;
      height: 92px;
      padding: 16px 0;
      border-bottom: 1px solid $grey-4;
      box-sizing: border-box;

      &.solicitation-item-last {
        border: none;
      }

      .title {
        display: block;
        width: 660px;
        height: 24px;
        font-size: 20px;
        color: $grey-11;
        transition: 0.25s;
        line-height: 24px;
        @include ellipsis(1);

        &:hover {
          color: $grey-9;
        }
      }

      .content {
        height: 24px;
        margin-top: 12px;
        width: 100%;
        @include flex(center, space-between);

        .left {
          height: 100%;
          @include flex(center);

          .username {
            margin-left: 8px;
            font-size: 14px;
            color: $green-0;
            transition: 0.25s;
            @include flex(center);
            height: 100%;

            &:hover {
              color: $green-1;
            }
          }

          .point {
            width: 3px;
            height: 3px;
            background-color: $grey-7;
            margin: 0 6px;
            user-select: none;
            border-radius: 50%;
          }

          .date {
            height: 100%;
            @include flex(center);
            font-size: 14px;
            color: $grey-7;
          }

          .count {
            margin-left: 20px;
            height: 100%;
            @include flex(center);
            font-size: 14px;
            color: $grey-7;

            .icon {
              height: 100%;
              width: 14px;
              @include flex(center, center);
              margin-right: 6px;

              .iconfont {
                font-size: 16px;
                color: $grey-7;
              }
            }
          }
        }

        .right {
          height: 100%;
          @include flex(center);
          font-size: 14px;
          color: $grey-7;

          .icon {
            height: 100%;
            width: 14px;
            @include flex(center, center);
            margin-right: 6px;

            .iconfont {
              font-size: 16px;
              color: $grey-7;
            }
          }
        }
      }
    }
  }

  .group-detail-solicitation-loading {
    width: 300px;
    height: 32px;
    background: $grey-0;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;
    @include flex(center, center);
    font-size: 14px;
    color: $grey-9;
    margin-top: 16px;
    transition: 0.25s;

    &:hover {
      color: $grey-10;
      background-color: $grey-1;
    }
  }
}
</style>
