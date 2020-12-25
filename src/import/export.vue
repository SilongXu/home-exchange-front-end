<template>
  <div class="export">
    <div class="export-topSide">
      <div class="input-group">
        <span>任务状态</span>
        <el-select v-model="searchObj_Export.resultType">
          <el-option
            v-for="(item, index) in resultTypeList"
            :label="item.label"
            :value="item.code"
            :key="index"
          ></el-option>
        </el-select>
      </div>
      <div class="input-group">
        <span>任务来源</span>
        <el-select v-model="searchObj_Export.systemCode" style="width:300px">
          <el-option
            v-for="(item, index) in systemCodeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="input-group">
        <span>导出模式</span>
        <el-select v-model="searchObj_Export.taskMode">
          <el-option
            v-for="(item, index) in taskModeList"
            :key="index"
            :label="item.label"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
      <div class="input-group">
        <span>创建时间</span>
        <el-date-picker
          v-model="searchObj_Export.startTime"
          placeholder="请选择开始时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
        >
        </el-date-picker>
        至
        <el-date-picker
          v-model="searchObj_Export.endTime"
          type="datetime"
          placeholder="请选择结束时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </div>
      <div class="input-group">
        <span>业务流水号</span>
        <el-input
          placeholder="请输入业务流水号"
          style="width: 500px"
          v-model="searchObj_Export.flowNo"
        ></el-input>
      </div>
      <div class="input-group">
        <span>数据ID</span>
        <el-input
          placeholder="请输入数据ID"
          style="width: 500px"
          v-model="searchObj_Export.dataId"
        ></el-input>
      </div>
      <div class="input-group" style="float:right">
        <el-button type="primary" @click="onClickSearchButton">检索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="goExportStas">导出统计 > </el-button>
      </div>
    </div>
    <div class="export-bottomSide">
      <el-table :data="exportTableData" @row-click="getCurrentRowMsg">
        <el-table-column
          label="业务流水号"
          prop="flowNo"
          min-width="300px"
        ></el-table-column>
        <el-table-column
          label="任务来源"
          prop="systemCode"
          min-width="100px"
        ></el-table-column>
        <el-table-column label="导出模式" prop="taskMode" min-width="100px">
          <template slot-scope="scope">
            <span v-if="scope.row.taskMode == 1">
              <span>手动</span>
            </span>
            <span v-if="scope.row.taskMode == 0">
              <span>自动</span>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="产品类型" prop="productType" min-width="150px">
          <template slot-scope="scope">
            <span class="rowProductType">
              {{fetchProductType(scope.row.flowNo)}}

            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="数据ID"
          prop="dataId"
          min-width="150px">
          <template>
            <span @click="fetchDataId(scope.row.flowNo)">

            </span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          label="数据大小"
          prop="dataSize, dataSizeUnit"
          min-width="150px"
        >
          <template slot-scope="scope">
            {{ scope.row.dataSize }}/<span class="dataSizeUnit">{{
              scope.row.dataSizeUnit
            }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          label="创建时间"
          prop="createTime"
          min-width="300px"
        ></el-table-column>
        <el-table-column label="任务状态" prop="resultType" min-width="100px">
          <template slot-scope="scope">
            <span v-if="scope.row.resultType == 1">
              <span>成功</span>
            </span>
            <span v-if="scope.row.resultType == 0">
              <span :style="{ color: 'red' }">失败</span>
            </span>
            <span v-if="scope.row.resultType == 2">
              <span>部分成功</span>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="失败原因" prop="failReason" min-width="100px">
          <template slot-scope="scope">
            <span v-if="scope.row.resultType == 0 || scope.row.resultType == 2">
              <el-button type="primary" size="mini" @click="goExportErrorReason"
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
      <div class="export-pagination">
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
    <export-error-reason
      :visible="exportErrorReasonDialogVisible"
      :errorContent="exportErrorContent"
      @close="closeExportErrorReasonDialog"
    >
    </export-error-reason>
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
import exportErrorReason from "./export-error-reason";
import apiServiceInterface from "../interface/interface.service";
import firstDialog from "./interface-export/firstDialog";

export default {
  name: "exportPage",
  components: {
    "export-error-reason": exportErrorReason,
    "first-dialog": firstDialog
  },
  data() {
    return {
      resultTypeList: [
        { code: "", label: "全部" },
        { code: 0, label: "失败" }, //不要改成'0'
        { code: 1, label: "成功" },
        { code: 2, label: "部分成功" }
      ],
      taskModeList: [
        { code: "", label: "全部" },
        { code: 0, label: "自动" },
        { code: 1, label: "手动" }
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
      searchObj_Export: {
        endTime: "",
        flowNo: "",
        taskMode: "",
        startTime: "",
        systemCode: "",
        resultType: "",
        taskType: ""
        // dataId: ""
      },
      exportTableData: null,
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      exportErrorReasonDialogVisible: false,
      exportErrorContent: null,
      firstDialogVisible: false,
      interfacePagination: {
        page: 1,
        size: 10,
        total: 0
      },
      interfaceTableData: null,
      interfaceSearchObj: {
        interfaceType: null,
        sender: null,
        receiver: null,
        fromTime: null,
        toTime: null,
        taskNumber: null,
        workNumber: null
      },
      flowNo: null,
      paramsDataIdProductType: {
        flowNo: ""
      },
    };
  },
  mounted() {
    // this.search();
    // console.log("im export");
  },
  methods: {
    getDetail(row) {
      this.flowNo = row.flowNo;
      this.runInterface();
    },
    search() {
      apiService
        .getExportTableData(
          this.pagination.page,
          this.pagination.size,
          this.searchObj_Export
        )
        .then(res => {
          document.getElementsByClassName("export-bottomSide")[0].scrollTop = 0;
          this.pagination.total = res.data.detail.total;
          this.exportTableData = res.data.detail.list;
          // .map(item => {
          //   return {
          //     ...item,
          //     taskTypeDesc: this.getSourceTypeDesc(item.taskType),
          //     taskModeDesc: this.getResultTypeDesc(item.taskMode),
          //     createTimeDesc: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")
          //   };
          // });
          // document.getElementsByTagName('rowProductType')[0].click();
        });
    },
    getSourceTypeDesc(taskType) {
      if (taskType == null || taskType === "") {
        return "--";
      }
      return this.taskModeList.find(item => item.code === taskType).label;
    },
    getResultTypeDesc(taskMode) {
      if (taskMode == null || taskMode === "") {
        return "--";
      }
      return this.taskModeList.find(item => item.code === taskMode).label;
    },
    getCurrentRowMsg(row) {
      this.exportErrorContent = row.failReason;
      // this.flowNo = row.flowNo;
    },
    goExportErrorReason() {
      this.exportErrorReasonDialogVisible = true;
    },
    closeExportErrorReasonDialog() {
      this.exportErrorReasonDialogVisible = false;
    },
    onClickSearchButton() {
      this.pagination = {
        page: 1,
        size: 10,
        total: 0
      };
      this.search();
    },
    reset() {
      this.searchObj_Export = {
        endTime: "",
        flowNo: "",
        taskMode: "",
        startTime: "",
        systemCode: "",
        resultType: "",
        taskType: ""
        // dataId: null
      };
    },
    goExportStas() {
      location.hash = "/import/exportStat";
    },
    onSizeChange(size) {
      this.pagination.size = size;
      this.search();
    },
    onCurrentPage(page) {
      this.pagination.page = page;
      this.search();
    },

    //firstDialog
    goFirstDialog() {
      this.firstDialogVisible = true;
    },
    closefirstDialogVisible() {
      this.firstDialogVisible = false;
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

    fetchProductType(No){
      const obj = {flowNo: No}
      const objProductTypeList = [];
      apiService.getExportProductTypeAndDataId(obj)
      .then((data) => {
        console.log(data.data.detail.list);
        data.data.detail.list.forEach((item) => {
          objProductTypeList.push(item.productType)
        })
        // console.log(objProductTypeList)
        return objProductTypeList;
      })
    },
    fetchDataId(No){
      const obj = {flowNo: No}
      const objDataId = [];
      apiService.getExportProductTypeAndDataId(obj)
      .then((data) => {
        data.data.detail.list.forEach((item) => {
          objDataId.push(item.dataId)
        })
        return objDataId;
      })
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
.export {
  position: relative;
  background-color: $bg-default;
  margin: 0 auto;
  &-topSide {
    border-bottom: 1px solid $border-dark;
    height: 141px;
    overflow: auto;
  }
  &-bottomSide {
    border-bottom: 1px solid $border-dark;
    overflow: auto;
    height: calc(100vh - 438px);
    position: relative;
    bottom: 2px;

    .el-table::before {
      z-index: inherit;
    }
    .export-pagination {
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