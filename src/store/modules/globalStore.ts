/*
 * @Description: 公共页面全局状态（缓存）
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-17 09:50:38
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-28 15:38:40
 */
import { StoreOptions } from 'vuex';

/**
 * @description: todo任务内部步骤接口
 * @author: dreamy-xay
 */
export interface ToDoTaskStep {
  complete: boolean;
  content: string;
}

/**
 * @description: todo任务接口
 * @author: dreamy-xay
 */
export interface ToDoTask {
  title: string;
  complete: boolean;
  index?: number;
  toppingTime?: string;
  steps: ToDoTaskStep[];
}

const searchHistoryStore: StoreOptions<unknown> = {
  state: {
    searchHistory: [] as string[], // 搜索历史记录
    toDoList: [] as ToDoTask[] // 待办事项列表
  },
  getters: {
    /* toDoList */
    // 计算总待办事项和已完成事项
    toDoListCount(state: any) {
      return {
        all: state.toDoList.length,
        complete: state.toDoList.filter((toDoDesk: ToDoTask) => toDoDesk.complete).length
      };
    },
    // 计算排好序的toDoList
    sortedToDoList(state: any) {
      // 重新构造（深拷贝）
      return state.toDoList.sort(
        (a: ToDoTask, b: ToDoTask) => <any>new Date(b.toppingTime) - <any>new Date(a.toppingTime)
      );
    }
  },
  mutations: {
    /* searchHistory */
    // 设置（添加）搜索历史记录
    setSearchHistory(state: any, history: string = '') {
      if (history.length === 0) return;
      const index: number = state.searchHistory.findIndex((res: string) => {
        return res === history;
      });
      if (index !== -1) state.searchHistory.splice(index, 1);
      state.searchHistory.splice(0, 0, history);
    },
    // 删除搜索历史记录
    deleteSearchHistory(state: any, index: number = -1) {
      if (index === -1) state.searchHistory.splice(0, state.searchHistory.length);
      else state.searchHistory.splice(index, 1);
    },
    /* toDoList */
    // 添加toDoTask
    addToDoTask(state: any, toDoTask: ToDoTask) {
      toDoTask.index = state.toDoList.length; // 标记索引
      state.toDoList.splice(state.toDoList.length, 0, toDoTask); // 添加
    },
    // 删除toDoTask
    deleteToDoTask(state: any, toDoTask: ToDoTask) {
      const index: number = state.toDoList.findIndex((ctdt: ToDoTask) => ctdt.index === toDoTask.index);
      if (index !== -1) state.toDoList.splice(index, 1);
    },
    // 修改toDoTask
    updateToDoTask(state: any, toDoTask: ToDoTask) {
      const index: number = state.toDoList.findIndex((ctdt: ToDoTask) => ctdt.index === toDoTask.index);
      if (index !== -1) state.toDoList.splice(index, 1, toDoTask);
    }
  }
};

export default {
  namespaced: true,
  persistedstate: true,
  ...searchHistoryStore
};
