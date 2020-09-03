<template>
  <div class="menu">
    <menu-tree @clickNode="onNodeClick"></menu-tree>
    <menu-tabs ref="tabs" :avtiveNode="avtiveNode"></menu-tabs>
  </div>
</template>

<script>
import MenuTabs from './menu-tabs';
import MenuTree from './menu-tree';

export default {
  name: 'MenuManage',
  components: {
    MenuTabs,
    MenuTree,
  },
  data() {
    return {
      avtiveNode: null,
    };
  },
  methods: {
    onNodeClick(node) {
      this.activeNode = node;
      this.$store.dispatch('menuNodes/addMenuNode', node);
    },
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