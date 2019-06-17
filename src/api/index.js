import config from '@/config';
import { log } from '@/utils';
// import router from '../router';
import qs from 'qs';
import axios from 'axios';
import Vue from 'vue';

// 加载最小时间
const MINI_TIME = 300;
// 超时时间
// 环境value
// eslint-disable-next-line
let _isDev = process.env.NODE_ENV === 'development';
// 请求接口host
const apiHost = config.api;
// 请求组（判断当前请求数）
const _requests = [];

axios.defaults.baseURL = apiHost;

// console.log(axios.defaults);
// 创建一个请求实例
/**
 * 添加请求，显示loading
 * @param {请求配置} config
 */
function pushRequest() {
  log(`${config.url}--begin`);
  _requests.push(config);
}

/**
 * 移除请求，无请求时关闭loading
 * @param {请求配置} config
 */
function popRequest() {
  log(`${config.url}--end`);
  const _index = _requests.findIndex(r => r === config);
  if (_index > -1) {
    _requests.splice(_index, 1);
  }
}
/**
 * 错误的处理
 * @param {*} code
 * @param {string} [message='请求错误']
 */
function handlerErr(code, message = '请求错误') {
  switch (code) {
    case 401:
      message = '登录失效';
      break;
    case 404:
      // if (process.env.NODE_ENV === 'production') {
      //   const url = window.location.href.indexOf("/pages")[0];
      //   window.location.href = `${url}/pages/error/error.html`;
      // } else {
      //   window.location.href = "/error"
      // }
      message = '错误请求';
      break;
    case 403:
      // if (process.env.NODE_ENV === 'production') {
      //   const url = window.location.href.indexOf("/pages")[0];
      //   window.location.href = `${url}/pages/error/error.html`;
      // } else {
      //   window.location.href = "/auth"
      // }
      message = '禁止访问';
      break;
    case 408:
      message = '请求超时';
      break;
    case 500:
      message = '服务器内部错误';
      break;
    case 501:
      message = '功能未实现';
      break;
    case 503:
      message = '服务不可用';
      break;
    case 504:
      message = '网关错误';
      break;
    default:
  }
  // router.push({ name: "/error", query: { message } });
  alert(`${code}:${message}`);
}

/**
 * 请求地址，请求数据，是否静默，请求方法
 */
const requests = (
  url, data = {}, method = 'POST', contentTypeIsJSON = false, isSilence = false,
) => {
  const _opts = { method, url };
  const _query = {};
  let _timer = null;
  if (method.toLocaleUpperCase() === 'POST') {
    if (contentTypeIsJSON) {
      _opts.data = data;
      _opts.headers = { 'Content-Type': 'application/json;charset=UTF-8' };
      // _opts.url += '?requestProject=marketing';
    } else {
      // _opts.data = qs.stringify(Object.assign({ requestProject: 'gic-web' }, data));
      _opts.data = qs.stringify(data);
    }
  } else {
    _opts.params = _query;
  }
  return new Promise((resolve, reject) => {
    const _random = { stamp: Date.now(), url: `${apiHost + url}` };
    if (!isSilence) {
      _timer = setTimeout(() => {
        pushRequest(_random);
      }, MINI_TIME);
    }
    axios(_opts)
      .then((res) => {
        clearTimeout(_timer);
        popRequest(_random);
        if (res.data.errorCode !== 0) {
          reject(res);
          handlerErr(res.data.errorCode, res.data.message);
        } else {
          resolve(res.data);
        }
      })
      .catch((res) => {
        clearTimeout(_timer);
        popRequest(_random);
        if (res) {
          handlerErr(res.response.status, '接口异常');
        }
        reject(res);
      });
  });
};

export { axios, requests };
