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
        <span>数据来源</span>
        <el-select v-model="searchObj.systemCode" style="width:300px">
          <el-option
            v-for="(item, index) in systemCodeList"
            :label="item.label"
            :key="index"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="input-group">
        <span>导入模式</span>
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
          v-model="dateRangeImportListContent"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-button type="primary" @click="goMonitorArchive"
          >归档统计 >
        </el-button>
      </div>
      <!-- <div style="width:100%;text-align:right;">
      </div> -->
    </div>

    <div class="content-table">
      <el-table :data="tableData" @row-click="getCurrentRowMsg">
        <el-table-column
          label="业务流水号"
          prop="flowNo"
          min-width="150px"
        ></el-table-column>
        <el-table-column
          label="数据来源"
          prop="systemCode"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          label="导入模式"
          prop="sourceTypeDesc"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          label="产品类型"
          prop="productType"
          min-width="150px"
        ></el-table-column>
        <el-table-column
          label="数据ID"
          prop="dataId"
          min-width="300px"
        ></el-table-column>
        <el-table-column
          label="数据大小"
          prop="dataSize, dataSizeUnit"
          min-width="150px"
        >
          <template slot-scope="scope">
            {{ scope.row.dataSize }}/<span class="dataSizeUnit">{{
              scope.row.dataSizeUnit
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="归档时间"
          prop="createTimeDesc"
          min-width="200px"
        ></el-table-column>
        <el-table-column
          label="任务状态"
          prop="resultTypeDesc"
          min-width="100px"
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

        <el-table-column label="接口管理" min-width="100px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="getDetail(scope.row)"
              >接口</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="contentPagination">
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
    </div>

    <error-reason
      :visible="errorReasonDialogVisible"
      :errorContent="errorContent"
      @close="closeErrorReasonDialog"
    ></error-reason>
    <first-dialog
      :visible="firstDialogVisible"
      :firstDialogContent="interfaceTableData"
      @close="closefirstDialogVisible"
      :pagination="interfacePagination"
    ></first-dialog>
  </div>
</template>

<script>
import apiService from "./import.service";
import apiServiceInterface from "../interface/interface.service";
import * as moment from "moment-mini";
import errorReason from "./import-error-reason";
import firstDialog from "./interface/firstDialog";

export default {
  data() {
    return {
      resultTypeList: [
        { code: "", label: "全部" },
        { code: 0, label: "失败" }, //不要改成'0'
        { code: 1, label: "成功" },
        { code: 2, label: "部分成功" }
      ],
      sourceTypeList: [
        { code: "", label: "全部" },
        { code: 0, label: "自动归档" },
        { code: 1, label: "手动导入" }
        // {code: 2, label: '引接'},
      ],
      systemCodeList: [
        { code: "", label: "全部", value: "" },
        { code: 0, label: "预处理分系统-DPPS", value: "DPPS" },
        { code: 1, label: "专业处理分系统-SPPS", value: "SPPS" },
        { code: 2, label: "定标与质量评定分系统-CQAS", value: "CQAS" },
        { code: 3, label: "一体化管控分系统-INCOS", value: "INCOS" },
        { code: 4, label: "航天网络化分系统-NETSS", VALUE: "NETSS" }
      ],
      productTypeList: [], //产品类型
      searchObj: {
        sourceType: "",
        resultType: "",
        importType: "",
        systemCode: "",
        endTime: null,
        startTime: null,
        flowNo: null,
        dataId: null
      },
      tableData: null,
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      errorReasonDialogVisible: false,
      errorContent: null,
      interfaceSearchObj: {
        interfaceType: null,
        sender: null,
        receiver: null,
        fromTime: null,
        toTime: null,
        taskNumber: null,
        workNumber: null
      },
      interfacePagination: {
        page: 1,
        size: 10,
        total: 0
      },
      interfaceTableData: null,
      flowNo: null,
      firstDialogVisible: false,
      dateRangeImportListContent: ""
    };
  },
  mounted: function() {
    //import部分的search
    this.search();
  },
  components: {
    "error-reason": errorReason,
    "first-dialog": firstDialog
  },
  methods: {
    getDetail(row) {
      this.flowNo = row.flowNo;
      this.runInterface();
    },
    runInterface() {
      this.goFirstDialog();
      var responseBody = this.getInterfaceResponseBody();
      apiServiceInterface
        .getSearchContent(
          this.interfacePagination.page,
          this.interfacePagination.size,
          responseBody
        )
        .then(res => {
          // document.getElementsByClassName('interface-content')[0].scrollTop = 0;
          this.interfacePagination.total = res.data.detail.total;
          this.interfaceTableData = res.data.detail.list.map(item => {
            return {
              ...item,
              creationTimeDesc: item.creationTime
                ? moment(item.creationTime).format("YYYY-MM-DD HH:mm:ss")
                : "--"
            };
          });
        });
    },

    getInterfaceResponseBody() {
      var obj = {};
      if (this.interfaceSearchObj.interfaceType) {
        obj["messageType"] = this.interfaceSearchObj.interfaceType;
      }
      if (this.interfaceSearchObj.sender) {
        obj["originatorAddress"] = this.interfaceSearchObj.sender;
      }
      if (this.interfaceSearchObj.receiver) {
        obj["recipientAddress"] = this.interfaceSearchObj.receiver;
      }
      if (this.interfaceSearchObj.fromTime) {
        obj["startTime"] = this.interfaceSearchObj.fromTime;
      }
      if (this.interfaceSearchObj.toTime) {
        obj["endTime"] = this.interfaceSearchObj.toTime;
      }
      obj["flowNo"] = this.flowNo;
      if (this.interfaceSearchObj.taskNumber) {
        obj["taskID"] = this.interfaceSearchObj.taskNumber;
      }
      return obj;
    },

    search() {
      if (this.dateRangeImportListContent) {
        this.searchObj.startTime = this.dateRangeImportListContent[0];
        this.searchObj.endTime = this.dateRangeImportListContent[1];
      }
      apiService
        .getImportListContentTables(
          this.pagination.page,
          this.pagination.size,
          this.searchObj
        )
        .then(res => {
          document.getElementsByClassName("content-table")[0].scrollTop = 0;
          this.pagination.total = res.data.detail.total;
          this.tableData = res.data.detail.list.map(item => {
            return {
              ...item,
              sourceTypeDesc: this.getSourceTypeDesc(item.sourceType),
              resultTypeDesc: this.getResultTypeDesc(item.resultType),
              createTimeDesc: moment(item.createTime).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            };
          });
        });
    },

    reset() {
      this.searchObj = {
        sourceType: "",
        resultType: "",
        importType: "",
        systemCode: "",
        endTime: null,
        startTime: null,
        flowNo: null,
        dataId: null
      };
    },

    goMonitorArchive() {
      location.hash = "/monitor/monitorArchive";
    },

    getResultTypeDesc(resultType) {
      if (resultType == null || resultType === "") {
        return "--";
      }
      return this.resultTypeList.find(item => item.code === resultType).label;
    },

    getSourceTypeDesc(sourceType) {
      if (sourceType == null || sourceType === "") {
        return "--";
      }
      return this.sourceTypeList.find(item => item.code === sourceType).label;
    },
    getCurrentRowMsg(row) {
      this.errorContent = row.failReason;
      this.flowNo = row.flowNo;
    },
    goErrorReason() {
      this.errorReasonDialogVisible = true;
    },
    closeErrorReasonDialog() {
      this.errorReasonDialogVisible = false;
    },
    goFirstDialog() {
      this.firstDialogVisible = true;
    },
    closefirstDialogVisible() {
      this.firstDialogVisible = false;
    },
    onClickSearchButton() {
      this.pagination = {
        page: 1,
        size: 10,
        total: 0
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
    }
  }
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
    height: calc(100vh - 438px);
    position: relative;
    bottom: 2px;
    .dataSizeUnit {
      color: #dc143c;
    }
    .el-table::before {
      z-index: inherit;
    }
    .contentPagination {
      padding: 10px;
      position: fixed;
      bottom: 40px;
      right: 5px;
    }
  }
}
::v-deep .cell {
  padding: 0 28px;
}
::v-deep .el-table th > .cell {
  padding: 0 28px;
}
</style>