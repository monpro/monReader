<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg" :class="{'animation': startFlapCardAnimation}" v-show="startFlapCardAnimation">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex: item.zIndex}" v-show="startFlapCardAnimation">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')" ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')" ref="right"></div>
        </div>
      </div>
      <div class="point-wrapper">
        <div class="point" :class = "{'animation': startPointAnimation}" v-for="item in pointList" :key="item"></div>
      </div>
    </div>
    <div class="book-card" :class="{'animation': startBookCardAnimation}" v-show="startBookCardAnimation">
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img class="img" :src="bookData ? bookData.cover : ''">
        </div>
        <div class="content-wrapper">
          <div class="content-title">{{bookData ? bookData.title : ''}}</div>
          <div class="content-author sub-title-medium">{{bookData ? bookData.author : ''}}</div>
          <div class="content-category">{{getCategoryText()}}</div>
        </div>
        <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
  import { libraryMixin } from '../../utils/mixin'
  import { getTextByCategory } from '../../utils/utils'

  export default {
    mixins: [libraryMixin],
    props: {
      bookData: Object
    },
    data() {
      return {
        flapCardList: [
          {
            r: 255,
            g: 102,
            _g: 102,
            b: 159,
            imgLeft: 'url(' + require('@/assets/images/gift-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/gift-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 100,
            rotateDegree: 0
          },
          {
            r: 74,
            g: 171,
            _g: 171,
            b: 255,
            imgLeft: 'url(' + require('@/assets/images/compass-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/compass-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 99,
            rotateDegree: 0
          },
          {
            r: 255,
            g: 198,
            _g: 198,
            b: 102,
            imgLeft: 'url(' + require('@/assets/images/star-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/star-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 98,
            rotateDegree: 0
          },
          {
            r: 255,
            g: 102,
            _g: 102,
            b: 159,
            imgLeft: 'url(' + require('@/assets/images/heart-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/heart-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 97,
            rotateDegree: 0
          },
          {
            r: 59,
            g: 201,
            _g: 201,
            b: 22,
            imgLeft: 'url(' + require('@/assets/images/crown-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/crown-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 96,
            rotateDegree: 0
          }
        ],
        front: 0,
        back: 1,
        interval: 25,
        startFlapCardAnimation: false,
        startPointAnimation: false,
        pointList: null,
        showFlapCard: true,
        startBookCardAnimation: false
      }
    },
    watch: {
      flapCardVisible(value) {
        if (value) {
          this.runAnimation()
        }
      }
    },
    methods: {
      close() {
        this.stopAnimation()
        this.restoreFlapCard()
        this.setFlapCardVisible(false)
      },
      semiCircleStyle(item, direction) {
        return {
          backgroundColor: `rgba(${item.r}, ${item.g}, ${item.b})`,
          backgroundSize: item.backgroundSize,
          backgroundImage: direction === 'left' ? item.imgLeft : item.imgRight
        }
      },
      rotate(index, type) {
        const item = this.flapCardList[index]
        let dom
        if (type === 'front') {
          dom = this.$refs.right[index]
        } else {
          dom = this.$refs.left[index]
        }
        dom.style.transform = `rotateY(${item.rotateDegree}deg)`
        dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
      },
      rotateFlapCard() {
        const frontCard = this.flapCardList[this.front]
        const backCard = this.flapCardList[this.back]
        frontCard.rotateDegree += 10
        frontCard._g -= 5
        backCard.rotateDegree -= 10
        if (backCard.rotateDegree < 90) {
          backCard._g += 5
        }
        if (frontCard.rotateDegree === 90 && backCard.rotateDegree === 90) {
          backCard.zIndex += 2
        }
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        if (frontCard.rotateDegree === 180 && backCard.rotateDegree === 0) {
          this.nextCard()
        }
      },
      restoreBackCard() {
        const backCard = this.flapCardList[this.back]
        backCard.rotateDegree = 180
        backCard._g = backCard.g - 5 * 9
        this.rotate(this.back, 'back')
      },
      nextCard() {
        const frontCard = this.flapCardList[this.front]
        const backCard = this.flapCardList[this.back]
        frontCard.rotateDegree = 0
        frontCard._g = frontCard.g
        backCard.rotateDegree = 0
        backCard._g = backCard.g
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        this.front += 1
        this.back += 1
        const length = this.flapCardList.length
        if (this.front >= length) {
          this.front = 0
        }
        if (this.back >= length) {
          this.back = 0
        }
        // zIndex
        // 100 -  96
        // 99 - 100
        // 98 - 99
        // front = 1
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - ((index - this.front + length) % length)
        })
        this.restoreBackCard()
      },
      stopAnimation() {
        if (this.intervalTask) {
          clearInterval(this.intervalTask)
        }
        if (this.timeoutCard) {
          clearTimeout(this.timeoutCard)
        }
        if (this.timeoutBook) {
          clearTimeout(this.timeoutBook)
        }
        this.restoreFlapCard()
      },
      runFlapCardAnimation() {
        this.restoreBackCard()
        this.intervalTask = setInterval(() => {
          this.rotateFlapCard()
        }, this.interval)
      },
      restoreFlapCard() {
        if (this.intervalTask) {
          clearInterval(this.intervalTask)
        }
        this.front = 0
        this.back = 1
        this.flapCardList.forEach((item, index) => {
         item.zIndex = 100 - index
         item._g = item.g
         item.rotateDegree = 0
         this.rotate(index, 'front')
         this.rotate(index, 'back')
        })

        this.startFlapCardAnimation = false
        this.startPointAnimation = false
        this.startBookCardAnimation = false
      },
      runPointAnimation() {
        this.startPointAnimation = true
        setTimeout(() => {
          this.startPointAnimation = false
        }, 750)
      },
      runAnimation() {
        this.startFlapCardAnimation = true
        this.timeoutCard = setTimeout(() => {
          this.runFlapCardAnimation()
          this.runPointAnimation()
        }, 300)
        this.timeoutBook = setTimeout(() => {
          this.stopAnimation()
          this.startBookCardAnimation = true
        }, 2500)
      },
      getCategoryText() {
        if (this.data) {
          return getTextByCategory(this.data.category, this)
        } else {
          return ''
        }
      }
    },
    created() {
      this.pointList = []
      for (let i = 0; i < 18; i++) {
        this.pointList.push(`point_${i}`)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/flapCard";
  .flap-card-wrapper {
    @include absCenter;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0, 0, 0, .6);
    @include center;
    .flap-card-bg {
      position: relative;
      width: pxToRem(64);
      height: pxToRem(64);
      border-radius: pxToRem(5);
      background: white;
      &.animation {
        animation: flap-card-jump .3s ease-in;
      }
      @keyframes flap-card-jump {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.2);
          opacity: 1;
        }
        75% {
          transform: scale(.8);
          opacity: 1;
        }
        0% {
          transform: scale(1);
          opacity: 1;
        }
      }
      .flap-card {
        width: pxToRem(48);
        height: pxToRem(48);
        @include absCenter;
        margin: auto;
        &-circle {
          display: flex;
          width: 100%;
          height: 100%;
          .flap-card-semi-circle {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            backface-visibility: hidden;
            &-left {
              border-radius: pxToRem(24) 0 0 pxToRem(24);
              background-position: center right;
              transform-origin: right;
            }
            &-right {
              border-radius: 0 pxToRem(24) pxToRem(24) 0;
              background-position: center left;
              transform-origin: left;
            }
          }
        }
      }
      .point-wrapper {
        z-index: 2000;
        @include absCenter;
        .point {
          border-radius: 50%;
          @include absCenter;
          &.animation {
            @for $i from 1 to length($moves) {
              &:nth-child(#{$i}) {
                @include move($i)
              }
            }
          }
        }
      }
    }
    .book-card {
      position: relative;
      width: 65%;
      max-width: pxToRem(400);
      box-sizing: border-box;
      border-radius: pxToRem(15);
      background: white;
      &.animation {
        animation: scale .3s ease-in both;
        @keyframes scale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      }
      .book-card-wrapper {
        width: 100%;
        height: 100%;
        margin-bottom: pxToRem(30);
        @include columnTop;
        .img-wrapper {
          width: 100%;
          margin-top: pxToRem(20);
          @include center;
          .img {
            width: pxToRem(90);
            height: pxToRem(130);
          }
        }
        .content-wrapper {
          padding: 0 pxToRem(20);
          margin-top: pxToRem(20);
          .content-title {
            color: #333;
            font-weight: bold;
            font-size: pxToRem(18);
            line-height: pxToRem(20);
            max-height: pxToRem(40);
            text-align: center;
            @include ellipsisWithHeight(2)
          }
          .content-author {
            margin-top: pxToRem(10);
            text-align: center;
          }
          .content-category {
            color: #999;
            font-size: pxToRem(14);
            margin-top: pxToRem(10);
            text-align: center;
          }
        }
        .read-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1100;
          width: 100%;
          border-radius: 0 0 pxToRem(15) pxToRem(15);
          padding: pxToRem(15) 0;
          text-align: center;
          color: white;
          font-size: pxToRem(14);
          background: $color-blue;
        }
      }
    }
    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: pxToRem(30);
      z-index: 1100;
      width: 100%;
      @include center;
      .icon-close {
        width: pxToRem(45);
        height: pxToRem(45);
        border-radius: 50%;
        background: #333;
        font-size:pxToRem(25);
        color: white;
        @include center;
      }
    }
  }
</style>
