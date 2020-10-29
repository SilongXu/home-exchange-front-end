<template>
  <div class="transfer-config">
    <div class="transfer-config-header">
      <div class="transfer-config-header-title">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in transferBreadcrumbList"
            :key="item.id"
          >
            {{ item.data.label }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="transfer-config-header-operation">
        <div class="transfer-config-header-operation-search">
          <el-input
            v-model="searchKey"
            placeholder="输入关键字搜索"
            suffix-icon="el-icon-search"
            size="small"
          ></el-input>
        </div>
        <div class="transfer-config-header-operation-set">
          <el-button type="primary" size="mini" @click="setTransfers()">
            <svg-icon icon="setting"></svg-icon>
            <span class="transfer-config-header-operation-set-span"
              >批量设置</span >
          </el-button>
          <el-button type="primary" size="mini" @click="gotoTransferLogs()">
            <svg-icon icon="view-detail"></svg-icon>
            <span class="transfer-config-header-operation-set-span"
              >查看日志</span>
          </el-button>
        </div>
      </div>
    </div>
    <div class="transfer-config-content">
      <el-table :data="transferTableList">
        <el-table-column label="目录名称" class="menu-name" prop="name">
        </el-table-column>
        <el-table-column label="同步类型" prop="type"> </el-table-column>
        <el-table-column label="同步策略" sortable="sta" prop="sta">
        </el-table-column>
        <el-table-column label="上次同步时间" sortable="time" prop="time">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="transfer-config-content-operation">
              <span
                class="logs"
                @click="logsTransfer(scope.row.name)"
                title="查看日志"
              >
                <svg-icon icon="view-detail" color="default"></svg-icon>
              </span>
              <span
                class="set"
                @click="setTransfer(scope.row.name)"
                title="设置"
              >
                <svg-icon icon="setting" color="default"></svg-icon>
              </span>
              <span
                class="refresh"
                @click="refreshTransfer(scope.row.name)"
                title="刷新"
              >
                <svg-icon icon="refresh" color="default"></svg-icon>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="transfer-config-footer">
        
      </div> -->
      <div class="transfer-config-footer-pagination">
          <el-pagination
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
    </div>
    <transfer-setting
      :visible="setDialogVisible"
      @close="onSettingClose"
    ></transfer-setting>
    <transfer-refresh :visible="refreshDialogVisible" @close="onRefreshClose">
    </transfer-refresh>
  </div>
</template>
<script>
import TransferSetting from "./transfer-setting";
import TransferRefresh from "./transfer-refresh";

export default {
  name: "TransferConfig",
  components: {
    TransferSetting,
    TransferRefresh,
  },
  props: ["transferBreadcrumbList", "transferTableList"],
  data: () => {
    return {
      searchKey: "",
      setDialogVisible: false,
      refreshDialogVisible: false,
    };
  },

  methods: {
    setTransfers() {
      let selectedMenu = this.getSelectedMenu();
      // TO DO do setting transfer
      this.setDialogVisible = true;
    },
    gotoTransferLogs(path) {
      this.$router.push('./transfer/transferlog')
    },
    refreshTransfer() {
      this.refreshDialogVisible = true;
    },
    setTransfer(item) {
      this.setDialogVisible = true;
    },

    getSelectedMenu() {
      // TODO
      return [];
    },

    onSortChange() {},

    onSettingClose(setting) {
      this.setDialogVisible = false;
      if (setting) {

      }
    },
    onRefreshClose(refreshItem) {
      this.refreshDialogVisible = false;
      if (refreshItem) {
  
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";

.transfer-config {
  &-header {
    @include flex-xy-center;
    justify-content: space-between;
    padding: 5px 15px;
    border-bottom: 1px solid $border-dark;

    &-operation {
      display: flex;

      &-search {
        margin-right: 15px;
        /deep/ .el-input .el-input__inner {
          width: 300px;
          background: $bg-body;
        }
      }

      // @include flex-align(center,flex-start);
      // @include flex-align(center, flex-start);
      &-set {
        .svg-icon {
          margin-right: 4px;
        }
        &-span {
          font-size: $font-md;
          position: relative;
          top: -2px;
        }
      }
    }
  }

  &-content {
    overflow: auto;
    height: 73vh;

    .el-table ::v-deep thead tr th {
      padding: 12px 0;
      background: $bg-default;
    }

    // .el-table ::v-deep,
    // th.el-table_1_column_1,
    // th.el-table_1_column_2,
    // th.el-table_1_column_3,
    // th.el-table_1_column_4,
    // th.el-table_1_column_5 {
    //   // padding-left: 50px;
    //   // text-align: center;
    // }

    // .el-table ::v-deep,
    // tr.el-table_1_column_1,
    // tr.el-table_1_column_2,
    // tr.el-table_1_column_3,
    // tr.el-table_1_column_4,
    // tr.el-table_1_column_5 {
    //   // padding-left: 50px;
    //   text-align: center;
    // }

    .el-table ::v-deep .el-checkbox__input {
      padding: 0 13px;
    }

    .el-table ::v-deep .set,
    .logs,
    .refresh {
      cursor: pointer;
    }
    .el-table ::v-deep .set {
      margin: 0 10px;
    }
  }
  // &-footer {
  //   position: fixed;
  //   bottom: 4vh;
  //   height: 50px;
  //   width: 100%;
  //   &-pagination {
  //     position: relative;
  //     padding-top: 10px;
  //     left: 25vw;
  //   }
  // }
}
</style>