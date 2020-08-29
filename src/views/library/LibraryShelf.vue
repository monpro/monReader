<template>
  <div class="library-shelf">
    <shelf-title></shelf-title>
    <scroll
      class="library-scroll-wrapper"
      :top="0"
      @onScroll="onScroll">
      <ShelfSearch></ShelfSearch>
      <ShelfList></ShelfList>
    </scroll>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import ShelfSearch from '../../components/shelf/ShelfSearch'
  import { shelfMixin } from '../../utils/mixin'
  import Scroll from '../../components/common/Scroll'
  import { shelf } from '../../api/store'
  import ShelfList from '../../components/shelf/ShelfList'
  export default {
    components: { ShelfList, Scroll, ShelfTitle, ShelfSearch },
    mixins: [shelfMixin],
    methods: {
      getShelfList() {
        shelf().then(response => {
          if (response.status === 200 && response.data && response.data.bookList) {
            this.setShelfList(response.data.bookList)
          }
        })
      },
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
      }
    },
    mounted() {
      this.getShelfList()
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .library-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: white;
    .library-scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 110;
    }
  }
</style>
