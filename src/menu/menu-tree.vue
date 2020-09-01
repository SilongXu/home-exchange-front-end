<template>
  <div class="menu-tree">
    <el-tree
      :props="treeProps"
      :load="loadNode"
      lazy
      icon-class="el-icon-arrow-right"
      node-key="id"
      :default-expanded-keys="[-1]"
      :current-node-key="-1"
      :expand-on-click-node="false"
      :render-content="renderContent"
      @node-click="onNodeClick">
    </el-tree>
  </div>
</template>

<script>
import apiService from './menu.service';

export default {
  name: 'MenuTree',
  data() {
    return {
      treeProps: {
        id: 'id',
        label: 'name',
        children: 'children',
        disabled: 'disabled',
        isLeaf: 'isLeaf'
      },
    }
  },
   methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '目录管理', id: -1 }]);
      }
      if (node.level === 1) {
        apiService.getMenuNodeByParentId(-1)
        .then((tree) => {
          return resolve(tree.data);
        })
        .catch(() => {
          resolve([]);
        });

        return;
      }
      
      if (!node.isLeaf) {
        apiService.getMenuNodeByParentId(node.id)
        .then((tree) => {
          return resolve(tree.data);
        })
        .catch(() => {
          resolve([]);
        });

        return;
      }
    },
    renderContent(h, { node, data }) {
      return (
        <span class="menu-tree-node">
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
    },
    onNodeClick(data) {
      // 通知父节点
      this.$emit('clickNode', data);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.menu-tree {
  overflow: auto;
  margin-left: 2px;
}

.el-tree ::v-deep .menu-tree-node {
  @include flex-align(center, flex-start);
  padding-right: 4px;
  font-size: $font-md;
  overflow: hidden;
}
.el-tree ::v-deep .menu-tree-node .svg-icon {
  flex-shrink: 0;
  margin-right: 8px;
}
.el-tree ::v-deep .menu-tree-node span {
  @include text-ellipsis;
}
.el-tree ::v-deep .el-tree-node > .el-tree-node__content {
  border-left: 2px solid transparent;
}
.el-tree ::v-deep .el-tree-node.is-current > .el-tree-node__content {
  background: $bg-hover;
  border-left: 2px solid $brand-primary;
}
.el-tree ::v-deep .el-tree-node__children {
  background: $bg-default;
}
.el-tree ::v-deep > .el-tree-node > .el-tree-node__content {
  background: $bg-light;
}
</style>