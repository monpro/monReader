<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="progress-wrapper">
          <div class="read-time-wrapper">
            <span class="read-time-text"></span>
            <span class="icon-forward"></span>
          </div>
          <div class="progress-icon-wrapper">
            <span class="icon-back" @click="prevSection"></span>
          </div>
          <input class="progress" type="range"
                 max="100"
                 min="0"
                 step="1"
                 @change="onProgressChange($event.target.value)" @input="onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress">
          <div class="progress-icon-wrapper">
            <span class="icon-forward" @click="nextSection"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span>{{bookAvailable ? progress + '%' : 'Loading...'}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  export default {
    mixins: [ebookMixin],
    methods: {
      onProgressChange(progress) {
        this.setProgress(progress).then(() => {
          this.displayProgress()
          this.updateProgressBackground()
        })
      },
      onProgressInput(progress) {
        this.setProgress(progress).then(() => {
          this.updateProgressBackground()
        })
      },
      displayProgress() {
        const cfiValue = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
        this.currentBook.rendition.display(cfiValue)
      },
      updateProgressBackground() {
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      },
      prevSection() {},
      nextSection() {}
    },
    updated() {
      this.updateProgressBackground()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .setting-wrapper {
    position: absolute;
    bottom: pxToRem(48);
    left: 0;
    z-index: 101;
    width: 100%;
    height: pxToRem(90);
    background: white;
    box-shadow: 0 pxToRem(-8) pxToRem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: pxToRem(40);
        font-size: pxToRem(12);
        @include center
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        padding: 0 pxToRem(16);
        box-sizing: border-box;
        @include center;
        .progress-icon-wrapper {
          font-size: pxToRem(20);
        }
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: pxToRem(2);
          margin: 0 pxToRem(15);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: pxToRem(20);
            width: pxToRem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: pxToRem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: pxToRem(10);
        width: 100%;
        color: #333;
        font-size: pxToRem(12);
        text-align: center;
      }
    }
  }
</style>
