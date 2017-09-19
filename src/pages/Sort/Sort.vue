<template>
  <div class="container Sort">
    <header-top :head-title="headTitle" hasBack="true"></header-top>
    <div class="sort-group" :class="{active: $route.params.sortId - 1 == index}"  v-for="(item, index) in payTypeList" :key="index" @click="selectSort(index + 1)">
      <div class="img-wrap" :class="[`sort${index+1}`]">
        <img :src="imgArr[`sort${index + 1}`]"/>
      </div>
      <span class="sort-name">{{item}}</span>
      <img src="../../assets/img/xz.png" class="xz"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import headerTop from '../../components/Head'
  import imgArr from '../../assets/js/img'
  import Bus from '../../util/bus'

  export default{
    data(){
      return {
        headTitle: '选择分类',
        payTypeList:['早餐', '午餐', '晚餐', '零食饮料','交通费','话费',  '看电影','娱乐休闲','房租',  '服饰', '生活用品', '医疗保健',  '孩子', '化妆护肤','其他'],
        imgArr: imgArr
      }
    },
    methods:{
      selectSort(sortId){
        Bus.$emit('selectSort', sortId)

        this.$router.go(-1)
      }
    },
    components:{
      headerTop
    }
  }
</script>

<style lang="scss">
  .Sort{
    z-index:3;
    .sort-group{
      position: relative;
      padding: 0.2666rem 0.4rem;
      border-bottom: 1px solid #eee;
    }
    .sort-group.active .xz{
      display: block;
    }
    .sort-group .sort-name{
      margin-left: 0.2666rem;
      font-size: 0.4533rem;
      vertical-align: middle;
    }
    .sort-group .img-wrap{
      display: inline-block;
      position: relative;
      width: 0.9333rem;
      height: 0.9333rem;
      border-radius: 50%;
      vertical-align: middle;
    }
    .sort-group .img-wrap img{
      position: absolute;
      top:50%;
      left: 50%;
      margin-left: -0.2666rem;
      margin-top: -0.2666rem;
      width: 0.5333rem;
      height: 0.5333rem;
    }
    .xz{
      display: none;
      position: absolute;
      top:50%;
      right: 0.4rem;
      margin-top: -0.2666rem;
      width: 0.5333rem;
      height: 0.5333rem;
    }
  }

</style>
