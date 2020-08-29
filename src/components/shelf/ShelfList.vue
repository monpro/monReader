<template>
  <div class="shelf-list">
    <div v-for="item in shelfList" :key="item.id">
      <shelf-item :data="item"></shelf-item>
    </div>
  </div>
</template>

<script>
  import { shelfMixin } from '../../utils/mixin'
  import ShelfItem from './ShelfItem'

  export default {
    components: { ShelfItem },
    mixins: [shelfMixin]
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-list {
    position: absolute;
    top: pxToRem(94);
    left: 0;
    z-index: 100;
  }
</style>
