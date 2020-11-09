<template>
  <el-dialog
    :visible="visible"
    width="30%"
    :show-close="false"
    top="10%"
    class="dialog"
  >
    <div slot="title" class="dialog-title">
      <svg-icon icon="transfer-success" class="dialog-title-icon" size="60px"></svg-icon>
      <span class="dialog-title-content">同步成功</span>
      <div class="dialog-content">
          <span>同步时间:</span>
          <span>{{time}}</span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["visible"],
  data() {
    return {
        time:null,
    };
  },
  mounted(){
      this.getNowFormatDate();
  },
  methods: {
    submit() {
      this.$emit("close", null);
    },
    getNowFormatDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = this.formateDate(month)
      let day = date.getDate();
      day = this.formateDate(day)
      let hour = date.getHours();
      hour = this.formateDate(hour)
      let minutes = date.getMinutes();
      minutes =this.formateDate(minutes)
      let seconds = date.getSeconds();
      seconds = this.formateDate(seconds)
      this.time = `${year}-${month}-${day} ${hour}:${minutes}:${seconds} `;
    },
    formateDate(item){
        return item = item>10?item:("0"+item);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";

.dialog {
  &-title {
    padding: 10px 40px;
    &-icon{
      margin-bottom: -20px;
    }
    &-content {
      margin-left: 20px;
      font-size: 30px;
    }
  }
  &-content {
    margin-top: 20px;
    padding-left: 37px;
  }
}
</style>