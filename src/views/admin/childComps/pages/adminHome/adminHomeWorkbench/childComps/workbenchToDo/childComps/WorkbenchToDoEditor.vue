<!--
 * @Description: 工作台待办事项弹出编辑框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-28 17:26:17
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-30 12:36:09
-->

<template>
  <n-modal
    :show="modelValue"
    display-directive="show"
    @esc="closeModel"
  >
    <div
      class="workbench-to-do-editor"
      ref="toDoEditorRef"
    >
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
        <el-scrollbar>
          <div
            class="task-info"
            role="button"
          >
            <div
              class="status"
              :class="{'status-complete': taskData.task.complete}"
              @click.stop="completeTask"
            >
              <i class="iconfont blog-wancheng"></i>
            </div>
            <div class="content">
              <el-input
                type="textarea"
                placeholder="请输入任务内容"
                v-model.trim="taskData.task.title"
                :autosize="{minRows: 1, maxRows: 100000}"
                @blur="taskBlur"
                @focus="taskData.deleteValue = taskData.task.title/* 缓存聚焦之前的值 */"
                @keyup.enter="taskOrStepEnter"
              />
            </div>
            <div
              class="topping"
              :class="{'topping-active': taskData.task.toppingTime}"
              @click.stop="toppingTask"
            >
              <i
                class="iconfont"
                :class="taskData.task.toppingTime ? 'blog-topping' : 'blog-not-topping'"
              ></i>
            </div>
          </div>
          <div
            class="step-info"
            v-for="(item, index) in taskData.task.steps"
            :key="index"
            role="button"
          >
            <div
              class="status"
              :class="{'status-complete': item.complete}"
              @click.stop="completeStep(index)"
            >
              <i class="iconfont blog-wancheng"></i>
            </div>
            <div class="content">
              <el-input
                type="textarea"
                placeholder="请输入步骤内容"
                v-model.trim="item.content"
                @blur="stepBlur(index)"
                :autosize="{minRows: 1, maxRows: 100000}"
                @focus="taskData.deleteValue = item.content /* 缓存聚焦之前的值 */"
                @keyup.enter="taskOrStepEnter"
              />
            </div>
            <div
              class="delete"
              @click.stop="deleteStep(index)"
            >
              <i class="iconfont blog-delete"></i>
            </div>
          </div>
          <div
            class="step-add"
            role="button"
            v-show="showAddStep"
            @click="addStep"
          >
            <div class="icon">
              <i class="iconfont blog-shanchu1"></i>
            </div>
            <div class="text">
              {{ taskData.task.steps.length ? '下一步' : '添加步骤' }}
            </div>
          </div>
        </el-scrollbar>
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
  <base-modal
    :content="taskData.deleteName"
    :show="showDeleteModal"
    :color="styles.blue0"
    :hover-color="styles.blue1"
    @confirm="taskData.deleteCallback(true)"
    @cancel="taskData.deleteCallback(false)"
  />
</template>

