<template>
  <div class="import">
    <div style="padding: 10px;text-align: right;background-color: #01202F;border-bottom: 1px solid #034866;">
      <el-button
        type="primary"
        size="mini"
        @click="goToNew()"
        class="import-tab-data">
        <svg-icon icon="import-manage"></svg-icon>
        <span>数据导入</span>
      </el-button>

      <el-button
        type="primary"
        size="mini"
        @click="goToNewBatch()"
        class="import-tab-dataBatch">
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
    <import-content></import-content>
  </div>
</template>

<script>
export default {
  name: "ImportList",
  components: {
    // processing: () => import("./el-pane/processing"),
    // done: () => import("./el-pane/done"),
    "import-content": () => import("./import-list-content"),
  },
  data() {
    return {
      activeName: "processing",
    };
  },
  methods: {
    goToNewBatch() {
      this.$router.push("./import/newBatch");
    },
    goToNewSpecial() {
      this.$router.push("./import/newSpecial");
    },
    goToNew() {
      this.$router.push("/import/new");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";

.import{
  span{
    position: relative;
    top: -2px;
    right: -3px;
    font-size: 14px;
  }
}
</style>