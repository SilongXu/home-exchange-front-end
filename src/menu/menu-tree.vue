<template>
  <div class="menu-tree">
    <el-tree
      :props="treeProps"
      :load="loadNode"
      lazy
      icon-class="el-icon-arrow-right"
      node-key="id"
      :expand-on-click-node="false"
      :render-content="renderContent"
      @node-click="onNodeClick">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
  data() {
    return {
      treeProps: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
      count: 1
    }
  },
   methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }]);
      }
      if (node.level > 2) return resolve([]);

      const hasChild = true;

      setTimeout(() => {
        const data = [];
        if (hasChild) {
          for (let i = 0; i < 5; i++) {
            data.push({
              name: 'zone' + this.count++,
            });
          }
        }

        resolve(data);
      }, 500);
    },
    renderContent(h, { node, data }) {
      return (
        <span class="menu-tree-node">
          {
            (() => {
              return node.expanded ? <svg-icon icon="folder-open"></svg-icon> : <svg-icon icon="folder-close"></svg-icon>;
            })() 
          }
          <span domPropsTitle={node.label}>{node.label}</span>
        </span>);
    },
    onNodeClick(data, node) {
      
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.menu-tree {
  overflow: auto;
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
.el-tree ::v-deep .el-tree-node:focus:not(.is-current) > .el-tree-node__content {
  background: transparent;
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