<template>
  <el-dialog
    :title="'添加目录'"
    :visible="visible"
    @close="onClose"
    :close-on-click-modal="false"
    width="30%"
    v-dialogDrag
  >
    <div>
      <span class="labelName">请输入目录的名称:</span>
      <el-input v-model="dirName" ref="nameInput" id="nameInput"></el-input>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="confirmAddDir">确认</el-button>
      <el-button @click="onClose">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import apiService from "@/search/search.service";
export default {
  props: ["visible", "currentNodeParentId"],
  data() {
    return {
      dirName: "",
    };
  },
  methods: {
    onClose() {
      this.$emit("closeAddDirectoryDialog");
    },
    getFocus(){
      this.$nextTick(function(){
        this.$refs.nameInput.focus()
      })
    },
    confirmAddDir() {
      //设置请求体
      let request = {};
      request.name = this.dirName;
      request.nodeType = "DIR";
      request.parentId = this.currentNodeParentId;

      if (request.name.trim()) {
        apiService.createDirByParentId(request).then((response) => {
          if (response.data.result === "true") {
            //刷新节点
            this.refreshNode(this.currentNodeParentId)
            //添加成功后,清空input
            this.dirName = "";
            //添加成功后关闭dialog
            this.onClose();
          }
        });
      } else {
        alert("输入的文件夹名字不能为空");
      }
    },
    refreshNode(nodeId) {
      let leftConditionTree = this.$parent.$parent.$parent.$refs.menu.$refs
        .searchConditionTree;
      if (leftConditionTree) {
        let leftNode = leftConditionTree.getNode(nodeId);
        if (leftNode) {
          leftNode.loaded = false;
          leftNode.expand();
        }
      }
      let rightConditionTree = this.$parent.$refs.searchConditionTree;
      if (rightConditionTree) {
        let rightNode = rightConditionTree.getNode(nodeId);
        if (rightNode) {
          rightNode.loaded = false;
          rightNode.expand();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";

.labelName {
  display: inline-block;
  font-size: $font-lg;
  margin-bottom: 10px;
}
</style>