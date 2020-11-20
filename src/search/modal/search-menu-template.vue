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
            :expand-on-click-node="false"
            :render-content="renderSearchCondition"
            :data="searchConditionTreeData"
          >
          </el-tree>
        </div>
        <div class="dialog-content-footer">
          <div class="input-group">
            <span>选择文件路径:</span>
            <el-input style="width: 250px" size="mini"></el-input>
          </div>
          <div class="input-group">
            <span>搜索模板名称:</span>
            <el-input style="width: 250px" size="mini"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary">确认</el-button>
        <el-button>取消</el-button>
      </span>
    </el-dialog>
    <add-directory :visible="addDirDialogVisible" @closeAddDirectoryDialog="closeAddDirectoryDialog"></add-directory>
    <delete-dirctory :visible="deleteDirDialogVisible" @closeDeleteDirectoryDialog="closeDeleteDirectoryDialog" :content="currentTreeNode"></delete-dirctory>
  </div>
</template>

<script>
export default {
  props: ["visible"],
  data() {
    return {
      searchConditionTreeData: [
        {
          label: "全部",
          isLeaf: false,
          children: [
            {
              label: "东部战区",
              isLeaf: false,
              children: [
                {
                  label: "上海",
                  isLeaf: false,
                },
                {
                  label: "江苏",
                  isLeaf: false,
                  children: [
                    {
                      label: "南京",
                      isLeaf: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      addDirDialogVisible: false,
      deleteDirDialogVisible:false,
      currentTreeNode:null,
    };
  },
  components: {
    "add-directory": () => import("./search-menu-add-directory"),
    "delete-dirctory":()=> import("./search-menu-delete-directory")
  },
  methods: {
    onClose() {
      this.$emit("closeMenuTemplateDialog");
    },
    addDir() {
      console.log("添加dir");
      this.addDirDialogVisible = true;
    },
    closeAddDirectoryDialog(){
      this.addDirDialogVisible = false;
    },
    deleteDir(node) {
      console.log("删除dir");
      console.log(node)
      this.currentTreeNode = node.label;
      this.deleteDirDialogVisible = true;
    },
    closeDeleteDirectoryDialog(){
      this.deleteDirDialogVisible = false;
    },
    renderSearchCondition(h, { node }) {
      return (
        <span class="search-menu-node">
          {(() => {
            if (node.isLeaf) {
              return null;
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
            return (
              <span class="menuOperation">
                <span on-click={() => this.addDir()}>
                  <svg-icon icon="new-folder"></svg-icon>
                </span>
                <span on-click={() => this.deleteDir(node)}>
                  <svg-icon icon="delete"></svg-icon>
                </span>
              </span>
            );
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