<template>
  <div class="transfer">
    <div class="transfer-left">
      <transfer-menu
        @menuChange="onMenuChange"
        @freshNode="freshBreadcrumbAndTable"
        @sendBreadcrumbList="acceptBreadcrumbList"
        @sendTableList="acceptTableList"
      >
      </transfer-menu>
    </div>
    <div class="transfer-right">
      <transfer-config
        ref="config"
        :transferBreadcrumbList="breadcrumbList"
        :transferTableList="tableList"
      ></transfer-config>
    </div>
  </div>
</template>

<script>
import TransferMenu from "./transfer-menu";
import TransferConfig from "./transfer-config";

export default {
  name: "Transfer",
  components: {
    TransferMenu,
    TransferConfig,
  },
  data: () => {
    return {
      node: null,
      breadcrumbList: [],
      tableList: [],
    };
  },
  methods: {
    acceptBreadcrumbList(list) {
      this.breadcrumbList = list;
    },
    acceptTableList(list) {
      this.tableList = list;

    },
    onMenuChange(node) {},
    freshBreadcrumbAndTable() {
      this.$refs.config.handleBreadcrumbAndTableList();
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

  &-left {
    flex-shrink: 0;
    width: 400px;
    height: 84.4vh;
    overflow: auto;
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
