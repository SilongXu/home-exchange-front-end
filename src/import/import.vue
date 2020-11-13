<template>
  <router-view></router-view>
</template>

<script>
import ImportList from './import-list';
import ImportNew from './import-new';
import router from './import-router';
import ImportNewSpecial from './import-new-special';
import ImportNewBatch from './import-new-batch';

export default {
  name: 'Import',
  components: {
    /* eslint-disable */
    ImportList,
    ImportNew,
    ImportNewSpecial,
    ImportNewBatch
    /* eslint-enable */
  },
  router
}
</script>

<style lang="scss" scoped>

</style>