<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import { mapGetters } from 'vuex'
  global.ePub = Epub
  export default {
    computed: {
      ...mapGetters(['fileName'])
    },
    methods: {
      initEpub() {
        const baseUrl = 'http://localhost:8081/epub/'
        const url = baseUrl + this.fileName + '.epub'
        console.log(url)
        this.book = new Epub(url)
        console.log(this.book)
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight
        })
        this.rendition.display()
      }
    },
    mounted() {
      const fileName = this.$route.params.fileName.split('|').join('/')
      this.$store.dispatch('setFileName', fileName).then(() => {
        this.initEpub()
      })
    }
  }
</script>

<style scoped>

</style>
