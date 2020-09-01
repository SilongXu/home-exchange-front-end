<template>
  <div class="menu-tab-content">
    <menu-table :node="node"></menu-table>
  </div>
</template>

<script>
export default {
  name: 'MenuTabContent',
  props: ['node'],
  components: {
    'menu-table': () => import('./menu-table'),
  },
}
</script>

<style lang="scss" scoped>

</style>