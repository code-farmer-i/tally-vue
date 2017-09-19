<template>
  <div class="home">
    <header-top :head-title="headTitle"></header-top>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab-bar :set-top="setTop"></tab-bar>
    <toast></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapMutations} from 'vuex';
  import headerTop from '../../components/Head'
  import tabBar from '../../components/Tabbar'

  export default {
    name: 'hello',
    created(){
      this.headTitle = this.$route.meta.title
    },
    data () {
      return {
        headTitle: '日消费',
        setTop: 'auto'
      }
    },
    watch:{
      '$route': function(to, from){
        if(to.meta && to.meta.title){
          this.hideToast();
          this.headTitle = this.$route.meta.title
        }
      }
    },
    components:{
      headerTop,
      tabBar
    },
    methods:{
      ...mapActions(['showLoading', 'hideLoading', 'showToast']),
      ...mapMutations(['hideToast'])
    },
    beforeRouteLeave (to, from, next) {
      this.setTop = `${window.innerHeight}px`;

      next()
    },
    activated(){

      //路由切换滑动时tabbar位置bug 目前还没找到比较优雅的解决方案。。
      setTimeout(()=>{
        this.setTop = 'auto';
      }, 500)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.home{
  z-index:1;
  .Day, .Month{
    .banner{
      padding-top: 0.6666rem;
      padding-left: 0.5332rem;
      background: url("../../assets/img/banner.jpg") no-repeat top left/100% 100%;
      height: 5.625rem;
    }
    .banner-title{
      font-size: 0.8rem;
      color: #fff;
    }
    .banner-sub-title{
      margin-top:1.2rem;
      color:#fff;
      font-size:0.32rem;
    }
    .banner-total{
      padding-right: 0.5332rem;
      position: relative;
      display: inline-block;
      font-size: 1.4666rem;
      font-family: "ktsz";
      color: #fff;
      line-height: 1;
    }
    .banner-total::after{
      position: absolute;
      right: 0;
      bottom: 0.1332rem;
      content: "元";
      font-size: 0.4rem;
    }
    .no-record{
      margin-top: 0.8rem;
      text-align: center;
      font-size: 0.4533rem;
      color: #8a8a8a;
    }
    .note {
      padding: 0 0.3333rem 0 1.2rem;
      background-color: #fff;
      font-size: 0.4rem;
      color: #c5c4c5;
      text-align: left;
    }
    .del {
      padding-top: 0.5333rem;
      position: absolute;
      top: 0;
      left: 100%;
      width: 1.8666rem;
      height: 100%;
      text-align: center;
      color: #fff;
      background-color: #eb4d3d;
      font-size: 0.4533rem;
    }
    .item {
      position: relative;
      text-align: right;
      padding: 0.32rem 0.3333rem;
      border-top: 1px solid #eee;
      transition: .5s transform;
      font-size: 0;
    }

    .item-wrap:last-child .item {
      border-bottom: 1px solid #eee;
    }

    .item-wrap.have-note .item {
      padding-top: 0.2133rem;
      padding-bottom: 0.2133rem;
    }

    .item.active {
      transform: translateX(1.8666rem)
    }

    .item-wrap.have-note .del {
      padding-top: 0.72rem;
    }
  }

  .Day, .Month, .Chart{
    .xiala {
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -0.2666rem;
      width: 0.5333rem;
      height: 0.5333rem;
      vertical-align: middle;
    }
    .num{
      margin-top: 0.08rem;
      color: #14ba89;
      font-size: 0.48rem;
      font-family: "ktsz";
      line-height: 1;
    }
    .img-wrap{
      display: inline-block;
      position: relative;
      width: 0.9333rem;
      height: 0.9333rem;
      border-radius: 50%;
      vertical-align: middle;
    }
    .img-wrap img{
      position: absolute;
      top:50%;
      left: 50%;
      margin-left: -0.2666rem;
      margin-top: -0.2666rem;
      width: 0.5333rem;
      height: 0.5333rem;
    }
    .gray{
      color: #8a8a8a;
      font-size:0.32rem;
    }
    .pay-type{
      margin-left: 0.2666rem;
      display: inline-block;
      vertical-align: middle;
      font-size: 0.4533rem;
      color: #333;
    }
    .pay-money{
      display: inline-block;
      width: 50%;
      vertical-align: middle;
      text-align: right;
    }
  }
}

</style>
