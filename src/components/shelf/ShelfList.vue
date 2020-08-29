<template>
  <div class="shelf-list">
    <div class="shelf-list-item-wrapper" v-for="item in shelfList" :key="item.id">
      <shelf-item :data="item" :style="{height: itemHeight}"></shelf-item>
    </div>
  </div>
</template>

<script>
  import { shelfMixin } from '../../utils/mixin'
  import ShelfItem from './ShelfItem'
  import { getCurPx } from '../../utils/utils'

  export default {
    components: { ShelfItem },
    mixins: [shelfMixin],
    computed: {
      itemHeight() {
        return ((window.innerWidth - getCurPx(120)) / 3) / 250 * 350 + 'px'
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-list {
    position: absolute;
    top: pxToRem(94);
    left: 0;
    z-index: 100;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: 0 pxToRem(15);
    box-sizing: border-box;
    &-item-wrapper {
      flex: 0 0 33.3%;
      width: 33.3%;
      padding: pxToRem(15);
      box-sizing: border-box;
    }
  }
</style>
