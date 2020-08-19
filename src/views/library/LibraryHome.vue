<template>
  <div class="library-home">
    <search-bar></search-bar>
    <flap-card :bookData="randomBook"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage: `url('${banner}')`}"></div>
      </div>
      <guess-book :data="guessBook"></guess-book>
      <recommend :data="recommend" class="recommend"></recommend>
      <featured :data="featured" :title-text="$t('home.featured')" :btn-text="$t('home.seeAll')"
                class="featured"></featured>
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category class="category" :data="categories"></category>
    </scroll>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import FlapCard from '../../components/home/FlapCard'
  import { libraryMixin } from '../../utils/mixin'
  import { home } from '../../api/store'
  import GuessBook from '../../components/home/GuessBook'
  import Recommend from '../../components/home/Recommend'
  import Featured from '../../components/home/Featured'
  import CategoryBook from '../../components/home/CategoryBook'
  import Category from '../../components/home/Category'

  export default {
    mixins: [libraryMixin],
    components: {
      Category,
      CategoryBook,
      Featured,
      Recommend,
      GuessBook,
      SearchBar,
      Scroll,
      FlapCard
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
        if (offsetY > 0) {
          this.scrollTop = 52
        } else {
          this.scrollTop = 94
        }
        this.$refs.scroll.refresh()
      }
    },
    data() {
      return {
        scrollTop: 94,
        randomBook: null,
        banner: null,
        guessBook: null,
        recommend: null,
        featured: null,
        categoryList: null,
        categories: null
      }
    },
    mounted() {
      home().then(response => {
        if (response && response.status === 200) {
          const data = response.data
          const index = Math.floor(Math.random() * data.random.length)
          const randomData = data.random[index]
          this.randomBook = randomData
          this.banner = data.banner
          this.guessBook = data.guessYouLike
          this.recommend = data.recommend
          this.featured = data.featured
          this.categoryList = data.categoryList
          this.categories = data.categories
        }
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .library-home {
    width: 100%;
    height: 100%;
    background: white;
    .banner-wrapper {
      width: 100%;
      padding: pxToRem(10);
      box-sizing: border-box;
      .banner-img {
        width: 100%;
        height: pxToRem(150);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .recommend, .category-list-wrapper, .category {
      margin-top: pxToRem(25);
    }
  }
</style>
