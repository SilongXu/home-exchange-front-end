<template>
  <div class="logs">
    <div class="logs-header">
      <div class="logs-header-title">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumbList"
            :key="index"
          >
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="logs-header-search">
        <el-input
          v-model="searchKey"
          placeholder="输入关键字搜索"
          suffix-icon="el-icon-search"
          size="small"
        ></el-input>
      </div>
    </div>
    <div class="logs-content">
      <el-table :data="treeData">
        <el-table-column label="文件名称" prop="name"> </el-table-column>
        <el-table-column label="子目录" prop="directory"> </el-table-column>
        <el-table-column label="数据类型" prop="type"> </el-table-column>
        <el-table-column label="节点存储路径" prop="nodepath">
        </el-table-column>
        <el-table-column label="中心存储路径" prop="centerpath">
        </el-table-column>
        <el-table-column label="同步时间" prop="date"> </el-table-column>
        <el-table-column label="同步结果" prop="result"> </el-table-column>
        <el-table-column label="操作"> </el-table-column>
      </el-table>
    </div>
    <div class="logs-footer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbList: ["气象水文", "气候统计产品", "同步日志"],
      searchKey: "",
      treeData: [
        {
          name: "付款就接到了开始",
          directory: "气候统计产品",
          type: "jpg",
          nodepath: "transfer/transferlog",
          centerpath: "transfer",
          date: "2020-11-03 11:27:00",
          result: "同步成功",
        },
        {
          name: "付款就接到了开始",
          directory: "气候统计产品",
          type: "jpg",
          nodepath: "transfer/transferlog",
          centerpath: "transfer",
          date: "2020-11-03 11:27:00",
          result: "同步成功",
        },
        {
          name: "付款就接到了开始",
          directory: "气候统计产品",
          type: "jpg",
          nodepath: "transfer/transferlog",
          centerpath: "transfer",
          date: "2020-11-03 11:27:00",
          result: "同步成功",
        },
        {
          name: "付款就接到了开始",
          directory: "气候统计产品",
          type: "jpg",
          nodepath: "transfer/transferlog",
          centerpath: "transfer",
          date: "2020-11-03 11:27:00",
          result: "同步成功",
        },
        {
          name: "付款就接到了开始",
          directory: "气候统计产品",
          type: "jpg",
          nodepath: "transfer/transferlog",
          centerpath: "transfer",
          date: "2020-11-03 11:27:00",
          result: "同步成功",
        },
        {
          name: "付款就接到了开始",
          directory: "气候统计产品",
          type: "jpg",
          nodepath: "transfer/transferlog",
          centerpath: "transfer",
          date: "2020-11-03 11:27:00",
          result: "同步成功",
        },
        {
          name: "付款就接到了开始",
          directory: "气候统计产品",
          type: "jpg",
          nodepath: "transfer/transferlog",
          centerpath: "transfer",
          date: "2020-11-03 11:27:00",
          result: "同步成功",
        },
        {
          name: "付款就接到了开始",
          directory: "气候统计产品",
          type: "jpg",
          nodepath: "transfer/transferlog",
          centerpath: "transfer",
          date: "2020-11-03 11:27:00",
          result: "同步成功",
        },
        {
          name: "付款就接到了开始",
          directory: "气候统计产品",
          type: "jpg",
          nodepath: "transfer/transferlog",
          centerpath: "transfer",
          date: "2020-11-03 11:27:00",
          result: "同步成功",
        },
        {
          name: "付款就接到了开始",
          directory: "气候统计产品",
          type: "jpg",
          nodepath: "transfer/transferlog",
          centerpath: "transfer",
          date: "2020-11-03 11:27:00",
          result: "同步成功",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";
.logs {
  &-header {
    // @include flex-align(center,center);
    @include flex-align(center, center);
    justify-content: space-between;
    padding: 5px 15px;
    border-bottom: 1px solid $border-dark;
  }
}
</style>