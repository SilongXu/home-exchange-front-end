<template>
  <div class="content">
    <div class="content-header">
      <div class="input-group">
        <span>任务状态</span>
        <el-select v-model="searchObj.resultType">
          <el-option
            v-for="(item, index) in resultTypeList"
            :label="item.label"
            :key="index"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
      <div class="input-group">
        <span>归档来源</span>
        <el-select v-model="searchObj.sourceType">
          <el-option
            v-for="(item, index) in sourceTypeList"
            :label="item.label"
            :key="index"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
      <div class="input-group">
        <span>归档时间</span>
        <el-date-picker
          type="datetime"
          placeholder="请选择开始时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="searchObj.startTime"
        >
        </el-date-picker>
        至
        <el-date-picker
          type="datetime"
          placeholder="请选择结束时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="searchObj.endTime"
        >
        </el-date-picker>
      </div>
      <div class="input-group">
        <span>业务流水号</span>
        <el-input
          placeholder="请输入业务流水号"
          style="width: 500px"
          v-model="searchObj.flowNo"
        ></el-input>
      </div>
      <div class="input-group">
        <span>数据ID</span>
        <el-input
          placeholder="请输入数据ID"
          style="width: 500px"
          v-model="searchObj.dataId"
        ></el-input>
      </div>
      
        <div class="input-group" style="float:right">
          <el-button type="primary" @click="onClickSearchButton">检索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button type="primary" @click="goMonitorArchive">归档统计 > </el-button>
        </div>
      <!-- <div style="width:100%;text-align:right;">
      </div> -->
    </div>

    <div
      class="content-table"
    >
      <el-table :data="tableData" @row-click="getCurrentRowMsg">
        <el-table-column
          label="业务流水号"
          prop="flowNo"
          min-width="300px"
        ></el-table-column>
        <el-table-column
          label="归档类型"
          prop="sourceTypeDesc"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          label="产品类型"
          prop="productType"
          min-width="200px"
        ></el-table-column>
        <el-table-column
          label="数据ID"
          prop="dataId"
          min-width="300px"
        ></el-table-column>
        <el-table-column
          label="数据大小"
          prop="dataSize"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          label="归档时间"
          prop="createTimeDesc"
          min-width="200px"
        ></el-table-column>
        <el-table-column
          label="任务状态"
          prop="resultTypeDesc"
          min-width="120px"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.resultTypeDesc == '失败'">
              <span :style="{ color: 'red' }">{{
                scope.row.resultTypeDesc
              }}</span>
            </span>
            <span v-if="scope.row.resultTypeDesc == '成功'">
              <span>{{ scope.row.resultTypeDesc }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="失败原因" prop="failReason" min-width="100px">
          <template slot-scope="scope">
            <span v-if="scope.row.resultTypeDesc == '失败'">
              <el-button type="primary" size="mini" @click="goErrorReason"
                >查看</el-button
              >
            </span>
          </template>
        </el-table-column>
        -->
      </el-table>
    </div>
    <div class="content-pagination">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentPage"
        :current-page="pagination.page"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
    <error-reason
      :visible="errorReasonDialogVisible"
      :errorContent="errorContent"
      @close="closeErrorReasonDialog"
    ></error-reason>
  </div>
</template>

<script>
import apiService from "./import.service";
import * as moment from "moment-mini";
import errorReason from "./import-error-reason";
export default {
  data() {
    return {
      resultTypeList: [
        { code: "", label: "全部" },
        { code: 0, label: "失败" }, //不要改成'0'
        { code: 1, label: "成功" },
        { code: 2, label: "部分成功" },
      ],
      sourceTypeList: [
        { code: "", label: "全部" },
        { code: 0, label: "自动归档" },
        { code: 1, label: "手动导入" },
        // {code: 2, label: '引接'},
      ],
      productTypeList: [], //产品类型
      searchObj: {
        sourceType: "",
        resultType: "",
        importType: "",
        endTime: null,
        startTime: null,
        flowNo: null,
        dataId: null,
      },
      tableData: null,
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      errorReasonDialogVisible: false,
      errorContent: null,
    };
  },
  mounted: function () {
    this.search();
  },
  components: {
    "error-reason": errorReason,
  },
  methods: {
    search() {
      apiService
        .getImportListContentTables(
          this.pagination.page,
          this.pagination.size,
          this.searchObj
        )
        .then((res) => {
          document.getElementsByClassName('content-table')[0].scrollTop = 0;
          this.pagination.total = res.data.detail.total;
          this.tableData = res.data.detail.list.map((item) => {
            return {
              ...item,
              sourceTypeDesc: this.getSourceTypeDesc(item.sourceType),
              resultTypeDesc: this.getResultTypeDesc(item.resultType),
              createTimeDesc: moment(item.createTime).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            };
          });
        });
    },

    reset() {
      this.searchObj = {
        sourceType: "",
        resultType: "",
        importType: "",
        endTime: null,
        startTime: null,
        flowNo: null,
        dataId: null,
      };
    },

    goMonitorArchive() {
      location.hash = "/monitor/monitorArchive";
    },

    getResultTypeDesc(resultType) {
      if (resultType == null || resultType === "") {
        return "--";
      }
      return this.resultTypeList.find((item) => item.code === resultType).label;
    },

    getSourceTypeDesc(sourceType) {
      if (sourceType == null || sourceType === "") {
        return "--";
      }
      return this.sourceTypeList.find((item) => item.code === sourceType).label;
    },
    getCurrentRowMsg(row) {
      this.errorContent = row.failReason;
    },
    goErrorReason() {
      this.errorReasonDialogVisible = true;
    },
    closeErrorReasonDialog() {
      this.errorReasonDialogVisible = false;
    },
    onClickSearchButton() {
      this.pagination = {
        page: 1,
        size: 10,
        total: 0,
      };
      this.search();
    },
    onSizeChange(size) {
      this.pagination.size = size;
      this.search();
    },
    onCurrentPage(page) {
      this.pagination.page = page;
      this.search();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";
.input-group {
  display: inline-block;
  margin: 15px 30px;
  margin-right: 20px;
}

.input-group span {
  margin-right: 7px;
}

.content {
  position: relative;
  background-color: $bg-default;
  margin: 0 auto;
  &-header {
    border-bottom: 1px solid $border-dark;
    height: 141px;
    overflow: auto;
  }
  &-table {
    border-bottom: 1px solid $border-dark;
    overflow: auto;
    height: calc(100vh - 398px);
    .el-table::before {
       z-index: inherit; 
    }
  }
  &-pagination {
    padding: 10px;
    position: absolute;
    right: 10px;
  }
}
/deep/ .cell {
  padding: 0 28px;
}
/deep/ .el-table th > .cell {
  padding: 0 28px;
}
</style>