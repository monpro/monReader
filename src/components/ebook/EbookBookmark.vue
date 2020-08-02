<template>
  <div class="ebook-bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">
        {{text}}
      </div>
    </div>
    <div class="ebook-bookmark-icon-wrapper">
      <Bookmark :color="'#fff'" :width="15" :height="30"></Bookmark>
    </div>
  </div>
</template>

<script>
  import Bookmark from '../common/Bookmark'
  export default {
    data() {
      return {
        text: this.$t('book.pulldownAddMark')
      }
    },
    components: {
      Bookmark
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .ebook-bookmark {
    position: absolute;
    top: pxToRem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: pxToRem(35);
    .ebook-bookmark-text-wrapper {
      display: flex;
      position: absolute;
      right: pxToRem(45);
      bottom: 0;
      .ebook-bookmark-down-wrapper {
        font-size: pxToRem(14);
        color: white;
        transition: all .2s linear;
        @include center;
      }
      .ebook-bookmark-text {
        font-size: pxToRem(14);
        color: white;
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: pxToRem(15);
    }
  }
</style>
