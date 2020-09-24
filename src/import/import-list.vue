<template>
  <div class="import">
    <div class="import-tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="进行中" name="processing">
          <processing></processing>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="done">
          <done></done>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" size="mini" @click="goToNew()">
        <svg-icon icon="import-manage"></svg-icon>
        数据导入
      </el-button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ImportList',
  components: {
    'processing': () => import('./el-pane/processing'),
    'done': () => import('./el-pane/done'),
  },
  data() {
    return {
      activeName: 'processing',
    }
  },
  methods: {
    goToNew() {
      this.$router.push('/import/new');
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';
.import{
  overflow: auto;
  &-tab{
    position: relative;

    .el-button {
      position: absolute;
      top: 8px;
      right: 20px;

      ::v-deep span{
        display: flex;
        align-items: center;

        .svg-icon {
          margin-right: 4px;
        }
      }
    }
  }
}

.el-tabs {
  background: $bg-light;
}

.el-tabs ::v-deep .el-tabs__header {
  padding-left: 20px;
  border-bottom: 1px solid $border-dark;
}
.el-tabs ::v-deep .el-tabs__item {
  height: 48px;
  line-height: 48px;
}

.el-tabs ::v-deep .el-tabs__nav-wrap::after {
  display: none;
}
</style>