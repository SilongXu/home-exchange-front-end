<template>
  <el-tree
    ref="searchMenuTree"
    :props="treeProps"
    :load="loadNode"
    lazy
    show-checkbox
    icon-class="el-icon-arrow-right"
    node-key="id"
    :render-content="renderContent"
    :default-expanded-keys="[1]"
    @check-change="onCheckChange">
  </el-tree>
</template>
<script>
import debounce from "lodash-es/debounce";

export default {
  name: 'search-menu',
  data: () => {
    return {
      treeProps: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
      count: 1
    };
  },
  methods: {
    onCheckChange: debounce(function(data, checked, indeterminate) {
      this.$emit('menuChange', this.$refs.searchMenuTree.getCheckedNodes());
    }),
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '全部', id: 1 }]);
      }
      if (node.level === 1) {
        return resolve([{ name: 'region1' }, { name: 'region2' }]);
      }
      if (node.level > 3) return resolve([]);

      const hasChild = true;

      setTimeout(() => {
        const data = [];
        if (hasChild) {
          for (let i = 0; i < 5; i++) {
            data.push({
              name: 'zone' + this.count++,
              leaf: node.level > 2,
            });
          }
        }

        resolve(data);
      }, 500);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="search-menu-node">
          {
            (() => {
              if (node.level === 1 || node.isLeaf) {
                return null;
              } else {
                return node.expanded ? <svg-icon icon="folder-open"/> : <svg-icon icon="folder-close"/>;
              }
            })() 
          }
          <span domPropsTitle={node.label}>{node.label}</span>
        </span>);
    }
  }
}
</script>
<style scoped>
.el-tree {
  background: #0c2d40;
}
.el-tree ::v-deep .el-tree-node__content {
  height: 40px;
  color: #e6eef5;
  border-bottom: 1px solid #01202F;
}
.el-tree ::v-deep .el-tree-node__content:hover {
  background: transparent;
}
.el-tree ::v-deep .el-tree-node:focus > .el-tree-node__content {
  background: transparent;
}
.el-tree ::v-deep .el-tree-node__children {
  background: #01202f;
}
.el-tree ::v-deep > .el-tree-node > .el-tree-node__children {
  margin-left: -18px;
  background: #0c2d40;
}
::v-deep .el-checkbox__inner {
  background-color: transparent;
  border-color: #c4d1dd;
}
.el-tree ::v-deep .search-menu-node {
  display: flex;
  align-items: center;
  padding-right: 4px;
  font-size: 14px;
  overflow: hidden;
}
.el-tree ::v-deep .search-menu-node .svg-icon {
  flex-shrink: 0;
  margin-right: 8px;
  fill: #e6eef5;
}
.el-tree ::v-deep .search-menu-node span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>