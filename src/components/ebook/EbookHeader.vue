<template>
  <div class="ebook-header">
    <span class="ebook-header-text">{{getSectionName}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin]
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: pxToRem(48);
    padding: 0 pxToRem(15);
    box-sizing: border-box;
    overflow: hidden;
    @include left;
    .ebook-header-text {
      font-size: pxToRem(12);
      color: #6d7178;
    }
  }
</style>
