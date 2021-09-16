<!--
 * @Description:用户关注面板
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-09 18:55:02
 * @LastEditors: clq
 * @LastEditTime: 2021-09-16 11:15:03
-->
<template>
  <n-modal
    display-directive="show"
    :show="modelValue"
    :mask-closable="true"
  >
    <div class="user-info-attention">
      <div class="user-info-attention-header">
        <span>
          <span
            class="trans"
            :class="{ 'green' : flag}"
            role="button"
            @click="showAttention"
          >
            <span class="label">关注了</span> <span>{{attentionNum}}</span>
          </span>
          <span class="line"></span>
          <span
            class="trans"
            :class="{ 'green' : !flag}"
            role="button"
            @click="showFans"
          >
            <span class="label">关注者</span> <span>{{fanNum}}</span>
          </span>
        </span>
        <span
          class="close-icon iconfont blog-close"
          role="button"
          @click="close"
        ></span>
      </div>

      <div class="user-info-attention-body">
        <el-scrollbar
          ref="myScrollbar"
          :height="530"
        >

          <template v-if="flag === true">
            <user-info-attention-item
              v-for="item in attentionItems"
              :key="item"
              :avatar="item.avatar"
              :nickname="item.nickname"
              :username="item.username"
              :signature="item.signature"
              v-model:attention="item.attention"
              role="button"
              @click="changePage(item.username)"
              @updateCount="changeCount"
            >
            </user-info-attention-item>
          </template>
          <template v-else>
            <user-info-attention-item
              v-for="item in fansItems"
              :key="item"
              :avatar="item.avatar"
              :nickname="item.nickname"
              :username="item.username"
              :signature="item.signature"
              v-model:attention="item.attention"
              role="button"
              @click="changePage(item.username)"
              @updateCount="changeCount"
            >
            </user-info-attention-item>
          </template>

          <div
            v-show="loadingButtonShow[Number(flag)]"
            class="user-info-attention-bottom-btn"
            role="button"
            @click="showMore"
          >
            加载更多...
          </div>
        </el-scrollbar>

      </div>
    </div>
  </n-modal>
</template>

<script>
import { defineComponent, ref, reactive, watch } from 'vue';
import UserInfoAttentionItem from '@/views/user/childComps/userInfo/childComps/UserInfoAttentionItem.vue';
import { getAttentions, getFans } from '@/network/api/attentions';
import { useMessage } from 'naive-ui';
/**
 * @description: 关注详情模态框
 * @param {Boolean} modelValue 模态框显示绑定值，使用v-model指令即可 `默认为false`
 * @param {Boolean} flag 显示类型标志 true:显示关注了 false:显示关注者
 * @param {String} username 用户名
 * @param {Number} attentionNum 关注数量
 * @param {Number} fanNum 粉丝数量
 * @author: clq
 */
export default defineComponent({
  name: 'userInfoAttention',
  components: {
    UserInfoAttentionItem,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    flag: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
      default: 'us1',
    },
    attentionNum: {
      type: Number,
      default: 12,
    },
    fanNum: {
      type: Number,
      default: 14,
    },
  },
  setup(props, context) {
    const msg = useMessage(); // navie-ui
    const limit = 10; //记录增量
    const attentionItems = reactive([]); //关注了数据
    const fansItems = reactive([]); //粉丝数据
    const loadingButtonShow = reactive([false, false]); // 加载更多按钮是否显示
    const myScrollbar = ref(null); //滚动条组件引用对象

    watch(
      () => props.username,
      () => {
        addAttentionItems();
        addFansItems();
      }
    );

    /**
     * @description: 增加关注者消息
     * @return {void}
     * @author: Z_Y_C
     */
    function addAttentionItems() {
      getAttentions(props.username, attentionItems.length, limit)
        .then((res) => {
          attentionItems.splice(attentionItems.length, 0, ...res.attentions);
          loadingButtonShow[1] = res.attentions.length === limit;
        })
        .catch((err) => {
          console.log(err);
          msg.error('获取关注失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 增加关注者数据数据
     * @return {void}
     * @author: Z_Y_C
     */
    function addFansItems() {
      getFans(props.username, fansItems.length, limit)
        .then((res) => {
          fansItems.splice(fansItems.length, 0, ...res.fans);
          loadingButtonShow[0] = res.fans.length === limit;
        })
        .catch((err) => {
          console.log(err);
          msg.error('获取粉丝失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 显示关注了
     * @return {void}
     * @author: Z_Y_C
     */
    function showAttention() {
      context.emit('update:flag', true);
      myScrollbar.value.setScrollTop(0);
    }

    /**
     * @description: 显示关注者
     * @return {void}
     * @author: Z_Y_C
     */
    function showFans() {
      context.emit('update:flag', false);
      console.log(myScrollbar);
      myScrollbar.value.setScrollTop(0);
    }

    /**
     * @description: 窗口关闭
     * @return {void}
     * @author: Z_Y_C
     */
    function close() {
      context.emit('update:modelValue', false);
    }

    /**
     * @description: 显示更多
     * @return {void}
     * @author: Z_Y_C
     */
    function showMore() {
      (props.flag ? addAttentionItems : addFansItems)();
    }

    /**
     * @description: 跳转路由
     * @param {string} path 用户名
     * @return {void}
     * @author: Z_Y_C
     */
    function changePage(path) {
      window.open(`/user/${path}`, `/user/${path}`);
    }

    /**
     * @description: 修改关注或粉丝量
     * @param {Boolean} data 修改标志 true:增加 false:减少
     * @return {void}
     * @author: clq
     */
    function changeCount(data) {
      // console.log('data: ' + data);
      context.emit('updateCount', data);
    }

    return {
      attentionItems,
      fansItems,
      loadingButtonShow,
      myScrollbar,
      showAttention,
      showFans,
      close,
      showMore,
      changePage,
      changeCount,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-info-attention {
  width: 668px;
  height: 558px;
  padding: 12px 0 12px 16px;
  border-radius: 8px;
  background-color: $grey-0;

  .user-info-attention-header {
    height: 28px;
    padding-bottom: 6px;
    @include flex(center, space-between);
    font-family: Arial;
    line-height: 28px;
    font-size: 14px;
    color: $grey-7;

    .trans {
      transition: all 0.25s;

      &:hover {
        color: $green-1;
      }
    }

    .green {
      color: $green-0;
    }

    .label {
      margin-right: 10px;
    }

    .line {
      width: 2px;
      height: 28px;
      padding: 0px 0.5px;
      margin: 0px 15px;
      background-color: $grey-7;
    }

    .close-icon {
      width: 28px;
      height: 28px;
      border-radius: $border-radius-1;
      margin-right: 16px;
      color: $grey-7;
      line-height: 28px;
      text-align: center;
      transition: all 0.25s;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
        background-color: $grey-2;
      }
    }
  }

  .user-info-attention-body {
    width: 100%;
    margin: 0px;
    padding: 0px;
  }

  .user-info-attention-bottom-btn {
    width: 300px;
    height: 32px;
    margin: 8px auto 0 auto;
    border-radius: 8px;
    background-color: $grey-3;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    color: $grey-9;
    transition: 0.25s;

    &:hover {
      background-color: $grey-4;
      color: $grey-10;
    }
  }
}
</style>
