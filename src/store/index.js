import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

import {paramsFormat} from '../util/util'

import toast from './Toast'
import ApiServer from './apiServer'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    initAddRecord: true,
    needUpdata: {
      dayRecord: true,
      monthRecord: true,
      chart: true
    }
  },
  mutations:{
    AddRecordStatus(state){
      state.initAddRecord = !state.initAddRecord
    },
    upDataComplete(state, type){
      state.needUpdata[type] = false;
    },
    needUpData(state){
      state.needUpdata.dayRecord = true;
      state.needUpdata.monthRecord = true;
      state.needUpdata.chart = true;
    }
  },
  actions:{
    _axios({}, {params, apiUrl}){
      console.log(params)
      return axios.post(apiUrl, paramsFormat(params), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
    }
  },
  modules:{
    toast,
    ApiServer
  }
})
