<template>
  <div class="menu">
    <menu-tree></menu-tree>
    <menu-tabs></menu-tabs>
  </div>
</template>

<script>
import MenuTable from './menu-table';
import MenuTabs from './menu-tabs';
import MenuTree from './menu-tree';

export default {
  name: 'MenuManage',
  components: {
    MenuTable,
    MenuTabs,
    MenuTree,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.menu {
  @include flex-align(stretch, flex-start);
  flex: 1;
  overflow: auto;

  &-tree {
    flex-shrink: 0;
    width: 400px;
    border-right: 1px solid $border-dark;
  }

  &-tabs {
    flex: 1;
  }
}
</style>