<!--
 * @Description:创建学习小组
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-20 15:53:19
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-22 14:37:41
-->
<template>
  <n-modal
    display-directive="show"
    :show="!modelValue"
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
        <user-center-input
          class="body-input"
          v-model="inputName"
          type="text"
          :show-Close="true"
          :maxlength="20"
        >
        </user-center-input>
        <div class="body-title">小组简介</div>
        <user-center-input
          class="body-input"
          v-model="inputIntroduce"
          type="text"
          :show-Close="true"
          :maxlength="20"
        >
        </user-center-input>
        <div class="body-title">小组专题</div>
        <div class="body-select">
          <user-center-select
            :swidth="356"
            :sdata="selectProject"
            :showText="select"
            @changeItem="changeSelect($event)"
          >
          </user-center-select>
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
import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput';
import UserCenterSelect from '@/views/userCenter/childComps/UserCenterSelect.vue';
import { getGroups } from '@/network/api/groups';
import { useMessage } from 'naive-ui';

/**
 * @description:创建学习小组
 * @param {Boolean} modelValue 是否显示收藏夹界面 `默认为false`
 * @author: xiao
 */

export default defineComponent({
  name: 'groupPopover',
  components: {
    UserCenterInput,
    UserCenterSelect,
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
    const studyGroups = reactive([]); //学习小组数据
    const msg = useMessage(); // naive-ui 组件

    //获取学习小组信息
    getGroups('dreamy')
      .then((data) => {
        console.log(data);
        studyGroups.splice(0, 0, ...data.groups);
        for (let i = 0; i < studyGroups.length; i++) {
          selectProject[i] = studyGroups[i].topic_name;
        }
        select.value = selectProject[0];
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取登录日志失败', { duration: 2000, closable: true });
      });

    /**
     * @description: 点击关闭触发函数
     * @author: xiao
     */
    function close() {
      context.emit('update:modelValue', true);
    }

    /**
     * @description:点击创建小组
     * @return {void}
     * @author: xiao
     */
    function commit() {
      console.log(inputName.value);
      console.log(inputIntroduce.value);
      console.log(select.value);
      context.emit('update:modelValue', true);
    }

    /**
     * @description:
     * @param {*} event 选择的项
     * @return {void}
     * @author: xiao
     */
    function changeSelect($event) {
      console.log($event);
      select.value = selectProject[$event];
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
  height: 387px;
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
      font-weight: bold;
      color: $grey-10;
    }

    .top-icon {
      color: $grey-7;
      position: absolute;
      right: 24px;
      transition: 0.25s;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
      }
    }
  }

  .group-popover-body {
    .body-input {
      border-radius: $border-radius-1;
      box-shadow: 0 0 6px 0 $green-0;
      margin: 0px 24px;
      width: 372px;
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
      box-shadow: 0 0 6px 0 $green-0;
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
