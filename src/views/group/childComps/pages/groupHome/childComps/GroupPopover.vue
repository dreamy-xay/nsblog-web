<!--
 * @Description:创建学习小组
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-20 15:53:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-16 12:56:23
-->
<template>
  <n-modal
    display-directive="show"
    :show="modelValue"
  >
    <div class="group-popover">
      <div class="group-popover-head">
        <div class="head-title">创建学习小组</div>
        <div
          class="top-icon"
          role="button"
          @click="close"
        ><i class="iconfont blog-close"></i></div>
      </div>
      <hr class="group-popover-hr">
      <div class="group-popover-body">
        <div class="body-title">小组名称</div>
        <base-input
          class="body-input"
          v-model.trim="inputName"
          type="text"
          :show-Close="true"
          :maxlength="20"
        >
        </base-input>
        <div class="body-title">小组简介</div>
        <base-input
          class="body-input"
          v-model.trim="inputIntroduce"
          type="text"
          :show-Close="true"
          :maxlength="128"
        >
        </base-input>
        <div class="body-title">小组专题</div>
        <div class="body-select">
          <base-select
            :swidth="356"
            :sdata="selectProject"
            :showText="select"
            @changeItem="changeSelect"
          >
          </base-select>
        </div>
      </div>
      <hr class="group-popover-hr">
      <div class="group-popover-foot">
        <div
          class="button"
          role="button"
          @click="commit"
        >申请创建</div>
      </div>
    </div>
  </n-modal>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import BaseSelect from '@/components/content/baseSelect/BaseSelect.vue';
import BaseInput from '@/components/content/baseInput/BaseInput.vue';
import { useMessage } from 'naive-ui';
import { createGroups } from '@/network/api/groups';
import { getTopics } from '@/network/api/topics';

/**
 * @description:创建学习小组
 * @param {Boolean} modelValue 是否显示收藏夹界面 `默认为false`
 * @author: xiao
 */

export default defineComponent({
  name: 'groupPopover',
  components: {
    BaseSelect,
    BaseInput,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, context) {
    const inputName = ref(''); //输入的小组名称
    const inputIntroduce = ref(''); //输入的小组介绍
    const select = ref(''); //选择的数据
    const selectProject = []; //小组专题
    const topics = reactive([]); //学习小组数据
    const msg = useMessage(); // naive-ui 组件

    //获取专题名
    getTopics()
      .then((data) => {
        // console.log(data);
        topics.splice(0, 0, ...data.topics);
        for (let i = 0; i < topics.length; i++) selectProject[i] = topics[i];
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取专题失败');
      });

    /**
     * @description: 点击关闭触发函数
     * @author: xiao
     */
    function close() {
      context.emit('update:modelValue', false);
    }

    /**
     * @description:点击创建小组
     * @return {void}
     * @author: xiao
     */
    function commit() {
      let success = true;
      if (!inputName.value) {
        msg.error('学习小组名不能为空');
        success = false;
      }
      if (!inputIntroduce.value) {
        msg.error('学习小组简介不能为空');
        success = false;
      }
      if (!select.value) {
        msg.error('学习小组专题不能为空');
        success = false;
      }

      if (success)
        //创建学习小组
        createGroups(inputName.value, inputIntroduce.value, select.value)
          .then(() => {
            inputName.value = '';
            inputIntroduce.value = '';
            select.value = '';
            msg.success(`创建学习小组成功`);
            context.emit('update:modelValue', false);
          })
          .catch((error) => {
            console.log(error);
            msg.error('创建学习小组失败');
          });
    }

    /**
     * @description: 选择新的项
     * @param {number} index 选择的项 `必传参数`
     * @return {void}
     * @author: xiao
     */
    function changeSelect(index) {
      select.value = selectProject[index];
    }

    return {
      inputName,
      inputIntroduce,
      selectProject,
      close,
      select,
      commit,
      changeSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-popover {
  width: 420px;
  height: 371px;
  background: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  .group-popover-hr {
    height: 1px;
    border: none;
    border-top: 1px;
    background: $grey-2;
  }

  .group-popover-head {
    @include flex(center, center, column);
    height: 52px;
    position: relative;

    .head-title {
      font-size: 16px;
      font-weight: 700;
      color: $grey-10;
    }

    .top-icon {
      width: 28px;
      height: 28px;
      border-radius: $border-radius-1;
      color: $grey-7;
      @include flex(center, center);
      transition: all 0.25s;
      position: absolute;
      top: 13px;
      right: 16px;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
        background-color: $grey-2;
      }
    }
  }

  .group-popover-body {
    .body-input {
      border-radius: $border-radius-1;
      margin: 0px 24px;
      width: 372px;

      &:hover {
        background-color: $green-2;
        color: $green-0;
      }
    }

    .body-title {
      font-size: 15px;
      font-weight: 400;
      color: $grey-10;
      margin-top: 16px;
      margin-bottom: 10px;
      margin-left: 24px;
    }

    .body-select {
      margin: 0px 24px 23px 24px;
      border-radius: $border-radius-1;

      &:hover {
        background-color: $green-2;
        color: $green-0;
      }
    }
  }

  .group-popover-foot {
    @include flex(center, center);
    height: 64px;
    width: 100%;

    .button {
      @include flex(center, center);
      width: 100px;
      height: 32px;
      font-size: 14px;
      font-weight: 400;
      color: $grey-0;
      background: $green-0;
      border-radius: $border-radius-0;
      box-shadow: $shadow-0;
      transition: 0.25s;

      &:hover {
        background-color: $green-1;
        box-shadow: $shadow-2;
      }
    }
  }
}
</style>
