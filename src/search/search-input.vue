<template>
  <div class="search-input">
    <div class="search-input-group">
      <el-input
        placeholder="请输入关键字搜索"
        v-model="inputFilter"
        @keyup.enter.native="search"
      >
      </el-input>
      <div class="svg" @click="search">
        <svg-icon icon="search" size="21px"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import throttle from "lodash-es/throttle";

export default {
  name: 'SearchInput',
  data() {
    return {
      inputFilter: '',
    }
  },
  methods: {
    search: throttle(function() {
      this.$emit('inputChange', this.inputFilter);
    }, 1000),
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/util.scss';

.search-input {
  position: fixed;  
  padding: 20px 0;
  z-index: 20;
  background-color: black;
  width: 100%;
}
.search-input-group {
  position: relative;
  width: 600px;
  left: 50%;
  transform: translateX(-50%);
  .svg {
    position: absolute;
    top: 14px;
    right: 16px;
    cursor: pointer;

    &-icon {
      fill: rgba(74, 99, 124, 1);
    }
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
