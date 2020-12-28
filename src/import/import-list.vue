<template>
  <el-tabs v-model="activeTab" class="importTabs" @tab-click="handleTabClick">
    <el-tab-pane label="导入任务" name="import" class="importTab">
      <div class="import">
        <div
          style="padding: 10px;text-align: right;background-color: #01202F;border-bottom: 1px solid #034866;"
        >
          <el-button
            type="primary"
            size="mini"
            @click="goToNew()"
            class="import-tab-data"
          >
            <svg-icon icon="import-manage"></svg-icon>
            <span>数据导入</span>
          </el-button>

          <el-button
            type="primary"
            size="mini"
            @click="goToNewBatch()"
            class="import-tab-dataBatch"
          >
            <svg-icon icon="import-manage"></svg-icon>
            <span>批量数据导入</span>
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="goToNewSpecial()"
            class="import-tab-dataInt"
          >
            <svg-icon icon="import-manage"></svg-icon>
            <span>网络数据导入</span>
          </el-button>
        </div>
        <import-content ref="import"></import-content>
      </div>
    </el-tab-pane>
    <el-tab-pane label="导出任务" name="export">
      <export-page ref="export"></export-page>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "ImportList",
  components: {
    "import-content": () => import("./import-list-content"),
    "export-page": () => import("./export")
  },
  data() {
    return {
      activeTab: "import"
    };
  },
  methods: {
    handleTabClick(tab){
      this.$refs.export.arrayProductType = [];
      if(tab.paneName == "export"){
        this.$refs.export.search();
        
      }else if(tab.paneName == "import"){
        this.$refs.import.search();
      }
    },
    goToNewBatch() {
      this.$router.push("./import/newBatch");
    },
    goToNewSpecial() {
      this.$router.push("./import/newSpecial");
    },
    goToNew() {
      this.$router.push("/import/new");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";
::v-deep .el-tabs__header {
  background: $bg-default;
  margin-bottom: 0px;
}
::v-deep .el-tabs__item {
  font-size: 16px;
}
::v-deep .el-tabs__nav {
  margin-left: 30px;
}

.import {
  span {
    position: relative;
    top: -2px;
    right: -3px;
    font-size: 14px;
  }
}
</style>