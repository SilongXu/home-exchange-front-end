<template>
  <div class="menu">
    <menu-tree :menuEventBus="menuEventBus"></menu-tree>
    <menu-tabs ref="tabs" :menuEventBus="menuEventBus"></menu-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
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
      menuEventBus: new Vue(),
    };
  },
  mounted() {
    this.menuEventBus.$on('tableChange', (node) => {
      this.menuEventBus.$emit('refreshTree', node);
    });
    this.menuEventBus.$on('clickNode', (node) => {
      this.$store.dispatch('menuNodes/addMenuNode', node);
    });
    this.menuEventBus.$on('treeChange', (pNode) => {
      this.menuEventBus.$emit('refreshTable', pNode);
    });
  },
  methods: {
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