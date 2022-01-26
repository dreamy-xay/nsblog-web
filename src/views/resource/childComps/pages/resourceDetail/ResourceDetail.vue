<!--
 * @Description:资源详细信息页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-24 15:52:14
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-26 21:22:24
-->
<template>
  <div class="resource-detail">
    <resource-detail-top :data="detailData"></resource-detail-top>
    <resource-detail-bottom :data="detailData.recommend_resources"></resource-detail-bottom>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import ResourceDetailTop from '@/views/resource/childComps/pages/resourceDetail/childComps/ResourceDetailTop.vue';
import ResourceDetailBottom from '@/views/resource/childComps/pages/resourceDetail/childComps/ResourceDetailBottom.vue';
import { getResourceDetail } from '@/network/api/resources';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';

/**
 * @description:资源详细信息页面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceDetail',
  components: {
    ResourceDetailTop,
    ResourceDetailBottom,
  },
  setup() {
    const msg = useMessage();
    const route = useRoute(); // 路由
    const resourceId = route.params.resourceId; // 资源id
    const detailData = reactive({
      avatar: '',
      download_count: null,
      id: null,
      link: null,
      name: null,
      nickname: null,
      recommend_resources: [],
      remark: null,
      upload_time: null,
      username: null,
    });

    /**
     * @description: 获取数据
     * @return {Void}
     * @author: Z_Y_C
     */
    function getMessage() {
      getResourceDetail(resourceId)
        .then((data) => {
          console.log(data);
          detailData.avatar = data.avatar;
          detailData.download_count = data.download_count;
          detailData.id = data.id;
          detailData.link = data.link;
          detailData.name = data.name;
          detailData.nickname = data.nickname;
          detailData.recommend_resources.splice(data.recommend_resources.length, 0, ...data.recommend_resources);
          detailData.remark = data.remark;
          detailData.upload_time = data.upload_time;
          detailData.username = data.username;
          console.log(detailData);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取资源信息失败，请重试', { duration: 2000, closable: true });
        });
    }
    // 获取数据
    getMessage();

    return {
      detailData,
    };
  },
});
</script>

<style lang="scss" scoped>
.resource-detail {
  width: 1000px;
}
</style>
