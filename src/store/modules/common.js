// initial state
const state = () => ({
    transferBreadcrumbList:[],
    transferTableList:[],
  })
  
  // getters
  const getters = {
    
  }
  
  // actions
  const actions = {
    
  }
  
  // mutations
  const mutations = {
    setTransferBreadcrumbList(state,breadcrumbList){
      state.transferBreadcrumbList = breadcrumbList;
      
    },
    setTransferTableList(state,tableList){
      state.transferTableList = tableList;
      // console.log(state.transferTableList)
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }