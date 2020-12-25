<template>
  <el-dialog
    :title="'重命名'"
    :visible="visible"
    @close="onClose"
    :close-on-click-modal="false"
    width="30%"
    v-dialogDrag
  >
    <div>
      <span class="labelName">请输入新的名称:</span>
      <el-input v-model="newName" ref="nameInput"></el-input>
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
  props: ["visible",'currentTreeNode'],
  data() {
    return {
      newName: "",
    };
  },
  methods: {
    onClose() {
      this.$emit("closeRenameDialog");
    },
    getFocus(){
      this.$nextTick(function(){
        this.$refs.nameInput.focus();
      })
    },
    initInput(value){
      this.newName = value;
    },
    confirmAddDir() {
      if (this.newName) {
        apiService.renameDirOrFileById(this.currentTreeNode.data.id,this.newName).then((response)=>{
          if(response.data.result == 'true'){
             this.refreshNode(this.currentTreeNode.parent.data.id);
             this.newName = '';
             this.onClose();
          }
        })
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