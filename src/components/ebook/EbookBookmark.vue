<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="bookmarkIconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">
        {{text}}
      </div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle: {}">
      <Bookmark :color="color" :width="15" :height="30"></Bookmark>
    </div>
  </div>
</template>

<script>
  import Bookmark from '../common/Bookmark'
  import { ebookMixin } from '../../utils/mixin'
  import { getCurPx } from '../../utils/utils'
  import { getBookmark, saveBookmark } from '../../utils/localStorage'
  const WHITE = '#fff'
  const BLUE = '#346cbc'
  export default {
    mixins: [ebookMixin],
    data() {
      return {
        text: this.$t('book.pulldownAddMark'),
        color: WHITE,
        isFixed: false
      }
    },
    computed: {
      height() {
        return getCurPx(35)
      },
      threshold() {
        return getCurPx(55)
      },
      fixedStyle() {
        return {
          position: 'fixed',
          top: 0,
          right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`
        }
      }
    },
    watch: {
      offsetY(value) {
        if (!this.bookAvailable || this.menuVisible || this.settingVisible > 0) {
          return
        }
        if (value >= this.height && value < this.threshold) {
          this.beforeThreshold(value)
        } else if (value >= this.threshold) {
          this.afterThreshold(value)
        } else if (value > 0 && value < this.height) {
          this.beforeHeight()
        } else if (value === 0) {
          this.restore()
        }
      },
      isBookmark(bookmark) {
        this.isFixed = bookmark
        if (bookmark) {
          this.color = BLUE
        } else {
          this.color = WHITE
        }
      }
    },
    methods: {
      addBookMark() {
        this.bookmark = getBookmark(this.fileName)
        if (!this.bookmark) {
          this.bookmark = []
        }
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfiFile = currentLocation.start.cfi.replace(/!.*/, '')
        const cfiStart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)$/, '')
        const cfiEnd = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)$/, '')
        const cfiRange = `${cfiFile}!,${cfiStart},${cfiEnd})`
        this.currentBook.getRange(cfiRange).then(range => {
          const text = range.toString().replace(/\s\s/g, '')
          this.bookmark.push({
            cfi: currentLocation.start.cfi,
            text: text
          })
          saveBookmark(this.fileName, this.bookmark)
        })
      },
      removeBookMark() {
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfi = currentLocation.start.cfi
        this.bookmark = getBookmark(this.fileName)
        if (this.bookmark) {
          saveBookmark(this.fileName, this.bookmark.filter(item => item.cfi !== cfi))
        }
        this.setIsBookmark(false)
      },
      restore() {
        setTimeout(() => {
          this.$refs.bookmark.style.top = `${-this.height}px`
          this.$refs.bookmarkIconDown.style.transform = 'rotate(0deg)'
          if (this.isFixed) {
            this.setIsBookmark(true)
            this.addBookMark()
          } else {
            this.setIsBookmark(false)
            this.removeBookMark()
          }
        }, 200)
      },
      beforeHeight() {
        if (this.isBookmark) {
          this.text = this.$t('book.pulldownDeleteMark')
          this.color = BLUE
          this.isFixed = true
        } else {
          this.text = this.$t('book.pulldownAddMark')
          this.color = WHITE
          this.isFixed = false
        }
      },
      beforeThreshold(value) {
        this.$refs.bookmark.style.top = `${-value}px`
        this.beforeHeight()
        const bookmarkIconDown = this.$refs.bookmarkIconDown
        if (bookmarkIconDown.style.transform === 'rotate(180deg)') {
          bookmarkIconDown.style.transform = 'rotate(0deg)'
        }
      },
      afterThreshold(value) {
        this.$refs.bookmark.style.top = `${-value}px`
        if (this.isBookmark) {
          this.text = this.$t('book.releaseDeleteMark')
          this.color = WHITE
          this.isFixed = false
        } else {
          this.text = this.$t('book.releaseAddMark')
          this.color = BLUE
          this.isFixed = true
        }
        const bookmarkIconDown = this.$refs.bookmarkIconDown
        const transform = bookmarkIconDown.style.transform
        if (transform === '' || transform === 'rotate(0deg)') {
          bookmarkIconDown.style.transform = 'rotate(180deg)'
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
