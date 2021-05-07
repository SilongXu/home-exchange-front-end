<template>
  <el-dialog
    title="提示"
    :visible="visibleDialog"
    width="80%"
    @close="closeDialog"
  >
  
    <span> 信息</span>
  </el-dialog>
</template>

<script>
export default {
  name: "detailDialog",
  props: ["visibleDialog"],
  data() {
    return {

    };
  },
  methods: {
    closeDialog(){
      this.$emit('toggleDetailDialogVisible');
    },
    
  }

};
</script>

<style scoped>
</style>