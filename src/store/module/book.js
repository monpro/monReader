const book = {
  state: {
    fileName: 1,
    menuVisible: false
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    },
    SET_MENU_VISIBLE: (state, menuVisible) => {
      state.menuVisible = menuVisible
    }
  },
  actions: {
    setFileName: ({ commit, state }, fileName) => {
      return commit('SET_FILENAME', fileName)
    },
    setMenuVisible: ({ commit, state }, menuVisible) => {
      return commit('SET_MENU_VISIBLE', menuVisible)
    }
  }
}

export default book
