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
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title"></div>
        <div class="slide-contents-book-author"></div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <div class="progress-text">{{$t('book.haveRead2')}}</div>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText(this.fileName)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin],
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
