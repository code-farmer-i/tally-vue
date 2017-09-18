<template>
  <div class="loading-wrap" v-show="showMore">
    <img src="../../assets/img/more.gif" class="loading"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props:['showMore']
  }
</script>

<style>
  .loading{
    position: relative;
    left: 50%;
    display: inline-block;
    margin-top: 0.1333rem;
    margin-bottom: 0.1333rem;
    margin-left: -0.2666rem;
    width: 0.533rem;
    height: 0.5333rem;
    opacity: .4;
  }
</style>
