<template>
  <div class="library">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .library {
    width: 100%;
    height: 100%;
    background: white;
  }
</style>
