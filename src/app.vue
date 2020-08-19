<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
::-webkit-scrollbar {
  width: .5rem;
  height: .5rem;
}
  
::-webkit-scrollbar-track {
  background-color: inherit;
}

::-webkit-scrollbar-corner {
  background-color: inherit;
}

::-webkit-scrollbar-thumb {
  outline: 0;
  background-color: #034866;
  border-radius: .25rem;
}

body {
  margin: 0;
  background: #020B0F;
}
#app {
  font-family: 'PingFang SC', 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  height: 100vh;
  width: 100%;
}
</style>
