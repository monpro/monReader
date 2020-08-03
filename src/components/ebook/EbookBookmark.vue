<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">
        {{text}}
      </div>
    </div>
    <div class="ebook-bookmark-icon-wrapper">
      <Bookmark :color="color" :width="15" :height="30"></Bookmark>
    </div>
  </div>
</template>

<script>
  import Bookmark from '../common/Bookmark'
  import { ebookMixin } from '../../utils/mixin'
  import { getCurPx } from '../../utils/utils'
  const WHITE = '#fff'
  const BLUE = '#346cbc'
  export default {
    mixins: [ebookMixin],
    data() {
      return {
        text: this.$t('book.pulldownAddMark'),
        color: WHITE
      }
    },
    computed: {
      height() {
        return getCurPx(35)
      },
      threshold() {
        return getCurPx(55)
      }
    },
    watch: {
      offsetY(value) {
        if (value >= this.height && value < this.threshold) {
          this.$refs.bookmark.style.top = `${-value}px`
          this.text = this.$t('book.pulldownAddMark')
          this.color = WHITE
        } else if (value >= this.threshold) {
          this.$refs.bookmark.style.top = `${-value}px`
          this.text = this.$t('book.releaseAddMark')
          this.color = BLUE
        }
      }
    },
    components: {
      Bookmark
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .ebook-bookmark {
    position: absolute;
    top: pxToRem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: pxToRem(35);
    .ebook-bookmark-text-wrapper {
      display: flex;
      position: absolute;
      right: pxToRem(45);
      bottom: 0;
      .ebook-bookmark-down-wrapper {
        font-size: pxToRem(14);
        color: white;
        transition: all .2s linear;
        @include center;
      }
      .ebook-bookmark-text {
        font-size: pxToRem(14);
        color: white;
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: pxToRem(15);
    }
  }
</style>
