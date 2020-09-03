<template>
  <router-view></router-view>
</template>

<script>
import MenuManage from './menu-manage';
import router from './menu-router';

export default {
  name: 'Menu',
  components: {
    /* eslint-disable */
    MenuManage,
    /* eslint-enable */
  },
  router,
}
</script>

<style lang="scss" scoped>

</style>