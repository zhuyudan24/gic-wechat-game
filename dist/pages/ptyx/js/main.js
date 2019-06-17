// 进度条动画 1.6s加载到80%
var prizeMap = new Array();
var activityId = getQueryString("activityId");
var memberId = getQueryString("memberId");
var accountLogId = '';
var sharetitle = '';
var sharelink = '';
var shareimgurl = '';
var sharetextinfo = '';
var canUseIntegral = '';
var skinType = 0;

var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;

if (!isWeixin) {
    alert('请在微信浏览器打开！');
} else {
  $(function () {
    //初始化请求
    service('POST', 'puzzle-game-base-info', `activityId=${activityId}&memberId=${memberId}`, 'json').then(res => {
      console.log(res);
      //预加载图片 // 进度条
      preLoadImg(res.result.puzzleGame);
      //微信初始化
      initWx(res.result.puzzleGame);
      setTitle(res.result.puzzleGame.gameName);
      var imgUrl = window.location.href.replace(/pages\/ptyx\/ptyx\.html.*$/, 'static/img/attend/ptyx.png');
      var tipTitle = '尚未满足游戏参与条件，请多多努力。';
      if (res.result.puzzleGame && res.result.puzzleGame.attendCondition) {
        if (res.result.puzzleGame.attendCondition.tipImageUrl.indexOf('http') === 0) {
          imgUrl = res.result.puzzleGame.attendCondition.tipImageUrl;
        }
        if (res.result.puzzleGame.attendCondition.tipTitle) {
          tipTitle = res.result.puzzleGame.attendCondition.tipTitle;
        }
      }
      // 门槛
      $('.game_layer_permission_img').attr('src', imgUrl);
      $('.game_layer_permission_text').text(tipTitle);
      //这里加载基本信息
      return service('POST', 'puzzle-game-page-init', `activityId=${activityId}&memberId=${memberId}`, 'json');
    }).then(res => {
      //加载配置
      if (res.errorCode === 0) {
        //初始数据赋值
        initPage(res.result.gamePlayCost);
      }
    });
  });
}
// 图片预加载
var preLoadImg = function(obj) {
    skinType = (obj.skinType + 1) || 1;
    $('.game_body').addClass('skin'+(skinType));
    var imgObj = replaceableImgFunc(obj,skinType);
    var imgArr = [];
    // 皮肤3按钮是背景图
    if (skinType === 3) {
        $('.title_bottom').css({'background-image':`url(images/3/entry-ruleBtn.png)`});
    }
    for(var i in imgObj) {
      if (imgObj[i]) {
        imgArr.push(imgObj[i]);
      }
    };
    var len = imgArr.length;
    var gameProcessVal = $("#game_process_val");
    var gameProcessTxtNum = $(".game_process_txt_num");
    // 预加载图片
    $.preload(imgArr, {
        order: false,
        each: function (count) {
            //进度条
            var percent = Math.round((count+1) / len * 100) + '%';
            gameProcessVal.attr("style", "width: " + percent);
            gameProcessTxtNum.html(percent + "%");
        },
        end: function () {
            gameProcessVal.attr("style", "width: 100%");
            gameProcessTxtNum.html("100%");
            //图片加载完成 插入图片
            for(var i in imgObj) {
                $('.'+i).css({'background-image':`url(${imgObj[i]})`});
            };
            $(".christmas_jigsaw").show();
            $(".game_process").hide();
        }
    });
};
// 初始化页面
var initPage = function(info) {
    //体力值
    console.log(info)
    //设置logo
    $('.company_logo').find('img').attr('src',info.logoImgUrl);
    $('.private_img').find('img').attr('src',info.logoImgUrl);
    $("span[name='accountval']").text(info.accountValue);

    if (info.accountValue == 0) {
        $("span[name='accountval']").addClass('gray');
        $(".mainTimesBtn").find('i').addClass('gray');
        $(".game_layer_success_times").find(".accountval").css({'color':'#CDD7E0'});
        $(".game_layer_success_times").find(".font_family").css({'color':'#CDD7E0'});
    }

    //游戏说明
    var gameIntroductionArr = (info.gameIntroduction).split("\n");
    for(var i=0; i<gameIntroductionArr.length; i++){
        if(gameIntroductionArr[i] == ""){
            $(".game_layer_introduction_txt ul").append("</br>");
        }else{
            $(".game_layer_introduction_txt ul").append("<li>"+gameIntroductionArr[i]+"</li>");
        }
    }	
   
    //是否支持积分
    $("#canUseIntegral").val(info.canUseIntegral);
    $('#usedIntegral').text(info.usedIntegral);
    if (info.canUseIntegral == 0) {
        $("#integralPlay").hide();
    }
    //初始游戏图片
    gamePicInit(info.puzzleImgUrl);
    //奖品列表
    var prizeList = info.prizeList;
    if (prizeList) {
        var prizeListHtml = "";
        for (var i = 0; i < prizeList.length; i++) {
            var j = prizeList[i].rankBegin;
            var k = prizeList[i].rankEnd;
            for (; j <= k; j++) {
                prizeMap[j] = prizeList[i];
            }
            prizeListHtml += `
                <li>
                    <span style="vertical-align: middle;">第
                    ${(prizeList[i].rankBegin == prizeList[i].rankEnd ? prizeList[i].rankBegin : (prizeList[i].rankBegin + "-" + prizeList[i].rankEnd))}
                    名</span>
                    <img src="${prizeList[i].prizeImgUrl}?imageView2/0/w/150/h/150"/>
                    <div class="game_layer_prize_list_tdtxt">
                        <h5>${prizeList[i].awardName}</h5>
                        <p style="color:#EC3C65;">${prizeList[i].prizeName}</p>
                    </div>
                </li>`
        }
        $(".game_layer_prize_list").html(prizeListHtml);
    }
    //游戏状态 0未开始 1进行中 2结束
    $(".btn_nostart").hide();
    $(".btn_begin").hide();
    $(".btn_end_all").hide();
    if (info.activityStatus == 0) {
        $(".btn_nostart").show();
        initTimer(info.gameStartTime);
        $(".game_layer_prize_me").html("当前名次对应：无排名");
    }
    if (info.activityStatus == 1) {
        $(".btn_begin").show();
        $(".game_layer_prize_me").html("当前名次对应：无排名");			
    }
    if (info.activityStatus == 2) {
        $(".btn_end_all").show();
        //未结算
        if (info.balanceStatus == 0) {
            $(".game_over_prize").text("正在颁奖中");
            $(".game_layer_prize_me").html("当前名次对应：正在颁奖中");
        }
        //已结算
        if (info.balanceStatus == 1) {
            if (info.gameWinPrize == undefined || info.gameWinPrize.prizeId == "-1") {
                $(".game_over_prize").text("未获奖");
                $(".game_layer_prize_me").html("当前名次对应：未获奖");
            } else {
                $(".game_over_prize").text(
                        "我获得了" + info.gameWinPrize.prizeName);
                $(".game_layer_prize_me").html(
                        "当前名次对应：<span>" + info.gameWinPrize.awardName
                                + "</span>&nbsp;&nbsp;"
                                + info.gameWinPrize.prizeName);
            }
        }
    }
};
// 微信分享
var initWx = function (info) {
  var shareSetting = info.shareSetting;
  if (!shareSetting) {
    shareSetting = {}
  }
  var shareData = {
    title: shareSetting.shareTitle || '您的好友邀请你一起来玩拼图游戏~',
    link: info.shareLink,
    imgUrl: shareSetting.shareImgUrl,
    desc: shareSetting.shareTextInfo || '玩游戏，赠送体力，pk好友，赢大奖！'
  };
  if (shareSetting.shareImgUrl && shareData.imgUrl.indexOf('http') !== 0) {
    shareData.imgUrl = window.location.href.replace(/pages\/ptyx\/ptyx\.html.*$/, 'static/img/share/ptyx.png');
  }
  var wx_share = {
    init: function() {
      var self = this;
      $.ajax({
        url: window.location.origin + '/gicfwh/puzzle-weixin-jsapi',
        data: {
          url: window.location.href,
          memberId: memberId
        },
        type: 'post',
        dataType: 'json',
        success: function (res) {
          var configMap = JSON.parse(JSON.parse(res.result));
          var config = {};
          config.debug = false;
          config.appId = configMap.appId;
          config.timestamp = configMap.timestamp;
          config.nonceStr = configMap.nonceStr;
          config.signature = configMap.signature;
          if (info.shareFlag) {
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
          $('.game_layer_share').hide();
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
          $('.game_layer_share').hide();
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
          $('.game_layer_share').hide();
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
          $('.game_layer_share').hide();
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
          $('.game_layer_share').hide();
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      });
    }
  }
  wx_share.init();
  // 这里等微信加载好了再播放音乐
  initMusic(info);
};


var initMusic = function (info) {
        // 音乐设置
    if(info.musicFlag) {
        var musicHtml = '';
        if (info.musicAutoPlay) {
            musicHtml = `<audio id="music" src="${info.gameMusic.musicUrl || ''}"  autoplay="autoplay" loop="loop">你的浏览器不支持audio标签。</audio>`;
            $('.musicWrap').html(musicHtml);
            $(".game_imusic").addClass('rotate');
            var audio = $('#music')[0];
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play(); 
            }, false);
        } else {
            musicHtml = `<audio id="music" src="${info.gameMusic.musicUrl || ''}"  loop="loop">你的浏览器不支持audio标签。</audio>`;
            $(".game_imusic").children("i").addClass("icon-yinletingzhi24px").removeClass("icon-yinle");
            $('.musicWrap').html(musicHtml);
        }
    } else {
        $('.game_imusic').hide();
    }
};


