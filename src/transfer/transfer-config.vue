<template>
  <div class="transfer-config">
    <div class="transfer-config-header">
      <div class="transfer-config-header-title">
        目录管理/{{menuName}}
      </div>
      <div class="transfer-config-header-operation">
        <div class="transfer-config-header-operation-search">
          <el-input v-model="searchKey" placeholder="输入关键字搜索" suffix-icon="el-icon-search" size="small"></el-input>
        </div>
        <div class="transfer-config-header-operation-set">
          <el-button type="primary" size="mini" @click="setTransfers()">
            <svg-icon icon="setting"></svg-icon>
            <span>批量设置</span>
          </el-button>
        </div>
      </div>
    </div>
    <div class="transfer-config-content">
      <el-table
        :data="transferData"
      >
        <el-table-column
          label="目录名称"
          class="menu-name"
          style="padding-left: 50px"
          min-width="150px"
        >
          <template slot-scope="scope">
            <div>
              <el-checkbox>{{scope.row.name}}</el-checkbox>
            </div>
          </template>
        </el-table-column>
         <el-table-column
          label="同步类型"
          prop="type"
          width="200"
        >
        </el-table-column>
         <el-table-column
          label="同步策略"
          sortable="sta"
          prop="sta"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="上次同步时间"
          sortable="time"
          prop="time"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <div>
              <span class="set" @click="setTransfer(scope.row.name)">
                <svg-icon icon="setting" color="default"></svg-icon>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <transfer-setting :visible="dialogVisible" @close="onSettingClose"></transfer-setting>
  </div>
</template>
<script>
import TransferSetting from "./transfer-setting";

export default {
  name: 'TransferConfig',
  components: {
    TransferSetting,
  },
  data: () => {
    return {
      menuName: '气象水文',
      searchKey: '',
      transferData: [],
      dialogVisible: false,
    }
  },
  mounted () {
    let mockData = [
      {
        name: 'sadsada',
        type: 'test',
        sta: 's',
        time: 'dsa',
      },
      {
        name: 'sadsada',
        type: 'test',
        sta: 's',
        time: 'dqwdq',
      },
      {
        name: 'sadsada',
        type: 'test',
        sta: 's',
        time: 'ddgfhghgsa',
      },
      {
        name: 'sadsada',
        type: 'test',
        sta: 's',
        time: 'klkjklj',
      },
    ];
    this.transferData = mockData;
  },
  methods: {
    setTransfers() {
      let selectedMenu = this.getSelectedMenu();
      // TO DO do setting transfer
      this.dialogVisible = true;
      console.log(selectedMenu);
    },

    setTransfer(item) {
      this.dialogVisible = true;
      console.log(item);
    },

    getSelectedMenu() {
      // TODO
      return [];
    },

    onSortChange() {

    },

    onSettingClose(setting) {
      this.dialogVisible = false;
      if (setting) {
      console.log(setting)

      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/util.scss';

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

        /deep/
        .el-input .el-input__inner {
          width: 300px;
          background: $bg-body;
        }
      }
    }

  }

  &-content {
    .el-table ::v-deep thead tr th {
      padding: 12px 0;
      background: $bg-default;
    }

    .el-table ::v-deep th.el-table_1_column_1 {
      padding-left: 50px;
    }

    .el-table ::v-deep .el-checkbox__input {
      padding: 0 13px;
    }

    .el-table ::v-deep .set {
      cursor: pointer;
    }
  }


}


</style>