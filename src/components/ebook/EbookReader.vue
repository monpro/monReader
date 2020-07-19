<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import { ebookMixin } from '../../utils/mixin'

  global.ePub = Epub
  export default {
    mixins: [ebookMixin],
    methods: {
      prevPage() {
        if (this.rendition) {
          this.rendition.prev()
          this.hideTitleAndMenu()
        }
      },

      nextPage() {
        if (this.rendition) {
          this.rendition.next()
          this.hideTitleAndMenu()
        }
      },

      showTitleAndMenu() {
        this.setMenuVisible(!this.menuVisible)
      },

      hideTitleAndMenu() {
        this.setMenuVisible(false)
      },

      initEpubBook() {
        const baseUrl = 'http://localhost:8081/epub/'
        const url = baseUrl + this.fileName + '.epub'
        this.book = new Epub(url)
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight
        })
        this.rendition.display()
        this.rendition.on('touchstart', event => {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
          const offsetX = event.changedTouches[0].clientX - this.touchStartX
          const time = event.timeStamp - this.touchStartTime
          if (time < 500 && offsetX > 40) {
            this.prevPage()
          } else if (time < 500 && offsetX < -40) {
            this.nextPage()
          } else {
            this.showTitleAndMenu()
          }
          console.log(offsetX, time)
        })
      }
    },

    mounted() {
      const fileName = this.$route.params.fileName.split('|').join('/')
      this.setFileName(fileName).then(() => {
        this.initEpubBook()
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
