<template>
  <div class="AddRecord container">
    <header-top :head-title="headTitle" hasBack="true"></header-top>
    <div class="add-group">
      <div class="name">金额</div>
      <div class="right">
        <input  type="number" class="inp-num" v-model.number="monetary" placeholder="0.00"/>
      </div>
    </div>
    <div class="add-group select" style="padding-right:0.2666rem" @click="goSort()">
      <div class="name">分类</div>
      <div class="right">
        <span>{{payTypeText ? payTypeText : '请选择分类'}}</span>
        <img src="../../assets/img/yjt.png" style="width:0.5333rem;height:0.5333rem;vertical-align:middle"/>
      </div>
    </div>
    <div class="add-group select" style="padding-right:0.2666rem" @click="openDatePicker">
      <div class="name">日期</div>
      <div class="right">
          <span class="picker">{{dateStr}}</span>
        <img src="../../assets/img/yjt.png" style="width:0.5333rem;height:0.5333rem;vertical-align:middle"/>
      </div>
    </div>
    <div class="add-group select" style="padding-right:0.2666rem" @click="openTimePicker">
      <div class="name">时间</div>
      <div class="right">
          <span class="picker">
            {{timeStr}}
          </span>
        <img src="../../assets/img/yjt.png" style="width:0.5333rem;height:0.5333rem;vertical-align:middle"/>
      </div>
    </div>
    <div class="add-group">
      <div class="name">备注</div>
      <div class="right">
        <input  type="text" class="noteInp" placeholder="备注选填（最多10字）" v-model.trim="note"/>
      </div>
    </div>
    <div class="btn" @click="commitRecord">保存</div>
    <div>
      <datetime-picker v-model="pickerVisible"
                       type="date"
                       ref="picker"
                       year-format="{value} 年"
                       month-format="{value} 月"
                       date-format="{value} 日"
                       @confirm="dateHandleConfirm">
      </datetime-picker>
      <datetime-picker v-model="pickerVisible2"
                       type="time"
                       ref="picker2"
                       hour-format="{value}"
                       minute-format="{value}"
                       @confirm="timeHandleConfirm">
      </datetime-picker>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import headerTop from '../../components/Head'
  import {formatTime} from '../../util/util'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import Bus from '../../util/bus'
  import { DatetimePicker  } from 'mint-ui';

  const payTypeList = ['早餐', '午餐', '晚餐', '零食饮料','交通费','话费',  '看电影','娱乐休闲','房租',  '服饰', '生活用品', '医疗保健',  '孩子', '化妆护肤','其他']
  export default{
    name: 'AddRecord',
    data(){
      return {
        headTitle: '记一笔',
        monetary: '',
        sortId: -1,
        dateStr: '',
        timeStr: '',
        note: '',
        pickerVisible: new Date(),
        pickerVisible2: formatTime(new Date()).split(' ')[1],
      }
    },
    created(){
      Bus.$on('selectSort', (sortId)=>{
        this.sortId = sortId
      })
    },
    computed:{
      payTypeText(){
        return payTypeList[this.sortId - 1]
      },
      ...mapState(['initAddRecord'])
    },
    methods:{
      openDatePicker() {
        this.$refs.picker.open();
      },
      openTimePicker() {
        this.$refs.picker2.open();
      },
      dateHandleConfirm(DateObj){
        let [dateStr] = formatTime(DateObj).split(' ');
        this.dateStr = dateStr
      },
      timeHandleConfirm(timeStr){
        this.timeStr = timeStr
      },
      goSort(){
        this.$router.push({name: 'Sort', params: {'sortId': this.sortId}})
      },
      commitRecord(){
        if(typeof this.monetary != 'number'){
          alert('请输入金额')
          return
        }else if(this.sortId == -1){
          alert('请选择分类')
          return
        }else if(this.note && this.note.length > 10){
          alert('备注不能超过10个字')
          return
        }

        this.commitPayRecord({
          params:{
            openId: 'o8i8B0c0TFTTJMSbkuF4tmo_4NZI',
            payTime: [this.dateStr, this.timeStr].join(' '),
            note: this.note,
            payType: this.sortId,
            monetary: this.monetary
          },
          success:()=>{
            this.needUpData();

            this.$router.go(-1)
          }
        })
      },
      ...mapActions(['commitPayRecord']),
      ...mapMutations(['AddRecordStatus', 'needUpData'])
    },
    activated(){
      if(this.initAddRecord){
        let [date, time] = formatTime(new Date()).split(' ');

        this.dateStr = date;
        this.timeStr = time;

        this.monetary = ''
        this.sortId = -1
        this.note = ''

        this.AddRecordStatus()
      }
    },
    components:{
      headerTop,
      DatetimePicker
    }
  }
</script>

<style>
  .AddRecord{
    z-index:2;
  }
  .add-group{
    padding: 0.4rem;
    font-size: 0;
    border-bottom: 1px solid #eee;
  }
  .add-group .name{
    display: inline-block;
    width: 20%;
    vertical-align: middle;
    font-size: 0.4533rem;
    line-height: 1;
  }
  .add-group .right{
    display: inline-block;
    width: 80%;
    vertical-align: middle;
    text-align: right;
  }
  .add-group .right span{
    vertical-align: middle;
    font-size: 0.4533rem;
    color: #8a8a8a;
  }
  .add-group .inp-num{
    width: 100%;
    color: #14ba89;
    font-size: 0.9333rem;
    height: 0.9333rem;
    text-align: right;
    border: 0;
  }
  .add-group .inp-num::-webkit-input-placeholder{
    color: #14ba89;
  }
  .add-group .noteInp{
    text-align: right;
    border: 0;
  }
  .add-group .picker{
    font-size: 0.4533rem;
    color: #8a8a8a;
  }
  .add-group.select:active{
    background-color: #f1f1f1;
  }
  .add-group .noteInp{
    width: 100%;
    font-size: 0.4533rem;
  }
  .note-placeholder::-webkit-input-placeholder{
    color: #8a8a8a;
  }
  /*重置picker样式*/
  .AddRecord .mint-datetime:nth-child(1) .picker-slot.picker-slot-center:nth-child(1){
    display: none;
  }
</style>
