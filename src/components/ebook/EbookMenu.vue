<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
           v-show="menuVisible">
        <div class="icon-wrapper" :class="{'selected': settingVisible === 3}">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 2}">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 1}">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 0}">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-pop-up></ebook-setting-font-pop-up>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
  </div>
</template>

<script>
  import EbookSettingFont from './EbookSettingFont'
  import EbookSettingFontPopUp from './EbookSettingFontPopUp'
  import EbookSettingTheme from './EbookSettingTheme'
  import EbookSettingProgress from './EbookSettingProgress'
  import EbookSlide from './EbookSlide'

  import { ebookMixin } from '../../utils/mixin'
  export default {
    mixins: [ebookMixin],
    components: {
      EbookSlide,
      EbookSettingFont,
      EbookSettingFontPopUp,
      EbookSettingTheme,
      EbookSettingProgress
    },
    methods: {
      showSetting(key) {
        this.setSettingVisible(key)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: pxToRem(48);
    background: white;
    box-shadow: 0 pxToRem(-8) pxToRem(8) rgba(0, 0, 0, .15);
    font-size: pxToRem(22);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: pxToRem(24);
      }
      .icon-A {
        font-size: pxToRem(20);
      }
    }
  }
</style>
