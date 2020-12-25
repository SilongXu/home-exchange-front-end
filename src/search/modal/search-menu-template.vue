<template>
  <div>
    <el-dialog
      :title="'请选择模板保存位置'"
      :visible="visible"
      class="dialog"
      width="30%"
      @close="onClose"
      v-dialogDrag
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <div class="dialog-content-main">
          <el-tree
            ref="searchConditionTree"
            lazy
            :load="loadTemplateTree"
            :props="treeProps"
            :default-expanded-keys="[-1]"
            :expand-on-click-node="false"
            :render-content="renderSearchCondition"
            node-key="id"
            @node-click="onNodeClick"
          >
          </el-tree>
        </div>
        <div class="dialog-content-footer">
          <div class="input-group">
            <span>选择文件路径:</span>
            <el-input
              style="width: 250px"
              size="mini"
              v-model="newFilePath"
            ></el-input>
          </div>
          <div class="input-group">
            <span>搜索模板名称:</span>
            <el-input
              style="width: 250px"
              size="mini"
              v-model="newFileName"
            ></el-input>
          </div>
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="confirmOperation">确认</el-button>
        <el-button @click="onClose">取消</el-button>
      </span>
    </el-dialog>
    <add-directory
      ref="addDir"
      :visible="addDirDialogVisible"
      :currentNodeParentId="addDirByParentId"
      @closeAddDirectoryDialog="closeAddDirectoryDialog"
    ></add-directory>
    <rename-dir-or-file :visible="renameDirOrFileDialogVisible" ref="rename" @closeRenameDialog="closeRenameDialog" :currentTreeNode="renameTreeNode"></rename-dir-or-file>
    <file-content :visible="fileContentDialogVisible" :fileContent="fileContent" @closeFileContentDialog="closeFileContentDialog"></file-content>
    <delete-dirctory
      :visible="deleteDirDialogVisible"
      @closeDeleteDirectoryDialog="closeDeleteDirectoryDialog"
      :currentNodeId="deleteTreeNodeById"
      :currentNodeName="deleteTreeNodeName"
    ></delete-dirctory>
  </div>
</template>

