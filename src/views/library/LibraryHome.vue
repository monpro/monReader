<template>
  <div class="library-home">
    <search-bar></search-bar>
    <scroll :top="94" @onScroll="onScroll">
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
      <div>11111111</div>
    </scroll>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import { libraryMixin } from '../../utils/mixin'

  export default {
    mixins: [libraryMixin],
    components: {
      SearchBar,
      Scroll
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .library-home {
    width: 100%;
    height: 100%;
    background: white;
  }
</style>
