var isBegin = !1,
  isstart = !1,
  lastX = 0,
  lastY = 0,
  hinderBox,
  conY;
//分享成功
function shared(m) {
  // 去掉分享加游戏次数的功能
  // addTimes(function(g) {
  //   1 == g.result && ((gameData.game = 1), $("#share_add").hide());
  // });
}
(function() {
  //PanelsC.goto(str)  跳转到命名为str的界面
  function m() {
    PanelsC.goto("game");
    isBegin = !0;
  }
  //重置游戏 选图像页面
  function g() {
    h.timeC.gotoAndStop(0);
    k = isBegin = !1;
    d = 30;
    e = f = 0;
    a.con.y = 503.1;
    a.g_times.text = "30s";
    a.horse_num.text = "0/30";
    a.red_Q.visible = !1;
    var b = [
      64,
      62,
      60,
      13,
      46,
      48,
      49,
      45,
      48,
      32,
      22,
      5,
      62,
      44,
      57,
      48,
      4,
      33,
      19,
      18,
      10,
      33,
      59,
      35,
      64,
      11,
      1,
      34,
      31,
      12,
      43,
      36,
      65,
      40,
      13,
      23,
      12,
      69,
      3,
      14,
      68,
      56,
      44,
      55,
      13,
      3,
      28,
      9,
      25,
      16,
      66,
      52,
      65,
      1,
      19,
      2,
      29,
      2,
      26,
      44,
      8,
      42,
      53,
      49,
      51,
      60,
      30,
      35,
      56,
      4,
      9,
      13,
      61,
      18,
      27,
      51,
      6,
      20,
      61,
      5,
      59,
      70,
      21,
      49,
      65,
      53,
      71,
      53,
      6,
      55,
      11,
      24,
      37,
      15,
      56,
      10,
      52,
      47,
      42,
      61,
      65,
      55,
      17,
      67,
      54,
      58,
      50,
      62,
      3,
      61
    ];
    b.sort(function() {
      return 0.5 - Math.random();
    });
    console.log(a.con.children.length);
    for (var c = 0; c < a.con.children.length; c++)
      a.con.children[c].timeline
        ? ((a.con.children[c].mark.visible = !1),
          a.con.children[c].add_time.gotoAndStop(0),
          (a.con.children[c].add_time.visible = !1),
          a.con.children[c].redu_time.gotoAndStop(0),
          (a.con.children[c].redu_time.visible = !1),
          a.con.children[c].gotoAndStop(b[c]),
          a.con.children[c].addEventListener("click", n))
        : console.log("\u4e0d\u7b26\u5408\uff1a" + a.con.children[c]);
    p();
  }

  //canvas.addEventListener("touchstart", q);
  //获取 手指在canvas初始点击坐标
  function q(a) {
    lastY = event.touches[0].clientY;
    console.log(lastY + "aaaalastY");
  }

  //canvas.addEventListener("touchmove", r);
  //手指 在canvas上的 即时位置 进行判断,然后在最上面和最下面各有一个反弹的效果
  function r(b) {
    b.preventDefault();
    l = b.touches[0].clientY;
    console.log(l + "bbbbbl");
    a.con.y += l - lastY;
    512 <= a.con.y
      ? setTimeout(function() {
          a.con.y = 512;
        }, 200)
      : -2900 >= a.con.y &&
        setTimeout(function() {
          a.con.y = -2900;
        }, 200);
    lastY = l;
  }
  //a.con.children[c].addEventListener("click", n)
  //点击canvas上图片的事件处理 a.con 所有图片的集合
  function n(b) {
    console.log(b.currentTarget.currentFrame);
    var c = b.currentTarget.currentFrame;
    44 < c
      ? (70 != c && 71 != c && e++,
        (d += 1),
        (a.horse_num.text = e + "/30"),
        b.currentTarget.gotoAndStop(parseInt(72 * Math.random())),
        (b.currentTarget.mark.visible = !1),
        (b.currentTarget.add_time.visible = !0),
        b.currentTarget.add_time.gotoAndStop(0),
        b.currentTarget.add_time.play(),
        console.log(b.currentTarget.y),
        setTimeout(function() {
          b.currentTarget.add_time.visible = !1;
        }, 400))
      : (--d,
        console.log(b.currentTarget.y, a.con.y),
        (b.currentTarget.redu_time.visible = !0),
        b.currentTarget.redu_time.gotoAndStop(0),
        b.currentTarget.redu_time.play(),
        setTimeout(function() {
          b.currentTarget.redu_time.visible = !1;
        }, 400));
  }

  function t() {
    d -= 5;
    a.redu_5.visible = !0;
    a.redu_5.play();
    for (var b = 0; b < a.con.children.length; b++)
      if (44 < a.con.children[b].currentFrame) {
        a.con.children[b].mark.visible = !0;
        a.con.y = parseInt(conY - parseInt(a.con.children[b].y - 335));
        512 <= a.con.y
          ? setTimeout(function() {
              a.con.y = 512;
            }, 200)
          : -2900 >= a.con.y &&
            setTimeout(function() {
              a.con.y = -2900;
            }, 200);
        break;
      }
  }

  function p() {
    var b = setInterval(function() {
      isBegin &&
        (f++,
        f < d && (a.g_times.text = d - f + "s"),
        f >= d &&
          ((a.g_times.text = "0s"),
          clearInterval(b),
          k ||
            ((k = !0),
            30 <= e
              ? ($("#s_game").show(), $(".s_score").val(e + "件"))
              : ($("#f_game").show(),
                $(".g_score").val(e + "件"),
                $(".r_score").val(30 - e)),
            submitScore(e, function(a) {
              /*1 == a.result && $(".g_ranknum").val(a.data +
					"\u540d")*/
              0 == a.errorCode && $(".g_ranknum").val(a.result.data);
            }))));
    }, 1e3);
  }

  function u() {
    var b = a.redu_5;
    b.currentFrame == b.timeline.duration - 1 &&
      (a.redu_5.gotoAndStop(0), (a.redu_5.visible = !1));
    0 < d - f && 5 >= d - f
      ? ((a.red_Q.visible = !0), $("#tip")[0].play())
      : ((a.red_Q.visible = !1), $("#tip")[0].pause());
  }
  var d = 30,
    a,
    h;
  window.initGame = function() {
    stage.name = "stage";
    a = PanelsC.add("game", lib.gamePanel, 0, [["help", t]]);
    h = PanelsC.add("tip", lib.tipPanel, 0, [["hide_t", m]]);
    PanelsC.goto("game");
    h.timeC.stop();
    conY = a.con.y;
    console.log(conY);
    g();
    canvas.addEventListener("touchstart", q);
    canvas.addEventListener("touchmove", r);
    stage.update();
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener("tick", stage);
    stage.addEventListener("tick", u);
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  };
  $(".to_start,.to_game,.start_game").click(function() {
    //游戏未开始
    if (gameData.beginTime > new Date()) {
      $("#gameNotStart").show();
      return;
    }
    //游戏已经结束
    if (gameData.endTime < new Date()) {
      $("#gameAlreadytEnd").show();
      return;
    }
    // 未达到游戏参与门槛
    if (!gameData.canPlay) {
      $('#partakeSill').css('display', 'flex');
      return;
    }
    if (0 >= gameData.game) {
      // $("#share_add").show();
      alert('游戏次数已经用完了');
    } else {
      gameData.game--;
      $("#tip")[0].play();
      $("#tip")[0].pause();
      $(".page").hide();
      h.timeC.gotoAndStop(0);
      PanelsC.goto("tip", !0);
      var a = 0,
        c = setInterval(function() {
          h.timeC.gotoAndStop(a);
          console.log(a);
          a++;
          3 < a && (PanelsC.goto("game"), (isBegin = !0), clearInterval(c));
        }, 1e3);
    }
  });
  $(".g_close,.play_ag").click(function() {
    $(".page").hide();
    $("#home").show();
    g();
  });
  $(".close_use,.to_home,.back_index").click(function() {
    $(".page").hide();
    $("#home").show();
    g();
  });
  //领取奖券页面
  $(".get_tik").click(function() {
    //需要修改
    prizeData();
    /*prizeData(function(a) {
			use_prize(a.p_name, a.p_code, a.p_rule)
		})*/
  });
  $("#share_get").click(function() {
    $("#share_get").hide();
  });
  // $("#share_add").click(function() {
  //   $("#share_add").hide();
  // });
  document.getElementById("container");
  var l = 0,
    e = 0,
    f = 0,
    k = !1;
})();
