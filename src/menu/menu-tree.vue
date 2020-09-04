<template>
  <div class="menu-tree">
    <el-tree
      ref="tree"
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
import { set } from 'lodash-es';
import apiService from './menu.service';

export default {
  name: 'MenuTree',
  props: ['menuEventBus'],
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
  mounted() {
    this.menuEventBus.$on('refreshTree', (node) => {
      if (this.$refs.tree) {
        const currentNode = this.$refs.tree.getNode(node.id);
        currentNode.loaded = currentNode.isLeaf = false;
        currentNode.expand();
      }
    });
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
        apiService.getMenuNodeByParentId(node.data.id)
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
        <div class="menu-tree-node">
          <div class="menu-tree-node-label">
            {
              (() => {
                if (node.level === 1) {
                  return null;
                } else {
                  return node.expanded ? <svg-icon icon="folder-open"></svg-icon> : <svg-icon icon="folder-close"></svg-icon>;
                }
              })() 
            }
            <div domPropsTitle={node.label}>{node.label}</div>
          </div>
          {
            (() => {
              if (true) {
                return <div class="menu-tree-node-operation">
                  <div class="menu-tree-node-operation-icon" on-click={(e) => {this.deleteNode(e, node)}}>
                    <svg-icon icon="delete" color="default" size="lg"></svg-icon>
                  </div>
                </div>
              }
            })()
          }
        </div>
      );
    },
    deleteNode(e, node) {
      e.stopPropagation();
      e.preventDefault();
      if (node) {
        this.$confirm(`确认要删除 “${node.data.name}” 目录吗?`, '删除目录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          apiService.deleteMenuNode([node.data.id])
          .then(() => {
            // 通知刷新表格
            this.menuEventBus.$emit('treeChange', node.parent);
            setTimeout(() => {
              // 删除树
              this.$refs.tree.remove(node);
              // 删除tab
              if (node && node.data) {
                this.$store.dispatch('menuNodes/removeMenuNode', node.data);
              }
            }, 50);
            this.$message({
              type: 'success',
              message: '删除目录成功!'
            });
          })
          .catch((error) => {
            this.$message.error('删除目录错误');
          });
        }).catch(() => {
           
        });
      }
    },
    onNodeClick(node) {
      // 通知父节点
      this.menuEventBus.$emit('clickNode', node);
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
  flex: 1;
  @include flex-align(center, space-between);
  padding-right: 4px;
  font-size: $font-md;
  overflow: hidden;
}
.el-tree ::v-deep .menu-tree-node:hover {

  .menu-tree-node-operation {
    visibility: visible;
  }
}
.el-tree ::v-deep .menu-tree-node-label {
  @include flex-align(center, flex-start);
}
.el-tree ::v-deep .menu-tree-node-operation {
  visibility: hidden;
  display: flex;

  .svg-icon:hover {
    fill: $brand-primary;
    cursor: pointer;
  }
}
.el-tree ::v-deep .menu-tree-node .svg-icon {
  flex-shrink: 0;
  margin-right: 8px;
}
.el-tree ::v-deep .menu-tree-node div {
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