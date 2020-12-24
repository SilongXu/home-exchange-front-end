<template>
  <el-dialog
    :title="'搜索条件'"
    :visible="visible"
    @close="onClose"
    :close-on-click-modal="false"
    width="30%"
    v-dialogDrag
  >
    <div>
      {{fileContent}}
    </div>
    <span slot="footer">
      <el-button type="primary" @click="onClose">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["visible",'fileContent'],
  data() {
    return {
      newName: "",
    };
  },
  methods: {
    onClose() {
      this.$emit("closeFileContentDialog");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";


</style>