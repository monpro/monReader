<template>
  <div class="ebook" ref="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
  import EbookReader from '../../components/ebook/EbookReader'
  import EbookTitle from '../../components/ebook/EbookTitle'
  import EbookMenu from '../../components/ebook/EbookMenu'
  import { ebookMixin } from '../../utils/mixin'
  import { getReadTime, saveReadTime } from '../../utils/localStorage'
  export default {
    mixins: [ebookMixin],
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu
    },
    methods: {
      startRecordTime() {
        let readTime = getReadTime(this.fileName)
        if (!readTime) {
          readTime = 0
        }
        this.task = setInterval(() => {
          readTime += 1
          if (readTime % 30 === 0) {
            saveReadTime(this.fileName, readTime)
          }
        }, 1000)
      },
      move(value) {
        this.$refs.ebook.style.top = value + 'px'
      },
      restore() {
        this.$refs.ebook.style.top = 0
        this.$refs.ebook.style.transition = 'all .2s linear'
        setTimeout(() => {
          this.$refs.ebook.style.transition = ''
        }, 200)
      }
    },
    mounted() {
      this.startRecordTime()
    },
    beforeDestroy() {
      if (this.task) {
        clearInterval(this.task)
      }
    },
    watch: {
      offsetY(value) {
        if (value > 0) {
          this.move(value)
        } else if (value === 0) {
          this.restore()
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .ebook {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
