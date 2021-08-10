<!--
 * @Description: message页面——关注我的
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-05 10:41:38
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-10 20:31:12
-->

<template>
  <div class="message-attention">
    <div
      class="message-attention-card"
      v-for="list in attention"
      :key="list.name"
    >
      <n-avatar
        round
        :size="46"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        role="button"
      />
      <div class="card-info">
        <div class="card-info-left">
          <div
            class="card-info-left-name"
            role="button"
          > {{ list.name }}
          </div>
          <div class="card-info-left-bottom "> {{ list.attentionTime }} 关注了你
            <div
              class="delete"
              role="button"
            >
              <i class="iconfont blog-shanchu"></i>
              删除该通知
            </div>
            <div
              class="private-letter"
              role="button"
            >
              <i class="iconfont blog-liaotian"></i>
              私信
            </div>
          </div>
        </div>
        <n-button
          class="card-info-right"
          text
          @click="follow(list)"
          :class="{'card-info-right-followed' : list.isAttention}"
        >
          <div v-text="list.isAttention ? '已关注' : '互相关注'"></div>
        </n-button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';

/**
 * @description: message页面——关注我的
 * @author: Ban
 */
export default defineComponent({
  setup() {
    const attention = reactive([
      { name: 'Ban', attentionTime: '2021年7月15日8时9分 ', isAttention: false },
      { name: 'Ban', attentionTime: '2021年7月15日8时9分 ', isAttention: false },
      { name: 'Ban', attentionTime: '2021年7月15日8时9分 ', isAttention: false },
      { name: 'Ban', attentionTime: '2021年7月15日8时9分 ', isAttention: false },
      { name: 'Ban', attentionTime: '2021年7月15日8时9分 ', isAttention: false },
    ]);
    function follow(attention) {
      attention.isAttention = !attention.isAttention;
      console.log('follow');
    }
    return {
      attention,
      follow,
    };
  },
});
</script>

<style lang="scss" scoped>
.message-attention {
  width: 992px;
  margin-left: 10px;

  .message-attention-card {
    padding: 24px 36px;
    margin-bottom: 10px;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;

    .card-info {
      float: right;
      height: 46px;
      width: calc(100% - 60px);

      .card-info-left {
        float: left;

        .card-info-left-name {
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
        }

        .card-info-left-bottom {
          color: $grey-7;
          display: inline-block;

          .delete {
            margin: 0 20px;
            display: inline-block;
            transition: color 0.1s linear;

            &:hover {
              color: $green-0;
            }
          }

          .private-letter {
            display: inline-block;
            transition: color 0.1s linear;

            &:hover {
              color: $green-0;
            }

            .blog-liaotian {
              display: inline-block;
              transform: translate(0, 1px);
            }
          }
        }
      }

      .card-info-right {
        float: right;
        position: relative;
        top: 10px;
        border: 1px solid $grey-8;
        border-radius: 15px;
        width: 82px;
        height: 28px;
        color: $grey-9;
        transition: all 0.1s linear;

        &:hover {
          color: $green-0;
          border: 1px solid $green-0;
        }

        &:active {
          color: $green-0;
        }
      }
      .card-info-right-followed {
        color: $green-0;
        border: 1px solid $green-0;
      }
    }
  }
}
</style>
