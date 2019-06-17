$(function() {
		//开始游戏按钮
		$(".christmas_jigsaw_btn_begin").on("touchstart", function() {
			$(".christmas_jigsaw_body").css("display", "none");
			$(".christmas_jigsalaw_game").css("display", "block");
			$.ajax({
				type: "GET",
				url: "js/dev/game/puzzle/christmas-game.js",
				dataType: "script"
			});
		});
		//点击排行榜按钮
		$(".christmas_jigsaw_btn_other_rank").on("touchstart", function() {
			showRank();
		});
		$(".game_layer_success_rank").on("touchstart", function() {
			showRank();
		});
		$(".game_layer_rank_title_list").on("touchstart", function() {
			if($(".rank_tab_div", $(this)).is(':hidden')){
				showRank();
			}		
		});
		
		function limitLength(value, byteLength) {
			//表示匹配非单字节的字符,用**替换
			var newvalue = value.replace(/[^\x00-\xff]/g, "**");			
			var length = newvalue.length;

			//当填写的字节数小于设置的字节数 
			if(length * 1 <= byteLength * 1) {
				return;
			}
			var limitDate = newvalue.substr(0, byteLength);
			var count = 0;
			var limitvalue = "";
			for(var i = 0; i < limitDate.length; i++) {
				var flat = limitDate.substr(i, 1);
				if(flat == "*") {
					count++;
				}
			}
			var size = 0;
			var istar = newvalue.substr(byteLength * 1 - 1, 1); //校验点是否为“×” 

			//if 基点是×; 判断在基点内有×为偶数还是奇数  
			if(count % 2 == 0) {
				//当为偶数时 
				size = count / 2 + (byteLength * 1 - count);
				limitvalue = value.substr(0, size) + "...";
			} else {
				//当为奇数时 
				size = (count - 1) / 2 + (byteLength * 1 - count);
				limitvalue = value.substr(0, size) + "...";
			}
			return limitvalue;
		}
		
		var showRank = function(){
			$('body').unbind('touchstart');
			$(".game_layer_rank").css("display", "block");
			$(".rank_tab_div_rank").css("display", "block");
			$(".rank_tab_div_prize").css("display", "none");
			$(".game_layer_rank_list").css("display", "block");
			$(".game_layer_prize_list").css("display", "none");
			$.ajax({
				type : "POST",
				url : "game-rank-list",
				data : {activityId: $("#activityId").val(), currentPage:1},
				dataType : "json",
				success : function(msg) {
					if (msg.res == "ok") {
						var rankListHtml = "";
						var info = msg.info;
						for (var i = 0; i < info.length; i++) {					
							rankListHtml = rankListHtml + "<tr>";
							if(i == 0){
								rankListHtml = rankListHtml + "<td><svg class=\"icon\" aria-hidden=\"true\" style=\"font-size: 30px;\">" +
										"<use xlink:href=\"#icon-jinpai\"></use>"+
									"</svg></td>";
							}else if(i == 1){
								rankListHtml = rankListHtml + "<td><svg class=\"icon\" aria-hidden=\"true\" style=\"font-size: 30px;\">" +
										"<use xlink:href=\"#icon-yinpai\"></use>"+
									"</svg></td>";
							}else if(i == 2){
								rankListHtml = rankListHtml + "<td><svg class=\"icon\" aria-hidden=\"true\" style=\"font-size: 30px;\">" +
										"<use xlink:href=\"#icon-tongpai\"></use>"+
									"</svg></td>";
							}else{
								rankListHtml = rankListHtml + "<td>NO." + (i+1)+ "</td>";
							}
							var photourl = "images/head_default.jpg";
							if(info[i].memberPhotoUrl!= undefined && info[i].memberPhotoUrl!=""){
								photourl = info[i].memberPhotoUrl.substring(0,info[i].memberPhotoUrl.length-1) + "96";
							}
							rankListHtml = rankListHtml + "<td class=\"game_layer_rank_list_tdimg\"><img src=\""+ photourl + "\" /></td>";
							var memberName = "匿名玩家";
							if(info[i].memberName!= undefined && info[i].memberName!=""){
								memberName = info[i].memberName;
							}
							var memberNameLen = memberName.length;
							if (memberNameLen>5)
								memberName = memberName.substr(0, 5) + "...";
							rankListHtml = rankListHtml + "<td>"+ memberName +"</td>"+
							"<td>"+(info[i].gameScore/100)+"</td>"+
							"</tr>";
						}
						$(".game_layer_rank_list_table tbody").html(rankListHtml);
						$("#me_bestrank").text(msg.bestrank);
					}
				}
			});
		}
		
		//排行榜关闭
		$(".game_layer_rank_title_close").on("touchstart", function() {
			$(".game_layer_rank").css("display", "none");
		});
		//点击查看奖品按钮
		$(".christmas_jigsaw_btn_prize_rank").on("touchstart", function() {
			$(".rank_tab_div_rank").css("display", "none");
			$(".rank_tab_div_prize").css("display", "block");
			$(".game_layer_rank_list").css("display", "none");
			$(".game_layer_prize_list").css("display", "block");
			$(".game_layer_rank").css("display", "block");
		});
		//查看奖品关闭
		$(".game_layer_rank_title_close").on("touchstart", function() {
			$(".christmas_jigsalaw_game_layer_cover_auto").css("display", "none");
			$(".game_layer_rank").css("display", "none");
		});
		//活动说明按钮
		$(".christmas_jigsaw_title_bottom").on("touchstart", function() {
			$(".christmas_jigsalaw_game_layer_cover").css("display", "block");
			$(".game_layer_introduction").css("display", "block");
		});
		//活动说明关闭
		$(".game_layer_introduction_close").on("touchstart", function() {
			$(".christmas_jigsalaw_game_layer_cover").css("display", "none");
			$(".game_layer_introduction").css("display", "none");
		});
		//成功弹出层的关闭按钮
		$(".christmas_jigsalaw_game_layer_inner_close").on("touchstart", function() {
			//遮罩层
			$(".christmas_jigsalaw_game_layer_cover").css("display", "none");
			//提示框
			$(".christmas_jigsalaw_game_layer_success").css("display", "none");
		});
		//成功弹出层的排行榜弹出按钮
		$(".game_layer_success_rank").on("touchstart", function() {
			$(".game_layer_rank").css("display", "block");
			$(".rank_tab_div_rank").css("display", "block");
			$(".rank_tab_div_prize").css("display", "none");
			$(".game_layer_rank_list").css("display", "block");
			$(".game_layer_prize_list").css("display", "none");
		});

		//分享弹出层的关闭
		$(".game_layer_share").on("touchstart", function() {
			$(".game_layer_share").css("display", "none");
		});
		//游戏挑战成功，积分为0弹出层
		/*$(".christmas_jigsalaw_game_layer_inner_title img").on("touchstart", function() {
			$(".christmas_jigsaw_game_inner_btn_rest_inner svg use").attr("xlink:href", "#icon-huiseaixin");
			$(".game_success_full").css("display", "none");
			$(".game_success_empty").css("display", "block");
		});*/

		//点击分享按钮
		$(".christmas_jigsaw_game_btn_share").on("touchstart", function() {
			$(".game_layer_share").css("display", "block");
		});

		//游戏分享页面关闭--------------------------------------------实验
		$(".share_company_logo").on("touchstart", function() {
			$(".christmas_share_body").css({
				"display": "none"
			})
		});
		//没有体力的页面----------------------------------------------实验
		/*$(".christmas-evpi-hd").on("touchstart", function() {
			$(".game_layer_physical").css("display", "block")
		});*/
		//没有体力的页面关闭
		$(".game_layer_overtime_inner_close img").on("touchstart", function() {
			$(".game_layer_physical").css("display", "none")
		});
		//超时未完成页面------------------------------------实验
		/*$(".christmas_jigsaw_title_top").on("touchstart", function() {
			$(".game_layer_overtime").css("display", "block")
		});*/
		//超时未完成页面关闭------------------------------------实验
		$(".game_layer_overtime_inner_close img").on("touchstart", function() {
			$(".game_layer_overtime").css("display", "none");
		})
		//没有积分页面---------------------------------------------实验
		/*$(".game_layer_overtime_inner_title img").on("touchstart", function() {
			$(".game_layer_no_intergal").css("display", "block");
		});*/
		//没有积分页面关闭---------------------------------------------实验
		$(".game_layer_overtime_inner_close img").on("touchstart", function() {
			$(".game_layer_no_intergal").css("display", "none");
		});
		//成功弹出层分享按钮
		$(".game_layer_success_share").on("touchstart", function() {
			//	$(".christmas_jigsalaw_game_layer_cover").css("display", "block");
			$(".game_layer_share").css("display", "block");
		});
		//成功弹出层再玩一次的按钮
		/*$(".game_layer_success_again").on("touchstart", function() {
			//遮罩层
			$(".christmas_jigsalaw_game_layer_cover").css("display", "none");
			//提示框
			$(".christmas_jigsalaw_game_layer_success").css("display", "none");
			//没有体力的页面
			$(".game_layer_physical").css("display", "none");
			//超时的页面
			$(".game_layer_overtime").css("display", "none");
			//时间恢复为0.00
			$("#times").html("0.00");
		});*/
	})
	/*
	 * 排行榜和奖品的tab切换
	 */
