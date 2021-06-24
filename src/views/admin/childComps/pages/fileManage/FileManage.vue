<!--
 * @Author: clq
 * @Date: 2021-06-20 18:35:55
 * @LastEditTime: 2021-06-24 12:53:40
 * @LastEditors: dreamy-xay
 * @Description: In User Settings Edit
 * @FilePath: \web\src\views\admin\childComps\pages\fileManage\FileManage.vue
-->
<template>
  <admin-window
    bind-class="file-manage"
    title="文件管理"
  >
    <!-- 文件上传 -->
    <div class="file-manage-upload">
      <el-card>
        <div slot="header">
          <span>文件上传</span>
        </div>
        <!-- 文件上传面板 -->
        <div>
          <el-upload
            drag
            action="E:\vscode-workspace\web\project\blog\web\static"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div
              class="el-upload__tip"
              slot="tip"
            >只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-card>
    </div>
    <!-- 服务器图库 -->
    <div class="file-manage-picture-library">
      <el-card>
        <div slot="header">
          <span>服务器图库</span>
        </div>
      </el-card>
    </div>
  </admin-window>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminWindow from '@/components/common/AdminWindow.vue';

export default Vue.extend({
  name: 'fileManage',
  data() {
    return {};
  },
  methods: {},
  components: {
    AdminWindow,
  },
});
</script>

<style lang="scss" scoped>
.file-manage {
  // 文件上传
  .file-manage-upload {
    width: 100%;
    .el-upload__tip {
      text-align: center;
    }
  }

  // 服务器图库
  .file-manage-picture-library {
    width: 100%;
    height: 200px;
    margin-top: 20px;
  }
}
</style>

<style lang="scss">
.file-manage {
  // 全局修改文件上传框宽度
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
    }
  }
}
</style>
