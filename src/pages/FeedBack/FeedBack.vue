<template>
  <div class="FeedBack">
    <header-top :head-title="headTitle" hasBack="true"></header-top>
  </div>
</template>

<script type="text/ecmascript-6">
  import headerTop from '../../components/Head'

  export default{
    data(){
      return {
        headTitle: '意见反馈'
      }
    },
    components:{
      headerTop
    }
  }
</script>

<style>
  .FeedBack{
    z-index:2;
  }
</style>
