<template>
  <div class="shelf-search-wrapper">
    <div class="shelf-search" :class="{'search-top': inputClicked}">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input
            type="text"
            class="search-input"
            v-model="searchText"
            @click="onSearchClick"
            :placeholder="$t('shelf.search')">
        </div>
        <div class="icon-clear-wrapper" v-show="searchText.length > 0" @click="clearSearchText">
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <div class="icon-locale-wrapper" v-if="!inputClicked" @click="switchLocale">
        <span class="icon-cn icon" v-if="lang === 'cn'"></span>
        <span class="icon-en icon" v-else></span>
      </div>
      <div class="cancel-btn-wrapper" @click="onCancelClick">
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { shelfMixin } from '../../utils/mixin'
  import { setLocalStorage } from '../../utils/localStorage'

  export default {
    mixins: [shelfMixin],
    computed: {
      lang() {
        return this.$i18n.locale
      }
    },
    data() {
      return {
        inputClicked: false,
        searchText: ''
      }
    },
    methods: {
      onSearchClick() {
        this.inputClicked = true
        this.setShelfTitleVisible(false)
      },
      onCancelClick() {
        this.inputClicked = false
        this.setShelfTitleVisible(true)
      },
      switchLocale() {
        if (this.lang === 'en') {
          this.$i18n.locale = 'cn'
        } else {
          this.$i18n.locale = 'en'
        }
        setLocalStorage('locale', this.$i18n.locale)
      },
      clearSearchText() {
        this.searchText = ''
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-search-wrapper {
    position: relative;
    z-index: 120;
    width: 100%;
    height: pxToRem(94);
    font-size: pxToRem(16);
    background: white;
    .shelf-search {
      position: absolute;
      top: pxToRem(42);
      z-index: 120;
      left: 0;
      width: 100%;
      height: pxToRem(52);
      display: flex;
      transition: top .2s linear;
      &.search-top {
        top: 0;
      }
      .search-wrapper {
        flex: 1;
        display: flex;
        margin: pxToRem(8) 0 pxToRem(8) pxToRem(10);
        border: pxToRem(1) solid #ccc;
        border-radius: pxToRem(3);
        @include center;
        .icon-search-wrapper {
          flex: 0 0 pxToRem(22);
          @include right;
          .icon-search {
            font-size: pxToRem(14);
          }
        }
        .search-input-wrapper {
          flex: 1;
          padding: 0 pxToRem(10);
          box-sizing: border-box;
          .search-input {
            width: 100%;
            font-size: pxToRem(14);
            border: none;
            color: #333;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              font-size: pxToRem(14);
              color: #ccc;
            }
          }
        }
        .icon-clear-wrapper {
          flex: 0 0 pxToRem(24);
          .icon-close-circle-fill {
            font-size: pxToRem(14);
            color: #ccc;
          }
        }
      }
      .icon-locale-wrapper {
        flex: 0 0 pxToRem(55);
        @include center;
        .icon-cn .icon-en {
          font-size: pxToRem(22);
          color: #666;
        }
      }
      .cancel-btn-wrapper {
        flex: 0 0 pxToRem(55);
        @include center;
        .cancel-text {
          font-size: pxToRem(14);
          color: $color-blue;
        }
      }
    }
  }
</style>
