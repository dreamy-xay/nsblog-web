<!--
 * @Description:资源详细信息页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-24 15:52:14
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-15 17:59:27
-->
<template>
  <div class="resource-detail">
    <resource-detail-top
      :data="detailDataTop"
      @change-collection="changeCollection"
    />
    <resource-detail-bottom :data="detailDataBottom" />
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import ResourceDetailTop from '@/views/resource/childComps/pages/resourceDetail/childComps/ResourceDetailTop.vue';
import ResourceDetailBottom from '@/views/resource/childComps/pages/resourceDetail/childComps/ResourceDetailBottom.vue';
import { getResourceDetail } from '@/network/api/resources';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';
import { cancelCollections } from '@/network/api/favorites';

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
    const detailDataTop = reactive({
      avatar: '',
      collection: null,
      download_count: null,
      id: null,
      link: null,
      name: null,
      nickname: null,
      remark: null,
      upload_time: null,
      username: null,
    });

    const detailDataBottom = reactive([]);

    /**
     * @description: 获取数据
     * @return {Void}
     * @author: Z_Y_C
     */
    function getMessage() {
      getResourceDetail(resourceId)
        .then((data) => {
          detailDataTop.avatar = data.avatar;
          detailDataTop.download_count = data.download_count;
          detailDataTop.collection = data.collection;
          detailDataTop.id = data.id;
          detailDataTop.link = data.link;
          detailDataTop.name = data.name;
          detailDataTop.nickname = data.nickname;
          detailDataBottom.splice(0, 0, ...data.recommend_resources);
          detailDataTop.remark = data.remark;
          detailDataTop.upload_time = data.upload_time;
          detailDataTop.username = data.username;
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取资源信息失败，请重试');
        });
    }
    // 获取数据
    getMessage();

    /**
     * @description: 改变收藏状态
     * @param {Number} id 收藏夹id
     * @return {Void}
     * @author: Z_Y_C
     */
    function changeCollection(id) {
      if (detailDataTop.collection && !id) {
        cancelCollections(detailDataTop.collection)
          .then(() => {
            detailDataTop.collection = 0;
            msg.success('取消收藏成功');
          })
          .catch((error) => {
            console.log(error);
            msg.error('取消收藏失败，请重试');
          });
      } else detailDataTop.collection = id;
    }

    return {
      detailDataTop,
      detailDataBottom,
      changeCollection,
    };
  },
});
</script>

<style lang="scss" scoped>
.resource-detail {
  width: 1000px;
}
</style>
