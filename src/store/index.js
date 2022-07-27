import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    posTerminals: []
  },

  getters:{
    getPosTerminal: state => reference => {
      return state.posTerminals.find(terminal=>terminal.ourpassReference===reference)
    }
  },

  mutations: {
    setPosTerminal: (state, posTerminals) =>{
      state.posTerminals = posTerminals;
  },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {},
})
