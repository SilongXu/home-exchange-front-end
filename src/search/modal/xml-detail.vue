<template>
  <el-dialog :title="detailXml.name" :visible="visible" @close="onClose" width="60%" top="4%">
    <div class="dialog">
      <div class="dialog-top">
        <svg-icon icon="file" size="32px"></svg-icon>
        <span :title="detailXml.name">{{detailXml.name}}</span>
      </div>
      <div class="dialog-bottom" v-loading="loadingXml" element-loading-background="rgba(0, 0, 0, 0.4)">
        <pre>
          {{'\n'+atob}}
        </pre>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import apiService from '../search.service';

export default {
  name: 'xmlDetail',
  props: ['visible', 'detailXml'],
  data: () => {
    return {
      atob: '',
      loadingXml: true,
    }
  },
  methods: {
    onClose(){
      this.$emit('closeXml', 'xmlDetail');
    },
  },
  mounted(){
    this.loadingXml= true;
    apiService.getXmlDetail(this.detailXml.metaFilePath)
    .then((data) => {
      this.atob= window.atob(data.data);
      this.loadingXml = false;
    }).catch(() => {
    });
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.dialog{
  font-size: 20px;
  &-bottom{
    font-size: 20px;
    border-radius: 10px;
    padding: 10px 60px;
    margin-top: 10px;
    background: rgba(0, 0, 0, 0.4);
  }
}

</style>