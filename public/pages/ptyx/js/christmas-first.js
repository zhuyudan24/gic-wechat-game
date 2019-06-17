$(function() {
		//开始游戏按钮
		$("#firstgame").on("touchstart", function() {
			// 判断门槛
			service('POST',"check-game-play-permission",`activityId=${activityId}&memberId=${memberId}`,'json').then(res => {
				console.log(res);
				if (res.result.res === 'ok') {
					$(".body").css("display", "none");
					$(".game").css("display", "block");
					$.ajax({
						type: "GET",
						url: "./js/christmas-game.js",
						dataType: "script"
					});
				} else {
					$(".game_layer_permission").css("display", "block");
				}
			});
		});

		$(".game_layer_success_rank").on("touchstart", function() {
			showRank();
		});

		$(".game_layer_rank_title_list").on("touchstart", function() {
			if($(".rank_tab_div", $(this)).is(':hidden')){
				showRank();
			}
		});
		//点击排行榜按钮
		$("#rank_list").on("touchstart", function() {
			showRank();
		});
		//点击奖品按钮
		$("#prize_list").on("touchstart", function() {
			showPrize();
		});
		//排行榜关闭
		$(".game_layer_rank_close").on("touchstart", function() {
			$(".game_layer_rank").css("display", "none");
		});

		//查看奖品
		$(".game_layer_prize_close").on("touchstart", function() {
			$(".game_layer_prize").css("display", "none");
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
			$.ajax({
				type : "POST",
				url :baseUrl + "puzzle-game-rank-list",
				data : {activityId: activityId, currentPage:1,memberId:memberId},
				dataType : "json",
				success : function(msg) {
					if (msg.result.res == "ok") {
						var rankListHtml = "";
						var info = msg.result.info;
						// var info = Array(100);
						// var info = info.fill(msg.result.info[0]);

						for (var i = 0; i < info.length; i++) {					
							rankListHtml = rankListHtml + "<li>";
							if(i == 0){
								rankListHtml = rankListHtml + `<span class="game_layer_rank_list_rank">
								<i class="font_family ${skinType === 1 ? 'icon-jin' : 'icon-ziyuan1'}"  style="font-size: 30px;color:#ffd700;">
								</i></span>`;
							}else if(i == 1){
								rankListHtml = rankListHtml + `<span class="game_layer_rank_list_rank">
								<i class="font_family ${skinType === 1 ? 'icon-yin' : 'icon-ziyuan1'}"  style="font-size: 30px;color:#c0c0c0;">
								</i></span>`;
							}else if(i == 2){
								rankListHtml = rankListHtml + `<span class="game_layer_rank_list_rank">
								<i class="font_family ${skinType === 1 ? 'icon-tong' : 'icon-ziyuan5'}"  style="font-size: 30px;color:#efc688;">
								</i></span>`;
							}else{
								rankListHtml = rankListHtml + `<span class="game_layer_rank_list_rank">NO.${i+1}</span>`;
							}
							var photourl = "images/game/head_default.png";
							if(info[i].memberPhotoUrl!= undefined && info[i].memberPhotoUrl!=""){
								photourl = info[i].memberPhotoUrl.substring(0,info[i].memberPhotoUrl.length-1) + "96";
							}
							rankListHtml = rankListHtml + `<span class="game_layer_rank_list_name"><img src="${photourl}"/>`;
							var memberName = "匿名玩家";
							if(info[i].memberName!= undefined && info[i].memberName!=""){
								memberName = info[i].memberName;
							}
							var memberNameLen = memberName.length;
							if (memberNameLen > 5) {
								memberName = memberName.substr(0, 5) + "...";
							}
							rankListHtml = rankListHtml + `${memberName}</span>
							<span class="game_layer_rank_list_score"><span class="fz14">${info[i].gameScore/100}</span> 秒</span>
							</li>`;
						}
						$(".game_layer_rank_list").html(rankListHtml);
						$("#me_bestrank").text(msg.result.bestrank);
					}
				}
			});
		}
		var showPrize = function() {
			$('body').unbind('touchstart');
			$(".game_layer_prize").css("display", "block");
		}
		

		//活动说明按钮
		$(".title_bottom").on("touchstart", function() {
			$(".game_layer_cover").css("display", "block");
			$(".game_layer_introduction").css("display", "block");
		});
		//活动说明关闭
		$(".game_layer_introduction_close").on("touchstart", function() {
			$(".game_layer_cover").css("display", "none");
			$(".game_layer_introduction").css("display", "none");
		});
		//成功弹出层的关闭按钮
		$(".game_layer_inner_close").on("touchstart", function() {
			//遮罩层
			$(".game_layer_cover").css("display", "none");
			//提示框
			$(".game_layer_success").css("display", "none");
		});
		//成功弹出层的排行榜弹出按钮
		$(".game_layer_success_rank").on("touchstart", function() {
			$(".game_layer_rank").css("display", "block");
		});
		//门槛关闭
		$(".game_layer_permission_close").on("touchstart", function() {
			$(".game_layer_permission").css("display", "none");
		});
		

		//分享弹出层的关闭
		$(".game_layer_share").on("touchstart", function() {
			$(".game_layer_share").css("display", "none");
		});
		//游戏挑战成功，积分为0弹出层
		/*$(".game_layer_inner_title img").on("touchstart", function() {
			$(".game_inner_btn_rest_inner svg use").attr("xlink:href", "#icon-huiseaixin");
			$(".game_success_full").css("display", "none");
			$(".game_success_empty").css("display", "block");
		});*/

		//点击分享按钮
		$(".game_btn_share").on("touchstart", function() {
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
		$(".game_layer_physical_inner_close").on("touchstart", function() {
			$(".game_layer_physical").css("display", "none")
		});
		//超时未完成页面------------------------------------实验
		/*$(".title_top").on("touchstart", function() {
			$(".game_layer_overtime").css("display", "block")
		});*/
		//超时未完成页面关闭------------------------------------实验
		$(".game_layer_overtime_inner_close").on("touchstart", function() {
			$(".game_layer_overtime").css("display", "none");
		})
		//没有积分页面---------------------------------------------实验
		/*$(".game_layer_overtime_inner_title img").on("touchstart", function() {
			$(".game_layer_no_intergal").css("display", "block");
		});*/
		//没有积分页面关闭---------------------------------------------实验
		$(".game_layer_no_intergal_inner_close").on("touchstart", function() {
			$(".game_layer_no_intergal").css("display", "none");
		});
		//成功弹出层分享按钮
		$(".game_layer_success_share").on("touchstart", function() {
			$(".game_layer_physical").css("display", "none");
			$(".game_layer_share").css("display", "block");
		});
		//成功弹出层再玩一次的按钮
		/*$(".game_layer_success_again").on("touchstart", function() {
			//遮罩层
			$(".game_layer_cover").css("display", "none");
			//提示框
			$(".game_layer_success").css("display", "none");
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
	var bolR = false;
	$(".game_imusic").on("touchstart", function() {
		if(bolR) {
			$("#music")[0].play();
			$(".game_imusic").addClass('rotate');
            $(".game_imusic").children("i").addClass("icon-yinle").removeClass("icon-yinletingzhi24px");
			bolR = false;
		} else {
			$("#music")[0].pause();
			$(".game_imusic").removeClass('rotate');
            $(".game_imusic").children("i").addClass("icon-yinletingzhi24px").removeClass("icon-yinle");
			bolR = true;
		}
	});
});