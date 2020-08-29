<template>
  <div class="shelf-item-book">
    <img :src="data.cover" alt="no display" class="shelf-item-book-cover">
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item-book {
    width: 100%;
    height: 100%;
    &-cover {
      width: 100%;
      height: 100%;
    }
  }
</style>