$(function() {

	function switab(tab, con, don, tab_c_css, tab_n_css, no) {
		$(tab).each(function(i) {
			if(i == no) {
				$(this).addClass(tab_c_css);
			} else {
				$(this).removeClass(tab_c_css);
				$(this).addClass(tab_n_css);
			}
		})
		if(con) {
			$(con).each(function(i) {
				if(i == no) {
					$(this).css({
						"display": "block"
					});
				} else {
					$(this).css({
						"display": "none"
					});
				}
			})
		}
		if(don) {
			$(don).each(function(i) {
				if(i == no) {
					$(this).css({
						"display": "block"
					});
				} else {
					$(this).css({
						"display": "none"
					});
				}
			})
		}
	}

	var couponsNavbarTab = $(".game_layer_rank_title_list_item");
	$.each(couponsNavbarTab, function(i) {
		$(this).on("touchstart", function() {
			switab(couponsNavbarTab, ".game_layer_rank_list_item", ".rank_tab_div", "", "", i)
		})
	});
});
//$("#audio_btn").click(function(){ 
//  var music = document.getElementById("music"); 
//  if(music.paused){ 
//      music.play(); 
//      $("#music_btn").attr("src","play.gif"); 
//  }else{ 
//      music.pause(); 
//      $("#music_btn").attr("src","pause.gif"); 
//  } 
//}); 
/*
 * 音乐旋转
 */
$(function() {
		//初始角度
		var degree = 0,
			xuan;
		var bolR = false;
		//单次旋转
		function singleRotate() {
			//一次增加1度
			degree++;
			$(".game_imusic").css("transform", "rotate(" + degree + "deg)");
		}
		xuan = setInterval(singleRotate, 10);
		$(".game_imusic").on("touchstart", function() {
			if(bolR) {
				$("#music")[0].play();
				$(".game_imusic").children("img").attr("src","images/game/game_music_icon.png");
				xuan = setInterval(singleRotate, 10)
				bolR = false;
			} else {
				$("#music")[0].pause();
				$(".game_imusic").css("transform", "rotate(" + 0 + "deg)");
				$(".game_imusic").children("img").attr("src","images/game/game_music_close_icon.png");
				degree = 0;
				clearInterval(xuan);
				bolR = true;
			}
		});
	})
	