<template>
  <div class="search">
    <search-input @inputChange="onInputChange"></search-input>
    <div class="search-content">
      <div class="search-content-left">
        <search-menu @menuChange="onMenuChange"></search-menu>
      </div>
      <div class="search-content-right">
        <search-filter ref="filter" @filterChange="onFilterChange"></search-filter>
        <search-result ref="result" :filters="getFilterList()"></search-result>
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
  name: 'Search',
  components: {
    SearchFilter,
    SearchInput,
    SearchMenu,
    SearchResult,
  },
  data: () => {
    return {
      inputFilter: '',
      menuFilter: null,
      needFilter: false,
    };
  },
  mounted() {
    this.fetchResult();
  },
  methods: {
    fetchResult() {
      // 这里执行搜索
      this.$refs.result.fetchResult(this.getFilterForResult());
    },
    getFilterList() {
      return {
        catalogId: this.menuFilter?.id,
        input: this.inputFilter,
        filters: this.$refs.filter ? JSON.stringify(this.$refs.filter.filterList) : '[]',
      };
    },
    getFilterForResult() {
        return {
          catalogId: this.menuFilter?.id? this.menuFilter.id : -1 ,
          nodeCode: this.menuFilter?.nodeCode? this.menuFilter.nodeCode : 'ALL',
          filters: this.$refs.filter ? JSON.stringify(this.$refs.filter.filterList.concat(
            {fieldCode: null, fieldName: null, queryType: 0, dataType: null, value: this.inputFilter}
          )) : '[]',
        }      
    },
    onInputChange(filter) {
      this.inputFilter = filter;
      this.fetchResult();
    },
    onMenuChange(node) {
      this.menuFilter = node;
      this.$refs.filter.fetchFilterList(this.menuFilter);
    },
    onFilterChange() {
      this.fetchResult();
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/util.scss';

.search {
  flex: 1;
  overflow: auto;

  &-content {
    display: flex;
    align-items: stretch;
    border-top: 1px solid $border-dark;
    background: $bg-light;

    &-left {
      flex-shrink: 0;
      width: 400px;
      min-height: 100vh;
      border-right: 1px solid $border-dark;
    }

    &-right {
      flex: 1;
      min-width: 0;
    }
  }

  &-filter {
    border-bottom: 1px solid $border-dark;
  }
}
</style>