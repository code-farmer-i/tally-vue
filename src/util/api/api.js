const HOST = '/';
const TEST_HOST = 'http://192.168.1.104:8080/';

const API_HOST = TEST_HOST;

function setApi(url){
  return API_HOST + url;
}

export default{
  getPayRecord: setApi('aaa/getPayRecord'),
  getMonthRecord: setApi('aaa/getMonthRecord'),
  commitPayRecord: setApi('aaa/commitPayRecord')
}
