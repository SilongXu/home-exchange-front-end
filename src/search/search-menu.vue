<template>
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
  </el-tree>
</template>
<script>
import apiService from './search.service';

export default {
  name: 'SearchMenu',
  data: () => {
    return {
      treeProps: {
        id: 'id',
        label: 'name',
        children: 'children',
        disabled: 'disabled',
        isLeaf: 'isLeaf'
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
    onNodeClick(node) {
      this.$emit('menuChange', node.id);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '全部', id: -1 }]);
      }
      if (node.level === 1) {
        apiService.getMenuRootNode()
        .then((tree) => {
          return resolve(tree);
        })
        .catch(() => {
          resolve([]);
        });

        return;
      }

      if (!node.isLeaf) {
        apiService.getMenuNodeByParentId(node.id)
        .then((tree) => {
          return resolve(tree);
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
          {
            (() => {
              if (node.level === 1 || node.isLeaf) {
                return null;
              } else {
                return node.expanded ? <svg-icon icon="folder-open"></svg-icon> : <svg-icon icon="folder-close"></svg-icon>;
              }
            })() 
          }
          <span domPropsTitle={node.label}>{node.label}</span>
        </span>);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/util.scss';

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
.el-tree ::v-deep .search-menu-node .svg-icon {
  flex-shrink: 0;
  margin-right: 8px;
}
.el-tree ::v-deep .search-menu-node span {
  @include text-ellipsis;
}
</style>
