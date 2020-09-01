// initial state
const state = () => ({
  nodes: [],
  activeNode: null,
})

// getters
const getters = {
}

// actions
const actions = {
  addMenuNode ({ commit }, node) {
    commit('pushMenuNode', { node });
    commit('setActiveNode', { node });
  },

  removeMenuNode ({ commit }, node) {
    commit('popMenuNode', { node });
  },

  activateMenuNode ({ commit }, node) {
    commit('setActiveNode', { node });
  },
}

// mutations
const mutations = {
  pushMenuNode (state, { node }) {
    const existNodeIndex = state.nodes.findIndex((_node) => _node.id === node.id);
    if (existNodeIndex > -1) {
      state.nodes[existNodeIndex] = node;
    } else {
      state.nodes.push(node);
    }
  },

  popMenuNode (state, { node }) {
    const existNodeIndex = state.nodes.findIndex((_node) => _node.id === node.id);
    if (existNodeIndex > -1) {
      state.nodes.splice(existNodeIndex, 1);
    }
    
    if (state.activeNode.id === node.id) {
      state.activeNode = state.nodes[0] || null;
    }
  },

  setActiveNode (state, { node }) {
    state.activeNode = node;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}