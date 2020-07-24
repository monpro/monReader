<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme">
        <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index"
             @click="setTheme(index)">
          <div class="preview"
               :class="{'selected': item.name === defaultTheme}"
               :style="{background: item.style.body.background}"></div>
          <div class="text"
               :class="{'selected': item.name === defaultTheme}">{{item.alias}}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { ebookMixin } from '../../utils/mixin'
  import { saveTheme } from '../../utils/localStorage'

  export default {
    mixins: [ebookMixin],
    methods: {
      async setTheme(index) {
        const theme = this.themeList[index]
        await this.setDefaultTheme(theme.name)
        this.currentBook.rendition.themes.select(this.defaultTheme)
        await this.initGlobalStyle()
        saveTheme(this.fileName, theme.name)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    position: absolute;
    bottom: pxToRem(48);
    left: 0;
    z-index: 190;
    width: 100%;
    height: pxToRem(90);
    box-shadow: 0 pxToRem(-8) pxToRem(8) rgba(0, 0, 0, .15);
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: pxToRem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          box-sizing: border-box;
          border: none;
          &.selected {
            box-shadow: 0 pxToRem(4) pxToRem(6) 0 rgba(0, 0, 0, .1);
            border: pxToRem(2) solid #5e6369;
          }
        }
        .text {
          flex: 0 0 pxToRem(20);
          font-size: pxToRem(14);
          @include center;
        }
      }
    }
  }
</style>
