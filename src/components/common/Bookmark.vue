<template>
  <div class="icon" :style="style" ref="bookmark"></div>
</template>

<script>
  import { pxToRem } from '../../utils/utils'

  export default {
    props: {
      width: Number,
      height: Number,
      color: String
    },
    computed: {
      style() {
        if (this.color) {
          return {
            borderColor: `${this.color} ${this.color} transparent`
          }
        } else {
          return {}
        }
      }
    },
    methods: {
      refresh() {
        if (this.height && this.width && this.width > 0 && this.height > 10) {
          this.$refs.bookmark.style.borderWidth = `${pxToRem(this.height - 5)}rem ${pxToRem(this.width / 2)}rem ${pxToRem(5)}rem ${pxToRem(this.width / 2)}rem`
        }
      }
    },
    mounted() {
      this.refresh()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .icon {
    width: 0;
    height: 0;
    border-width: pxToRem(30) pxToRem(10) pxToRem(10) pxToRem(10);
    border-style: solid;
    border-color: white white transparent;
  }
</style>
