<template>
  <div class="container Day">
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
  import imgArr from '../../../assets/js/img'

  export default{
    data(){
      return {
        total: '0.00',
        list: [],
        imgArr: Object.freeze(imgArr),
      }
    },
    created(){
      this.refreshList();

      this.upDataComplete('dayRecord')
    },
    methods:{
      async refreshList(){
        let [date] = formatTime(new Date).split(' ');

        let result = await this.getPayRecord({
          openId: 'o8i8B0c0TFTTJMSbkuF4tmo_4NZI',
          date: date
        })

        this.list = result.content;
        this.total = parseFloat(result.total).toFixed(2);

        this.upDataComplete('dayRecord')
      },
      ...mapActions(['getPayRecord']),
      ...mapMutations(['upDataComplete', 'AddRecordStatus'])
    },
    computed:{
      ...mapState({
        dayRecord: state => state.needUpdata.dayRecord,
        'initAddRecord': 'initAddRecord'
      })
    },
    activated(){
      if(this.dayRecord){
        console.log(3)
        this.refreshList()
      }

      //初始化记一笔的内容
      if(!this.initAddRecord){
        this.AddRecordStatus()
      }
    }
  }
</script>

