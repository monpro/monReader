<template>
  <div class="category">
    <title-view :label="$t('home.category')" :btn="$t('home.seeAll')" @onClick="showBookList"></title-view>
    <div class="category-list">
      <div class="category-item-wrapper" v-for="(item, index) in data" :key="index" @click="showBookCategory(item)">
        <div class="category-item">
          <div class="content-wrapper">
            <div class="title title-medium">{{getTextByCategory(item.category)}}</div>
            <div class="num sub-title-tiny">{{item.num + ' ' + $t('home.books')}}</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img" :src="item.img1">
              <img class="img2" :src="item.img2">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TitleView from './Title'
  import { getTextByCategory, getCategoryNameById } from '../../utils/utils'

  export default {
    components: {
      TitleView
    },
    props: {
      data: Array
    },
    methods: {
      showBookCategory(item) {
        this.$router.push({
          path: '/store/list',
          query: {
            category: getCategoryNameById(item.category),
            getTextByCategory: this.getTextByCategory(item.category)
          }
        })
      },
      getTextByCategory(category) {
        return getTextByCategory(category, this)
      },
      showBookList() {
        this.$router.push('/store/list')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .category {
    .category-list {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      .category-item-wrapper {
        flex: 0 0 50%;
        width: 50%;
        padding: 0 pxToRem(5) pxToRem(10) pxToRem(5);
        box-sizing: border-box;
        &:nth-child(odd) {
          padding-left: pxToRem(10);
        }
        &:nth-child(even) {
          padding-right: pxToRem(10);
        }
        .category-item {
          display: flex;
          width: 100%;
          background: #eee;
          .img-wrapper {
            flex: 0 0 50%;
            width: 50%;
            padding: pxToRem(20) pxToRem(10);
            box-sizing: border-box;
            .img-group {
              position: relative;
              width: 100%;
              height: pxToRem(60);
              @include left;
              .img {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 100;
                width: pxToRem(45);
                height: pxToRem(60);
              }
              .img2 {
                position: absolute;
                left: pxToRem(30);
                top: pxToRem(7.5);
                z-index: 99;
                width: pxToRem(30);
                height: pxToRem(45);
              }
            }
          }
          .content-wrapper {
            flex: 0 0 50%;
            width: 50%;
            @include columnCenter;
            .title {
              text-align: center;
            }
            .num {
              text-align: center;
              margin-top: pxToRem(5);
            }
          }
        }
      }
    }
  }
</style>
