// var baseUrl = 'https://www.gicdev.com/gicfwh/';
var baseUrl = '/gicfwh/';
//获取参数
function getQueryString(name) {
  var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}


// 请求封装
function service(type,url,data,dataType) {
  return new Promise((resolve,reject) => {
    $.ajax({
      type,
      url: baseUrl + url,
      data,
      dataType,
      success(res) {
        resolve(res);
      },
      error(err) {
        reject(err);
      },
    })
  });
}
