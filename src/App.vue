<template>
  <div id="app">
    <span class="icon-bookmark"></span>
    <span class="text"> ABCD</span>
  </div>
</template>
<script>

  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['test'])
    },
    mounted() {
      this.$store.dispatch('setTest', 2).then(() => {
        console.log(this.test)
      })
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
    console.log('content loader', html.style)
  })
</script>

<style lang="scss" scoped>
  @import "./assets/styles/global.scss";
  .text {
    font-family: 'Days One';
    font-size: pxToRem(20);
    color: orange;
  }
</style>
