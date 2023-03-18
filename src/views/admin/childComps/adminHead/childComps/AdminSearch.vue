<!--
 * @Description:搜索页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-03-20 15:21:39
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-18 15:22:03
-->
<template>
  <n-modal
    class="base-modal"
    display-directive="if"
    v-model="isShow"
    :on-esc="close"
    :on-mask-click="close"
  >

    <div class="admin-search">
      <div class="admin-search-top">
        <base-input
          placeholder="搜索"
          :style="{height:'48px',padding:'4px 11px'}"
          :show-close="true"
          v-model="modelValue"
          :maxlength="20"
          @input="input"
        />
      </div>
      <div class="admin-search-body">
        <div
          v-if="!showData"
          class="null-data"
        >暂无搜索结果</div>

        <div
          v-else
          class="data"
        >
          <el-scrollbar
            max-height="472px"
            ref="scrollBarRef"
          >
            <div
              role="button"
              v-for="(item , index) in searchData[0]"
              :key="index"
              class="item"
              :class="index==hoverIndex ? 'item-hover':''"
              @mouseenter="hoverIndex=index"
              @click="changPage(item)"
            >
              <div class="item-search">
                <div
                  class="search"
                  v-for="(item1 , index1) in item"
                  :key="index1"
                >
                  <div class="content">
                    <div
                      class="icon"
                      v-if="item1.icon"
                    >
                      <i :class="'iconfont '+item1.icon"></i>
                    </div>
                    {{item1.title}}
                  </div>

                  <div
                    class="icon-next"
                    v-if="index1 != item.length-1"
                  >
                    <i class="iconfont blog-arrow-down"></i>
                  </div>

                </div>
              </div>
              <div
                v-if="index==hoverIndex"
                class="nsblog-app-search-modal-list__item-enter"
              ><span
                  class="app-iconify anticon"
                  style="font-size: 20px; display: inline-flex;"
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    class="iconify iconify--ant-design"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"
                    ></path>
                  </svg></span></div>
            </div>

          </el-scrollbar>
        </div>

      </div>
      <div class="admin-search-bottom">
        <span class="nsblog-app-search-footer-item">
          <span
            class="app-iconify anticon"
            style="font-size: 16px; display: inline-flex;"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="iconify iconify--ant-design"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"
              ></path>
            </svg>
          </span>
        </span>
        <span class="text">确认</span>
        <span class="nsblog-app-search-footer-item">
          <span
            class="app-iconify anticon"
            style="font-size: 16px; display: inline-flex;"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="iconify iconify--ion"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="m112 244l144-144l144 144M256 120v292"
              ></path>
            </svg>
          </span>
        </span>
        <span class="nsblog-app-search-footer-item">
          <span
            class="app-iconify anticon"
            style="font-size: 16px; display: inline-flex;"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="iconify iconify--ion"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="m112 268l144 144l144-144M256 392V100"
              ></path>
            </svg>
          </span>
        </span>
        <span class="text">切换</span>
        <span class="nsblog-app-search-footer-item"><span
            class="app-iconify anticon"
            style="font-size: 16px; display: inline-flex;"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="iconify iconify--mdi"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M1 7h6v2H3v2h4v2H3v2h4v2H1V7m10 0h4v2h-4v2h2a2 2 0 0 1 2 2v2c0 1.11-.89 2-2 2H9v-2h4v-2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2m8 0h2a2 2 0 0 1 2 2v1h-2V9h-2v6h2v-1h2v1c0 1.11-.89 2-2 2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2Z"
              ></path>
            </svg>
          </span>
        </span>
        <span class="text">关闭</span>
      </div>
    </div>

  </n-modal>
</template>
<script>
import { defineComponent, nextTick, reactive, ref } from 'vue';
import BaseInput from '@/components/content/baseInput/BaseInput.vue';
import { searchMenuRoutes } from '@/util/router';
import { useRouter } from 'vue-router';
import { mapState } from '@/util/store';

