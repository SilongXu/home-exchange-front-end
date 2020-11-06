<template>
  <el-tree
    ref="tranferMenuTree"
    :data="treeData"
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
      nodeChildrenList: [],
      nodeParentList: [],
      treeData: [
        {
          label: "影响数据",
          icon: "el-icon-folder",
          name: "sadsada",
          type: "test",
          sta: "s",
          time: "dsa",
          children: [
            {
              label: "二级 1-1",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 1-1-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
          ],
        },
        {
          label: "地理信息",
          icon: "el-icon-folder",
          name: "sadsada",
          type: "test",
          sta: "s",
          time: "dsa",
          children: [
            {
              label: "二级 2-1",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 2-1-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "二级 2-2",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 2-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
          ],
        },
        {
          label: "气象水文",
          icon: "el-icon-folder",
          name: "sadsada",
          type: "test",
          sta: "s",
          time: "dsa",
          children: [
            {
              label: "气候统计产品",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-1-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "TK环境报文",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "气象水文实况",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "ZC气象水文情况",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "框架地形图",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "实景数据",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "海图",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "地名注记",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "气候统计产品",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-1-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "TK环境报文",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "气象水文实况",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "ZC气象水文情况",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "框架地形图",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "实景数据",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "海图",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "地名注记",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "气候统计产品",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-1-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "TK环境报文",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "气象水文实况",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "ZC气象水文情况",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "框架地形图",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "实景数据",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "海图",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
            {
              label: "地名注记",
              icon: "el-icon-folder",
              name: "sadsada",
              type: "test",
              sta: "s",
              time: "dsa",
              children: [
                {
                  label: "三级 3-2-1",
                  icon: "el-icon-folder",
                  name: "sadsada",
                  type: "test",
                  sta: "s",
                  time: "dsa",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    const currentNode = this.$refs.tranferMenuTree.getCurrentNode();
    if (currentNode) {
      this.onNodeClick(currentNode);
    }
  },
  methods: {
    onNodeClick(node, e) {
      this.$emit("menuChange", node);
      //获取当前点击节点的儿子节点,作为为table中的数据
      const nodeChildren = node.children;
      if (nodeChildren) {
        if (nodeChildren.length > 0) {
          this.nodeChildrenList = [];
          for (let i = 0; i < nodeChildren.length; i++) {
            this.nodeChildrenList.push(nodeChildren[i]);
          }
        }
      } else {
        this.nodeChildrenList.push(node);
      }
      this.$emit("sendTableList", this.nodeChildrenList);
      //获取当前点击节点的父节点,作为breadcrumb的数据
      this.nodeParentList = [];
      while (e.parent) {
        this.nodeParentList.unshift(e);
        e = e.parent;
      }
      this.$emit("sendBreadcrumbList", this.nodeParentList);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "全部", id: -1 }]);
      }
      if (node.level === 1) {
        apiService
          .getMenuNodeByParentId(-1)
          .then((tree) => {
            return resolve(tree.data.data);
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
            return resolve(tree.data.data);
          })
          .catch(() => {
            resolve([]);
          });

        return;
      }
    },
    renderContent(h, { node }) {
      return (
        <span class="transfer-menu-node">
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
        </span>
      );
    },
  },
};
</script>
<style lang="scss" scoped></style>
