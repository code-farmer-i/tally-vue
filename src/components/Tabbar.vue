<template>
  <div class="tarbar" :style="{top: setTop, bottom: setTop == 'auto' ? '0' : 'auto'}">
    <div class="tarbar-group" @click="$router.replace({name: 'Day'})" :class="{active: $route.path.indexOf('Day') != -1}">
      <div class="tarbar-icon jrxf"></div>
      <div>今日消费</div>
    </div>
    <div class="tarbar-group" @click="$router.replace({name: 'Month'})" :class="{active: $route.path.indexOf('Month') != -1}">
      <div class="tarbar-icon yxf"></div>
      <div>月消费</div>
    </div>
    <div class="tarbar-group" @click="$router.replace({name: 'Chart'})" :class="{active: $route.path.indexOf('Chart') != -1}">
      <div class="tarbar-icon chart"></div>
      <div>统计</div>
    </div>
    <div class="tarbar-group" @click="$router.replace({name: 'User'})" :class="{active: $route.path.indexOf('User') != -1}">
      <div class="tarbar-icon user"></div>
      <div>用户中心</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props:['setTop']
  }
</script>

<style>
  .tarbar{
    display: table;
    position: fixed;
    z-index: 999;
    width: 100%;
    max-width: 10rem;
    margin-top: -1.4rem;
    height: 1.4rem;
    color: #bfbfbf;
    bottom:0;
    background-color: #fcfcfc;
    border-top: 1px solid #dbdbdb;
    font-size:0.28rem;
    line-height: 1;
  }
  .tarbar-group.active{
    color: #d1b38b;
  }
  .tarbar-icon{
    display: inline-block;
    width: .8rem;
    height:.8rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }
  .tarbar-icon.jrxf{
    background-image: url("../assets/img/jrxf.png");
  }
  .tarbar-group.active .jrxf{
    background-image: url("../assets/img/jrxf-active.png");
  }
  .tarbar-icon.yxf{
    background-image: url("../assets/img/yxf.png");
  }
  .tarbar-group.active .yxf{
    background-image: url("../assets/img/yxf-active.png");
  }
  .tarbar-icon.chart{
    background-image: url("../assets/img/chart.png");
  }
  .tarbar-group.active .chart{
    background-image: url("../assets/img/chart-active.png");
  }
  .tarbar-icon.user{
    background-image: url("../assets/img/user.png");
  }
  .tarbar-group.active .user{
    background-image: url("../assets/img/user-active.png");
  }
  .tarbar-group{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
</style>
