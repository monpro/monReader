<template>
  <div class="shelf-item item-shadow">
    <component :is="item" :data="data"></component>
  </div>
</template>

<script>
  import ShelfItemBook from './ShelfItemBook'
  import ShelfItemCategory from './ShelfItemCategory'
  import ShelfItemAdd from './ShelfItemAdd'
  import { shelfMixin } from '../../utils/mixin'

  export default {
    mixins: [shelfMixin],
    props: {
      data: Object
    },
    computed: {
      item() {
        if (this.data.type === 1) {
          return this.book
        } else if (this.data.type === 2) {
          return this.category
        } else {
          return this.add
        }
      }
    },
    data() {
      return {
        book: ShelfItemBook,
        category: ShelfItemCategory,
        add: ShelfItemAdd
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item {
    width: 100%;
    height: 100%;
    &.item-shadow {
      box-shadow: pxToRem(2) pxToRem(2) pxToRem(6) pxToRem(2) rgba(200, 200, 200, .3);
    }
  }
</style>
