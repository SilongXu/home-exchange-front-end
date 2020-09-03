<template>
  <div class="menu-table">
    <div class="menu-table-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>目录管理</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="menu-table-header-operation">
        <!-- <el-input
          placeholder="请输入关键字搜索"
          v-model="searchFilter">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input> -->
        <div class="menu-table-header-operation-icon">
          <svg-icon icon="delete" color="default" size="lg"></svg-icon>
        </div>
        <div class="menu-table-header-operation-icon">
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
              <svg-icon type="folder-close"></svg-icon>
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
    </div>

    <div class="menu-table-card" v-show="viewMode === 'card'">
      <div class="menu-table-card-cell" v-for="data in tableList" :key="data.name">
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
  data() {
    return {
      searchFilter: null,
      viewMode: 'list',
      selectedData: [],
      tableList: [],
      loading: false,
    };
  },
  mounted() {
    console.log(111)
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
          if (list && list.data) {
            this.tableList = list.data;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
      }
    },
    viewMenu(node) {
      console.log(node)
    },
    onSelectionChange(selection) {
      console.log(selection)
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
        border-radius: 5px;
        padding: 2px;

        &-card, &-list {
          @include flex-xy-center;
          height: 38px;
          width: 48px;
          min-width: 48px;
          min-height: 38px;
          border-radius: 5px;
          cursor: pointer;
        }

        .active {
          background-color: $bg-light;
        }
      }

      &-icon {
        
        .svg-icon:hover {
          fill: $brand-primary;
          cursor: pointer;
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

.el-table ::v-deep thead tr th {
  padding: 6px 0;
  background: $bg-default;
}

.el-input ::v-deep .el-input__inner {
  background-color: $bg-body;
}

</style>