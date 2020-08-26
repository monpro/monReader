<template>
  <transition name="fade">
    <div class="shelf-title" v-show="shelfTitleVisible">
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{$t('shelf.title')}}</span>
        <span class="shelf-title-sub-text" v-if="isEditMode">{{selectedText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-btn-left">
        <div class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</div>
      </div>
      <div class="shelf-title-btn-wrapper shelf-btn-right">
        <div class="shelf-title-btn-text" @click="onEditClick">
          {{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { shelfMixin } from '../../utils/mixin'

  export default {
    mixins: [shelfMixin],
    computed: {
      selectedText() {
        const selectedNumber = this.shelfSelected.length
        if (selectedNumber === 0) {
          return this.$t('shelf.selectBook')
        } else if (selectedNumber === 1) {
          return this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber)
        } else {
          return this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber)
        }
      }
    },
    methods: {
      onEditClick() {
        this.setIsEditMode(!this.isEditMode)
      },
      clearCache() {
        console.log('clear cache')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-title {
    position: relative;
    z-index: 200;
    width: 100%;
    height: pxToRem(42);
    background: white;
    .shelf-title-text-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      @include columnCenter;
      .shelf-title-text {
        font-size: pxToRem(16);
        line-height: pxToRem(20);
        font-weight: bold;
        color: #333;
      }
      .shelf-title-sub-text {
        font-size: pxToRem(10);
        color: #333;
      }
    }
    .shelf-title-btn-wrapper {
      position: absolute;
      top: 0;
      box-sizing: border-box;
      height: 100%;
      @include center;
      .shelf-title-btn-text {
        font-size: pxToRem(14);
        color: #666;
      }
      &.shelf-btn-left {
        left: 0;
        padding-left: pxToRem(15);
      }
      &.shelf-btn-right {
        right: 0;
        padding-right: pxToRem(15);
      }
    }
  }
</style>
