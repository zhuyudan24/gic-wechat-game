import { getWxConfig } from '@/api/common.js'; // eslint-disable-line
const { wx, WeixinJSBridge } = window;
let _gameActivityDTO;
let _shareLink;
let _gameType;

/**
 *  隐藏分享设置
 */
export const hideShare = (memberId) => {
  getWxConfig({ url: window.location.href, memberId }).then((res) => {
    wx.ready(() => {
      wx.hideAllNonBaseMenuItem();
    })
    // eslint-disable-next-line prefer-const
    let config = {};
    config.debug = false;
    config.jsApiList = ['hideAllNonBaseMenuItem'];
    const configMap = JSON.parse(JSON.parse(res.result));
    config.appId = configMap.appId;
    config.timestamp = configMap.timestamp;
    config.nonceStr = configMap.nonceStr;
    config.signature = configMap.signature;
    wx.config(config);
  })
}


/* 获取微信验证配置 */
export const setWxConfig = (memberId, gameActivityDTO, shareLink, gameType) => {
  _gameType = gameType;
  wx.ready(() => {
    setWxshareConfig();
  })

  // eslint-disable-next-line prefer-const
  let config = {};
  config.debug = false;
  config.jsApiList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'addCard', 'openCard' , 'hideOptionMenu']; // eslint-disable-line
  _gameActivityDTO = gameActivityDTO;
  _shareLink = shareLink;
  getWxConfig({ url: window.location.href, memberId }).then((res) => {
    const configMap = JSON.parse(JSON.parse(res.result));
    config.appId = configMap.appId;
    config.timestamp = configMap.timestamp;
    config.nonceStr = configMap.nonceStr;
    config.signature = configMap.signature;
    wx.config(config);
  })
};

// 微信分享设置
export const setWxshareConfig = () => {
  wx.checkJsApi({
    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
    success(res) {
      if (res.checkResult.onMenuShareTimeline == false) {
        /*eslint-disable-next-line*/
        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
        return;
      }
      if (res.checkResult.onMenuShareAppMessage == false) {
        /*eslint-disable-next-line*/
        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
        return;
      }
      if (res.checkResult.onMenuShareQQ == false) {
        /*eslint-disable-next-line*/
        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
        return;
      }
      if (res.checkResult.onMenuShareWeibo == false) {
        /*eslint-disable-next-line*/
        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
        return;
      }
      if (res.checkResult.onMenuShareQZone == false) {
        /*eslint-disable-next-line*/
        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
      }
    },
  });

  const sharetitle = `${_gameActivityDTO.shareTitle}`;
  const sharelink = `${_shareLink}`;
  // http://gicdev.demogic.com/wechat-game/static/img/share/ggk.png
  const shareimgurl = _gameActivityDTO.shareImgUrl.indexOf("http") !== -1 ? `${_gameActivityDTO.shareImgUrl}` : `${window.location.href.split(`/pages/${_gameType}`)[0]}/static/img/share/${_gameType}.png`;
  const sharetextinfo = `${_gameActivityDTO.shareTextInfo}`;

  wx.onMenuShareTimeline({
    title: sharetitle,
    // 分享标题
    link: sharelink,
    // 分享链接
    imgUrl: shareimgurl,
    // 分享图标
    success() {
      // 用户确认分享后执行的回调函数
    },
    cancel() {
      // 用户取消分享后执行的回调函数
    },
  });
  wx.onMenuShareAppMessage({
    title: sharetitle,
    // 分享标题
    desc: sharetextinfo,
    // 分享描述
    link: sharelink,
    // 分享链接
    imgUrl: shareimgurl,
    // 分享图标
    success() {
      // 用户确认分享后执行的回调函数
    },
    cancel() {
      // 用户取消分享后执行的回调函数
    },
  });
  wx.onMenuShareQQ({
    title: sharetitle,
    // 分享标题
    desc: sharetextinfo,
    // 分享描述
    link: sharelink,
    // 分享链接
    imgUrl: shareimgurl,
    // 分享图标
    success() {
      // 用户确认分享后执行的回调函数
    },
    cancel() {
      // 用户取消分享后执行的回调函数
    },
  });
  wx.onMenuShareWeibo({
    title: sharetitle,
    // 分享标题
    desc: sharetextinfo,
    // 分享描述
    link: sharelink,
    // 分享链接
    imgUrl: shareimgurl,
    // 分享图标
    success() {
      // 用户确认分享后执行的回调函数
    },
    cancel() {
      // 用户取消分享后执行的回调函数
    },
  });
  wx.onMenuShareQZone({
    title: sharetitle,
    // 分享标题
    desc: sharetextinfo,
    // 分享描述
    link: sharelink,
    // 分享链接
    imgUrl: shareimgurl,
    // 分享图标
    success() {
      // 用户确认分享后执行的回调函数
    },
    cancel() {
      // 用户取消分享后执行的回调函数
    },
  });
}
