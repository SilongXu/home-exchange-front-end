<template>
  <div class="search">
    <search-input @inputChange="onInputChange"></search-input>
    <div class="search-content">
      <div class="search-content-left">
        <search-menu @menuChange="onMenuChange"></search-menu>
      </div>
      <div class="search-content-right">
        <search-filter></search-filter>
        <search-result></search-result>
      </div>
    </div>
  </div>
</template>
<script>
import SearchFilter from './search-filter'
import SearchInput from './search-input'
import SearchMenu from './search-menu'
import SearchResult from './search-result'

export default {
  name: 'search',
  components: {
    SearchFilter,
    SearchInput,
    SearchMenu,
    SearchResult,
  },
  data: () => {
    return {
      inputFilter: '',
      menuFilter: [],
    };
  },
  methods: {
    onInputChange(filter) {
      this.inputFilter = filter;
      console.log(this.inputFilter);
    },
    onMenuChange(nodes) {
      this.menuFilter = nodes;
      console.log(this.menuFilter);
    }
  },
}
</script>
<style scoped>
.search {
  flex: 1;
  overflow: auto;
}
.search-content {
  display: flex;
  align-items: stretch;
  border-top: 1px solid #034866;
}
.search-content-left {
  flex-shrink: 0;
  width: 300px;
  min-height: 100vh;
  border-right: 1px solid #034866;
}
.search-content-right {
  flex: 1;
  min-width: 0;
}
</style>