<template>
  <div class="menu-tab-content">
    <menu-table :node="node" :menuEventBus="menuEventBus"></menu-table>
  </div>
</template>

<script>
export default {
  name: 'MenuTabContent',
  props: ['node', 'menuEventBus'],
  components: {
    'menu-table': () => import('./menu-table'),
  },
}
</script>

<style lang="scss" scoped>

</style>