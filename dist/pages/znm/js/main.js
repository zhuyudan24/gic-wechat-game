window.alertOverwrite = function(a) {
  getE("contentpage").innerHTML = a;
  getE("alert").style.display = "block";
};
window.closeAlert = function() {
  getE("alert").style.display = "none";
};
$(".close_act").click(function() {
  $("#activi_over").hide();
});
$(".close_tit").click(function() {
  $("#times_out").hide();
});
$(".to_prize").click(function() {
  prizeList(0);
});
// 放弃领券
$(".give_up_coupon").click(function() {
  $("#couponNoMember").hide();
});
// 开卡
$(".create_card").click(function() {
  // window.open(gameData.prizeLink)
  window.location.href =
    "game-getprize-np?attendRecordId=" +
    gameData.attendRecordId +
    "&gicRedirect=true";
});
//未开始 已结束 点击隐藏
$(".game_notstart_cancel").click(function() {
  $(this)
    .closest(".page")
    .hide();
});
//
$(".jdv_shop").click(function() {
  window.open(gameData.shopLink);
});
$("#share").click(function() {
  $("#share").hide();
});
$(".p_close").click(function() {
  $("#prize").hide();
});

$(".to_rule,.get_rule").click(function() {
  $("#rule").show();
});

$(".r_close").click(function() {
  $("#rule").hide();
});
$("#f_lott_close").click(function() {
  $("#f_lottery").hide();
});
$("#s_lott_close,#s_lott_close1").click(function() {
  $("#s_lottery").hide();
});
$("#back_home,.close_no_p").click(function() {
  $("#no_prize").hide();
});
$("#code").click(function() {
  $("#code").hide();
});
$(".code_im").click(function() {
  $("#code").show();
});

$(".to_rank").click(function() {
  rank(0);
});

$(".close_rank").click(function() {
  $("#rank").hide();
});


function rank(a) {
  rankData(a, function(b) {
    var res = b.result;
    if (0 == b.errorCode) {
      for (var d = "", c, e = 0; e < res.data.length; e++) {
        c = e + 1 + a;
        var f = res.data[e].u_nick;
        5 < f.length && (f = f.substring(0, 5) + "**");
        c =
          1 == c
            ? '<p><img src="images/game-znm/one.png" alt=""></p>'
            : 2 == c
            ? '<p><img src="images/game-znm/two.png" alt=""></p>'
            : 3 == c
            ? '<p><img src="images/game-znm/three.png" alt=""></p>'
            : "<p>" + c + "</p>";
        d +=
          "<li>" +
          c +
          "<p>" +
          f +
          "</p><p>" +
          res.data[e].u_max +
          "件</p></li>";
      }
      "" != d && (isloading1 = !1);
      0 == a ? $(".rank_list ul").html(d) : $(".rank_list ul").append(d);
      $("#rank").show();
    } else alertOverwrite(b.message);
  });
}

function use_prize(a, b, d) {
  $(".pri_name").html(a);
  $(".prize_rule").html(d);
  clearCanvas();
  a = {
    output: "canvas",
    bgColor: "#fff",
    color: "#000",
    barWidth: 2,
    barHeight: 75,
    fontSize: 16,
    x: 1,
    y: 1,
    posX: 1,
    posY: 1
  };
  $("#canvasTarget")
    .show()
    .barcode(b, "code128", a);
  clearCanvas();
  $("#canvasTarget")
    .show()
    .barcode(b, "code128", a);
  $("#use_prize").show();
}

function clearCanvas() {
  var a = $("#canvasTarget").get(0),
    b = a.getContext("2d");
  b.lineWidth = 1;
  b.lineCap = "butt";
  b.fillStyle = "#FFFFFF";
  b.strokeStyle = "#000000";
  b.clearRect(0, 0, a.width, a.height);
  b.strokeRect(0, 0, a.width, a.height);
}
var isloading1 = !1,
  h_top = 0,
  h_type = -1;
$(".rank_list").scroll(function() {
  if (isloading1) return !1;
  console.log(1);
  var a = $(this).height(),
    b = $(this)[0].scrollHeight;
  $(this)[0].scrollTop + a >= b - 20 &&
    ((isloading1 = !0),
    (h_top += 50),
    rank(h_top),
    console.log("\u52a0\u8f7d\u4e2d"));
});

var isloading2 = !1,
  h_top2 = 0,
  h_type2 = -1;
$(".coupon_list").scroll(function() {
  if (isloading2) return !1;
  console.log(1);
  var a = $(this).height(),
    b = $(this)[0].scrollHeight;
  $(this)[0].scrollTop + a >= b - 20 &&
    ((isloading2 = !0),
    (h_top2 += 10),
    prizeList(h_top2),
    console.log("\u52a0\u8f7d\u4e2d"));
});

function prizeList(a) {
  prizeListData(a, function(b) {
    var res = b.result;
    if (0 == b.errorCode) {
      for (var d = "", c, e = 0; e < res.data.length; e++) {
        c = e + 1 + a;
        var h = "";
        if (res.data[e].prize_id == "-1") {
          h +=
            '<div class="coupon_item coupon_item_noget"><p class="coupon_noname">消费现金券</p>';
        } else {
          h +=
            '<div class="coupon_item coupon_item_noget"><p class="coupon_total"><span class="coupon_num">' +
            res.data[e].prize_value +
            '</span><span class="coupon_kind">' +
            res.data[e].prize_name +
            "</span></p>";
        }
        if (res.data[e].prize_status == 1) {
          h +=
            '<span class="coupon_todo" val="' +
            res.data[e].attend_id +
            '">立即<br />领取</span></div>';
        } else {
          h += '<span class="coupon_img_alreadyget"></span></div>';
        }
        d += h;
      }
      "" != d && (isloading2 = !1);
      0 == a ? $(".coupon_list").html(d) : $(".coupon_list").append(d);
      $("#couponAlreadyMember").show();
    } else alertOverwrite(b.message);
  });
}

$(".coupon_list").on("click", ".coupon_todo", function() {
  gameData.attendRecordId = $(this).attr("val");
  prizeData();
});
