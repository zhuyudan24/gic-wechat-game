/**
 * 本段js依赖全局变量jQuery、getQueryString、shareData、shareFlag和wx，产生一个全局变量wx_share
 * */

var wx_share = {
  init: function() {
    var config = {};
    var self = this;
    $.ajax({
      url: window.location.origin + '/gicfwh/puzzle-weixin-jsapi',
      data: {
        url: window.location.href,
        memberId: getQueryString('memberId')
      },
      type: 'post',
      dataType: 'json',
      success: function (res) {
        var configMap = JSON.parse(JSON.parse(res.result));
        config.debug = false;
        config.appId = configMap.appId;
        config.timestamp = configMap.timestamp;
        config.nonceStr = configMap.nonceStr;
        config.signature = configMap.signature;
        if (shareFlag) {
          config.jsApiList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'addCard', 'openCard'];
          wx.config(config);
          wx.ready(self.check);
        } else {
          config.jsApiList = ['hideAllNonBaseMenuItem'];
          wx.config(config);
          wx.ready(wx.hideAllNonBaseMenuItem);
        }
      }
    })
  },
  check: function() {
    wx.checkJsApi({
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
    });
    wx.onMenuShareTimeline({
      title: shareData.title,
      // 分享标题
      link: shareData.link,
      // 分享链接
      imgUrl: shareData.imgUrl,
      // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
    wx.onMenuShareAppMessage({
      title: shareData.title,
      // 分享标题
      desc: shareData.desc,
      // 分享描述
      link: shareData.link,
      // 分享链接
      imgUrl: shareData.imgUrl,
      // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
    wx.onMenuShareQQ({
      title: shareData.title,
      // 分享标题
      desc: shareData.desc,
      // 分享描述
      link: shareData.link,
      // 分享链接
      imgUrl: shareData.imgUrl,
      // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
    wx.onMenuShareWeibo({
      title: shareData.title,
      // 分享标题
      desc: shareData.desc,
      // 分享描述
      link: shareData.link,
      // 分享链接
      imgUrl: shareData.imgUrl,
      // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
    wx.onMenuShareQZone({
      title: shareData.title,
      // 分享标题
      desc: shareData.desc,
      // 分享描述
      link: shareData.link,
      // 分享链接
      imgUrl: shareData.imgUrl,
      // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
  }
}
wx_share.init();
