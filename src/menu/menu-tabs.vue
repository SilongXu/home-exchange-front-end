<template>
  <div class="menu-tabs">
    <div
      class="menu-tabs-node"
      :class="{active: activeNode && activeNode.id === node.id}"
      :id="'node_' + node.uuid"
      :key="node.id"
      v-for="node of nodes"
      @mousedown="activateNode(node)"
    >
      <div class="menu-tabs-node-name">
        <span :title="node.name">
          {{node.name}}
        </span>
      </div>
      <div class="menu-tabs-node-operation icon-btn" @mousedown.stop>
        <svg tuiIcon="cross" size="sm" @click="removeNode(node)"></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuTabs',
  data() {
    return {
      nodes: [],
      activeNode: null,
    };
  },
  methods: {
    activateNode(node) {

    },
    removeNode(node) {

    }
  },
}
</script>

<style lang="scss" scoped>

</style>