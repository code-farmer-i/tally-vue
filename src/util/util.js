/**
 * Created by Lynette on 2017/9/15.
 */
const paramsFormat = function(params){
  var paramsArr = [];

  for(let [key, val] of Object.entries(params)){
    paramsArr.push(`${key}=${val}`)
  }

  return paramsArr.join('&')
}

const formatTime = function(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export {
  paramsFormat,
  formatTime
}
