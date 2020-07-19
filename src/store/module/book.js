const book = {
  state: {
    fileName: 1
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    }
  },
  actions: {
    setFileName: ({ commit, state }, fileName) => {
      return commit('SET_FILENAME', fileName)
    }
  },
  modules: {
  }
}

export default book
