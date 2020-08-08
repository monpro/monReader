<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div class="ebook-reader-mask"
         @click="onMaskClick"
         @touchmove="move"
         @touchend="moveEnd"
         @mousedown.left="onMouseEnter"
         @mousemove.left="onMouseMove"
         @mouseup.left="onMouseEnd"
    ></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import { ebookMixin } from '../../utils/mixin'
  import {
    getFontFamily,
    getFontSize, getLocation,
    getTheme,
    saveFontFamily,
    saveFontSize,
    saveTheme
  } from '../../utils/localStorage'
  import { find, flatten } from '../../utils/book'

  global.ePub = Epub
  export default {
    mixins: [ebookMixin],
    methods: {
      // 1 - first time mouse enter
      // 2 - mouse enter then move
      // 3 - mouse leave from move
      // 4 - restore mouse
      onMouseEnter(e) {
        this.mouseMove = 1
        this.mouseStartTime = e.timeStamp
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseMove(e) {
        if (this.mouseMove === 1) {
          this.mouseMove = 2
        } else if (this.mouseMove === 2) {
          let offsetY = 0
          if (this.firstOffsetY) {
            offsetY = e.clientY - this.firstOffsetY
            this.setOffsetY(offsetY)
          } else {
            this.firstOffsetY = e.clientY
          }
        }
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseEnd(e) {
        if (this.mouseMove === 2) {
          this.setOffsetY(0)
          this.firstOffsetY = 0
          this.mouseMove = 3
        }
        this.mouseEndTime = e.timeStamp
        const time = this.mouseEndTime - this.mouseStartTime
        if (time < 200) {
          this.mouseMove = 4
        }
        e.preventDefault()
        e.stopPropagation()
      },
      move(e) {
        if (this.firstOffsetY) {
          const offsetY = e.changedTouches[0].clientY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.changedTouches[0].clientY
        }
        e.preventDefault()
        e.stopPropagation()
      },
      moveEnd(e) {
        this.setOffsetY(0)
        this.firstOffsetY = null
      },
      onMaskClick(e) {
        if (this.mouseMove === 2 || this.mouseMove === 3) {
          return
        }
        const offsetX = e.offsetX
        const width = window.innerWidth
        if (offsetX > 0 && offsetX < width * 0.3) {
          this.prevPage()
        } else if (offsetX > 0 && offsetX > width * 0.7) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        this.mouseMove = 4
      },
      prevPage() {
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.updateLocation()
          })
          this.hideTitleAndMenu()
        }
      },

      nextPage() {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.updateLocation()
          })
          this.hideTitleAndMenu()
        }
      },

      toggleTitleAndMenu() {
        if (this.menuVisible) {
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        }
        this.setMenuVisible(!this.menuVisible)
      },
      initFontSize() {
        const fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize)
        } else {
          this.rendition.themes.fontSize(fontSize + 'px')
          this.setDefaultFontSize(fontSize)
        }
      },
      async initTheme() {
        let defaultTheme = getTheme(this.fileName)
        if (!defaultTheme) {
          defaultTheme = this.themeList[0].name
          saveTheme(this.fileName, defaultTheme)
        }
        this.setDefaultTheme(defaultTheme)
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        this.rendition.themes.select(defaultTheme)
      },
      initFontFamily() {
        const font = getFontFamily(this.fileName)
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
          this.rendition.themes.font(font)
          this.setDefaultFontFamily(font)
        }
      },
      initRendition() {
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight
        })

        const location = getLocation(this.fileName)
        this.display(location, () => {
          this.initTheme()
          this.initFontSize()
          this.initFontFamily()
          this.initGlobalStyle()
          this.updateLocation()
        })
        this.rendition.hooks.content.register(contents => {
          contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/daysOne.css`)
          contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/cabin.css`)
          contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/montserrat.css`)
          contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/tangerine.css`)
        })
      },
      initGestrue() {
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
            this.toggleTitleAndMenu()
          }
          event.preventDefault()
          event.stopPropagation()
        })
      },
      parseBook() {
        this.book.loaded.cover.then(cover => {
          this.book.archive.createUrl(cover).then(url => {
            this.setCover(url)
          })
        })
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
        })
        this.book.loaded.navigation.then(nav => {
          const navs = flatten(nav.toc)
          navs.forEach(item => {
            item.level = find(item, navs)
          })
          this.setNavigation(navs)
        })
      },
      initEpubBook() {
        const baseUrl = `${process.env.VUE_APP_RESOURCE_URL}/epub/`
        const url = baseUrl + this.fileName + '.epub'
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRendition()
        this.initGestrue()
        this.parseBook()
        this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 350) *
            (getFontSize(this.fileName) / 16)).then(locations => {
            this.navigation.forEach(nav => {
              nav.pagelist = []
            })
            locations.forEach(location => {
              const loc = location.match(/\[(.*)\]!/)[1]
              this.navigation.forEach(nav => {
                if (nav.href) {
                  const href = nav.href.match(/^(.*)\.html$/)[1]
                  if (href === loc) {
                    nav.pagelist.push(location)
                  }
                }
              })
            })
            let currentPage = 1
            this.navigation.forEach((nav, index) => {
              if (index === 0) {
                nav.page = 1
              } else {
                nav.page = currentPage
              }
              currentPage += nav.pagelist.length + 1
            })
            this.setPagelist(locations)
            this.setBookAvailable(true)
            this.updateLocation()
          })
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
    &-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 10;
    }
  }
</style>
