// 环境value
// eslint-disable-next-line
const _isDev = process.env.NODE_ENV === 'development';

/**
 * 开发输出log
 * @param {消息} msg
 */
export const log = (msg) => {
  if (_isDev && console && console.log) {
    console.log(msg);
  }
};


/**
 * url加入时间戳
 */
export const formatUrl = url => url + (url.indexOf("?") == -1 ? "?v=" : "&v=") + new Date().getTime()

/**
 *
 * 获取url指定参数
 * @param {*} name
 * @returns
 */
export const getQueryString = (name) => {
  var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 判断字符串是否为null，undefined，空
 */
export const isEmpty = v => v === null || v === undefined || v === '';

/**
 * 设置title，解决微信改不了title的bug
 */
export const setTitle = (title) => {
  document.title = title;
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isiOS = userAgent.indexOf('applewebkit') >= 0;
  const isWechat = userAgent.indexOf('micromessenger') >= 0;
  if (isiOS && isWechat) {
    const iframe = document.createElement('iframe');
    // iframe.src = 'https://www.baidu.com/favicon.ico';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.onload = () => {
      setTimeout(() => {
        iframe.remove();
      }, 0)
    }
  }
}

/**
 * 截取字符串
 */
export const substringStr = (str, num = 6) => {
  if (isEmpty(str)) return str;
  return str.length > num ? `${str.substring(0, num)}...` : str
}


/**
 * 禁止浏览器滚动
 * fixed：1：禁止/ 0：允许
 * */
export const forbidBodyScroll = (fixed = true) => {
  const bodyElem = document.getElementsByTagName('body')[0];
  const htmlElem = document.getElementsByTagName('html')[0];
  if (fixed) {
    // htmlElem.style['overflow-y'] = 'hidden';
    // htmlElem.style.height = '100%';
    // bodyElem.style['overflow-y'] = 'hidden';
    // bodyElem.style.height = '100%';
    // bodyElem.style.position = 'fixed';
    bodyElem.className = `${bodyElem.className} forbidBodyScroll`;
    htmlElem.className = `${htmlElem.className} forbidBodyScroll`;
  } else {
    bodyElem.className = bodyElem.className.replace("forbidBodyScroll" ," ");
    htmlElem.className = htmlElem.className.replace("forbidBodyScroll" ," ");
    // htmlElem.style['overflow-y'] = 'auto';
    // htmlElem.style.height = '100%';
    // bodyElem.style['overflow-y'] = 'auto';
    // bodyElem.style.height = '100%';
    // bodyElem.style.position = 'static';
  }
}

/**
 * 是否是手机浏览器
 * */
export const IsPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  var flag = true;
  // eslint-disable-next-line no-plusplus
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}


/**
 * 是否是微信
 *  */
export const IsWeixin = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("micromessenger") !== -1;
}

/** 是否符合玩游戏的环境 */
export const checkEnv = () => {
  if (!IsWeixin()) {
    alert("请在微信浏览器中打开！");
    return false;
  }
  if (IsPC()) {
    alert("请在手机浏览器中打开！");
    return false;
  }
  return true;
}
