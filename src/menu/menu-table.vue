<template>
  <div class="menu-table">
    <menu-new v-if="addDialogVisible" :visible="addDialogVisible" :node="node" @close="dialogClose"></menu-new>
    
    <div class="menu-table-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-if="node.paths"><a @click="gotoMenuNode({catalogId: -1, name: '目录管理'})">目录管理</a></el-breadcrumb-item>
        <el-breadcrumb-item v-for="path in node.paths" :key="path.catalogId">
          <a @click="gotoMenuNode(path)">{{path.name}}</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{node.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="menu-table-header-operation">
        <!-- <el-input
          placeholder="请输入关键字搜索"
          v-model="searchFilter">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input> -->
        <div class="menu-table-header-operation-icon" :class="{disabled: getDeleteDisabled()}" @click="deleteNode">
          <svg-icon icon="delete" color="default" size="lg"></svg-icon>
        </div>
        <div class="menu-table-header-operation-icon" @click="addDialog">
          <svg-icon icon="new-folder" color="default" size="lg"></svg-icon>
        </div>
        <div class="menu-table-header-operation-view">
          <div class="menu-table-header-operation-view-card" :class="{active: viewMode === 'card'}" @click="toggleViewMode('card')">
            <svg-icon icon="card" color="default" size="lg"></svg-icon>
          </div>
          <div class="menu-table-header-operation-view-list" :class="{active: viewMode === 'list'}" @click="toggleViewMode('list')">
            <svg-icon icon="list" color="default" size="lg"></svg-icon>
          </div>
        </div>
      </div>
    </div>

    <div class="menu-table-list" v-show="viewMode === 'list'">
      <el-table
        ref="table"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.4)"
        :data="tableList"
        :header-row-style="{
          height: '50px',
        }"
        @selection-change="onSelectionChange"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="48">
        </el-table-column>
        <el-table-column
          prop="name"
          label="目录名称"
          min-width="300">
          <template slot-scope="scope">
            <div class="row-name">
              <svg-icon icon="folder-close"></svg-icon>
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="目录"
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          min-width="160">
          <template slot-scope="scope">
            <div class="row-operation">
              <div title="查看" @click="viewMenu(scope.row)">
                <svg-icon icon="view-detail"></svg-icon>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="empty-block" v-if="tableList.length === 0">
        暂无数据，请先<el-button type="primary" icon="el-icon-plus" plain  @click="addDialog">添加目录</el-button>
      </div>
    </div>

    <div class="menu-table-card" v-show="viewMode === 'card'">
      <div class="menu-table-card-cell" v-for="data in tableList" :key="data.name" @click="viewMenu(data)">
        <div class="file-background"></div>
        <svg-icon class="file-card" icon="file-card"></svg-icon>
        <div class="menu-table-card-cell-info">
          <div class="menu-table-card-cell-info-title">{{data.name}}</div>
          <div class="menu-table-card-cell-info-description">
            <span>目录：{{data.count}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from './menu.service';

export default {
  name: 'MenuTable',
  props: ['node', 'menuEventBus'],
  components: { 
    'menu-new': () => import('./modal/menu-new'),
  },
  data() {
    return {
      searchFilter: null,
      viewMode: 'list',
      selectedData: [],
      tableList: [],
      loading: false,
      addDialogVisible: false,
      selection: [],
    };
  },
  mounted() {
    this.fetchTableDetails(this.node);

    this.menuEventBus.$on('refreshTable', (pNode) => {
      if (pNode) {
        if (pNode.data.id === this.node.id) {
          this.fetchTableDetails(this.node);
        }
      }
    });
  },
  methods: {
    toggleViewMode(mode) {
      this.viewMode = mode;
    },
    fetchTableDetails(node) {
      if (node) {
        this.loading = true;
        apiService.getMenuNodeByParentId(node.id)
        .then((list) => {
          if (list.data) {
            this.tableList = list.data || [];
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
      }
    },
    getDeleteDisabled() {
      return !(this.selection && this.selection.length > 0);
    },
    deleteNode() {
      if (!this.getDeleteDisabled()) {
        const nodes = this.selection;
        if (nodes && nodes.length > 0) {
          this.$confirm(`确认要删除 “${nodes[0].name}...”等 ${nodes.length}个目录吗?`, '删除目录', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            apiService.deleteMenuNode(nodes.map((select) => select.id))
            .then(() => {
              this.menuEventBus.$emit('tableChange', this.node);
              this.fetchTableDetails(this.node);
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
      }
    },
    gotoMenuNode(node) {
      if (node) {
        this.$store.dispatch('menuNodes/addMenuNode', {
            id: node.catalogId,
            name: node.name,
          }
        );
      }
    },
    viewMenu(node) {
      this.$store.dispatch('menuNodes/addMenuNode', node);
    },
    addDialog() {
      this.addDialogVisible = true;
    },
    dialogClose(flag) {
      this.addDialogVisible = false;
      if (flag) {
        this.menuEventBus.$emit('tableChange', this.node);
        this.fetchTableDetails(this.node);
      }
    },
    onSelectionChange(selection) {
      this.selection = selection || [];
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.menu-table {
  flex: 1;
  display: flex;
  flex-direction: column;;
  background-color: $bg-light;
  overflow: hidden;

  &-header {
    @include flex-align(center, space-between);
    height: 50px;
    padding: 0 12px;

    &-operation {
      @include flex-xy-center;
      min-width: 0;

      &-view {
        @include flex-xy-center;
        height: 40px;
        width: 100px;
        min-width: 100px;
        min-height: 40px;
        background-color: $bg-body;
        border-radius: 4px;
        padding: 2px;

        &-card, &-list {
          @include flex-xy-center;
          height: 38px;
          width: 48px;
          min-width: 48px;
          min-height: 38px;
          border-radius: 4px;
          cursor: pointer;
        }

        .active {
          background-color: $bg-light;
        }
      }

      &-view, &-icon, .el-input {
        margin-right: 16px;
      }
    }
  }

  &-card, &-list {
    flex: 1;
    overflow: auto;

    .row-name {
      @include flex-align(center, flex-start);

      .svg-icon {
        margin-right: 4px;
      }
    }
  }

  &-card {
    display: flex;
    flex-wrap: wrap;
    background-color: $bg-body;
    padding: 50px 80px;

    &-cell {
      position: relative;
      width: 160px;
      height: 125px;
      margin: 0 60px 100px 0;
      cursor: pointer;
    
      .file-card {
        width: 160px !important;
        height: 125px !important;
      }

      .file-background {
        position: absolute;
        height: 100px;
        width: 160px;
        bottom: 0;
        background: linear-gradient(180deg, rgba(25, 191, 240, 1) 0%, rgba(2, 127, 165, 1) 100%);
        border: none;
        border-radius: 14px;
        box-shadow: none;
      }

      &-info {
        margin-top: 10px;
      
        &-title {
          color: $text-light;
          text-align: center;
        }

        &-description {
          @include flex-xy-center;
          margin-top: 10px;
          color: $text-mute;
        }
      }
    }
  }
}

.empty-block {
  @include flex-xy-center;
  background-color: $bg-body;
  height: 300px;

  .el-button {
    margin-left: 16px;
  }
}

.svg-icon:hover {
  fill: $brand-primary;
  cursor: pointer;
}

.el-table ::v-deep thead tr th {
  padding: 6px 0;
  background: $bg-default;
}

.el-table ::v-deep .el-table__empty-block {
  display: none;
}

.el-input ::v-deep .el-input__inner {
  background-color: $bg-body;
}

.disabled {

  .svg-icon {
    fill: $icon-mute;
  }

  .svg-icon:hover {
    fill: $icon-mute;
    cursor: not-allowed;
  }
}

</style>