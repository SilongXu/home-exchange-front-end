<template>
  <router-view></router-view>
</template>

<script>
import ImportList from './import-list';
import ImportNew from './import-new';
import router from './import-router';

export default {
  name: 'Import',
  components: {
    /* eslint-disable */
    ImportList,
    ImportNew,
    /* eslint-enable */
  },
  router
}
</script>

<style lang="scss" scoped>

</style>