<template>
  <div class="container">
    <div class="banner">
      <div class="banner-title">今日消费</div>
      <div class="banner-sub-title">总消费</div>
      <div class="banner-total">{{total}}</div>
    </div>
    <div @click="$router.push({name: 'AddRecord'})" class="btn">记一笔</div>
    <div class="list">
      <div class="item-wrap" :class="{'have-note': item.note}" v-for="item in list" :key="item.recordId">
        <div class="item" :class="{active: item.active}">
          <div class="inline-block-left50">
            <div class="img-wrap" :class="['sort'+item.sortId]">
              <img :src="imgArr['sort' + item.sortId]"/>
            </div>
            <div class="pay-type">{{item.payDate.split(' ')[1]}} {{item.sortName}}</div>
          </div>
          <div class="pay-money">
            <div class="gray">实付</div>
            <div class="num">{{item.monetary}}</div>
          </div>
          <div class="del" :data-recordId="item.recordId" catchtap="delTap">删除</div>
          <div class="note">{{item.note}}</div>
        </div>
      </div>
    </div>
    <div class="no-record" v-show="list.length == 0">今日暂无消费</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapState, mapMutations} from 'vuex'
  import {formatTime} from '../../../util/util'
  import {imgArr} from '../../../assets/js/img'

  export default{
    data(){
      return {
        total: '0.00',
        list: [],
        imgArr: imgArr
      }
    },
    methods:{
      refreshList(){
        let [date] = formatTime(new Date).split(' ');

        this.getPayRecord({
          params: {
            openId: 'o8i8B0c0TFTTJMSbkuF4tmo_4NZI',
            date: date
          },
          success:(data)=>{
            this.list = data.content;
            this.total = parseFloat(data.total).toFixed(2);

            this.upDataComplete('dayRecord')
          }
        })
      },
      ...mapActions(['getPayRecord']),
      ...mapMutations(['upDataComplete', 'AddRecordStatus'])
    },
    computed:{
      ...mapState({
        dayRecord: state => state.needUpdata.dayRecord,
        initAddRecord: state => state.initAddRecord,
      })
    },
    activated(){
      if(this.dayRecord){
        this.refreshList()
      }

      //初始化记一笔的内容
      if(!this.initAddRecord){
        this.AddRecordStatus()
      }
    },
    deactivated(){
      this.isCreated = false;
    }
  }
</script>

<style>
  .item{
    position: relative;
    text-align: right;
    padding: 0.32rem 0.3333rem;
    border-top:1px solid #eee;
    transition:.5s transform;
    font-size: 0;
  }
  .item-wrap:last-child .item{
    border-bottom:1px solid #eee;
  }
  .item-wrap.have-note .item{
    padding-top: 0.2133rem;
    padding-bottom:0.2133rem;
  }
  .note{
    padding:0 0.3333rem 0 1.2rem;
    background-color: #fff;
    font-size: 0.4rem;
    color: #c5c4c5;
    text-align: left;
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
  }
  .gray{
    color: #8a8a8a;
    font-size:0.32rem;
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
  .item.active{
    transform: translateX(1.8666rem)
  }
  .del{
    padding-top: 0.5333rem;
    position: absolute;
    top:0;
    left: 100%;
    width: 1.8666rem;
    height: 100%;
    text-align: center;
    color: #fff;
    background-color: #eb4d3d;
    font-size: 0.4533rem;
  }
  .item-wrap.have-note .del{
    padding-top: 0.72rem;
  }
</style>
