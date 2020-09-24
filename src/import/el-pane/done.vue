<template>
  <div class="import-processing">
    <div class="import-processing-operation">
      <el-button plain size="mini" :disabled="!hasSelection" >
        重新开始
      </el-button>
      <el-button plain size="mini" :disabled="!hasSelection" @click="deleteAllImports">
        全部删除
      </el-button>
    </div>
    <div class="import-processing-table">
      <el-table
        :data="tableData"
        @sort-change="onSortChange"
        @filter-change="onFilterChange"
        @selection-change="onSelectionChange"
        style="width: 100%">
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

    <div class="import-processing-footer">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onPageChange"
        :current-page="pagination.page"
        :page-sizes="[1, 2]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  name: 'processing',
  data() {
    return {
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
      pagination: {
        page: 1,
        size: 1,
        total: 400
      },
      selectedData: [],
      fileTypes: [{text: '任务流', value: 'TASKFLOW'}, {text: 'SQL', value: 'SQL'}],
      
    }
  },
  methods: {
    onSelectionChange(selection) {
      this.selectedData = selection;
    },
    deleteAllImports() {
      this.$confirm('确定删除全部选中的导入进程？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {});
    },
  },
  computed: {
    hasSelection() {
      return this.selectedData.length > 0;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.import-processing{
  overflow: auto;
  &-operation{
    @include flex-align(center, flex-end);
    height: 40px;
    padding-right: 20px;
    background: $bg-light;
  }
  &-table{
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
  &-footer{
    @include flex-align(center, flex-end);
    padding: 16px;
    background: $bg-body;
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