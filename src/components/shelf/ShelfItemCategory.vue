<template>
  <div class="shelf-item-category">
    <div class="shelf-item-category-list">
      <div class="shelf-item-category-item" v-for="(item, index) in data.itemList" :key="index">
        <img :src="item.cover" alt="category img" class="shelf-item-category-img">
      </div>
    </div>
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
  .shelf-item-category {
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-list {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      height: 100%;
      padding-top: pxToRem(5);
      box-sizing: border-box;
    }

    &-item {
      flex: 0 0 33.3%;
      width: 33.3%;
      height: 33.3%;
      box-sizing: border-box;
      &:nth-child(3n + 1) {
        padding: pxToRem(0) pxToRem(2.5) pxToRem(5) pxToRem(5);
      }
      &:nth-child(3n + 2) {
        padding: pxToRem(0) pxToRem(2.5) pxToRem(5) pxToRem(2.5);
      }
      &:nth-child(3n + 3) {
        padding: pxToRem(0) pxToRem(5) pxToRem(5) pxToRem(2.5);
      }
    }

    &-img {
      width: 100%;
      height: 100%;
    }
  }
</style>
