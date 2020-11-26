<template>
  <el-dialog :title="'失败原因'" :visible='visible' @close="onClose">
      <h1>{{errorContent}}</h1>
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

<style>

</style>