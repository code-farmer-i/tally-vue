import API from '../util/api/api'

const TIME_OUT = 12000;

function apiFactory(){
  const apiActions = {};

  for(let [apiName, apiUrl] of Object.entries(API)){

    apiActions[apiName] = ({dispatch}, {params, success}) => {
      requestFactory({dispatch, params, success, apiUrl})
    }

  }

  return apiActions;
}

function requestFactory({dispatch, params, success, apiUrl}){
  Promise.race([
      new Promise((resovle, reject)=>{
        dispatch('showLoading')

        dispatch('_axios', {params, apiUrl})
          .then((res)=>{
            let data = res.data;

            dispatch('hideLoading')

            //请求成功并且成功获取到数据
            if(data.errorCode == 0){
              resovle(data);
              //请求成功但是服务器出错
            }else{
              reject('error1');
            }
          },(error)=>{
            console.log(error)
          })
      }),
      new Promise((resolve, reject)=>{
        setTimeout(()=>{
          reject('error2');
        }, TIME_OUT)
      })
    ])
    .then((data)=>{
      success(data)
    }, (error)=>{
      dispatch('hideLoading')

      if(error == 'error1'){
        dispatch('showToast', '数据库出错啦')
      }else if(error == 'error2'){
        dispatch('showToast', '请求超时，请稍后再试')
      }
    })
}

console.log(apiFactory())

export default{
  actions: apiFactory()
}
