<template>
  <div class="Chart">
    <div class="month">
      <div class="month-picker" @click="openPicker">{{dateStr}}<img src="../../../assets/img/xiala.png" class="xiala"/></div>
    </div>
    <div class="container chart-container">
      <div class="group">
        <div class="group-title">月度消费比例</div>
        <div class="pie-wrap">
          <div class="pie-item" :class="{'gt50': item.rotate > 180}" v-for="(item, index) in pieList" :key="index" :style="{transform: `rotate(${item.parentRotate}deg)`}">
            <div class="pie" :style="{transform: `rotate(${item.rotate}deg)`, 'background-color': item.bgColor, 'border-color': item.bgColor}"></div>
            <div class="pie fill" :style="{'background-color':item.bgColor}" v-if="item.rotate > 180"></div>
          </div>
        </div>
        <div class="legend-wrap">
          <div class="legend-item" v-for="(item, index) in pieList" :key="index"><span class="legend-color" :style="{'background-color': item.bgColor}"></span>{{item.sortName}}</div>
        </div>
      </div>
      <div class="group" v-show="details.length > 0">
        <div class="group-title">月度消费统计</div>
        <div class="sort-wrap">
          <div class="sort-item" v-for="item in details" :key="item.payType">
            <div class="inline-block-left50">
              <div class="img-wrap" :class="[`sort${item.payType}`]">
                <img :src="imgArr[`sort${item.payType}`]" />
              </div>
              <div class="pay-type">{{item.sortName}}</div>
            </div>
            <div class="pay-money">
              <div class="gray">总计</div>
              <div class="num">{{item.total}}</div>
            </div>
          </div>
          <div class="sort-item">
            <div class="inline-block-left50">
              <div class="pay-type" style="font-size:0.48rem">本月消费</div>
            </div>
            <div class="pay-money">
              <div class="gray"></div>
              <div class="num" style="font-size:0.5866rem;">{{monthTotal}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <datetime-picker v-model="pickerVisible"
                     type="date"
                     ref="picker"
                     year-format="{value} 年"
                     month-format="{value} 月"
                     @confirm="handleConfirm">

    </datetime-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapState, mapMutations} from 'vuex'
  import {formatTime} from '../../../util/util'
  import imgArr from '../../../assets/js/img'
  import { DatetimePicker  } from 'mint-ui';

  let colorArr = ['#478ec6', '#d7561f', '#769810', '#dee43a', '#5fbd43', '#094584', '#f6832a', '#e9f110', '#478ec6', '#ac2b15', '#e4f4f4', '#adbf47', '#d7561f', '#769810', '#dee43a'];
  export default{
    data(){
      return {
        dateStr: (()=>{
          let date = formatTime(new Date()).split(' ')[0].split('-');
          let [yearStr, monthStr] = date;

          return `${yearStr}-${monthStr}`
        })(),
        pieList:[],
        details:[],
        monthTotal: 0,
        imgArr: imgArr,
        pickerVisible: new Date()
      }
    },
    created(){
      this.refreshList(new Date());

      this.upDataComplete('chart')
    },
    methods:{
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(pickerDateObj){
        this.setDateStr(pickerDateObj)
      },
      setDateStr(DateObj){
        let [date] = formatTime(DateObj).split(' ');
        let [yearStr, monthStr] = date.split('-')

        if(this.dateStr != `${yearStr}-${monthStr}`){
          this.refreshList(DateObj);
        }
      },
      async refreshList(DateObj){
        let that = this;
        let [date] = formatTime(DateObj).split(' ');
        let [yearStr, monthStr] = date.split('-')

        this.dateStr = `${yearStr}-${monthStr}`

        let result = await this.getStatistics({
          openId:'o8i8B0c0TFTTJMSbkuF4tmo_4NZI',
          date: `${yearStr}-${monthStr}`
        })

        if(result.content.length > 0){
          that.renderChart(result.content, result.total);
          that.details = result.content,
            that.monthTotal = parseFloat(result.total).toFixed(2)
        }else{
          that.renderChart([{sortName: '本月暂无记录', payType:2, total: 1}], 1);
          that.details = []
        }
        this.upDataComplete('chart')
      },
      renderChart: function(data, total){
        var chartData = [];
        var parentRotate = 0;
        var zIndex = data.length;

        for(var i=0;i<data.length;i++){
          chartData[i] = {};

          chartData[i].bgColor = colorArr[i];
          chartData[i].parentRotate = parentRotate;
          chartData[i].rotate = i == data.length - 1 ? 360 - parentRotate : Math.round(360 * (data[i].total / total));
          chartData[i].sortName = data[i].sortName + "(" + Math.round(data[i].total / total *100)+"%)";
          chartData[i].zIndex = zIndex;

          zIndex--;
          parentRotate = parentRotate + chartData[i].rotate;
        }

        this.pieList = chartData;
      },
      ...mapMutations(['upDataComplete', 'needUpData']),
      ...mapActions(['getStatistics'])
    },
    components:{
      DatetimePicker
    },
    computed:{
      ...mapState({
        chart: state => state.needUpdata.chart
      })
    },
    activated(){
      if(this.chart){
        this.refreshList(new Date())
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/scss/colors.scss";

  .Chart{
    .month{
      position: fixed;
      top:1.2rem;
      width: 10rem;
      height: 1.2rem;
      text-align: center;
      background-color: $Theme-color;
      z-index: 110;
      font-size: 0.64rem;
      line-height: 1.2rem;
      text-align: center;
      color: #fff;
    }
    .chart-container{
      padding-top: 2.4rem;
    }
    .month-picker{
      position: relative;
      display: inline-block;
      padding-right: .6rem;
    }
    .sort-wrap{
      margin: 0.2666rem 0.2666rem 0.5333rem;
      border: 1px solid #e6e6e6;
      border-radius: 0.1333rem;
    }
    .sort-item{
      padding: 0.2666rem 0.2666rem;
      border-bottom:1px solid #e6e6e6;
      font-size:0;
    }
    .sort-item:last-child{
      border-bottom: none;
    }
    .pie-wrap{
      position: relative;
      margin: 0.4rem auto;
      width: 5.333rem;
      height: 5.333rem;
    }
    .pie-item.gt50{
      clip: rect(auto auto auto auto);
    }
    .pie-item{
      position: absolute;
      width: 5.3333rem;
      height: 5.3333rem;
      clip: rect(0px 5.3333rem 5.3333rem 2.666rem);
      left: 0;
      top: 0;
    }
    .pie.fill {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    .pie{
      position: absolute;
      width: 5.3333rem;
      height: 5.3333rem;
      clip: rect(0px 2.666rem 5.3333rem 0px);
      -webkit-border-radius: 2.666rem;
      border-radius: 2.666rem;
    }
    .legend-item{
      display: inline-block;
      margin-right: 0.2666rem;
      margin-bottom: 0.2666rem;
      font-size: 0.4rem;
      line-height: 1;
    }
    .legend-wrap{
      padding-top: 0.4rem;
      text-align: center;
    }
    .legend-color{
      display: inline-block;
      margin-right: 0.1333rem;
      width: 0.2666rem;
      height: 0.2666rem;
      border-radius: 0.0533rem;
    }
    .group{
      margin: 0.4rem auto 0;
      width: 9.3333rem;
      border-radius: 0.1333rem;
    }
    .group-title{
      padding: 0.2666rem;
      font-size: 0.4rem;
      font-weight: bold;
      color: #000;
    }
    .group-title::before{
      margin-right: 0.1333rem;
      content: "";
      height: 100%;
      border-right:0.1333rem solid #d1b48c;
    }
    /*重置picker样式*/
    .picker-slot.picker-slot-center:nth-child(1){
      display: none;
    }
    .picker-slot.picker-slot-center:nth-child(3){
      display: none;
    }
  }
</style>
