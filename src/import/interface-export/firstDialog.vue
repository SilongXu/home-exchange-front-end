<template>
  <el-dialog
    title="接口信息"
    :visible.sync="visible"
    width="70%"
    @close ="onclose">
    <div class="interface-content">
      <el-table
      :data="firstDialogContent" @cell-click='getCurrentRowMsg'>
       <el-table-column label="序号" prop="id"  min-width="100px"> </el-table-column>
        <el-table-column label="接口类型" prop="messageType"  min-width="170px"> </el-table-column>
        <el-table-column label="发送方"  prop="originatorAddress"  min-width="100px">  </el-table-column>
        <el-table-column label="接收方"  prop="recipientAddress"  min-width="100px"> </el-table-column>
        <el-table-column label="发送时间"  prop="creationTimeDesc"  min-width="180px"> </el-table-column>
        <el-table-column label="业务流水号" prop="flowNo" min-width="200px"> </el-table-column>
        <el-table-column label="任务号" prop="taskId"  min-width="150px"> </el-table-column>
        <el-table-column label="接口内容"  min-width="100px">
            <template>
                <el-button type="primary" size="mini" @click="goInterfaceContentPage"> 
                    查看
                </el-button>
            </template>
         </el-table-column>
      </el-table>

      <div>
        <el-pagination
          @size-change="onSizeChange"
          @current-change="onCurrentPage"
          :current-page="pagination.page"
          :page-sizes="[5, 10, 20]"
          :page-size.sync="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div> 
    </div>
    <second-dialog :dialogVisible="secondDialogVisible" :messageXml="secondDialogContent" @close="closeSecondDialog"></second-dialog>
  </el-dialog>
</template>

<script>
import secondDialog from '@/import/interface-export/secondDialog'


export default {
  name: 'firstDialog',
  props: ["visible","firstDialogContent","pagination"],
   components: {
    "second-dialog": secondDialog
  },
  data() {
    return {
      secondDialogVisible: false,
      secondDialogContent: null,
    };
  },
  methods: {
    onSizeChange(size) {
      this.pagination.size = size;
      this.$parent.runInterface();
    },
    onCurrentPage(page) {
      this.pagination.page = page;
      this.$parent.runInterface();
    },
    onclose() {
      this.pagination.page = 1;
      this.pagination.size = 10;
      this.$emit("close");
    },
    goInterfaceContentPage(){
      this.secondDialogVisible=true;
    },
    getCurrentRowMsg(row){
      this.secondDialogContent = row.messageXml;
    },
    goSecondDialog(){
      this.secondDialogVisible = true;
    },
    closeSecondDialog(){
      this.secondDialogVisible = false;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>