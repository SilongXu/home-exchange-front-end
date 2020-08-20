<template>
  <div class="search-input">
    <div class="search-input-group">
      <el-input
        placeholder="请输入关键字搜索"
        v-model="inputFilter"
        @change="search"
      >
      </el-input>
      <svg-icon icon="search" size="21px"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'search-input',
  data() {
    return {
      inputFilter: '',
    }
  },
  methods: {
    search() {
      this.$emit('inputChange', this.inputFilter);
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/util.scss';

.search-input {
  @include flex-xy-center();
  padding: 48px 0;
}
.search-input-group {
  position: relative;
  width: 600px;

  .svg-icon {
    position: absolute;
    top: 14px;
    right: 16px;
    fill: rgba(74, 99, 124, 1);
  }
}

.el-input {
  height: 48px;
  width: 100%;
}
.el-input ::v-deep .el-input__inner {
  height: 48px;
  padding-right: 40px;
  border-radius: 24px;
  font-size: 1rem;
}
</style>
