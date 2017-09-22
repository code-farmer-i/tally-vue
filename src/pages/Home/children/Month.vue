<template>
  <div class="container Month" v-window-scroll="scrollHandler">
    <div class="banner">
      <div class="banner-title">
        <div class="picker-wrap" @click="openPicker">
          <div class="picker-val">{{dateStr}}</div>
          <img src="../../../assets/img/xiala.png" class="xiala"/>
        </div>
      </div>
      <div class="banner-sub-title">总消费</div>
      <div class="banner-total">{{total}}</div>
    </div>
    <div class="list">
      <div v-for="(group, groupName) in list" class="group" :key="groupName">
        <div class="groupName">{{groupName}}</div>
        <div class="item-wrap" :class="{'have-note': groupItem.note}" v-for="groupItem in group" :key="groupItem.recordId">
          <div class="item" :class="{active: groupItem.active}">
            <div class="inline-block-left50">
              <div class="img-wrap" :class="[`sort${groupItem.sortId}`]">
                <img :src="imgObj[`sort${groupItem.sortId}`]"/>
              </div>
              <div class="pay-type">{{groupItem.payTime}} {{groupItem.sortName}}</div>
            </div>
            <div class="pay-money">
              <div class="gray">实付</div>
              <div class="num">{{groupItem.monetary}}</div>
            </div>
            <div class="del" :data-recordId="groupItem.recordId">删除</div>
            <div class="note">{{groupItem.note}}</div>
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
    <div class="no-record" v-show="recordNum == 0">该月暂无消费</div>
    <load-more :showMore="showMore"></load-more>
    <div class="more-data" v-show="recordNum > 6 && !hasNextPage">无更多记录</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatTime} from '../../../util/util'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import imgObj from '../../../assets/js/img'
  import loadMore from '../../../components/common/loadMore'
  import {windowScroll} from '../../../mixin/mixin'
  import API from '../../../util/api/api'
  import { DatetimePicker  } from 'mint-ui';

  let pageIdx = 1;

  export default{
    data(){
      return {
        dateStr: '月消费',
        total: '0.00',
        imgObj: Object.freeze(imgObj),
        list:{},
        recordNum: 0,
        showMore: false,
        hasNextPage: false,
        moreStatus: 'end',
        pickerVisible: new Date()
      }
    },
    mixins:[windowScroll],
    created(){
      this.refreshList(new Date());

      this.upDataComplete('monthRecord')
    },
    mounted(){
      this.$nextTick(()=>{
        imgObj['sort5'] = 1;
      })
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
        let [date] = formatTime(DateObj).split(' ');
        let [yearStr, monthStr] = date.split('-')

        this.dateStr = `${yearStr}-${monthStr}`

        pageIdx = 1;
        this.recordNum = 0;
        this.hasNextPage = false;

        let result = await this.getMonthRecord({
          openId: 'o8i8B0c0TFTTJMSbkuF4tmo_4NZI',
          date: `${yearStr}-${monthStr}`,
          pageIdx: pageIdx
        })

        this.formatList(result)
        this.upDataComplete('monthRecord')
      },
      formatList(data){
        let newList = pageIdx == 1 ? {} : this.list;
        let recordNum = pageIdx == 1 ? 0 : this.recordNum;
        let monetary;

        for (let i = 0, len = 10; i < len;i++){
          if (!data.content[i]){
            break;
          }
          let [payDate, payTime] = data.content[i].payTime.split(' ');

          if (!newList[payDate]){
            newList[payDate] = [];
          }

          data.content[i].payDate = payDate;
          data.content[i].payTime = payTime;
          data.content[i].active = false;

          recordNum++;
          newList[payDate].push(data.content[i]);
        }

        this.list = Object.freeze(newList);
        this.recordNum = recordNum;
        this.hasNextPage = data.hasNextPage;
        this.total = parseFloat(data.total).toFixed(2);
      },
      scrollHandler(docScrollTop){
        if(docScrollTop + window.innerHeight >= document.body.scrollHeight - 20 && this.moreStatus == 'end' && this.hasNextPage){
          this.loadMoreHanlder()
        }else if(docScrollTop + window.innerHeight >= document.body.scrollHeight - 400 && this.moreStatus == 'end' && this.hasNextPage) {
          this.showMore = true;
        }
      },
      loadMoreHanlder(){
        let that =  this;

        that.moreStatus = 'pending'

        that._axios({
          params: {
            openId: 'o8i8B0c0TFTTJMSbkuF4tmo_4NZI',
            date: this.dateStr,
            pageIdx: ++pageIdx
          },
          apiUrl: API.getMonthRecord
        })
        .then((res)=>{

          let data = res.data;

          if(data.errorCode == 0){
            setTimeout(()=>{
              that.showMore = false;
              that.moreStatus = 'end'

              that.formatList(data)
            }, 1000)
          }else{
            that.showToast('数据库出错啦');
          }
        })
      },
      ...mapActions(['getMonthRecord', '_axios', 'showToast']),
      ...mapMutations(['upDataComplete'])
    },
    components:{
      loadMore,
      DatetimePicker
    },
    computed:{
      ...mapState({
        monthRecord: state => state.needUpdata.monthRecord
      })
    },
    activated(){
      if(this.monthRecord){
        this.refreshList(new Date())
      }
    }
  }
</script>

<style lang="scss">
  .Month {

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

    .groupName {
      padding: 0.2666rem 0.4rem;
      background-color: #fcfcfc;
      font-family: "ktsz";
      font-size: 0.4rem;
    }

    .picker-wrap {
      padding-right: 0.6666rem;
      display: inline-block;
      position: relative;
      vertical-align: middle;
    }

    .picker-val {
      font-family: "ktsz";
      font-size: 1.0666rem;
      color: #fff;
    }

    .more-data {
      position: relative;
      padding: 0.2666rem 0;
      text-align: center;
      color: #c0c0c1;
      background-color: #fff;
      font-size: 0.37333rem;
    }

    .more-data::after, .more-data::before {
      content: "";
      position: absolute;
      top: 50%;
      width: 2.4rem;
      border-top: 1px solid #e2e2e4;
    }

    .more-data::after {
      left: 1.0666rem;
    }

    .more-data::before {
      right: 1.0666rem;
    }

    /*重置picker样式*/
    .picker-slot.picker-slot-center:nth-child(1) {
      display: none;
    }

    .picker-slot.picker-slot-center:nth-child(3) {
      display: none;
    }
  }
</style>
