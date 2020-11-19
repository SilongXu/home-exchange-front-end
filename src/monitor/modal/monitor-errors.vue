<template>
 <el-dialog :title="'提示'" :visible="dialogVisible" @close="onclose" class="dialog-errors">
      <h1>失败原因</h1>
      <span slot="footer">
        <el-button @click="onclose">确定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {};
  },
  methods: {
    onclose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-errors{
   margin-top: 10;
}
</style>