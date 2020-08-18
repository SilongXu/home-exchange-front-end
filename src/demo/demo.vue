<template>
  <div class="container">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300"
        >
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <bitcoin></bitcoin>
    </el-row>
    <el-row>
      <svg-icon icon="folder-close"/>
      <svg-icon icon="folder-open" size="sm"/>
    </el-row>
  </div>
</template>

<script>
import bitcoin from './bitcoin';

export default {
  name: 'demo',
  components: {
    bitcoin,
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-bottom: 32px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>