<!--
 * @Description:用户关注面板
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-09 18:55:02
 * @LastEditors: clq
 * @LastEditTime: 2021-09-13 14:02:23
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
            <span class="label">关注者</span> <span>{{noticerNum}}</span>
          </span>
        </span>
        <span
          class="close-icon iconfont blog-close"
          role="button"
          @click="close"
        ></span>
      </div>
      <div class="user-info-attention-body">
        <el-scrollbar :height="492">
          <user-info-attention-item
            v-for="item in attentionItems"
            :key="item"
            :avatar="item.avatar"
            :nickname="item.nickname"
            :username="item.username"
            :signature="item.signature"
            v-model:attention="item.attention"
          >
          </user-info-attention-item>
        </el-scrollbar>
      </div>
      <div
        v-show="attentionItems.length>5"
        class="user-info-attention-bottom-btn"
        role="button"
        @click="showMore"
      >
        加载更多...
      </div>
    </div>
  </n-modal>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, watch, nextTick } from 'vue';
import UserInfoAttentionItem from '@/views/user/childComps/userInfo/childComps/UserInfoAttentionItem.vue';
import { getAttentions, getFans } from '@/network/api/attentions';
/**
 * @description: 关注详情模态框
 * @param {Boolean} modelValue 模态框显示绑定值，使用v-model指令即可 `默认为false`
 * @param {Boolean} flag 显示类型标志 true:显示关注了 false:显示关注者
 * @param {number} username 用户名
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
  },
  setup(props, context) {
    let attentionNum = ref(11);
    let noticerNum = ref(97);
    let itemNum = ref(6);
    let attentionItems = reactive([]);

    onMounted(() => {
      changeItems();
    });

    watch(
      () => props.flag,
      (newValue, oldValue) => {
        //console.log('oldValue:' + oldValue);
        //console.log('newValue:' + newValue);
        changeItems();
      }
    );

    //更改数据类别
    function changeItems() {
      if (props.flag === true) {
        console.log('获取关注了数据');
        // console.log(props.username);
        // console.log('itemNum:' + itemNum.value);
        getAttentions(props.username, 0, itemNum.value)
          .then((res) => {
            attentionItems.splice(0, attentionItems.length, ...res.attentions);
            console.log(attentionItems);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('获取关注者数据');
        getFans(props.username, 0, itemNum.value)
          .then((res) => {
            attentionItems.splice(0, attentionItems.length, ...res.attentions);
            console.log(attentionItems);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    //显示关注了
    function showAttention() {
      context.emit('update:flag', true);
      itemNum.value = 6;
      nextTick(() => {
        //console.log('props.flag:' + props.flag);
      });
    }

    //显示关注者
    function showFans() {
      context.emit('update:flag', false);
      itemNum.value = 6;
      nextTick(() => {
        //console.log('props.flag:' + props.flag);
      });
    }

    //窗口关闭
    function close() {
      context.emit('update:modelValue', false);
      // console.log(props.modelValue);
    }

    //显示更多
    function showMore() {
      itemNum.value += 6;
      changeItems();
      // console.log('showMore');
    }

    return {
      attentionNum,
      noticerNum,
      attentionItems,
      changeItems,
      showAttention,
      showFans,
      close,
      showMore,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-info-attention {
  width: 700px;
  height: 578px;
  padding: 12px 16px;
  border-radius: 8px;
  border: solid 1px $grey-8;
  background-color: $grey-0;

  .user-info-attention-header {
    height: 28px;
    @include flex(center, space-between);
    font-family: Arial;
    line-height: 28px;
    font-size: 14px;
    color: $grey-7;

    .trans {
      transition: color 0.3s;
    }

    .trans:hover {
      color: $green-1;
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
      border-radius: 4px;
      color: $grey-7;
      font-size: 16px;
      line-height: 28px;
      text-align: center;
      // transition: color 0.3s, font-size 0.3s;
    }

    .close-icon:hover {
      // color: $green-0;
      // font-size: 17px;
      animation: myTest 0.5s;
      animation-fill-mode: forwards;
    }

    @keyframes myTest {
      from {
      }
      to {
        color: $green-0;
        transform: rotate(90deg);
      }
    }
  }

  .user-info-attention-body {
    width: 100%;
    margin: 0px;
    padding: 0px;
  }

  .user-info-attention-bottom-btn {
    box-sizing: border-box;
    width: 300px;
    height: 32px;
    margin: 16px auto;
    border-radius: 8px;
    background-color: $grey-3;
    font-family: Arial;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    color: $grey-9;
  }
}
</style>