/**
 * @description: 搜索页面
 * @event close-search 关闭model
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'adminSearch',
  components: { BaseInput },
  setup(_, content) {
    const isShow = ref(true); //是否显示model
    const modelValue = ref(''); // 输入框的值
    const searchData = reactive([]); // 搜索到的数据
    const hoverIndex = ref(-1); // 鼠标选择页面下标
    const scrollBarRef = ref(null); // 控制滚动条 ref
    const router = useRouter();
    const showData = ref(false); // 是否有数据

    const { adminRoutes } = mapState('global', ['adminRoutes']); // 获取adminRoutes

    /**
     * @description: 输入框输入
     * @return {void}
     * @author: Z_Y_C
     */
    function input() {
      if (modelValue.value) {
        searchData.splice(0, searchData.length);
        let arr = [];
        arr = searchMenuRoutes((route) => route.title.includes(modelValue.value), adminRoutes.value);
        searchData.splice(0, arr.length, arr);
        if (searchData[0].length) {
          showData.value = true;
          hoverIndex.value = 0;
        } else {
          showData.value = false;
          hoverIndex.value = -1;
        }
      } else {
        showData.value = false;
        hoverIndex.value = -1;
        searchData.splice(0, searchData.length);
      }
    }

    //当前页面监视键盘输入
    window.addEventListener('keydown', (e) => {
      //事件对象兼容
      let event = e || window.event || arguments.callee.caller.arguments[0];
      //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
      if (searchData[0]) {
        if (event && event.keyCode == 38) {
          if (hoverIndex.value >= 1) hoverIndex.value--;
          else if (hoverIndex.value == 0) {
            hoverIndex.value = searchData[0].length - 1;
            nextTick(() => {
              scrollBarRef.value.setScrollTop(scrollBarRef.value.wrap.scrollHeight);
            });
          }
          if (scrollBarRef.value.sizeHeight && hoverIndex.value != searchData[0].length - 1) {
            nextTick(() => {
              scrollBarRef.value.setScrollTop(scrollBarRef.value.wrap.scrollTop - 64);
            });
          }
        } else if (event && event.keyCode == 40) {
          if (hoverIndex.value < searchData[0].length - 1) hoverIndex.value++;
          else if (hoverIndex.value == searchData[0].length - 1) {
            hoverIndex.value = 0;
            nextTick(() => {
              scrollBarRef.value.setScrollTop(0);
            });
          }
          if (scrollBarRef.value.sizeHeight && hoverIndex.value) {
            nextTick(() => {
              scrollBarRef.value.setScrollTop(scrollBarRef.value.wrap.scrollTop + 64);
            });
          }
        } else if (event && event.keyCode == 13) {
          changPage(searchData[0][hoverIndex.value]);
        }
      }
    });

    /**
     * @description: 跳转
     * @param {object} 跳转的object信息
     * @return {void}
     * @author: Z_Y_C
     */
    function changPage(item) {
      router.push({ name: item[item.length - 1].name });
      isShow.value = false;
      showData.value = false;
      searchData.splice(0, searchData.length);
      modelValue.value = '';
      content.emit('close-search');
    }

    /**
     * @description: 关闭model
     * @return {void}
     * @author: Z_Y_C
     */
    function close() {
      isShow.value = false;
      showData.value = false;
      searchData.splice(0, searchData.length);
      modelValue.value = '';
    }

    return {
      isShow,
      modelValue,
      searchData,
      hoverIndex,
      scrollBarRef,
      input,
      changPage,
      showData,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-modal {
  overflow: hidden;
}

.admin-search {
  width: 634px;
  max-height: 592px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  border: 1px solid $grey-4;
  margin-top: 50px;

  .admin-search-top {
    padding: 14px 14px 0;
    height: 62px;
    box-sizing: border-box;

    :deep(.base-input) {
      input {
        &:focus,
        &:hover {
          color: $blue-1;
          box-shadow: 0 0 6px $blue-1;

          &::-webkit-input-placeholder {
            color: $blue-1;
          }

          & ~ .base-input-eye,
          & ~ .base-input-close {
            color: $blue-1;
          }
        }
      }
    }
  }

  .admin-search-body {
    .null-data {
      height: 100px;
      @include flex(center, center);
    }

    .data {
      margin-top: 14px;
      box-sizing: border-box;

      .item {
        height: 56px;
        margin: 8px 14px 0;
        border-radius: $border-radius-1;
        box-shadow: $shadow-0;
        color: $grey-8;
        padding-left: 14px;
        box-sizing: border-box;

        @include flex(center, space-between);

        &:last-child {
          margin-bottom: 20px;
        }

        .item-search {
          @include flex(center);

          .search {
            @include flex(center);

            .content {
              @include flex(center);
              font-size: 14px;

              .icon {
                height: 14px;
                line-height: 14px;
                margin-right: 3px;
                .iconfont {
                  font-size: 14px;
                }
              }
            }

            .icon-next {
              margin: 0 10px;
              height: 14px;
              line-height: 14px;
              transform: rotate(-90deg);
              .iconfont {
                font-size: 14px;
              }
            }
          }
        }
      }

      .item-hover {
        background-color: $blue-1;
        color: $grey-0;
      }

      .nsblog-app-search-modal-list__item-enter {
        width: 30px;
      }
    }
  }

  .admin-search-bottom {
    border-top: 1px solid $grey-4;
    @include flex(center, initial);
    height: 44px;
    padding: 0 16px;
    font-size: 12px;
    color: $grey-9;
    flex-shrink: 0;

    .nsblog-app-search-footer-item {
      display: flex;
      width: 20px;
      height: 18px;
      padding-bottom: 2px;
      margin-right: 0.4em;
      border-radius: 2px;
      box-shadow: inset 0 -2px $grey-4, inset 0 0 1px 1px $grey-0, 0 1px 2px 1px $grey-9;
      align-items: center;
      justify-content: center;

      .app-iconify {
        display: inline-block;
      }

      .anticon {
        display: inline-block;
        color: inherit;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        vertical-align: -0.125em;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

    .text {
      margin: 0 10px 0 0;
    }
  }
}
</style>
