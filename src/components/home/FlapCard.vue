<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
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
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .flap-card-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0, 0, 0, .6);
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
