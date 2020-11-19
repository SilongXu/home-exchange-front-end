<template>
  <router-view></router-view>
</template>

<script>
import interfaceManager from "./interface-manager";
import router from "./interface-router";

export default {
  components: {
    interfaceManager,
  },
  router,
};
</script>
    
<style>
</style>