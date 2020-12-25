<template>
  <el-dialog :title="'XML详情'" :visible="dialogVisible" @close="onclose" append-to-body>
    <div class="xmlShow">
      <pre>
        {{ '\n' + messageXml }}
      </pre>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["dialogVisible", "messageXml"],
  data() {
    return {};
  },
  methods: {
    onclose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.xmlShow{
  font-size: $font-lg;
  height: 50vh;
  overflow: auto;
  background: rgba(0, 0, 0, 0.4);
}
</style>