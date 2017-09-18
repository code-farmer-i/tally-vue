<template>
  <div class="container">
    chart
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapState, mapMutations} from 'vuex'

  export default{
    created(){

    },
    methods:{
      ...mapMutations(['upDataComplete', 'needUpData'])
    }
  }
</script>
