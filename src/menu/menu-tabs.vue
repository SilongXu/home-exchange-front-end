<template>
  <div class="menu-tabs">
    <overflow-container ref="menuTabsContainer">
      <div class="menu-tabs-list">
        <div
          class="menu-tabs-node"
          :class="{active: activeNode && activeNode.id === node.id}"
          :id="'node_' + node.id"
          :key="node.id"
          v-for="node of nodes"
          @mousedown="activateNode(node)"
        >
          <div class="menu-tabs-node-name">
            <svg-icon icon="folder-close"></svg-icon>
            <span :title="node.name">
              {{node.name}}
            </span>
          </div>
          <div class="menu-tabs-node-operation icon-btn"  @click="removeNode(node)" @mousedown.stop>
            <svg-icon icon="cancel" size="sm"></svg-icon>
          </div>
        </div>
      </div>
    </overflow-container>

    <div class="menu-tabs-content" v-if="!!activeNode">
      <menu-table ref="table"></menu-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MenuTabs',
  components: {
    'menu-table': () => import('./menu-table'),
  },
  data() {
    return {
      nodes: [],
      activeNode: null,
      nodesWatcher: null,
      activeNodeWatcher: null,
      tableList: [],
    };
  },
  methods: {
    activateNode(node) {
      this.$store.dispatch('menuNodes/activateMenuNode', node);
    },
    removeNode(node) {
      this.$store.dispatch('menuNodes/removeMenuNode', node);
    },
    // iconFromType(node) {
    //   return node.type === 'directory' ? 'folder-close' : 'file';
    // }
    fetchTableDetails(node) {
      if (this.activeNode) {
        this.$refs.table.fetchTableDetails(node);
      }
    }
  },
  created() {
    this.nodesWatcher = this.$store.watch((state) => {
      return state.menuNodes.nodes;
    }, (currentNodes) => {
      this.nodes = currentNodes;
      setTimeout(() => {
        this.$refs.menuTabsContainer.updateNav();
      });
    });

    this.activeNodeWatcher = this.$store.watch((state) => {
      return state.menuNodes.activeNode;
    }, (currentActiveNode) => {
      this.activeNode = currentActiveNode;
      if (this.activeNode) {
        this.$refs.menuTabsContainer.updateActiveContent(`#node_${this.activeNode.id}`);
      }
    });
  },
  mounted() {
    this.nodes = this.$store.state.menuNodes.nodes;
    this.activeNode = this.$store.state.menuNodes.activeNode;
  },
  destroyed() {
    if (this.nodesWatcher) {
      this.nodesWatcher();
    }

    if (this.activeNodeWatcher) {
      this.activeNodeWatcher();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.menu-tabs {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  .overflow-container {
    flex-shrink: 0;
    height: 36px;
    min-height: 36px;
  }

  &-list {
    @include flex-align(center, flex-start);
    height: 36px;
    min-height: 36px;
    background: $bg-body;
    overflow: hidden;
  }
    
  &-node {
    @include flex-align(center, space-between);
    @include text-ellipsis;
    height: 100%;
    min-width: 118px;
    max-width: 240px;
    padding: 0 12px;
    border-right: 1px solid $bg-light;
    background: transparent;
    color: $text-mute;
    font-size: $font-md;
    cursor: pointer;

    &.active {
      background: $bg-light;
      color: $text-default;

      .menu-tabs-node-operation {
        visibility: visible;
      }
    }

    &.changed {
      .menu-tabs-node-operation {
        visibility: visible;
      }
    }

    &:hover {
      color: $text-default;

      &:not(.active) {
        background: $bg-hover;
      }

      .menu-tabs-node-operation {
        visibility: visible;
      }
    }
      

    &-name {
      @include flex-align(center, flex-start);
      @include text-ellipsis;
      padding-right: 8px;

      .svg-icon {
        flex-shrink: 0;
        margin-right: 6px;
      }

      span {
        @include text-ellipsis;
        line-height: normal;
      }
    }

    &-operation {
      visibility: hidden;
    }
  }
    
  &-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
}
</style>