<script>
import { defineComponent, nextTick, reactive, ref, watch } from 'vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import { mapMutations } from '@/util/store';
import { useMessage } from 'naive-ui';
import { dateFormat } from '@/util/date';
import styles from '@/assets/style/define.scss';

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
  components: {
    BaseModal,
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui message
    const showAddStep = ref(true); // 是否显示增加步骤按钮
    const showDeleteModal = ref(false); // 是否显示删除确认框
    const taskData = reactive({ task: {}, deleteCallback: null, deleteName: '', deleteValue: '' }); // 缓存任务（深拷贝）
    const toDoEditorRef = ref(null); // 弹出框引用

    // 监听任务数据改变
    watch(
      () => props.taskInfo.task,
      (task) => {
        taskData.task = JSON.parse(JSON.stringify(task));
        // 切换自动获取焦点
        nextTick(() => toDoEditorRef.value.querySelector('.task-info textarea').focus());
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
      // 如果是添加任务
      if (props.taskInfo.add) {
        if (taskData.task.title !== '') {
          taskData.deleteName = '退出前是否添加这个任务';
          taskData.deleteCallback = (isConfirm) => {
            if (isConfirm) {
              addToDoTask(taskData.task); // 彻底删除
              msg.success('添加任务成功！');
            }
            context.emit('update:modelValue', false); // 关闭
            taskData.deleteCallback = null;
            showDeleteModal.value = false;
          };
          showDeleteModal.value = true; //  显示提示添加框
        } else context.emit('update:modelValue', false);
      } else {
        /* 编辑任务 */
        updateToDoTask(taskData.task); // 更新任务
        context.emit('update:modelValue', false); // 关闭
      }
    }

    /**
     * @description: 删除任务
     * @return {void}
     * @author: dreamy-xay
     */
    function deleteTask() {
      taskData.deleteName = '是否删除这个任务';
      taskData.deleteCallback = (isConfirm) => {
        if (isConfirm) {
          deleteToDoTask(taskData.task); // 彻底删除
          msg.success('删除任务成功！');
          // 关闭
          context.emit('update:modelValue', false);
        } else taskData.task.title = taskData.deleteValue; // 恢复缓存值
        taskData.deleteCallback = null;
        showDeleteModal.value = false;
      };
      // 如果是不是增加任务则不提示删除
      if (props.taskInfo.add) taskData.deleteCallback = null;
      else showDeleteModal.value = true; //  显示提示删除框
    }

    /**
     * @description: 输入任务标题失去焦点触发
     * @return {void}
     * @author: dreamy-xay
     */
    function taskBlur() {
      if (taskData.task.title === '') deleteTask(); // 空则删除任务
    }

    /**
     * @description: 任务内容或者步骤内容输入框按下了回车键
     * @param {Event} e dom 返回的事件参数 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function taskOrStepEnter(e) {
      if (e.target.value === '') return; // 保证值不为空
      e.target.blur(); // 回车输入完成并失去焦点
      addStep(); // 增加步骤
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
          msg.success('添加任务成功！');
          // 关闭
          context.emit('update:modelValue', false);
        } else msg.error('请先编辑任务内容');
      } else deleteTask();
    }

    /**
     * @description: 完成这个任务
     * @return {void}
     * @author: dreamy-xay
     */
    function completeTask() {
      taskData.task.complete = !taskData.task.complete; // 任务标记状态
      for (const step of taskData.task.steps) step.complete = taskData.task.complete; // 子步骤全部标记状态
    }

    /**
     * @description: 置顶这个任务
     * @return {void}
     * @author: dreamy-xay
     */
    function toppingTask() {
      if (taskData.task.toppingTime) delete taskData.task['toppingTime'];
      else taskData.task.toppingTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date()); // 置顶该任务并赋值当前日期
    }

    /**
     * @description: 完成这个任务步骤
     * @param {number} index 步骤索引 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function completeStep(index) {
      if (taskData.task.steps[index].content === '') return; // 步骤内容为空直接不处理
      taskData.task.steps[index].complete = !taskData.task.steps[index].complete; // 步骤标记状态
      let count = 0; // 计数完成步骤数
      for (const step of taskData.task.steps) if (step.complete) ++count;
      taskData.task.complete = count === taskData.task.steps.length;
    }

    /**
     * @description: 删除这个任务步骤
     * @param {number} index 步骤索引 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function deleteStep(index) {
      taskData.deleteName = '是否删除这个步骤';
      taskData.deleteCallback = (isConfirm) => {
        if (isConfirm) {
          taskData.task.steps.splice(index, 1); // 删除步骤
          let count = 0; // 计数完成步骤数
          for (const step of taskData.task.steps) if (step.complete) ++count;
          taskData.task.complete = count === taskData.task.steps.length;
        } else taskData.task.steps[index].content = taskData.deleteValue; // 恢复缓存值
        taskData.deleteCallback = null;
        showDeleteModal.value = false;
      };
      // 如果是增加步骤则不提示删除
      if (!showAddStep.value) taskData.deleteCallback(true); // 直接删除
      else showDeleteModal.value = true; //  显示提示删除框
    }

    /**
     * @description: 编辑步骤框后失去焦点
     * @param {number} index 步骤索引 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function stepBlur(index) {
      if (taskData.task.steps[index].content === '') deleteStep(index); // 空则删除步骤
      showAddStep.value = true; // 增加步骤按钮显示出来
    }

    /**
     * @description: 增加步骤
     * @return {void}
     * @author: dreamy-xay
     */
    function addStep() {
      if (taskData.task.title === '') {
        msg.info('请先编辑任务内容'); // 如果没编辑任务内容就提示
        return;
      }
      showAddStep.value = false; // 增加步骤按钮隐藏
      taskData.task.steps.splice(taskData.task.steps.length, 0, {
        complete: taskData.task.complete,
        content: '',
      });

      // 新增输入框聚焦
      nextTick(() => {
        const inputs = toDoEditorRef.value.querySelectorAll('.step-info textarea');
        inputs[inputs.length - 1].focus();
      });
    }

    return {
      styles,
      showAddStep,
      showDeleteModal,
      taskData,
      toDoEditorRef,
      closeModel,
      handleTask,
      completeTask,
      toppingTask,
      completeStep,
      deleteStep,
      stepBlur,
      taskBlur,
      taskOrStepEnter,
      addStep,
    };
  },
});
</script>

