<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">{{$t('book.bookmark')}} · {{bookmark ? bookmark.length : 0}}</div>
    <scroll class="slide-bookmark-list" :top="48" :bottom="48">
      <div class="slide-bookmark-item" v-for="(item, index) in bookmark" :key="index" @click="display(item.cfi, hideTitleAndMenu)">
        <div class="slide-bookmark-item-icon">
          <div class="icon-bookmark"></div>
        </div>
        <div class="slide-bookmark-item-text">{{item.text}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '../common/Scroll'
  import { getBookmark } from '../../utils/localStorage'
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin],
    components: {
      Scroll
    },
    data() {
      return {
        bookmark: null
      }
    },
    mounted() {
      this.bookmark = getBookmark(this.fileName)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-slide-bookmark {
    width: 100%;
    .slide-bookmark-title {
      width: 100%;
      height: pxToRem(48);
      font-size: pxToRem(14);
      font-weight: bold;
      padding: 0 pxToRem(15);
      box-sizing: border-box;
      @include left;
    }
    .slide-bookmark-list {
      padding: 0 pxToRem(15);
      box-sizing: border-box;
      .slide-bookmark-item {
        display: flex;
        padding: pxToRem(15) 0;
        box-sizing: border-box;
        .slide-bookmark-item-icon {
          flex: 0 0 pxToRem(29);
          @include left;
          .icon-bookmark {
            width: pxToRem(20);
            height: pxToRem(20);
            font-size: pxToRem(12);
            border-radius: 50%;
            background: #bbb;
            @include center;
          }
        }
        .slide-bookmark-item-text {
          font-size: pxToRem(14);
          line-height: pxToRem(15);
          max-height: pxToRem(45);
          @include ellipsisWithHeight(3);
        }
      }
    }
  }
</style>
