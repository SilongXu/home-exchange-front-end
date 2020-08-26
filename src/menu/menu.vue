<template>
  <router-view></router-view>
</template>

<script>
import MenuAbstract from './menu-abstract';
import MenuManage from './menu-manage';
import router from './menu-router';

export default {
  name: 'Menu',
  components: {
    /* eslint-disable */
    MenuAbstract,
    MenuManage,
    /* eslint-enable */
  },
  router,
}
</script>

<style lang="scss" scoped>

</style>