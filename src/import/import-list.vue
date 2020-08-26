<template>
  <div class="import-list">
    <div class="import-list-tab">
      <el-tabs v-model="activeTab" @tab-click="onTabClick">
        <el-tab-pane :label="'进行中' + ' (7)'" name="ongoing"></el-tab-pane>
        <el-tab-pane :label="'已完成' + ' (56)'" name="completed"></el-tab-pane>
      </el-tabs>
      <el-button type="primary" size="mini" @click="goToNew()">
        <svg-icon icon="import-manage"></svg-icon>
        数据导入
      </el-button>
    </div>
    <div class="import-list-operation">
      <el-button plain size="mini" :disabled="!hasSelection" @click="stopAllImports">
        全部暂停
      </el-button>
      <el-button plain size="mini" :disabled="!hasSelection">
        全部取消
      </el-button>
    </div>
    <div class="import-list-table">
      <el-table
        :data="tableData"
        @sort-change="onSortChange"
        @filter-change="onFilterChange"
        @selection-change="onSelectionChange"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="48">
        </el-table-column>
        <el-table-column
          prop="name"
          label="文件名称"
          sortable="custom"
          min-width="300">
          <template slot-scope="scope">
            <div class="row-name">
              <svg-icon :type="scope.row.type"></svg-icon>
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="type"
          label="文件类型"
          sortable="custom"
          min-width="120"
          column-key="type"
          :filters="fileTypes"
        >
        </el-table-column>
        <el-table-column
          prop="size"
          label="文件大小"
          sortable="custom"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建者"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="state"
          label="传输状态"
          sortable="custom"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          min-width="160">
          <template slot-scope="scope">
            <div class="row-operation">
              <div class="icon-btn" title="开始上传" @click="startImport(scope.row.name)">
                <svg-icon icon="start"></svg-icon>
              </div>
              <div class="icon-btn" title="暂停上传" @click="stopImport(scope.row.name)">
                <svg-icon icon="stop"></svg-icon>
              </div>
              <div class="icon-btn" title="取消上传" @click="cancelImport(scope.row.name)">
                <svg-icon icon="cancel"></svg-icon>
              </div>
              <div class="icon-btn" title="重新上传" @click="refreshImport(scope.row.name)">
                <svg-icon icon="refresh"></svg-icon>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="import-list-footer">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onPageChange"
        :current-page="pagination.page"
        :page-sizes="[10, 20]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImportList',
  data() {
    return {
      activeTab: 'ongoing',
      tableData: [
        {
          name: 'WF_ODM_GEA_YUT_KL_01',
          path: '任务流/任务流/',
          type: 'TASKFLOW',
          size: '12K',
          creator: 'admin',
          state: 'PENDING'
        },
        {
          name: 'WF_ODM_GEA_YUT_KL_02',
          path: '任务流/任务流/',
          type: 'TASKFLOW',
          size: '200M',
          creator: 'admin',
          state: 'FAILED'
        },
        {
          name: 'onedata_pavz_ww_01',
          path: '程序脚本/',
          type: 'SQL',
          size: '45K',
          creator: 'admin',
          state: 'STOPPED'
        },
      ],
      selectedData: [],
      fileTypes: [{text: '任务流', value: 'TASKFLOW'}, {text: 'SQL', value: 'SQL'}],
      pagination: {
        page: 1,
        size: 10,
        total: 400
      },
    };
  },
  computed: {
    hasSelection() {
      return this.selectedData.length > 0;
    }
  },
  methods: {
    goToNew() {
      this.$router.push('/import/new');
    },
    startImport(name) {
      console.log(name);
    },
    stopImport(name) {
      console.log(name);
    },
    cancelImport(name) {
      console.log(name);
    },
    refreshImport(name) {
      console.log(name);
    },
    stopAllImports() {
      this.$confirm('确定暂停全部选中的导入进程？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '暂停成功'
        });
      }).catch(() => {});
    },
    onTabClick() {
      console.log(this.activeTab);
    },
    onSortChange(sort) {
      console.log(sort);
    },
    onFilterChange(filters) {
      console.log(filters);
    },
    onSelectionChange(selection) {
      this.selectedData = selection;
    },
    onSizeChange() {

    },
    onPageChange() {

    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.import-list {
  overflow: auto;

  &-tab {
    position: relative;

    .el-button {
      position: absolute;
      top: 8px;
      right: 20px;

      ::v-deep span{
        display: flex;
        align-items: center;

        .svg-icon {
          margin-right: 4px;
        }
      }
    }
  }

  &-operation {
    @include flex-align(center, flex-end);
    height: 40px;
    padding-right: 20px;
    background: $bg-light;
  }

  &-table {

    .row-name {
      @include flex-align(center, flex-start);
      font-weight: 600;

      .svg-icon {
        margin-right: 6px;
      }
    }

    .row-operation {
      @include flex-align(center, flex-start);
    }
  }

  &-footer {
    @include flex-align(center, flex-end);
    padding: 16px;
  }
}
.el-tabs {
  background: $bg-light;
}
.el-tabs ::v-deep .el-tabs__header {
  margin: 0;
  padding-left: 20px;
  border-bottom: 1px solid $border-dark;
}
.el-tabs ::v-deep .el-tabs__nav-wrap::after {
  display: none;
}
.el-tabs ::v-deep .el-tabs__item {
  height: 48px;
  line-height: 48px;
}

.el-table ::v-deep thead tr th {
  padding: 6px 0;
  background: $bg-default;
}
</style>