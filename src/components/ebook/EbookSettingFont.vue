<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 0">
      <div class="setting-font-size">
        <div class="preview" ref="left">
          <span :style="{fontSize: fontSizeList[0].fontSize + 'px'}" ref="leftText">A</span>
        </div>
        <div class="select">
          <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index"
               @click="setFontSize(item.fontSize)" ref="item">
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview" ref="right">
          <span :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}" ref="rightText">A</span>
        </div>
      </div>
      <div class="setting-font-family" @click="showFontFamilyPopUp">
        <div class="setting-font-family-text-wrapper">
          <span class="setting-font-family-test">
            {{defaultFontFamily}}
          </span>
          <span class="setting-font-family-icon-wrapper">
            <span class="icon-forward"></span>
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { FONT_SIZE_LIST } from '../../utils/book'
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin],
    data() {
      return {
        fontSizeList: FONT_SIZE_LIST
      }
    },
    methods: {
      setFontSize(fontSize) {
        console.log(fontSize)
        console.log(this.currentBook)
        this.setDefaultFontSize(fontSize)
        this.currentBook.rendition.themes.fontSize(fontSize + 'px')
      },
      showFontFamilyPopUp() {
        console.log('pop up')
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
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    height: pxToRem(90);
    box-shadow: 0 pxToRem(-8) pxToRem(8) rgba(0, 0, 0, .15);
    .setting-font-size {
      flex: 2;
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 pxToRem(40);
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: pxToRem(1) solid #ccc;

          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: pxToRem(7);
            border-left: pxToRem(1) solid #ccc;
            .point {
              position: absolute;
              top: pxToRem(-8);
              left: pxToRem(-10);
              width: pxToRem(20);
              height: pxToRem(20);
              border-radius: 50%;
              background: white;
              border: pxToRem(1) solid #ccc;
              box-shadow: 0 pxToRem(4) pxToRem(4) rgba(0, 0, 0, .15);
              @include center;
              .small-point {
                width: pxToRem(5);
                height: pxToRem(5);
                background: black;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    .setting-font-family {
      flex: 1;
      font-size: pxToRem(14);
      @include center;
      .setting-font-family-text-wrapper {
        @include center;
      }
      .setting-font-family-icon-wrapper {
        @include center;
      }
    }
  }
</style>
