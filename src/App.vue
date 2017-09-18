<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
         <router-view :style="{'min-height': `${minHeight}px`}" class="router-global"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      transitionName: '',
      minHeight: 0
    }
  },
  created(){
    this.minHeight = window.innerHeight;
  },
  watch:{
    '$route': function(to, from){
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'translate-right' : 'translate-left'
    }
  }
}
</script>

<style>
  html,body{
    overflow-y: auto;
  }
  *{
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  .router-global{
    position: relative;
    top:0;
    left:0;
    width: 100%;
    background-color: #fff;
  }
#app {
  position: relative;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  max-width: 10rem;
  height: 100%;;
  background-color: #fff;
  overflow-x: hidden;
  -webkit-user-select: none;
}
  .btn{
    margin: 0.5333rem auto 0.5333rem;
    width: 9.3333rem;
    height: 1.3333rem;
    line-height: 1.3333rem;
    text-align: center;
    background-color: #d1b48c;
    color: #fff;
    font-size: 0.5333rem;
    box-shadow: 0 0.2666rem 0.6666rem -0.1333rem rgba(209, 180, 140, .8);
    border-radius: 0.13333rem;
    border: none;
  }
  .container{
    padding-top: 1.2rem;
    padding-bottom: 1.3rem;
    overflow-x: hidden;
  }
  .inline-block-left50{
    display: inline-block;
    width: 50%;
    vertical-align: middle;
    text-align: left;
  }
  .inline-block-right50{
    display: inline-block;
    width: 50%;
    vertical-align: middle;
    text-align: right;
  }
  .inline{
    display: inline;
  }
  .inline-block-center50{
    display: inline-block;
    width: 50%;
    vertical-align: middle;
    text-align: center;
  }
  @font-face {
    font-family: "ktsz";
    src: url("./assets/font/comic_sans_ms.ttf");
  }
  /* 分类图标样式 */
  .sort1, .sort4, .sort8, .sort11{
    background-color: rgba(245, 180, 75, .1);
    border: 1px solid rgba(245, 180, 75, .3);
  }
  .sort2, .sort7, .sort9, .sort13{
    background-color: rgba(100, 239, 214, .1);
    border: 1px solid rgba(100, 239, 214, .3);
  }
  .sort3, .sort5, .sort10, .sort14{
    background-color: rgba(97, 152, 252, .1);
    border: 1px solid rgba(97, 152, 252, .3);
  }
  .sort6, .sort12, .sort15{
    background-color: rgba(246, 108, 98, .1);
    border: 1px solid rgba(246, 108, 98, .3);
  }
  .translate-left-enter-active, .translate-left-leave-active, .translate-right-enter-active, .translate-right-leave-active {
    transition: .4s
  }
  .translate-left-enter{
    position: absolute;
    transform: translateX(10rem);
  }
  .translate-left-leave-to{
    position: absolute;
    transform: translateX(-5rem);
  }
  .translate-right-enter{
    position: absolute;
    transform: translateX(-5rem);
  }
  .translate-right-leave-to{
    position: absolute;
    transform: translateX(10rem);
  }
  /*重置picker样式*/
  .mint-datetime-cancel{
    padding-left: 20px;
    text-align: left;
    color: #8a8a8a;
  }
  .mint-datetime-confirm{
    padding-right: 20px;
    text-align: right;
    color: limegreen;
  }
</style>
