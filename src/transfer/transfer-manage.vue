<template>
  <div class="transfer">
    <div class="transfer-left" :style="{height: clientHeight - 150 + 'px'}">
      <transfer-menu
        ref="searchMenuTree"
        @menuChange="onMenuChange"
      >
      </transfer-menu>
    </div>
    <div class="transfer-right" :style="{height: clientHeight - 150 + 'px'}">
      <transfer-config
        ref="config"
      ></transfer-config>
    </div>
  </div>
</template>

<script>
import TransferMenu from "./transfer-menu";
import TransferConfig from "./transfer-config";
import apiService from "./transfer.service";

export default {
  name: "Transfer",
  components: {
    TransferMenu,
    TransferConfig,
  },
  data: () => {
    return {
      clientHeight: document.body.clientHeight,
      transferResultFinal: [],
      transferPaginationFinal: [],
      nodeId: null,
      transferResultLoading: false,
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
          console.log(that.clientHeight)
          that.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    onMenuChange(transferResult, transferPagination, nodeId){
      this.transferResultFinal = transferResult;
      this.transferPaginationFinal = transferPagination;
      this.nodeId = nodeId;
      this.$refs.config.transferResult = this.transferResultFinal;
      this.$refs.config.pagination = this.transferPaginationFinal;
      this.$refs.config.nodeId = this.nodeId;
      this.$refs.config.transferResultLoading = false;
    },
    acceptBreadcrumbList(list) {
      this.breadcrumbList = list;
    },
    acceptTableList(list) {
      this.tableList = list;

    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";
.transfer {
  flex: 1;
  // overflow: auto;
  display: flex;
  align-items: stretch;
  background: $bg-light;
  height: 100%;

  &-left {
    flex-shrink: 0;
    overflow-y: auto;
    height: 84.4vh;
    width: 400px;
    border-right: 1px solid $border-dark;
  }

  &-right {
    flex: 1;
    // overflow: auto;
    // height: 80vh;
    min-width: 0;
  }
}
</style>
