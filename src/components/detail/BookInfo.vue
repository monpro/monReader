<template>
  <div class="cover-title-wrapper">
    <div class="cover-title-left-wrapper">
      <img class="cover-img" :src="cover">
    </div>
    <div class="cover-title-right-wrapper">
      <div class="detail-cover-title-wrapper">
        <div class="cover-title-text">{{title}}</div>
      </div>
      <div class="cover-author-wrapper">
        <div class="cover-author-text">{{author}}</div>
      </div>
      <div class="detail-cover-description-wrapper">
        <div class="detail-cover-description-text">{{desc}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      cover: String,
      title: String,
      author: String,
      desc: String
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .cover-title-wrapper {
    display: flex;
    width: 100%;
    padding: pxToRem(10) 0;
    border-bottom: pxToRem(1) solid #eee;
    box-sizing: border-box;
    .cover-title-left-wrapper {
      flex: 0 0 pxToRem(103);
      padding: pxToRem(10) 0 pxToRem(10) pxToRem(15);
      box-sizing: border-box;
      @include top;
      .cover-img {
        width: pxToRem(103);
        height: pxToRem(146);
      }
    }
    .cover-title-right-wrapper {
      flex: 1;
      padding: pxToRem(10) pxToRem(15);
      box-sizing: border-box;
      .detail-cover-title-wrapper {
        .cover-title-text {
          font-size: pxToRem(24);
          line-height: pxToRem(26);
          font-weight: bold;
          color: #333;
        }
      }
      .cover-author-wrapper {
        margin-top: pxToRem(10);
        .cover-author-text {
          font-size: pxToRem(14);
          line-height: pxToRem(16);
          color: $color-blue;
        }
      }
      .detail-cover-description-wrapper {
        margin-top: pxToRem(10);
        .detail-cover-description-text {
          font-size: pxToRem(14);
          line-height: pxToRem(16);
          color: #666;
          word-break: keep-all;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow-wrap: break-word;
        }
      }
    }
  }
</style>
