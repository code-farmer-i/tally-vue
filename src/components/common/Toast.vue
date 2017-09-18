<template>
  <div>
    <div class="toast lading" v-show="toastType == 'loading'">
      <img src="../../assets/img/loading.gif" class="toast-loading"/>
      <div class="toast-msg">数据加载中</div>
    </div>
    <div class="toast" v-show="toastType == 'msg'" v-text="toastText"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'

  export default{
    computed:{
      ...mapState({
        'toastType': state => state.toast.toastType,
        'toastText': state => state.toast.toastText
      })
    }
  }
</script>

<style>
 .toast{
   padding: .4rem .5rem;
   position: fixed;
   top:50%;
   left:50%;
   -webkit-transform: translate(-50%, -50%);
   transform: translate(-50%, -50%);
   background-color: rgba(0,0,0,.68);
   color: #fff;
   -webkit-border-radius: .1rem;
   border-radius: .1rem;
   font-size: .42rem;
   white-space: nowrap;
 }
 .toast.lading{
   padding: .56rem .68rem;
 }
  .toast-loading{
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 auto;
  }
  .toast-msg{
    margin-top: .24rem;
    font-size: .36rem;
  }
</style>
