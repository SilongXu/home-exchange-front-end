<template>
  <el-dialog
    :title="'同步策略设置'"
    :visible="visible"
    @close="onClose"
    width="600PX"
    top="4%"
  >
    <div>
      <div class="setting-selector">
        <div class="label">同步类型</div>
        <div class="selector">
          <el-select v-model="transferSetting.transferType">
            <el-option
              v-for="(item, index) in transferTypes"
              :key="index"
              :value="item">
              {{ item }}
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="operator">
        <el-button size="medium" plain @click="onClose">取消</el-button>
        <el-button size="medium" type="primary" @click="verifySetting"
          >确认</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "TransferSetting",
  props: ["visible"],
  data: () => {
    return {
      transferSetting: {
        transferType: null,
        transferStrategy: null,
        transferTime: null,
      },
      transferTypes: ["实时", "定时", "不定时"],
      transferStrategies: ["每天一次", "每小时一次"],
    };
  },
  methods: {
    onClose() {
      this.$emit("close", null);
    },
    verifySetting() {
      this.$emit("close", this.transferSetting);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";

.setting-selector {
  @include flex-xy-center;
  justify-content: flex-start;
  padding: 10px;

  .label {
    margin-right: 80px;
  }

  /deep/ .el-input--suffix .el-input__inner {
    width: 400px;
  }
}

.operator {
  display: flex;
  flex-direction: row-reverse;
  padding-top: 20px;
  padding-right: 15px;

  button {
    margin-left: 20px;
  }
}
</style>