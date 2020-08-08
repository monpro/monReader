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
    <div class="search-bar-input-wrapper">
      <div class="search-bar-input">
        <span class="icon-search icon"></span>
        <input type="text"
                 class="input"
                 :placeholder="$t('home.hint')"
                 v-model="searchText">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchText: ''
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .search-bar {
    position: relative;
    width: 100%;
    .search-bar-title-wrapper {
      position: relative;
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
    .search-bar-input-wrapper {
      width: 100%;
      height: pxToRem(52);
      padding: pxToRem(10);
      box-sizing: border-box;
      .search-bar-input {
        width: 100%;
        background: #f4f4f4;
        border-radius: pxToRem(20);
        padding: pxToRem(5) pxToRem(15);
        box-sizing: border-box;
        border: pxToRem(1) solid #eee;
        @include left;
        .icon-search {
          color: #999;
        }
        .input {
          width: 100%;
          height: pxToRem(22);
          border: none;
          background: transparent;
          margin-left: pxToRem(10);
          font-size: pxToRem(12);
          color: #666;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }
</style>
