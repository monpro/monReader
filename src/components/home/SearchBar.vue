<template>
  <div class="search-bar">
    <div class="search-bar-title-wrapper">
      <div class="title-icon-back-wrapper">
        <span class="icon-back icon"></span>
      </div>
      <div class="title-text-wrapper">
        <span class="title-text title">{{$t('home.title')}}</span>
      </div>
      <div class="title-icon-shake-wrapper">
        <span class="icon-shake icon"></span>
      </div>
    </div>
    <div class="search-bar-input-wrapper"></div>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar'
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .search-bar {
    position: relative;
    width: 100%;
    .search-bar-title-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: pxToRem(42);
      .title-icon-back-wrapper {
        position: absolute;
        left: pxToRem(15);
        top: 0;
        height: pxToRem(42);
        @include center;
        .icon-back {}
      }
      .title-text-wrapper {
        width: 100%;
        height: pxToRem(42);
        @include center;
        .title-text {

        }
      }
      .title-icon-shake-wrapper {
        position: absolute;
        right: pxToRem(15);
        top: 0;
        height: pxToRem(42);
        @include center;
        .icon-shake {

        }
      }
    }
    .search-bar-input-wrapper {}
  }
</style>
