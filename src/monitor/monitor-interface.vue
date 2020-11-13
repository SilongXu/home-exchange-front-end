<template>
  <div class="interface">
    <div class="interface-header">
      <div class="input-group">
        <span>接口类型</span>
        <el-select v-model="searchObj.interfaceType" :clearable="true">
          <el-option
            v-for="item in interfaceTypeList"
            :key="item.itemCode"
            :label="item.itemName +'-'+ item.itemCode"
            :value="item.itemCode"
          >
          </el-option>
        </el-select>
      </div>
      <div class="input-group">
        <span>发送方</span>
        <el-select v-model="searchObj.sender" :clearable="true">
          <el-option v-for="item in senderList" :key="item.itemCode" :label="item.itemName +'-'+ item.itemCode"
            :value="item.itemCode">
          </el-option>
        </el-select>
      </div>
      <div class="input-group">
        <span>接收方</span>
        <el-select v-model="searchObj.receiver" :clearable="true">
          <el-option v-for="item in receiverList" :key="item.itemCode" :label="item.itemName +'-'+ item.itemCode"
            :value="item.itemCode">
          </el-option>
        </el-select>
      </div>
       <div class="input-group">
        <span>业务号</span>
        <el-input
          placeholder="请输入业务号"
          style="width: 300px"
          v-model="searchObj.workNumber"
        ></el-input>
      </div>
      <div class="input-group">
        <span>发送时间</span>
        <el-date-picker
          type="datetime"
          placeholder="请选择开始时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="searchObj.fromTime"
        >
        </el-date-picker>
        至
        <el-date-picker
          type="datetime"
          placeholder="请选择结束时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="searchObj.toTime"
        >
        </el-date-picker>
      </div>
     
      <div class="input-group">
        <span>任务号 </span>
        <el-input placeholder="请输入接口类型" style="width: 300px" v-model="searchObj.taskNumber"></el-input>
      </div>
      <div class="input-group">
        <el-button type="primary" @click="search">检索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </div>
    </div>

    <div class="interface-content">
      <el-table
      :data="tableData" @cell-click='getCurrentRowMsg'>
       <el-table-column label="序号" prop="id" width="50px"> </el-table-column>
        <el-table-column label="接口类型" prop="messageType" width="200px"> </el-table-column>
        <el-table-column label="发送方"  prop="originatorAddress" width="150px">  </el-table-column>
        <el-table-column label="接收方"  prop="recipientAddress" width="150px"> </el-table-column>
        <el-table-column label="发送时间"  prop="creationTime" width="250px"> </el-table-column>
        <el-table-column label="业务号" prop="flowNo" width="250px"> </el-table-column>
        <el-table-column label="任务号" prop="taskID" width="250px"> </el-table-column>
        <el-table-column label="接口内容" >
            <template>
                <el-button type="primary" size="mini" @click="goInterfaceContentPage"> 
                    查看
                </el-button>
            </template>

         </el-table-column>
      </el-table>

      <div class="interface-content-block">
        <el-pagination
          @size-change="onSizeChange"
          @current-change="onCurrentPage"
          :current-page="pagination.page"
          :page-sizes="[5,10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
      <monitor-interface-content  :dialogVisible='dialogInterfaceContentVisible' @close="closeInterfaceContentPage" :messageXml='dialogInterfaceContent' ></monitor-interface-content>
    </div>
  </div>
</template>

<script>
import MonitorInterfaceContent from "./modal/monitor-interface-content";
import apiService from "./monitor.service";
export default {
  data() {
    return {
      interfaceTypeList: null,
      senderList: [],
      receiverList: [],
      dialogErrorsVisible: false,
      dialogInterfaceContentVisible: false,
      dialogInterfaceContent: null,
      searchObj: {
        interfaceType: null,
        sender: null,
        receiver: null,
        fromTime: null,
        toTime: null,
        taskNumber: null,
        workNumber: null,
      },
      tableData: null,
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
    };
  },
  components: {
    "monitor-interface-content": MonitorInterfaceContent,
  },
  mounted() {
    apiService.getInterfaceType().then((res) => {
      this.interfaceTypeList = res.data.detail[0].items;
    });

    apiService.getAccepterList().then((res) => {
      this.receiverList = res.data.detail[0].items;
    });
    apiService.getSenderList().then((res) => {
      this.senderList = res.data.detail[0].items;
    });
  },
  methods: {
    search() {
      var responseBody = this.getResponseBody();
      // alert("开始检索");
      apiService
        .getSearchContent(
          this.pagination.page,
          this.pagination.size,
          responseBody
        )
        .then((res) => {
          this.pagination.total = res.data.detail.total;
          this.tableData = res.data.detail.list;
        });
    },
    getResponseBody() {
      var obj = {};
      if (this.searchObj.interfaceType) {
        obj["messageType"] = this.searchObj.interfaceType;
      }
      if (this.searchObj.sender) {
        obj["originatorAddress"] = this.searchObj.sender;
      }
      if (this.searchObj.receiver) {
        obj["recipientAddress"] = this.searchObj.receiver;
      }
      if (this.searchObj.fromTime) {
        obj["startTime"] = this.searchObj.fromTime;
      }
      if (this.searchObj.toTime) {
        obj["endTime"] = this.searchObj.toTime;
      }
      if (this.searchObj.workNumber) {
        obj["flowNo"] = this.searchObj.workNumber;
      }
      if (this.searchObj.taskNumber) {
        obj["taskID"] = this.searchObj.taskNumber;
      }
      return obj;
    },
    resetSearch() {
      for (var key in this.searchObj) {
        this.searchObj[key] = null;
      }
    },
    goErrorsPage() {
      this.dialogErrorsVisible = true;
    },
    closeErrorsPage() {
      this.dialogErrorsVisible = false;
    },
    goInterfaceContentPage() {
      this.dialogInterfaceContentVisible = true;
    },
    closeInterfaceContentPage() {
      this.dialogInterfaceContentVisible = false;
    },
    getCurrentRowMsg(row) {
      this.dialogInterfaceContent = row.messageXml;
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
@import '@/styles/util.scss';
.input-group {
  display: inline-block;
  margin: 15px 30px;
  margin-right: 20px;
}

.input-group span {
  margin-right: 7px;
}

.interface {
  position: relative;
  width: 80%;
  background-color: $bg-default;
  margin: 0 auto;
  &-header {
   border-bottom: 1px solid $border-dark;
  }
  &-content {
    margin-top: 10px;
    height: 650px;
    overflow: auto;
    position: relative;
    &-block {
      padding: 10px;
      position: absolute;
      right: 10px;
    }
  }
}
</style>