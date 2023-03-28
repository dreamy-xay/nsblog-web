<!--
 * @Description: 工作台待办事项弹出编辑框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-28 17:26:17
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-28 18:31:49
-->

<template>
  <n-modal
    :show="modelValue"
    display-directive="show"
  >
    <div class="workbench-to-do-editor">
      <div class="workbench-to-do-editor-header">
        <div
          class="close-btn"
          role="button"
          @click="closeModel"
        >
          <i class="iconfont blog-cha"></i>
        </div>
        <div class="title">任务详情</div>
      </div>
      <div class="workbench-to-do-editor-body">

      </div>
      <div class="workbench-to-do-editor-footer">
        <div
          class="btn"
          :class="{'is-add': taskInfo.add}"
          role="button"
          @click="handleTask"
        >{{taskInfo.add ? '添加任务' : '删除任务'}}</div>
      </div>
    </div>
  </n-modal>
</template>

<script>
import { defineComponent, reactive, watch } from 'vue';
import { mapMutations } from '@/util/store';
import { ToDoTask } from '@/store/modules/globalStore';
import { useMessage } from 'naive-ui';

/**
 * @description: 工作台待办事项弹出编辑框
 * @param {Boolean} modelValue 是否显示弹出框 `默认为不显示`
 * @param {Object} taskInfo 待办事项任务信息 `必传参数`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'workbenchToDoEditor',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    taskInfo: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui message
    const taskData = reactive({ task: {} }); // 缓存任务（深拷贝）

    // 监听任务数据改变
    watch(
      () => props.taskInfo.task,
      (task) => {
        taskData.task = JSON.parse(JSON.stringify(task));
      }
    );

    // 获取历史记录操作方法
    const { addToDoTask, deleteToDoTask, updateToDoTask } = mapMutations('globalStore', [
      'addToDoTask',
      'deleteToDoTask',
      'updateToDoTask',
    ]);

    /**
     * @description: 关闭窗口
     * @return {void}
     * @author: dreamy-xay
     */
    function closeModel() {
      // 处理并保存数据
      if (props.taskInfo.add) {
        // 如果是增加任务
        if (taskData.task.title !== '') {
          addToDoTask(taskData.task);
          msg.success('添加事项成功！');
        }
      }
      // 否则是修改任务
      else updateToDoTask(taskData.task);

      // 关闭
      context.emit('update:modelValue', false);
    }

    /**
     * @description: 处理任务
     * @return {void}
     * @author: dreamy-xay
     */
    function handleTask() {
      if (props.taskInfo.add) {
        // 如果是增加任务
        if (taskData.task.title !== '') {
          addToDoTask(taskData.task);
          msg.success('添加事项成功！');
          // 关闭
          context.emit('update:modelValue', false);
        } else msg.error('请先编辑待办事项内容');
      } else {
        deleteToDoTask(taskData.task);
        msg.success('删除事项成功！');
        // 关闭
        context.emit('update:modelValue', false);
      }
    }

    return {
      taskData,
      closeModel,
      handleTask,
    };
  },
});
</script>

<style lang="scss" scoped>
.workbench-to-do-editor {
  width: 420px;
  height: 379px;
  border-radius: $border-radius-0;
  background-color: $grey-0;

  ::selection {
    background-color: $blue-1;
    color: $grey-0;
    text-shadow: none;
  }

  & > div {
    width: 100%;
  }

  .workbench-to-do-editor-header {
    @include flex(center, initial, row-reverse);
    box-sizing: border-box;
    height: 54px;
    padding: 16px 18px 15px;
    border-bottom: 1px solid $grey-2;
    text-align: center;
    line-height: 54px;

    .title {
      margin-right: 126px;
      font-size: 16px;
      font-weight: 700;
      color: $grey-11;
      line-height: 22px;
    }

    .close-btn {
      width: 28px;
      height: 28px;
      border-radius: $border-radius-1;
      color: $grey-7;
      line-height: 28px;
      text-align: center;
      transition: all 0.25s;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $blue-1;
        background-color: $grey-2;
      }
    }
  }

  .workbench-to-do-editor-body {
    box-sizing: border-box;
    width: 100%;
    height: 262px;
    padding: 16px 24px;
    border-bottom: 1px solid $grey-2;
  }

  .workbench-to-do-editor-footer {
    box-sizing: border-box;
    width: 100%;
    height: 64px;
    @include flex(center, center);

    .btn {
      width: 100px;
      height: 32px;
      background-color: $red-1;
      border-radius: $border-radius-0;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      color: $grey-0;
      line-height: 32px;
      transition: 0.25s;

      &.is-add {
        background-color: $blue-0;

        &:hover {
          background-color: $blue-1;
        }
      }

      &:hover {
        background-color: $red-2;
      }
    }
  }
}
</style>
