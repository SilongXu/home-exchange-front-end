<template>
  <el-dialog
    title="Forget your password?"
    :visible="visibleForgetDialog"
    width="32%"
    @close="closeDialogForget"
  >
    <div class="dialogForget">
      <div class="dialogForget-phoneNumber">
        <div class="input-phoneNumber"><b>Phone number:</b></div>
        <el-input
          v-model="inputPhoneNumber"
          placeholder="Enter your phone number"
          clearable
        ></el-input>
        <el-button> Send verify code </el-button>
      </div>
      <div class="dialogForget-verifyCode">
        <div class="input-verifyCode"><b> Code received:</b></div>
        <el-input
          v-model="inputVerifyCode"
          placeholder="Enter your received verify code"
          clearable
        ></el-input>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "dialogForgetPsw",
  props: ["visibleForgetDialog"],
  data() {
    return {
      inputPhoneNumber: "",
      inputVerifyCode: "",
    };
  },
  methods: {
    closeDialogForget() {
      this.$emit("toggleForgetDialogVisible");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialogForget{
  &-phoneNumber{
    display: flex;
    .input-phoneNumber{
      word-break: initial;
    }
  }
  &-verifyCode{
    display: flex;
    .input-verifyCode{
      word-break: initial;
    }
  }
}
/deep/ .el-dialog {
  height: 40%;
}
/deep/ .el-input__inner{
  width: 100px;
}
</style>