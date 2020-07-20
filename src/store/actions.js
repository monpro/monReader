const actions = {
  setFileName: ({ commit, state }, fileName) => {
    return commit('SET_FILENAME', fileName)
  },
  setMenuVisible: ({ commit, state }, menuVisible) => {
    return commit('SET_MENU_VISIBLE', menuVisible)
  },
  setSettingVisible: ({ commit, state }, settingVisible) => {
    return commit('SET_SETTING_VISIBLE', settingVisible)
  },
  setDefaultFontSize: ({ commit, state }, fontSize) => {
    return commit('SET_DEFAULT_FONT_SIZE', fontSize)
  }
}

export default actions
