<template>
  <router-view></router-view>
</template>

<script>
import userAuthorityManage from './userAuthority-manage';
import userAuthorityNew from './userAuthority-new';
import router from './userAuthority-router';

export default {
  name: 'UserAuthority',
  components: {
    /* eslint-disable */
    userAuthorityManage, 
    userAuthorityNew,
    /* eslint-enable */
  },
  router
}
</script>

<style lang="scss" scoped>

</style>