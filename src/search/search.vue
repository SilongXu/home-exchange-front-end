<template>
  <div class="search">
    <search-input @inputChange="onInputChange"></search-input>
    <div class="search-content">
      <div class="search-content-left">
        <search-menu></search-menu>
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
      inputFilter: ''
    };
  },
  methods: {
    onInputChange(filter) {
      this.inputFilter = filter;
      console.log(this.inputFilter);
    }
  },
}
</script>
<style scoped>

</style>