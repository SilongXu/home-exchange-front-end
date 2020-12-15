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
        <div class="syncType">
          <span>同步类型</span>
          <el-select v-model="transferSetting.transferType" placeholder="请选择同步类型">
            <el-option
              v-for="item in transferTypes"
              :key="item.key"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="syncStrategy">
          <span>同步策略</span>
          <el-select v-model="transferSetting.transferStrategy" placeholder="请选择同步策略">
            <el-option
              v-for="item in transferStrategies"
              :key="item.key"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="syncDate">
          <span>同步时间</span>
          <el-date-picker v-model="transferSetting.transferTime" type="datetime" placeholder="请选择同步时间">
          </el-date-picker>
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
import apiService from "./transfer.service";

export default {
  name: "TransferSetting",
  props: ["visible"],
  data: () => {
    return {
      configEntry: "",
      transferSetting: {
        transferType: "",
        transferStrategy: "",
        transferTime: "",
      },
      transferTypes: [],
      transferStrategies: []
    };
  },
  methods: {
    onClose() {
      this.$emit("close", null);
    },
    verifySetting() {
      if(this.$parent.singleOrBatch == "single"){
        apiService.updateTransferConfigSettingSingle(this.configEntry.id, this.transferSetting.transferStrategy, this.transferSetting.transferTime, this.transferSetting.transferType)
        .then((data) => {
          this.$emit("close", this.transferSetting);
        }).catch(() => {
        });
      }else if(this.$parent.singleOrBatch == "batch"){
        apiService.updateTransferConfigSettingBatch(this.configEntry.id, this.$parent.transferConfigSearchBar, this.transferSetting.transferStrategy, this.transferSetting.transferTime, this.transferSetting.transferType)
        .then((data) => {
          this.$emit("close", this.transferSetting);
        })
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";

.setting-selector {
  font-size: 16px;
  padding: 20px;
  .syncType{
    padding: 15px;
  }
  .syncStrategy{
    padding: 15px;
  }
  .syncDate{
    padding: 15px;
  }
  span{
    padding-right: 15px;
  }

  .label {
    margin-right: 80px;
  }

  ::v-deep .el-input--suffix .el-input__inner {
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