<!--
 * @Description: 工作台待办事项
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-21 18:37:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-30 11:30:45
-->

<template>
  <div class="workbench-to-do">
    <div class="workbench-to-do-head">
      <div class="left">
        <div class="icon">
          <i class="iconfont blog-wenzhang2"></i>
        </div>
        待办事项
      </div>
      <div class="right">
        <div
          class="menu-item"
          v-for="(item, index) in ['进行中', '已完成']"
          :class="{'menu-item-active': index === menuActiveIndex}"
          :key="item"
          role="button"
          @click="menuActiveIndex = index"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="workbench-to-do-body">
      <n-popover
        trigger="hover"
        placement="left"
        v-for="(item, index) in toDoList"
        :key="index"
      >
        <template #trigger>
          <div
            class="to-do-info"
            role="button"
            @click="editTask(item)"
          >
            <div
              class="status"
              :class="{'status-complete': item.complete}"
              @click.stop="completeTask(item)"
            >
              <i class="iconfont blog-wancheng"></i>
            </div>
            <div class="content">
              {{item.title}}
            </div>
            <div
              class="topping"
              :class="{'topping-active': item.toppingTime}"
              @click.stop="toppingTask(item)"
            >
              <i
                class="iconfont"
                :class="item.toppingTime ? 'blog-topping' : 'blog-not-topping'"
              ></i>
            </div>
          </div>
        </template>
        <div class="workbench-to-do-task-progress">
          <div class="icon">
            <i class="iconfont blog-jindutiao"></i>
          </div>
          当前进度: <div class="progress">{{getTaskProgress(item)}}%</div>
        </div>
      </n-popover>
      <div
        class="to-do-add"
        role="button"
        @click="editTask(null)"
      >
        <div class="icon">
          <i class="iconfont blog-shanchu1"></i>
        </div>
        <div class="content">
          添加任务
        </div>
      </div>
    </div>
    <workbench-to-do-editor
      v-model="showTaskEditor"
      :task-info="cachedTask"
    />
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue';
import WorkbenchToDoEditor from '@/views/admin/childComps/pages/adminHome/adminHomeWorkbench/childComps/workbenchToDo/childComps/WorkbenchToDoEditor.vue';
import { mapGetters, mapMutations } from '@/utils/store';
import { ToDoTask } from '@/store/modules/globalStore';
import { dateFormat } from '@/utils/date';

/**
 * @description: 工作台待办事项
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'workbenchToDo',
  components: {
    WorkbenchToDoEditor,
  },
  setup() {
    const menuActiveIndex = ref(0); // 激活菜单索引
    const showTaskEditor = ref(false); // 是否显示待办事项弹出编辑框
    const cachedTask = reactive({ task: null, add: false }); // 缓存的任务，弹窗打开该任务

    // 获取排好序的todoList
    const { sortedToDoList } = mapGetters('globalStore', ['sortedToDoList']);

    // 获取历史记录操作方法
    const { updateToDoTask } = mapMutations('globalStore', ['updateToDoTask']);

    // 计算显示的todoList
    const toDoList = computed(() => {
      return menuActiveIndex.value
        ? sortedToDoList.value.filter((toDoTask) => toDoTask.complete) // 进行中
        : sortedToDoList.value.filter((toDoTask) => !toDoTask.complete); // 已完成
    });

    /**
     * @description: 完成这个任务
     * @param {ToDoTask} task 完成的任务对象 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function completeTask(task) {
      task = JSON.parse(JSON.stringify(task)); // 深拷贝
      task.complete = !task.complete; // 任务标记状态
      for (const subTask of task.steps) subTask.complete = task.complete; // 子步骤全部标记状态
      // 更新该任务
      updateToDoTask(task);
    }

    /**
     * @description: 置顶这个任务
     * @param {ToDoTask} task 完成的任务对象 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function toppingTask(task) {
      task = JSON.parse(JSON.stringify(task)); // 深拷贝
      if (task.toppingTime) delete task['toppingTime'];
      else task.toppingTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date()); // 置顶该任务并赋值当前日期
      // 更新该任务
      updateToDoTask(task);
    }

    /**
     * @description: 编辑或者添加这个任务
     * @param {ToDoTask | null} task 完成的任务对象 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function editTask(task) {
      if (task) {
        // 编辑 task
        cachedTask.add = false;
        cachedTask.task = task;
      } else {
        // 添加 task
        cachedTask.add = true;
        cachedTask.task = {
          title: '',
          complete: false,
          steps: [],
        };
      }
      // 显示弹窗
      showTaskEditor.value = true;
    }

    /**
     * @description: 获取这个任务的进度
     * @param {ToDoTask} task 完成的任务对象 `必传参数`
     * @return {number} 返回任务进度百分比
     * @author: dreamy-xay
     */
    function getTaskProgress(task) {
      // 如果该任务存在子步骤
      if (task.steps.length) {
        let count = 0;
        for (const subTask of task.steps) if (subTask.complete) count += 1;
        return Math.floor((count * 100) / task.steps.length);
      }
      return task.complete ? 100 : 0;
    }

    return {
      menuActiveIndex,
      showTaskEditor,
      cachedTask,
      toDoList,
      completeTask,
      toppingTask,
      editTask,
      getTaskProgress,
    };
  },
});
</script>

<style lang="scss" scoped>
.workbench-to-do {
  margin-top: 16px;
  width: 100%;
  border-radius: $border-radius-1;
  background-color: $grey-0;
  @include flex(center, center, column);
  overflow: hidden;

  & > div {
    width: 100%;
    box-sizing: border-box;
  }

  .workbench-to-do-head {
    height: 58px;
    font-size: 16px;
    color: $grey-10;
    border-bottom: 1px solid $grey-4;
    padding: 0 24px;
    @include flex(center, space-between);

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
        font-size: 18px;
        margin-bottom: 1px;
      }
    }

    .right {
      margin-right: -8px;

      .menu-item {
        height: 24px;
        width: 50px;
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

  .workbench-to-do-body {
    @include flex(center, center, column);
    padding: 16px;

    & > div {
      height: 38px;
      width: 100%;
      @include flex(center);
      border-radius: $border-radius-1;
      overflow: hidden;
      background-color: $grey-0;
      transition: 0.25s;

      &:hover {
        background-color: $grey-3;
      }
    }

    .to-do-info {
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
        height: 38px;
        line-height: 38px;
        width: calc(100% - 72px);
        @include ellipsis(1);
        font-size: 15px;
        color: $grey-11;
      }

      .topping {
        margin: 0 10px;
        width: 16px;
        height: 16px;
        @include flex(center, center);

        &.topping-active .iconfont {
          color: $yellow-1;
        }

        .iconfont {
          font-size: 20px;
          font-weight: 700;
          color: $grey-9;
          transition: 0.25s;

          &:hover {
            color: $yellow-1;
          }
        }
      }
    }

    .to-do-add {
      font-size: 15px;
      color: $blue-1;

      &:hover {
        color: $blue-2;

        .icon .iconfont {
          color: $blue-2;
        }
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
          color: $blue-1;
          font-weight: 700;
          transform: rotate(45deg);
          transition: 0.25s;
        }
      }

      .content {
        height: 100%;
      }
    }
  }
}

.workbench-to-do-task-progress {
  @include flex(center);
  color: $blue-1;
  font-size: 15px;
  user-select: none;

  .icon {
    height: 16px;
    width: 16px;
    @include flex(center, center);
    margin-right: 6px;

    .iconfont {
      font-size: 18px;
    }
  }

  .progress {
    margin-left: 6px;
    color: $purple-1;
    font-weight: 700;
  }
}
</style>
