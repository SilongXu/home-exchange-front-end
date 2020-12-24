<template>
  <el-drawer :visible.sync="drawerVisible" size="45%" title="购物车">
    <div class="drawer-operation">
      <div class="drawer-operation-top">
        <el-input v-model="exportPath" placeholder="请输入导出路径"></el-input>
        <el-button type="primary" @click="CreateExportMission"
          >生成导出任务(所有数据)</el-button
        >
      </div>
      <div class="drawer-operation-bottom">
        <el-button type="primary" @click="ClearShoppingTrolley"
          >清空购物车</el-button
        >
        <el-button type="primary" @click="ClearSelectedItems"
          >删除勾选中的数据</el-button
        >
      </div>
    </div>
    <div
      class="drawer-content_Pagination"
      :style="{ height: clientHeight - 200 + 'px' }"
    >
      <div class="drawer-content">
        <el-table
          :data="drawerTableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="id" label="id" min-width="15%">
          </el-table-column>
          <el-table-column prop="dataId" label="dataId" min-width="40%">
          </el-table-column>
          <el-table-column prop="productType" label="数据类型" min-width="25%">
          </el-table-column>
          <el-table-column type="selection" min-width="10%"> </el-table-column>
        </el-table>
      </div>
      <div class="drawer-pagination">
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
  </el-drawer>
</template>

<script>
import apiService from "../search.service";

export default {
  name: "drawer",
  data() {
    return {
      drawerVisible: false,
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      drawerTableData: null,
      checkedList: [],
      SelectedDeleteList: [],
      exportPath: "",
      clientHeight: document.body.clientHeight
    };
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        that.clientHeight = window.screenHeight;
      })();
    };
  },
  watch: {
    clientHeight(val) {
      if (!this.timer) {
        this.clientHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    resetPagination() {
      this.pagination = {
        page: 1,
        size: 10,
        total: 0
      };
    },
    updateDrawer() {
      apiService
        .checkShoppingTrolley(this.pagination.page, this.pagination.size)
        .then(data => {
          this.drawerTableData = data.data.data;
          this.pagination = data.data.pagination;
        });
    },
    CreateExportMission() {
      this.resetPagination();
      apiService.exportShoppingTrolley(this.exportPath).then(data => {
        this.$message({
          message: "创建导出任务成功",
          type: "success"
        });
        this.pagination.page = 1;
        this.pagination.size = 10;
        this.updateDrawer();
      });
    },
    ClearShoppingTrolley() {
      apiService
        .deleteAllItemsShoppingTrolley()
        .then(data => {
          this.pagination.page = 1;
          this.pagination.size = 10;
          this.updateDrawer();
        })
        .catch(e => {});
    },
    handleSelectionChange(val) {
      this.checkedList = val;
      this.checkedList.forEach(item => {
        this.SelectedDeleteList.push(item.id);
      });
    },
    ClearSelectedItems() {
      if (this.SelectedDeleteList.length == 0) {
        this.$message("请勾选数据");
      } else {
        apiService
          .deleteSelectedItemsShoppingTrolley(this.SelectedDeleteList)
          .then(data => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.pagination.page = 1;
            this.pagination.size = 10;
            this.updateDrawer();
          });
      }
    },
    onSizeChange(size) {
      this.pagination.size = size;
      this.updateDrawer();
    },
    onCurrentPage(page) {
      this.pagination.page = page;
      this.updateDrawer();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";
::v-deep .el-drawer__body {
  height: 0;
}
.drawer-operation {
  position: relative;
  ::v-deep .el-button,
  .el-input {
    margin: 10px;
  }
  &-top {
    display: flex;
    @include flex-align(center, space-between);
  }
  &-bottom {
    display: flex;
    @include flex-align(center, space-between);
  }
}
.drawer-content_Pagination {
  overflow: auto;
}
::v-deep :focus {
  outline: 0;
}
</style>