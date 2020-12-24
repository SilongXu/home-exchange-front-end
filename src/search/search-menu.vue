<template>
  <el-tabs type="card" :stretch="true">
    <el-tab-pane label="目录管理">
      <el-tree
        ref="searchMenuTree"
        :props="treeProps"
        :load="loadNode"
        lazy
        icon-class="el-icon-arrow-right"
        node-key="id"
        :render-content="renderContent"
        :default-expanded-keys="[-1]"
        :current-node-key="-1"
        :expand-on-click-node="false"
        @node-click="onNodeClick"
      >
      </el-tree
    ></el-tab-pane>
    <el-tab-pane label="搜索条件">
      <el-tree
        ref="searchConditionTree"
        lazy
        :load="loadTemplateTree"
        :props="treeProps"
        node-key="id"
        :expand-on-click-node="false"
        :render-content="renderSearchCondition"
        @node-click="nodeClick"
      >
      </el-tree>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import apiService from "./search.service";

export default {
  name: "SearchMenu",
  data: () => {
    return {
      treeProps: {
        id: "id",
        label: "name",
        children: "children",
        disabled: "disabled",
        isLeaf: "isLeaf",
      },
    };
  },
  mounted() {
    const currentNode = this.$refs.searchMenuTree.getCurrentNode();
    if (currentNode) {
      this.onNodeClick(currentNode);
    }
  },
  methods: {
    getCurrentNodeData() {
      this.$refs.searchMenuTree.getCurrentNode();
    },
    onNodeClick(node) {
      this.$emit("menuChange", node);
    },
    nodeClick(obj, node) {
      if (node.data.nodeType == "FILE") {
        let request = null;
        apiService.getFileContentById(node.data.id).then((response) => {
          request = JSON.parse(response.data.content);
          this.$parent.$refs.result.fetchResult(request);
        });
      }
    },
    addDir(node) {
      this.$parent.$refs.result.$refs.searchMenuTemplate.addDir(node);
    },
    getFileContent(node) {
      this.$parent.$refs.result.$refs.searchMenuTemplate.getFileContent(node);
      event.stopPropagation();
    },
    renameDirOrFile(node,event) {
      this.$parent.$refs.result.$refs.searchMenuTemplate.renameDirOrFile(node);
      event.stopPropagation();
    },
    deleteDir(node) {
      this.$parent.$refs.result.$refs.searchMenuTemplate.deleteDir(node);
      event.stopPropagation();
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "全部", id: -1 }]);
      }
      if (node.level === 1) {
        apiService
          .getMenuNodeByParentId(-1)
          .then((tree) => {
            return resolve(tree.data);
          })
          .catch(() => {
            resolve([]);
          });

        return;
      }

      if (!node.isLeaf) {
        apiService
          .getMenuNodeByParentId(node.data.id)
          .then((tree) => {
            return resolve(tree.data);
          })
          .catch(() => {
            resolve([]);
          });

        return;
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
            return resolve(tree.data);
          })
          .catch(() => {
            resolve([]);
          });
        return;
      }

      if (!node.isLeaf) {
        apiService
          .getTemplateTreeNodeByParentId(node.data.id)
          .then((tree) => {
            return resolve(tree.data);
          })
          .catch(() => {
            resolve([]);
          });

        return;
      }
    },
    renderContent(h, { node }) {
      return (
        <span class="search-menu-node">
          {(() => {
            if (node.level === 1 || node.isLeaf) {
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
        </span>
      );
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
                  <span on-click={($event) => this.getFileContent(node,$event)}>
                    <svg-icon icon="view-detail"></svg-icon>
                  </span>
                  <span on-click={($event) => this.renameDirOrFile(node,$event)}>
                    <svg-icon icon="rename"></svg-icon>
                  </span>
                  <span on-click={($event) => this.deleteDir(node,$event)}>
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

.el-tree {
  padding-left: 8px;
  background: $bg-light;
}

.el-tree ::v-deep .el-tree-node__content:hover {
  background: transparent;
}
.el-tree ::v-deep .el-tree-node:focus > .el-tree-node__content {
  background: transparent;
}
.el-tree ::v-deep .el-tree-node__children {
  background: $bg-default;
}
.el-tree ::v-deep > .el-tree-node > .el-tree-node__children {
  background: $bg-light;
}
.el-tree ::v-deep .el-tree-node.is-current > .el-tree-node__content {
  background: $bg-hover;
  border-left: 2px solid $brand-primary;
}
.el-tree ::v-deep .search-menu-node {
  @include flex-align(center, flex-start);
  padding-right: 4px;
  font-size: $font-md;
  overflow: hidden;
}
.el-tree ::v-deep .menuOperation {
  position: absolute;
  right: 20px;
}
.el-tree ::v-deep .search-menu-node .menuOperation .svg-icon:hover {
  fill: $brand-primary;
}
.el-tree ::v-deep .search-menu-node .svg-icon {
  flex-shrink: 0;
  margin-right: 8px;
}
.el-tree ::v-deep .search-menu-node span {
  @include text-ellipsis;
}
</style>