// 如果   出现活动倒计时
// activityStatus==0
//距离活动开始的倒计时 start


var initTimer = function(time_end) {
    var time_now_server, time_now_client, time_end, time_server_client, timerID;
    // time_end = new Date($("#timer").text() + " 00:00:00"); //结束的时间  
    // time_end = time_end.getTime();
    time_now_server = new Date(); //开始的时间  
    time_now_server = time_now_server.getTime();

    time_now_client = new Date();
    time_now_client = time_now_client.getTime();

    time_server_client = time_now_server - time_now_client;

    function show_time() {

        var timer = document.getElementById("timer");
        console.log(timer)
        if (!timer) {
            return;
        }

        timer.innerHTML = time_server_client;

        var time_now, time_distance, str_time;
        var int_day, int_hour, int_minute, int_second;
        var time_now = new Date();
        time_now = time_now.getTime() + time_server_client;
        time_distance = time_end - time_now;
        if (time_distance > 0) {
            //int_day = Math.floor(time_distance / 86400000)
            //time_distance -= int_day * 86400000;
            int_hour = Math.floor(time_distance / 3600000)
            time_distance -= int_hour * 3600000;
            int_minute = Math.floor(time_distance / 60000)
            time_distance -= int_minute * 60000;
            int_second = Math.floor(time_distance / 1000)

            if (int_hour < 10)
                int_hour = "0" + int_hour;
            if (int_minute < 10)
                int_minute = "0" + int_minute;
            if (int_second < 10)
                int_second = "0" + int_second;

            if (int_hour > 24) {
                str_time = Math.floor(int_hour / 24) + "天";
            } else if(int_hour > 1) {
                str_time = int_hour + "小时";
            } else if (int_hour <= 1) {
            	str_time = int_minute + "分钟";
            }
            timer.innerHTML = str_time;
            setTimeout("show_time()", 1000);
        } else {
            timer.innerHTML = timer.innerHTML;
            clearTimeout(timerID)
        }
    }
    show_time();
}


