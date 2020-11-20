<template>
    <el-dialog :title="'添加目录'" :visible="visible" @close="onClose" :close-on-click-modal="false" width="30%" v-dialogDrag>
        <div>
            <span class="labelName">请输入目录的名称:</span>
            <el-input ></el-input>
        </div>
        <span slot="footer">
            <el-button type="primary">确认</el-button>
            <el-button>取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props:['visible'],
    data(){
        return{

        }
    },
    methods:{
        onClose(){
          
            this.$emit('closeAddDirectoryDialog')
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.labelName{
    display: inline-block;
    font-size: $font-lg;
    margin-bottom: 10px;
}

</style>