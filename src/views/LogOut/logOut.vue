<template>
  <div>
    <layout-header></layout-header>
  </div>
</template>

<script>
import layoutHeader from '../../components/layout/layout-header.vue';
export default {
  components: { layoutHeader },
  name: "logOut",
  mounted() {
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userResidence");
    localStorage.removeItem("isLogin");
    this.$router.push('/');
  },
};
</script>

<style lang="scss" scoped>

</style>