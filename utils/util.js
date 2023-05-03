
var TXAPI_BASE_URL = "http://api.tianapi.com";  //天行数据接口域名
var TXAPI_KEY = "6e4e065b4fadd0bf1aa6ff39b035700e";  //请填写你在天行数据www.tianapi.com获得apikey

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  TXAPI_BASE_URL: TXAPI_BASE_URL,
  TXAPI_KEY: TXAPI_KEY,
  formatTime: formatTime
}
