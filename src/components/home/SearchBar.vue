<template>
  <div class="search-bar" :class="{'hide-title': !titleVisible}">
    <transition name="title-move">
      <div class="search-bar-title-wrapper" v-show="titleVisible">

        <div class="title-text-wrapper">
          <span class="title-text title">{{$t('home.title')}}</span>
        </div>
        <div class="title-icon-shake-wrapper">
          <span class="icon-shake icon"></span>
        </div>
      </div>
    </transition>
    <div class="title-icon-back-wrapper">
      <span class="icon-back icon"></span>
    </div>
    <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">
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
  import { libraryMixin } from '../../utils/mixin'

  export default {
    mixins: [libraryMixin],
    data() {
      return {
        searchText: '',
        titleVisible: true
      }
    },
    watch: {
      offsetY(offsetY) {
        if (offsetY > 0) {
          this.hideTitle()
        } else {
          this.showTitle()
        }
      }
    },
    methods: {
      hideTitle() {
        this.titleVisible = false
      },
      showTitle() {
        this.titleVisible = true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .search-bar {
    position: relative;
    width: 100%;
    height: pxToRem(94);
    z-index: 150;
    &.hide-title {
      height: pxToRem(52);
    }
    .search-bar-title-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: pxToRem(42);
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
    .title-icon-back-wrapper {
      position: absolute;
      left: pxToRem(15);
      top: 0;
      height: pxToRem(42);
      @include center;
      .icon-back {}
    }
    .search-bar-input-wrapper {
      position: absolute;
      left: 0;
      top: pxToRem(42);
      width: 100%;
      height: pxToRem(52);
      padding: pxToRem(10);
      box-sizing: border-box;
      transition: top .2s linear;
      &.hide-title {
        top: 0;
      }
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
