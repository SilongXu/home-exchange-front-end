<template>
  <el-dialog :title="'失败原因'" :visible='visible' @close="onClose">
      <div class="content">
          <pre>
            {{'\n' + errorContent}}
          </pre>
          </div>
  </el-dialog>
</template>

<script>
export default {
    props:['visible','errorContent'],
    methods:{
        onClose(){
            this.$emit("close");
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    overflow: auto;
    height: 50vh;
    font-size: 20px;
    padding: 10px 60px;
    margin-top: 10px;
    background: rgba(0, 0, 0, 0.4);
}

</style>