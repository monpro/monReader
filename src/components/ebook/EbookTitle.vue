<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left" @click="back">
        <span class="icon-back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
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
      back() {
        console.log('back')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    background: white;
    width: 100%;
    height: pxToRem(48);
    box-shadow: 0 pxToRem(8) pxToRem(8) rgba(0, 0, 0, .15);
    font-size: pxToRem(22);
    .left {
      flex: 0 0 pxToRem(37);
      @include right;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 pxToRem(37);
        @include left;
      }
    }
  }
</style>
