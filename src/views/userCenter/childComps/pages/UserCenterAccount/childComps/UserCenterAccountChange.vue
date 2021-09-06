<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-26 15:11:17
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-28 16:28:38
-->
<template>
  <div @click="dialogVisible = true">{{ title }}</div>

  <el-dialog
    :title="title"
    v-model="dialogVisible"
    width="400px"
    ref="elDialog"
    top="20vh"
    :destroy-on-close="true"
  >
    <div class="user-center-account-change">
      <div v-if="title === '修改密码'">
        <div>原密码
          <el-input
            placeholder="原密码"
            v-model="oldData"
            clearable
            class="input"
          >
          </el-input>
        </div>
        <div>新密码
          <el-input
            placeholder="新密码"
            v-model="newData1"
            show-password
          >
          </el-input>
        </div>
        <div>确认新密码
          <el-input
            placeholder="确认新密码"
            v-model="newData2"
            show-password
          >
          </el-input>
        </div>
      </div>
      <div v-else-if="title === '换绑邮箱' || title === '绑定邮箱'">
        <div>邮箱</div>
        <el-input
          placeholder="邮箱"
          v-model="oldData"
          clearable
          class="input"
        >
        </el-input>
        <div>验证码</div>
        <el-input
          placeholder="验证码"
          v-model="newData1"
          clearable
          class="input"
          style="width: 200px; margin-right: 20px"
        >
        </el-input>
        <el-button>发送验证码</el-button>
      </div>
      <div v-else-if="title === '绑定微博'">
        <div>微博帐号</div>
        <el-input
          placeholder="微博帐号"
          v-model="oldData"
          clearable
          class="input"
        >
        </el-input>
      </div>
      <div v-else-if="title === '绑定QQ'">
        <div>QQ帐号</div>
        <el-input
          placeholder="QQ帐号"
          v-model="oldData"
          clearable
          class="input"
        >
        </el-input>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  name: 'UserCenterAccountChange',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const dialogVisible = ref(false);
    const oldData = ref('');
    const newData1 = ref('');
    const newData2 = ref('');
    //获取元素高度
    // const dialogHeight = computed(() => {
    //   return this.$refs.elDialog.offsetHeight;
    // });
    return {
      dialogVisible,
      oldData,
      newData1,
      newData2,
    };
  },
});
</script>

<style lang='scss' scoped>
.user-center-account-change {
  ::v-deep(.el-input__inner) {
    &:focus {
      border: 1px solid $green-0;
    }
  }

  div {
    padding: 5px 0;
  }
}
::v-deep(.el-button) {
  background: $green-0;
  border: none;
  color: $grey-0;
  font-size: 16px;

  &:hover {
    background: $green-1;
  }
}
</style>
<style lang="scss">
.el-overlay {
  cursor: default;
}
</style>
