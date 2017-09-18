/**
 * Created by Lynette on 2017/9/14.
 */
export default{
  state:{
    toastType: 'none',
    toastText: ''
  },
  actions:{
    showLoading({state,commit}){
      if(state.toastType == 'none') {
        commit('showLoading');
      }
    },
    hideLoading({commit}){
      commit('hideToast');
    },
    showToast({state, commit}, msg){
      if(state.toastType == 'none'){
        commit('showToast', msg);

        setTimeout(()=>{
          commit('hideToast');
        }, 1500)
      }
    }
  },
  mutations:{
    showLoading(state){
      state.toastType = 'loading';
    },
    showToast(state, msg){
      state.toastText = msg;
      state.toastType = 'msg';
    },
    hideToast(state){
      state.toastType = 'none';
    }
  }
}
