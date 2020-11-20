<template>
  <el-dialog :title="'提示'" :visible="visible" @close="onClose" :close-on-click-modal="false" v-dialogDrag> 
      <h1>确认删除<span class="warnMsg">{{content}}</span>及其子目录吗?</h1>
      <span slot="footer"> 
          <el-button>确认</el-button>
          <el-button>取消</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
    props:['visible','content'],
    data(){
        return{

        }
    },
    methods:{
        onClose(){
  
            this.$emit('closeDeleteDirectoryDialog')
        }
    }

};
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';
.warnMsg{
    color: red;
}
</style>