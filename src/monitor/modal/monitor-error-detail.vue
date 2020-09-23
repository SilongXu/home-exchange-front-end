<template>
    <el-dialog :visible="visible" @close="onClose" title="错误原因">
        <div>
            {{detail}}
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'MonitorErrorDetail',
    props: ['visible', 'detail'],
    data: () => {
        return {
        }
    },
    mounted() {

    },
    methods: {
        onClose() {
            this.$emit('close', 'monitorErrorDetail');
        },
    }

}
</script>
<style lang="scss" scoped>

</style>