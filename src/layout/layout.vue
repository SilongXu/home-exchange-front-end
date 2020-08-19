<template>
  <div class="layout">
    <layout-header></layout-header>
    <div class="layout-content">
      <router-view></router-view>
    </div>
    <div class="layout-footer">

    </div>
  </div>
</template>

<script>
import LayoutHeader from './layout-header';

export default {
  name: 'layout',
  components: {
    LayoutHeader,
  },
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  min-height: 0px;
  overflow: hidden;
}
.layout-header {
  flex-shrink: 0;
  height: 110px;
}
.layout-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.layout-footer {
  flex-shrink: 0;
  height: 32px;
  background: center no-repeat url(../assets/images/bottom-img1.png), left repeat-x url(../assets/images/bottom-img2.png) #020B0F;
}
</style>
