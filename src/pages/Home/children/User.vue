<template>
  <div class="container">
    <div class="test">user</div>
    <div @click="$router.push({name: 'FeedBack'})">意见反馈</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{}
</script>

<style lang="scss">
  @import '../../../assets/scss/function.scss';

  .test{
    font-size: sass-pxTorem(40px);
  }
</style>