<style lang="scss" scoped>
.workbench-to-do-editor {
  width: 424px;
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
      margin-right: 128px;
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
    padding: 16px 0;
    border-bottom: 1px solid $grey-2;

    & > div {
      width: calc(100% - 48px);
      padding: 0 24px;
    }

    .task-info,
    .step-info {
      border-radius: $border-radius-1;
      @include flex(center);
      overflow: hidden;
      background-color: $grey-0;
      transition: 0.25s;

      &:hover {
        background-color: $grey-3;
      }

      &:hover .status .iconfont {
        color: $grey-3;
      }

      .status {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid $grey-9;
        margin: 0 10px;
        box-shadow: border-box;
        @include flex(center, center);

        &.status-complete {
          border-color: $blue-1;
          background-color: $blue-1;

          .iconfont {
            color: $grey-0 !important;
          }
        }

        .iconfont {
          font-size: 13px;
          color: $grey-0;
          transition: 0.25s;
        }

        &:hover .iconfont {
          color: $grey-9;
        }
      }

      .content {
        width: calc(100% - 72px);
        color: $grey-11;
        padding: 8px 0;

        :deep(.el-textarea .el-textarea__inner) {
          padding: 0;
          line-height: 20px;
          font-size: 15px;
          color: $grey-11;
          border: 0;
          resize: none;
          overflow: hidden;
          background-color: transparent;
          caret-color: $blue-2;
        }
      }

      .topping,
      .delete {
        margin: 0 10px;
        width: 16px;
        height: 16px;
        @include flex(center, center);

        &.topping-active .iconfont {
          color: $yellow-1;
        }

        .iconfont {
          font-size: 18px;
          color: $red-1;
          transition: 0.25s;

          &:hover {
            color: $red-2;
          }
        }
      }
    }

    .task-info {
      &:hover {
        background-color: $grey-0;
      }

      .status {
        margin-left: 0;
        width: 18px;
        height: 18px;
      }

      .content {
        width: calc(100% - 64px);
        padding: 10px 0;

        :deep(.el-textarea .el-textarea__inner) {
          font-size: 17px;
          font-weight: 700;
          color: $grey-11;
        }
      }

      .topping .iconfont {
        font-size: 22px;
        font-weight: 700;
        color: $grey-9;

        &:hover {
          color: $yellow-1;
        }
      }
    }

    .step-add {
      font-size: 15px;
      color: $purple-1;
      height: 38px;
      @include flex(center);
      border-radius: $border-radius-1;
      overflow: hidden;
      background-color: $grey-0;
      transition: 0.25s;

      &:hover {
        background-color: $grey-3;
      }

      & > div {
        @include flex(center);
      }

      .icon {
        width: 18px;
        height: 18px;
        margin: 0 10px;

        .iconfont {
          font-size: 12px;
          margin-left: 3.5px;
          margin-top: -1px;
          color: $purple-1;
          font-weight: 700;
          transform: rotate(45deg);
          transition: 0.25s;
        }
      }

      .text {
        height: 100%;
      }
    }
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
