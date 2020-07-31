<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input type="text"
               class="slide-contents-search-input"
               :placeholder="$t('book.searchHint')"
               v-model="searchText"
               @click="showSearchPage">
      </div>
      <div class="slide-contents-search-cancel" v-if="searchVisible"
           @click="hideSearchPage">{{$t('book.cancel')}}
      </div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata ? metadata.title: ''}}</div>
        <div class="slide-contents-book-author">{{metadata ? metadata.creator: ''}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText(this.fileName)}}</div>
      </div>
    </div>
    <Scroll class="slide-contents-list"
            :top="156"
            :bottom="48"
            v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
        <span class="slide-contents-item-label"
              :class="{'selected': section === index}"
              :style="getItemStyle(item)"
              @click="displayAndHideTitle(item.href)">{{item.label}}</span>
        <span class="slide-contents-item-page"></span>
      </div>
    </Scroll>
    <Scroll class="slide-search-list"
            :top="66"
            :bottom="48"
            v-show="searchVisible">
      <div class="slide-search-item" v-for="(item, index) in searchList" :key="index">
        {{item.excerpt}}
      </div>
    </Scroll>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import Scroll from '../common/Scroll'
  import { pxToRem } from '../../utils/utils'

  export default {
    mixins: [ebookMixin],
    components: {
      Scroll
    },
    data() {
      return {
        searchVisible: false,
        searchList: null,
        searchText: ''
      }
    },
    methods: {
      displayAndHideTitle(target) {
        this.display(target, () => {
          this.hideTitleAndMenu()
        })
      },
      showSearchPage() {
        this.searchVisible = true
      },
      hideSearchPage() {
        this.searchVisible = false
        this.searchText = ''
        this.searchList = null
      },
      getItemStyle(item) {
        return {
          marginLeft: `${pxToRem(item.level * 15)}rem`
        }
      },
      doSearch(q) {
        return Promise.all(
          this.currentBook.spine.spineItems.map(item => item.load(this.currentBook.load.bind(this.currentBook)).then(item.find.bind(item, q)).finally(item.unload.bind(item)))
        ).then(results => Promise.resolve([].concat.apply([], results)))
      }
    },
    mounted() {
      this.doSearch('add').then(list => {
        this.searchList = list
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-slide-contents {
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: pxToRem(36);
      margin: pxToRem(22) 0 pxToRem(12)  0;
      padding: 0 pxToRem(15);
      box-sizing: border-box;

      .slide-contents-search-input-wrapper {
        flex: 1;
        @include center;

        .slide-contents-search-icon {
          flex: 0 0 pxToRem(28);
          font-size: pxToRem(12);
          @include center;

          .icon-search {

          }
        }

        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: pxToRem(30);
          font-size: pxToRem(14);
          background: transparent;
          border: none;

          &:focus {
            outline: none;
          }
        }
      }

      .slide-contents-search-cancel {
        flex: 0 0 pxToRem(50);
        font-size: pxToRem(14);
        @include right;
      }
    }
    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: pxToRem(90);
      padding: pxToRem(10) pxToRem(15) pxToRem(20) pxToRem(15);
      box-sizing: border-box;
      .slide-contents-book-img-wrapper {
        flex: 0 0 pxToRem(45);
        .slide-contents-book-img {
          width: pxToRem(45);
          height: pxToRem(60);
        }
      }
      .slide-contents-book-info-wrapper {
        flex: 1;
        padding: 0 pxToRem(10);
        box-sizing: border-box;
        .slide-contents-book-title {
          width: pxToRem(153.75);
          font-size: pxToRem(14);
          line-height: pxToRem(16);
          @include ellipsisWithHeight(2);
        }
        .slide-contents-book-author {
          width: pxToRem(153.75);
          font-size: pxToRem(12);
          margin-top: pxToRem(5);
          @include ellipsis;
        }
      }
      .slide-contents-book-progress-wrapper {
        flex: 0 0 pxToRem(70);
        .slide-contents-book-progress {
          .progress {
            font-size: pxToRem(14);
          }
          .progress-text {
            font-size: pxToRem(12);
          }
        }
        .slide-contents-book-time {
          font-size: pxToRem(12);
        }
      }
    }
    .slide-contents-list {
      padding: 0 pxToRem(15);
      box-sizing: border-box;
      .slide-contents-item {
        display: flex;
        padding: pxToRem(20) 0;
        box-sizing: border-box;
        .slide-contents-item-label {
          flex: 1;
          font-size: pxToRem(15);
          line-height: pxToRem(17);
          @include ellipsis;
        }
        .slide-contents-item-page {
        }
      }
    }
    .slide-search-list {
      padding: 0 pxToRem(15);
      box-sizing: border-box;
      width: 100%;
      .slide-search-item {
        font-size: pxToRem(15);
        line-height: pxToRem(16);
        padding: pxToRem(20) 0;
        box-sizing: border-box;
      }
    }
  }
</style>
