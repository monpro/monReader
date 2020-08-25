<template>
  <div>
    <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': !shadowVisible}">
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">

          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title': !titleVisible}" @click="back">
        <span class="icon-back icon"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input type="text"
                 class="input"
                 :placeholder="$t('home.hint')"
                 v-model="searchText"
                 @click="showHotSearch"
                 @keyup.13.exact="search">
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>

<script>
  import { libraryMixin } from '../../utils/mixin'
  import HotSearchList from './HotSearchList'

  export default {
    mixins: [libraryMixin],
    components: {
      HotSearchList
    },
    data() {
      return {
        searchText: '',
        titleVisible: true,
        shadowVisible: false,
        hotSearchVisible: false
      }
    },
    watch: {
      offsetY(offsetY) {
        if (offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      },
      hotSearchOffsetY(hotSearchOffsetY) {
        if (hotSearchOffsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
      }
    },
    methods: {
      showFlapCard() {
        this.setFlapCardVisible(true)
      },
      back() {
        if (this.offsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
        if (this.hotSearchVisible) {
          this.hideHotSearch()
        } else {
          this.$router.push('/library/shelf')
        }
      },
      hideHotSearch() {
        this.hotSearchVisible = false
        if (this.offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      },
      showHotSearch() {
        this.hotSearchVisible = true
        this.hideTitle()
        this.hideShadow()
        this.$nextTick(() => {
          this.$refs.hotSearch.reset()
        })
      },
      hideTitle() {
        this.titleVisible = false
      },
      showTitle() {
        this.titleVisible = true
      },
      hideShadow() {
        this.shadowVisible = false
      },
      showShadow() {
        this.shadowVisible = true
      },
      search() {
        this.$router.push({
          path: '/library/list',
          query: {
            keyword: this.searchText
          }
        })
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
    box-shadow: 0 pxToRem(2) pxToRem(2) 0 rgba(0, 0, 0, 0.1);
    &.hide-title {
      height: pxToRem(52);
    }
    &.hide-shadow {
      box-shadow: none;
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
      z-index: 200;
      transition: all $animationTime $animationType;
      &.hide-title {
        height: pxToRem(52);
      }
    }
    .search-bar-input-wrapper {
      position: absolute;
      left: 0;
      top: pxToRem(42);
      display: flex;
      width: 100%;
      height: pxToRem(52);
      padding: pxToRem(10);
      box-sizing: border-box;
      transition: top $animationTime $animationType;
      &.hide-title {
        top: 0;
      }
      .search-bar-blank {
        flex: 0 0 0;
        width: 0;
        transition: all $animationTime $animationType;
        &.hide-title {
          flex: 0 0 pxToRem(31);
          width: pxToRem(31);
        }
      }
      .search-bar-input {
        flex: 1;
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
