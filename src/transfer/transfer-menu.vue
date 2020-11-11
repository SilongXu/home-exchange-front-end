<template>
  <el-tree
    ref="tranferMenuTree"
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
import apiService from "./transfer.service";

export default {
  name: "TransferMenu",
  data: () => {
    return {
      treeProps: {
        id: "id",
        label: "name",
        children: "children",
        disabled: "disabled",
        isLeaf: "isLeaf",
      },
      transferResult: [],
      transferPagination: [],
      currentNodeId: null,
      breadCrumbList: [],
    };
  },
  mounted() {
    const currentNode = this.$refs.tranferMenuTree.getCurrentNode();
    if (currentNode) {
      this.onNodeClick(currentNode);
    }
  },
  methods: {
    onNodeClick(node){
      if(this.currentNodeId != node.id){
        this.$parent.$refs.config.transferResultLoading =true
        apiService.getLeafNodeList(node.id, 1, 20)
        .then((data) => {
          this.transferResult = data.data.data;
          this.transferPagination = data.data.pagination;
          this.$emit('menuChange', this.transferResult, this.transferPagination, node.id);
          this.currentNodeId = node.id;
          document.getElementsByClassName('transfer-config-content')[0].scrollTop = 0;
        }).catch(() => {
        });
      }
      //同步管理一级页面 面包屑 相关逻辑
      this.breadCrumbList = [];
      this.breadCrumbList.push(node.name);
      if(node.paths.length != 0){
        for(var i=node.paths.length-1;i>-1;i--){
          this.breadCrumbList.unshift(node.paths[i].name);
        }
      }
      this.$parent.$refs.config.breadCrumbList=this.breadCrumbList;
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
    
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";
.el-tree{
  font-size: $font-md;
}

</style>
