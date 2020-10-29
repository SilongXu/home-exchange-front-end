<template>
  <router-view></router-view>
</template>

<script>
import router from './transfer-router'
import TransferManage from "./transfer-manage";
import TransferLogs from './transfer-logs'
export default {
  name: "Transfer",
  components:{
    TransferManage,
    TransferLogs
  },
  router,
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";

</style>
