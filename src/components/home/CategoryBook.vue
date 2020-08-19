<template>
  <div class="category-book">
    <title-view :label="getTextByCategory(data.category)" :btn="$t('home.seeAll')" @onClick="showBookCategory"></title-view>
    <div class="category-book-list">
      <div class="category-book-item" v-for="(item, index) in data.list" :key="index" @click="showBookDetail(item)">
        <div class="img-wrapper">
          <img class="img" :src="item.cover">
        </div>
        <div class="content-wrapper">
          <div class="title title-small" ref="title">{{item.title}}</div>
          <div class="num sub-title-tiny" ref="author">{{item.author}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TitleView from './Title'
  import { getTextByCategory, getCategoryName } from '../../utils/utils'
  import { libraryMixin } from '../../utils/mixin'

  export default {
    mixins: [libraryMixin],
    components: {
      TitleView
    },
    props: {
      data: Object
    },
    methods: {
      showBookCategory() {
        this.$router.push({
          path: '/store/list',
          query: {
            category: getCategoryName(this.data.category),
            getTextByCategory: this.getTextByCategory(this.data.category)
          }
        })
      },
      getTextByCategory(category) {
        return getTextByCategory(category, this)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .category-book {
    .category-book-list {
      width: 100%;
      @include top;
      padding: 0 pxToRem(5);
      box-sizing: border-box;
      .category-book-item {
        flex: 0 0 25%;
        width: 25%;
        padding: 0 pxToRem(5);
        box-sizing: border-box;
        .img-wrapper {
          @include center;
          .img {
            width: 100%;
          }
        }
        .content-wrapper {
          width: 100%;
          margin-top: pxToRem(10);
          .num {
            margin-top: pxToRem(5);
          }
        }
      }
    }
  }
</style>
