<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
          <div class="ebook-loading-line"></div>
          <div class="ebook-loading-mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          [{}, {}, {}],
          [{}, {}, {}]
        ]
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .ebook-loading {
    position: relative;
    z-index: 400;
    width: pxToRem(60);
    height: pxToRem(40);
    background: transparent;
    border: pxToRem(1.5) solid #d7d7d7;
    border-radius: pxToRem(3);

    .ebook-loading-wrapper {
      display: flex;
      height: 100%;
      width: 100%;
      .ebook-loading-item {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: pxToRem(7) 0;
        .ebook-loading-line-wrapper {
          flex: 1;
          padding: 0 pxToRem(7);
          box-sizing: border-box;
          @include left;
          .ebook-loading-line {
            flex: 0 0 pxToRem(16);
            width: pxToRem(16);
            height: pxToRem(2);
            background: #d7d7d7;
          }
          .ebook-loading-mask {
            flex: 0 0 0;
            width: 0;
            height: 0;
          }
        }
      }
      .ebook-loading-center {
        position: absolute;
        left: 50%;
        top: 0;
        width: pxToRem(1.5);
        height: 100%;
        background: #d7d7d7;
      }
    }
  }
</style>
