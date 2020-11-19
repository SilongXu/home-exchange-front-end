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
      <div class="logs-content-header">
        <div class="logs-content-header-fileName">文件名称</div>
        <div class="logs-content-header-childMenu">子目录</div>
        <div class="logs-content-header-dataType">数据类型</div>
        <div class="logs-content-header-nodePath">节点存储路径</div>
        <div class="logs-content-header-centerPath">中心存储路径</div> 
        <div class="logs-content-header-syncTime">同步时间</div>
        <div class="logs-content-header-syncResult">同步结果</div>
        <div class="logs-content-header-operation">操作</div>
      </div>
      <!-- <el-table :data="treeData" @row-click="getDetail">
        <el-table-column label="文件名称" prop="fileName"> </el-table-column>
        <el-table-column label="子目录" prop="childMenu"> </el-table-column>
        <el-table-column label="数据类型" prop="dataType"> </el-table-column>
        <el-table-column label="节点存储路径" prop="nodePath">
        </el-table-column>
        <el-table-column label="中心存储路径" prop="centerPath">
        </el-table-column>
        <el-table-column label="同步时间" prop="syncTime"> </el-table-column>
        <el-table-column label="同步结果" prop="syncResult"> </el-table-column>
        <el-table-column label="操作"> </el-table-column>
      </el-table> -->
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
          fileName: "fileName---1111",
          childMenu: "childMenu---111",
          dataType: "dataType---111",
          nodePath: "nodePath---111",
          centerPath: "centerPath---111",
          syncTime: "syncTime---111",
          syncResult: "syncResult---111",
        },
        {
          fileName: "fileName---2222",
          childMenu: "childMenu---222",
          dataType: "dataType---222",
          nodePath: "nodePath---222",
          centerPath: "centerPath---222",
          syncTime: "syncTime---2222",
          syncResult: "syncResult---2222",
        },
      ],
    };
  },
  methods: {
    getDetail(row, event, column){
    }
  }
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
  &-content{
    &-header{
      display: flex;
      border-bottom: 1px solid $bg-default;
      background: $bg-default;
      padding: 15px;
      color: $text-mute;
      &-fileName{
        min-width: 15%;
      }
      &-childMenu{
        min-width: 10%;
      }
      &-dataType{
        min-width: 8%;
      }
      &-nodePath{
        min-width: 10%;
      }
      &-operation{
        min-width: 10%;
      }
    }
  }
}
</style>