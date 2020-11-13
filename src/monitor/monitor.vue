<template>
  <router-view></router-view>
</template>

<script>
import monitorWelcome from './monitor-welcome'
import monitorArchive from './monitor-archive'
import monitorInterface from './monitor-interface'
import router from './monitor-router';


export default {
  name: 'Import',
  components: {
    /* eslint-disable */
    monitorWelcome,
    monitorArchive,
    monitorInterface
    /* eslint-enable */
  },
  router
}
</script> 

<style lang="scss" scoped>

</style>