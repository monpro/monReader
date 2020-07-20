const book = {
  state: {
    fileName: 1,
    menuVisible: false,
    // -1 not visible, 0 show font size, 1 show theme 2 show progress 3 show popup
    settingVisible: false,
    defaultFontSize: 16
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    },
    SET_MENU_VISIBLE: (state, menuVisible) => {
      state.menuVisible = menuVisible
    },
    SET_SETTING_VISIBLE: (state, settingVisible) => {
      state.settingVisible = settingVisible
    },
    SET_DEFAULT_FONT_SIZE: (state, fontSize) => {
      state.defaultFontSize = fontSize
    }
  }
}

export default book
