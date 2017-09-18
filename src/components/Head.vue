<template>
  <header class="header">
    <span class="left-arrow" v-if="hasBack" @click="$router.go(-1)"></span>
    <div class="header-title" v-text="headTitle"></div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return{}
    },
    props: ['headTitle', 'hasBack']
  }
</script>

<style>
  .header{
    position: fixed;
    top:0;
    width: 100%;
    z-index:999;
    max-width: 10rem;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #d1b38b;
    color: #fff;
    font-size: .48rem;
  }
  .left-arrow{
    position: absolute;
    left:0;
    top:0;
    display: inline-block;
    width: 1rem;
    height:100%;
    background: url("../assets/img/left-arrow.png") no-repeat center/ .7rem .7rem;
  }
  .header-title{
    width: 100%;
    text-align: center;
  }
</style>
