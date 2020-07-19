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
  }
}

export default book
