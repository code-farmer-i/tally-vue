import API from '../util/api/api'

const TIME_OUT = 12000;

function apiFactory(){
  const apiActions = {};

  for(let [apiName, apiUrl] of Object.entries(API)){

    apiActions[apiName] = async ({dispatch}, params) => {
      return await getData(dispatch, params, apiUrl);
    }

  }

  return apiActions;
}

async function getData(dispatch, params, apiUrl){
  dispatch('showLoading')

  return await new Promise((resolve, reject)=>{
    Promise.race([Request(dispatch, params, apiUrl), Timeout()])
      .then((data)=>{
        dispatch('hideLoading')

        resolve(data)
      }, (error)=>{
        dispatch('hideLoading')

        if(error == 'error1'){
          dispatch('showToast', '数据库出错啦')
        }else if(error == 'error2'){
          dispatch('showToast', '请求超时，请稍后再试')
        }
      })
  })
}

function Request(dispatch, params, apiUrl){
  return new Promise((resovle, reject)=>{

    dispatch('_axios', {params, apiUrl})
      .then((res)=>{
        let data = res.data;

        //请求成功并且成功获取到数据
        if(data.errorCode == 0){
          resovle(data);
          //请求成功但是服务器出错
        }else{
          reject('error1');
        }
      })

  })
}

function Timeout(){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      reject('error2');
    }, TIME_OUT)
  })
}

console.log(apiFactory())

export default{
  actions: apiFactory()
}
