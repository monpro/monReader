<template>
  <div class="library-shelf">
    <shelf-title></shelf-title>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  export default {
    components: { ShelfTitle }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .library-shelf {
    width: 100%;
    height: 100%;
    background-color: white;
  }
</style>
