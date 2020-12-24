<template>
  <el-dialog
    :title="'提示'"
    :visible="visible"
    @close="onClose"
    :close-on-click-modal="false"
    v-dialogDrag
  >
    <h1>
      确认删除<span class="warnMsg">{{ currentNodeName }}</span
      >及其子目录吗?
    </h1>
    <span slot="footer">
      <el-button @click="confirmDelete">确认</el-button>
      <el-button @click="onClose">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import apiService from "@/search/search.service";
export default {
  props: ["visible", "currentNodeId", "currentNodeName"],
  data() {
    return {};
  },
  methods: {
    onClose() {
      this.$emit("closeDeleteDirectoryDialog");
    },
    confirmDelete() {
      apiService.deleteTreeNodeById(this.currentNodeId).then((response) => {
        if (response.data.result === "true") {
          //刷新节点
          this.refreshNode(this.currentNodeId);
          this.onClose();
        }
      });
    },
    refreshNode(nodeId) {
      let leftConditionTree = this.$parent.$parent.$parent.$refs.menu.$refs
        .searchConditionTree;
      if (leftConditionTree) {
        let leftNode = leftConditionTree.getNode(nodeId);
        if (leftNode) {
          leftNode.parent.loaded = false;
          leftNode.parent.expand();
        }
      }
      let rightConditionTree = this.$parent.$refs.searchConditionTree;
      if (rightConditionTree) {
        let rightNode = rightConditionTree.getNode(nodeId);
        if (rightNode) {
          rightNode.parent.loaded = false;
          rightNode.parent.expand();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";
.warnMsg {
  color: red;
}
</style>