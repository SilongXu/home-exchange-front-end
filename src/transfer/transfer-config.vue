<template>
  <div class="transfer-config">
    <div class="transfer-config-header">
      <div class="transfer-config-header-operation">
        <div class="transfer-config-header-operation-set">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="breadItem in breadCrumbList" :key="breadItem.name">{{breadItem}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div>
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
    </div>

    <div class="transfer-config-content" :style="{height: clientHeight - 200 + 'px'}">
      <div class="transfer-config-content-header">
        <div class="transfer-config-content-header-name">目录名称</div>
        <div class="transfer-config-content-header-type">同步类型</div>
        <div class="transfer-config-content-header-strategy">同步策略</div>
        <div class="transfer-config-content-header-date">上次同步时间</div>
        <div class="transfer-config-content-header-status">同步状态</div> 
        <div class="transfer-config-content-header-operation">操作</div>
      </div>
      <div class="transfer-config-content-result" v-loading="transferResultLoading" element-loading-background="rgba(0, 0, 0, 0.4)">
        <div class="entry" v-for="entry in transferResult" :key="entry.id">
          <div class="entry-name">
            <svg-icon icon="folder-close" size="md"></svg-icon>
            {{entry.name}}
          </div>
          <div class="entry-type">
            <!-- {{entry.type}} -->
            定时
          </div>
          <div class="entry-strategy">
            <!-- {{entry.strategy}} -->
            每天12：00
          </div>
          <div class="entry-date">
            <!-- {{entry.date}} -->
            2020-11-09 12:00:00
          </div>
          <div class="entry-date">
            <!-- {{entry.status}} -->
            同步成功
          </div>
          <div class="entry-operation">
            <span
              class="logs"
              title="查看日志"
              @click="gotoTransferLogs()">
              <svg-icon icon="view-detail" color="default"></svg-icon>
            </span>

            <span
              class="set"
              title="设置"
              @click="setTransfers()">
              <svg-icon icon="setting" color="default"></svg-icon>
            </span>

            <span
              class="refresh"
              title="刷新"
              @click="refreshTransfer()">
              <svg-icon icon="refresh" color="default"></svg-icon>
            </span>
          </div>
        </div>
      </div>
      <div class="transfer-config-footer-pagination">
        <el-pagination
          @size-change="onSizeChange"
          @current-change="onPageChange"
          :current-page="pagination.page"
          :page-sizes="[10, 20, 40]"
          :page-size.sync="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
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
import apiService from "./transfer.service";

export default {
  name: "TransferConfig",
  components: {
    TransferSetting,
    TransferRefresh,
  },
  data: () => {
    return {
      clientHeight: document.body.clientHeight,
      searchKey: "",
      setDialogVisible: false,
      refreshDialogVisible: false,
      transferResult: [],
      pagination: {},
      nodeId: null,
      transferResultLoading: false,
      breadCrumbList: [],
    };
  },
  mounted(){
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.clientHeight = window.screenHeight
      })()
    }
  },
  watch: {
    clientHeight(val) {
      if(!this.timer) {
        this.clientHeight = val
        this.timer = true
        let that = this;
        setTimeout(() => {
          that.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    onSizeChange(size){
      this.transferResultLoading = true;
      this.pagination.size = size;
      apiService.getLeafNodeList(this.nodeId, this.pagination.page, this.pagination.size)
      .then((data) => {
        this.transferResult = data.data.data;
        this.pagination = data.data.pagination;
        this.transferResultLoading=false;
        document.getElementsByClassName('transfer-config-content')[0].scrollTop = 0;
      })
    },
    onPageChange(page){
      this.transferResultLoading = true;
      this.pagination.page = page;
      apiService.getLeafNodeList(this.nodeId, this.pagination.page, this.pagination.size)
      .then((data) => {
        this.transferResult = data.data.data;
        this.pagination = data.data.pagination;
        this.transferResultLoading=false;
        document.getElementsByClassName('transfer-config-content')[0].scrollTop = 0;
      })
    },
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
    justify-content: space-between;
    padding: 5px 15px;
    border-bottom: 1px solid $border-dark;

    &-operation {
      &-set {
        @include flex-align(center, space-between);
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
    overflow-y: auto;

    &-header{
      display: flex;
      border-bottom: 1px solid $bg-default;
      background: $bg-default;
      padding: 15px;
      color: $text-mute;
      &-name{
        min-width: 28%;
      }
      &-type{
        min-width: 15%;
      }
      &-strategy{
        min-width: 15%;
      }
      &-date{
        min-width: 15%;
      }
      &-status{
        min-width: 15%;
      }
      &-operation{
        min-width: 12%;
      }
    }

    .entry{
      display: flex;
      padding: 20px 15px;
      border-bottom: 1px solid $border-dark ;
      &-name{
        min-width: 28%;
      }
      &-type{
        min-width: 15%;
      }
      &-strategy{
        min-width: 15%;
      }
      &-date{
        min-width: 15%;
      }
      &-status{
        min-width: 15%;
      }
      &-operation{
        min-width: 12%;
        .logs{
          margin-right: 15px;
          &:hover .svg-icon{
            fill: $brand-primary;
            cursor: pointer;
          }
        }
        .set{
          margin-right: 15px;
          &:hover .svg-icon{
            fill: $brand-primary;
            cursor: pointer;
          }
        }
        .refresh{
          margin-right: 15px;
          &:hover .svg-icon{
            fill: $brand-primary;
            cursor: pointer;
          }
        }
      }
    }

    .el-table ::v-deep thead tr th {
      padding: 12px 0;
      background: $bg-default;
    }

  }
  &-footer {
    &-pagination {
      @include flex-align(center, flex-end);
    }
  }
}
</style>