<script>
import apiService from "@/search/search.service";
export default {
  props: ["visible"],
  data() {
    return {
      treeProps: {
        id: "id",
        label: "name",
        children: "children",
        disabled: "disabled",
        isLeaf: "isLeaf",
      },
      addDirDialogVisible: false,
      deleteDirDialogVisible: false,
      renameDirOrFileDialogVisible:false,
      fileContentDialogVisible:false,

      deleteTreeNodeById: "", //通过此id删除节点
      deleteTreeNodeName: "", //删除树节点的名字

      addDirByParentId: "", //添加文件夹时需要的父节点的id

      newFilePathList: [],
      newFilePath: "",
      newFileName: "",
      currentClickNodeId: "", //保存当前点击节点,供创建文件或者更新文件之后刷新节点使用
      currentClickNode: "",
      updateFile: false, //作为添加文件和更新文件的标志
      renameTreeNode:'', //通过当前节点的id重命名当前节点的名字,然后通过此节点找到父节点并刷新
      
      fileContent:''
    };
  },
  components: {
    "add-directory": () => import("./search-menu-add-directory"),
    "delete-dirctory": () => import("./search-menu-delete-directory"),
    "rename-dir-or-file":()=>import("./search-menu-rename"),
    'file-content':()=>import("./search-menu-file-content"),
  },
  methods: {
    onNodeClick(obj, node) {
      this.newFilePath = "";
      this.newFilePathList = [];

      this.currentClickNodeId = node.data.id;
      this.currentClickNode = node;
      
      while (node.data.id != -1) {
        if (node.data.nodeType == "DIR") {
          this.newFilePathList.unshift(node.data.name);
        }
        node = node.parent;
      }
      this.newFilePath = this.newFilePathList.join("\\");
      //如果点击的是文件夹,就直接获取当前电机的路径,作为新建文件的保存路径;
      //如果点击的是文件,就把当前文件的名字填进input中,获取他上级的父节点的路径,更新当前文件的内容
      if (node.data.nodeType == "FILE") {
        this.updateFile = true;
        this.newFileName = node.data.name;
      } else {
        this.updateFile = false;
        this.newFileName = "";
      }
    },
    onClose() {
      this.$emit("closeMenuTemplateDialog");
    },
    addDir(node) {
      this.addDirByParentId = node.data.id;
      this.addDirDialogVisible = true;
      this.$refs.addDir.getFocus();
    },
    closeAddDirectoryDialog() {
      this.addDirDialogVisible = false;
    },
    getFileContent(node){
      this.fileContentDialogVisible = true;
      apiService.getFileContentById(node.data.id).then((response)=>{
        this.fileContent = response.data;
      })
    },
    closeFileContentDialog(){
      this.fileContentDialogVisible = false;
    },
    renameDirOrFile(node){
      this.renameDirOrFileDialogVisible = true;
      this.renameTreeNode = node;
      this.$refs.rename.initInput(node.data.name)
      this.$refs.rename.getFocus();
    },
    closeRenameDialog(){
      this.renameDirOrFileDialogVisible = false;
    },
    deleteDir(node) {
      this.deleteTreeNodeById = node.data.id;
      this.deleteTreeNodeName = node.data.name;
      this.deleteDirDialogVisible = true;
    },
    closeDeleteDirectoryDialog() {
      this.deleteDirDialogVisible = false;
    },
    confirmOperation() {
      let request = {};
      if (!this.updateFile) {
        //创建新的文件
        if (this.newFileName.trim()) {
          request.content = JSON.stringify(
            this.$parent.$parent.getFilterForResult()
          );
          request.name = this.newFileName.trim();
          request.parentId = this.currentClickNodeId;
          apiService.createFileByParentId(request).then((response) => {
            if (response.data.result == "true") {
              this.refreshNode(this.currentClickNodeId);
              // this.onClose();
            }
          });
        } else {
          alert("新建的文件名不能为空");
        }
      } else {
        //更新已有的文件内容
        request.id = this.currentClickNodeId;
        request.content = JSON.stringify(
          this.$parent.$parent.getFilterForResult()
        );
        apiService.updateCurrentFileContent(request).then((response) => {
          if (response.data.result == "true") {
            this.refreshNode(this.currentClickNode.parent.data.id);
            // this.onClose();
          }
        });
      }
    },
    refreshNode(nodeId) {
      let leftConditionTree = this.$parent.$parent.$refs.menu.$refs
        .searchConditionTree;
      if (leftConditionTree) {
        let leftNode = leftConditionTree.getNode(nodeId);
        if (leftNode) {
          leftNode.loaded = false;
          leftNode.expand();
        }
      }
      let rightConditionTree = this.$refs.searchConditionTree;
      if (rightConditionTree) {
        let rightNode = rightConditionTree.getNode(nodeId);
        if (rightNode) {
          rightNode.loaded = false;
          rightNode.expand();
        }
      }
    },
    loadTemplateTree(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "全部", id: -1 }]);
      }
      if (node.level == 1) {
        apiService
          .getTemplateTreeNodeByParentId(-1)
          .then((tree) => {
            let responseData = tree.data;
            let result = responseData.map(function(item,index){
              if(item.nodeType == 'FILE'){
                item.isLeaf = true;
              }else{
                item.isLeaf = false;
              }
              return item;
            })
            return resolve(result);
          })
          .catch(() => {
            resolve([]);
          });
        return;
      }

      if (!node.data.isLeaf) {
        apiService
          .getTemplateTreeNodeByParentId(node.data.id)
          .then((tree) => {
            let responseData = tree.data;
            let result = responseData.map(function(item,index){
              if(item.nodeType == 'FILE'){
                item.isLeaf = true;
              }else{
                item.isLeaf = false;
              }
              return item;
            })

            return resolve(result);
          })
          .catch(() => {
            resolve([]);
          });

        return;
      }
    },
    renderSearchCondition(h, { node }) {
      return (
        <span class="search-menu-node">
          {(() => {
            if (node.data.nodeType == "FILE") {
              return <svg-icon icon="file"></svg-icon>;
            } else {
              return node.expanded ? (
                <svg-icon icon="folder-open"></svg-icon>
              ) : (
                <svg-icon icon="folder-close"></svg-icon>
              );
            }
          })()}
          <span domPropsTitle={node.label}>{node.label}</span>
          {(() => {
            if (node.data.nodeType == "FILE") {
              return (
                <span class="menuOperation">
                  <span on-click={() => this.getFileContent(node)}>
                    <svg-icon icon="view-detail"></svg-icon>
                  </span>
                  <span on-click={() => this.renameDirOrFile(node)}>
                    <svg-icon icon="rename"></svg-icon>
                  </span>
                  <span on-click={() => this.deleteDir(node)}>
                    <svg-icon icon="delete"></svg-icon>
                  </span>
                </span>
              );
            } else {
              return (
                <span class="menuOperation">
                  <span on-click={() => this.addDir(node)}>
                    <svg-icon icon="new-folder"></svg-icon>
                  </span>
                  <span on-click={() => this.renameDirOrFile(node)}>
                    <svg-icon icon="rename"></svg-icon>
                  </span>
                  <span on-click={() => this.deleteDir(node)}>
                    <svg-icon icon="delete"></svg-icon>
                  </span>
                </span>
              );
            }
          })()}
        </span>
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";
.el-tree ::v-deep .search-menu-node {
  @include flex-align(center, space-between);
  padding-right: 4px;
  font-size: $font-md;
  overflow: hidden;
}

.el-tree ::v-deep .menuOperation {
  position: absolute;
  right: 20px;
}

.el-tree ::v-deep .search-menu-node .svg-icon {
  flex-shrink: 0;
  margin-right: 8px;
}
.el-tree ::v-deep .search-menu-node .menuOperation .svg-icon:hover {
  fill: $brand-primary;
}
.el-tree ::v-deep .search-menu-node span {
  @include text-ellipsis;
}
.input-group {
  display: inline-block;
  margin-top: 20px;
}
.input-group span {
  margin-right: 20px;
}

.dialog {
  &-content {
    &-main {
      height: 40vh;
      background: rgba(0, 0, 0, 0.4);
      overflow: auto;
    }
    &-footer {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>