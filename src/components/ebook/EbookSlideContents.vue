<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input type="text"
               class="slide-contents-search-input"
               :placeholder="$t('book.searchHint')"
                @click="showSearchPage">
      </div>
      <div class="slide-contents-search-cancel" v-if="searchVisible"
      @click="hideSearchPage">{{$t('book.cancel')}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchVisible: false
      }
    },
    methods: {
      showSearchPage() {
        this.searchVisible = true
      },
      hideSearchPage() {
        this.searchVisible = false
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-slide-contents {
    width: 100%;

    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: pxToRem(36);
      margin: pxToRem(22) 0 pxToRem(12)  0;
      padding: 0 pxToRem(15);
      box-sizing: border-box;

      .slide-contents-search-input-wrapper {
        flex: 1;
        @include center;

        .slide-contents-search-icon {
          flex: 0 0 pxToRem(28);
          font-size: pxToRem(12);
          @include center;

          .icon-search {

          }
        }

        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: pxToRem(30);
          font-size: pxToRem(14);
          background: transparent;
          border: none;

          &:focus {
            outline: none;
          }
        }
      }

      .slide-contents-search-cancel {
        flex: 0 0 pxToRem(50);
        font-size: pxToRem(14);
        @include right;
      }
    }
  }
</style>