/*
    * 初始根据屏幕的大小加载不同的图片
    * 屏幕高度<500 180*240
    * 屏幕高度500~600 240*320
    * 屏幕高度>600 264*352
    */
var gamePicInit = function(gamepicurl) {
    console.log($(window).height())
    if ($(window).height() < 500) {
        var ALeft = "54";
        var BTop = "54";
        $(".game_picture_cover img").attr("src",
                gamepicurl + "?imageView2/0/w/216/h/162");
        $(".pic").css(
                "background",
                "url(\"" + gamepicurl
                        + "?imageView2/0/w/216/h/162\") no-repeat");
        $(".game_picture").css("height", "328px");
        $(".game_picture_inner").css("height", "226px");
        $(".pic1").css({
            "background-position" : "0px 0px",
            "left" : "0px",
            "top" : '0px'
        })
        $(".pic2").css({
            "background-position" : "-54px 0px",
            "left" : ALeft + "px",
            "top" : '0px'
        })
        $(".pic3").css({
            "background-position" : "-108px 0px",
            "left" : ALeft * 2 + "px",
            "top" : '0px'
        })
        $(".pic4").css({
            "background-position" : "0px -54px",
            "left" : 0 + "px",
            "top" : BTop + "px"
        })
        $(".pic5").css({
            "background-position" : "-54px -54px",
            "left" : ALeft + "px",
            "top" : BTop + "px"
        })
        $(".pic6").css({
            "background-position" : "-108px -54px",
            "left" : ALeft * 2 + "px",
            "top" : BTop + "px"
        })
        $(".pic7").css({
            "background-position" : "0px -108px",
            "left" : 0 + "px",
            "top" : BTop * 2 + "px"
        })
        $(".pic8").css({
            "background-position" : "-54px -108px",
            "left" : ALeft + "px",
            "top" : BTop * 2 + "px"
        })
        $(".pic9").css({
            "background-position" : "-108px -108px",
            "left" : ALeft * 2 + "px",
            "top" : BTop * 2 + "px"
        })
        $(".pic10").css({
            "background-position" : "0px -162px",
            "left" : 0 + "px",
            "top" : BTop * 3 + "px"
        })
        $(".pic11").css({
            "background-position" : "-54px -162px",
            "left" : ALeft + "px",
            "top" : BTop * 3 + "px"
        })
        $(".pic12").css({
            "background-position" : "-108px -162px",
            "left" : ALeft * 2 + "px",
            "top" : BTop * 3 + "px"
        })
    };
    if ($(window).height() >= 500 && $(window).height() <= 600) {
        var ALeft = "73";
        var BTop = "73";
        $(".game_picture_cover img").attr("src",
                gamepicurl + "?imageView2/0/w/292/h/219");
        $(".pic").css(
                "background",
                "url(\"" + gamepicurl
                        + "?imageView2/0/w/292/h/219\") no-repeat");
        $(".game_picture").css("height", "402px");
        $(".game_picture_inner").css("height", "302px");
        $(".pic1").css({
            "background-position" : "0px 0px",
            "left" : "0px",
            "top" : '0px'
        })
        $(".pic2").css({
            "background-position" : "-73px 0px",
            "left" : ALeft + "px",
            "top" : '0px'
        })
        $(".pic3").css({
            "background-position" : "-146px 0px",
            "left" : ALeft * 2 + "px",
            "top" : '0px'
        })
        $(".pic4").css({
            "background-position" : "0px -73px",
            "left" : 0 + "px",
            "top" : BTop + "px"
        })
        $(".pic5").css({
            "background-position" : "-73px -73px",
            "left" : ALeft + "px",
            "top" : BTop + "px"
        })
        $(".pic6").css({
            "background-position" : "-146px -73px",
            "left" : ALeft * 2 + "px",
            "top" : BTop + "px"
        })
        $(".pic7").css({
            "background-position" : "0px -146px",
            "left" : 0 + "px",
            "top" : BTop * 2 + "px"
        })
        $(".pic8").css({
            "background-position" : "-73px -146px",
            "left" : ALeft + "px",
            "top" : BTop * 2 + "px"
        })
        $(".pic9").css({
            "background-position" : "-146px -146px",
            "left" : ALeft * 2 + "px",
            "top" : BTop * 2 + "px"
        })
        $(".pic10").css({
            "background-position" : "0px -219px",
            "left" : 0 + "px",
            "top" : BTop * 3 + "px"
        })
        $(".pic11").css({
            "background-position" : "-73px -219px",
            "left" : ALeft + "px",
            "top" : BTop * 3 + "px"
        })
        $(".pic12").css({
            "background-position" : "-146px -219px",
            "left" : ALeft * 2 + "px",
            "top" : BTop * 3 + "px"
        })
    };
    if ($(window).height() > 600) {
        var ALeft = "80";
        var BTop = "80";
        $(".game_picture_cover img").attr("src",
                gamepicurl + "?imageView2/0/w/320/h/240");
        $(".pic").css(
                "background",
                "url(\"" + gamepicurl
                        + "?imageView2/0/w/320/h/240\") no-repeat");
        $(".game_picture").css("height", "460px");
        $(".game_picture_inner").css("height", "330px");
        $(".pic1").css({
            "background-position" : "0px 0px",
            "left" : "0px",
            "top" : '0px'
        })
        $(".pic2").css({
            "background-position" : "-80px 0px",
            "left" : ALeft + "px",
            "top" : '0px'
        })
        $(".pic3").css({
            "background-position" : "-160px 0px",
            "left" : ALeft * 2 + "px",
            "top" : '0px'
        })
        $(".pic4").css({
            "background-position" : "0px -80px",
            "left" : 0 + "px",
            "top" : BTop + "px"
        })
        $(".pic5").css({
            "background-position" : "-80px -80px",
            "left" : ALeft + "px",
            "top" : BTop + "px"
        })
        $(".pic6").css({
            "background-position" : "-160px -80px",
            "left" : ALeft * 2 + "px",
            "top" : BTop + "px"
        })
        $(".pic7").css({
            "background-position" : "0px -160px",
            "left" : 0 + "px",
            "top" : BTop * 2 + "px"
        })
        $(".pic8").css({
            "background-position" : "-80px -160px",
            "left" : ALeft + "px",
            "top" : BTop * 2 + "px"
        })
        $(".pic9").css({
            "background-position" : "-160px -160px",
            "left" : ALeft * 2 + "px",
            "top" : BTop * 2 + "px"
        })
        $(".pic10").css({
            "background-position" : "0px -240px",
            "left" : 0 + "px",
            "top" : BTop * 3 + "px"
        })
        $(".pic11").css({
            "background-position" : "-80px -240px",
            "left" : ALeft + "px",
            "top" : BTop * 3 + "px"
        })
        $(".pic12").css({
            "background-position" : "-160px -240px",
            "left" : ALeft * 2 + "px",
            "top" : BTop * 3 + "px"
        })
    };
}
function setTitle(title) {
  document.title = title;
  var userAgent = window.navigator.userAgent.toLowerCase();
  var isiOS = userAgent.indexOf('applewebkit') >= 0;
  var isWechat = userAgent.indexOf('micromessenger') >= 0;
  if (isiOS && isWechat) {
    var iframe = document.createElement('iframe');
    // iframe.src = 'https://www.baidu.com/favicon.ico';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.onload = function () {
      setTimeout(function () {
        iframe.remove();
      }, 0)
    }
  }
}
