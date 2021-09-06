<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-24 10:18:28
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-09-04 18:03:49
-->
<template>
  <div class="user-center-collection-list">
    <div
      class="user-center-collection-list-new"
      role="button"
    >
      <i class="iconfont blog-wenjianjia"></i>
      <div
        class="newcollection"
        @click="isVisible = true"
      >新建文件夹</div>
    </div>
    <div class="left-bottom">
      <el-scrollbar>
        <div
          :class="{active : index === activeIndex}"
          class="collection-name"
          role="button"
          v-for="(item,index) in favorites"
          :key="index"
          @click="chooseActive(index);this.scrollbar.setScrollTop(0)"
        >
          <i
            v-if="!item.is_private"
            class="iconfont blog-weibiaoti5"
          ></i>
          <i
            v-else
            class="iconfont blog-jiami"
          ></i>
          <div class="collection">{{item.name}}</div>
          <n-badge
            :value="item.count"
            :max="99"
            :color="styles.orange0"
            v-if="item.count > -1"
          />
        </div>
      </el-scrollbar>
    </div>
    <div class="new-collection">
      <n-dialog
        title="新建文件夹"
        maskClosable="isVisible"
        :closable="false"
        negative-text="取消"
        positive-text="确认"
        @positive-click="handlePositiveClick"
        @negative-click="handleNegativeClick"
        :width=462
      >
        <div class="title">标题</div>
        <input
          class="inputTitle"
          id="name"
          v-model="inputname"
          required
        />
        <div class="detail">描述（选填）</div>
        <textarea
          class="inputDetail"
          v-model="inputremark"
        />
        <div>私密</div>
        <el-radio-group v-model="radio">
          <el-radio :label="false">公开</el-radio>
          <el-radio :label="true">私有</el-radio>
        </el-radio-group>
        <!-- <template #footer>
          <span class="dialog-footer">
            <el-button @click="isVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="newfavorites(this.inputname,this.inputremark,this.radio) ; isVisible = false"
            >确 定</el-button>
          </span>
        </template> -->
      </n-dialog>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import styles from '@/assets/style/define.scss';
import { useMessage } from 'naive-ui';

export default defineComponent({
  name: 'usercentercollectionlist',
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: Object,
      default: null,
    },
  },
  setup() {
    const isVisible = ref(false);
    const radio = ref(false);
    const scrollbar = ref(null); //scrollbar
    const message = useMessage(); //message提示

    function check() {
      let name = document.getElementsByClassName('inputname').value;
      if (name == '') {
        alert('标题为必填项，请重新填入');
        return false;
      } else newfavorites;
    }

    function chooseActive(index) {
      this.$emit('change-index', index);
    }

    function newfavorites(name, remark, is_private) {
      this.$emit('new-fav', [name, remark, is_private]);
    }

    function handlePositiveClick() {
      message.success('新建文件夹成功');
    }

    return {
      radio,
      scrollbar,
      isVisible,
      chooseActive,
      styles,
      newfavorites,
      check,
      handlePositiveClick,
    };
  },
});
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.user-center-collection-list {
  @include size(180px, 645px);

  .user-center-collection-list-new {
    @include size(180px, 60px);
    color: #8c8c8c;
    border-bottom: 1px solid #e5e5e5;

    i {
      padding-left: 30px;
      position: relative;
      top: 22px;
    }

    .newcollection {
      margin-left: 56px;
    }
  }

  .left-bottom {
    @include size(180px, 585px);

    :deep(.el-scrollbar__thumb) {
      background-color: $grey-7 !important;
    }

    .collection-name {
      @include size(180px, 60px);
      display: flex;
      color: #8c8c8c;
      border-bottom: 1px solid #e5e5e5;

      .n-badge {
        padding: 35px 0 0 20px;
      }

      &.active {
        background: #f4f4f4;
      }

      i {
        padding: 19px 0 0 30px;
      }

      .collection {
        @include size(70px, 19px);
        @include ellipsis(1);
        padding: 19px 0 0 10px;
      }
    }
  }

  .new-collection {
    :deep(.el-dialog__body) {
      margin-left: 20px !important;

      .el-radio__input.is-checked + .el-radio__label {
        color: #85e8c7;
      }

      .el-radio__input.is-checked .el-radio__inner {
        border-color: #85e8c7;
        background-color: #85e8c7;
      }
    }

    :deep(.el-dialog__footer) {
      .el-button--default {
        &:hover {
          border-color: #85e8c7;
          color: #85e8c7;
        }
      }
      .el-button--primary {
        background-color: #85e8c7;
        border-color: #85e8c7;

        &:hover {
          background-color: $green-1;
        }
      }
    }
    .title {
      margin-bottom: 5px;
    }

    .inputTitle {
      height: 32px;
      width: 350px;
      border: 1px solid $grey-7;
      border-radius: 3px 0 0 3px;
      outline: 0;
    }

    .detail {
      margin-bottom: 5px;
    }

    .inputDetail {
      height: 100px;
      width: 350px;
      border: 1px solid $grey-7;
      border-radius: 3px 0 0 3px;
      vertical-align: top;
      outline: 0;
    }
  }
}
</style>
