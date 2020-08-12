<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex: item.zIndex}">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')"></div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
  import { libraryMixin } from '../../utils/mixin'

  export default {
    mixins: [libraryMixin],
    methods: {
      close() {
        this.setFlapCardVisible(false)
      },
      semiCircleStyle(item, direction) {
        return {
          backgroundColor: `rgba(${item.r}, ${item.g}, ${item.b})`,
          backgroundSize: item.backgroundSize,
          backgroundImage: direction === 'left' ? item.imgLeft : item.imgRight
        }
      }
    },
    data() {
      return {
        flapCardList: [
          {
            r: 255,
            g: 102,
            _g: 102,
            b: 159,
            imgLeft: 'url(' + require('@/assets/images/gift-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/gift-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 100,
            rotateDegree: 0
          },
          {
            r: 74,
            g: 171,
            _g: 171,
            b: 255,
            imgLeft: 'url(' + require('@/assets/images/compass-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/compass-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 99,
            rotateDegree: 0
          },
          {
            r: 255,
            g: 198,
            _g: 198,
            b: 102,
            imgLeft: 'url(' + require('@/assets/images/star-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/star-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 98,
            rotateDegree: 0
          },
          {
            r: 255,
            g: 102,
            _g: 102,
            b: 159,
            imgLeft: 'url(' + require('@/assets/images/heart-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/heart-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 97,
            rotateDegree: 0
          },
          {
            r: 59,
            g: 201,
            _g: 201,
            b: 22,
            imgLeft: 'url(' + require('@/assets/images/crown-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/crown-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 96,
            rotateDegree: 0
          }
        ]
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .flap-card-wrapper {
    @include absCenter;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0, 0, 0, .6);
    @include center;
    .flap-card-bg {
      position: relative;
      width: pxToRem(64);
      height: pxToRem(64);
      border-radius: pxToRem(5);
      background: white;
      .flap-card {
        width: pxToRem(48);
        height: pxToRem(48);
        @include absCenter;
        margin: auto;
        &-circle {
          display: flex;
          width: 100%;
          height: 100%;
          .flap-card-semi-circle {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            &-left {
              border-radius: pxToRem(24) 0 0 pxToRem(24);
              background-position: center right;
            }
            &-right {
              border-radius: 0 pxToRem(24) pxToRem(24) 0;
              background-position: center left;
            }
          }
        }
      }
    }
    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: pxToRem(30);
      z-index: 1100;
      width: 100%;
      @include center;
      .icon-close {
        width: pxToRem(45);
        height: pxToRem(45);
        border-radius: 50%;
        background: #333;
        font-size:pxToRem(25);
        color: white;
        @include center;
      }
    }
  }
</style>
