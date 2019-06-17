$(function() {
	$('body').on('touchstart', function(e) {
		e.preventDefault();
	});
	var opType = 1;
	var picbox = document.getElementById('picbox');
	var pic = document.querySelectorAll('.pic');
	var picWidth = pic[0].offsetWidth;
	var picHeight = pic[0].offsetHeight;
	var picboxWidth = picbox.offsetWidth;
	var picboxHeight = picbox.offsetHeight;
	var go = document.getElementById('go');
	var times = document.getElementById('times'); //定时。用于扩展
	var dx, dy, newLeft, newtop, startTime, endTime;
	var time, seed = 0;
	var id;
	//bol 第一次点击开始按钮，打乱顺序，再点击不触发打乱顺序事件
	//boll 顺序成功，初始不弹出拼图成功提示，当点击开始按钮之后且拼图成功弹出拼图成功图层
	var bol = true,
		boll = false;
	//游戏界面开始游戏按钮
	/*go.addEventListener('touchstart', function() {	
		
	})*/
	$("#go").on("touchstart", function() {
		accountValPlayProcess();		
	});
	$("#goReplay").on("touchstart", function() {
		accountValPlayProcess();		
	});
	
	var accountValPlayProcess = function(){	
		if(!bol){
			if($(".christmas_jigsaw_game_btn_start_span").html() == "开始" || $(".christmas_jigsaw_game_btn_start_span").html() == "继续") {
				$(".christmas_jigsaw_game_btn_start_span").html("提示")
				$(".pic").css("opacity","1");
				$(".game_picture_cover").css("display", "none");
				
			} else {
				$(".christmas_jigsaw_game_btn_start_span").html("继续");
				$(".game_picture_cover").css("display", "block");
				$(".pic").css("opacity","0");
			
			}
			return;
		}
		//遮罩层
		$(".christmas_jigsalaw_game_layer_cover").css("display", "none");
		//提示框
		$(".christmas_jigsalaw_game_layer_success").css("display", "none");
		opType = 1;
		var url = "game-play-costval";
		$.ajax({
			type : "POST",
			url : url,
			data : "activityId=" + $("#activityId").val(),
			dataType : "json",
			success : function(msg) {
				
				if (msg.res == "ok") {
					$("span[name='accountval']").text(msg.info.accountValue);
					if(msg.info.accountValue == 0 && $("#canUseIntegral").val()==1){
						$(".christmas_jigsaw_game_inner_btn_rest_inner svg use").attr("xlink:href", "#icon-huiseaixin");
						$(".game_success_full").css("display", "none");
						$(".game_success_empty").css("display", "block");
					}else{
						$(".christmas_jigsaw_game_inner_btn_rest_inner svg use").attr("xlink:href", "#icon-aixin");
						$(".game_success_full").css("display", "block");
						$(".game_success_empty").css("display", "none");
					}
					if(msg.info.result == 1){
						$("#accountLogId").val(msg.info.accountLogId);
						//遮罩层
						$(".christmas_jigsalaw_game_layer_cover").css("display", "none");
						//提示框
						$(".christmas_jigsalaw_game_layer_success").css("display", "none");
						gameProcess();			
					}
					if(msg.info.result == 0){ //游戏代币不足
						$(".game_layer_physical").css("display", "block");					
					}
				}
			}
		});
	}	
	
	//积分游戏
	$("#integralPlay").on("touchstart", function() {
		integralPlayProcess();		
	});
	$("#integralReplay").on("touchstart", function() {
		integralPlayProcess();		
	});
	
	var integralPlayProcess = function(){
		if(!bol){
			if($(".christmas_jigsaw_game_btn_start_span").html() == "开始" || $(".christmas_jigsaw_game_btn_start_span").html() == "继续") {
				$(".christmas_jigsaw_game_btn_start_span").html("继续")
				$(".pic").css("opacity","1");
				$(".game_picture_cover").css("display", "none");
				
			} else {
				$(".christmas_jigsaw_game_btn_start_span").html("开始");
				$(".game_picture_cover").css("display", "block");
				$(".pic").css("opacity","0");
			
			}
			return;
		}
		opType = 2;
		var url = "game-play-costintegral";
		$.ajax({
			type : "POST",
			url : url,
			data : "activityId=" + $("#activityId").val(),
			dataType : "json",
			success : function(msg) {
				if (msg.res == "ok") {
					$("span[name='accountval']").text(msg.info.accountValue);
					if(msg.info.accountValue == 0 && $("#canUseIntegral").val()==1){
						$(".christmas_jigsaw_game_inner_btn_rest_inner svg use").attr("xlink:href", "#icon-huiseaixin");
						$(".game_success_full").css("display", "none");
						$(".game_success_empty").css("display", "block");
					}else{
						$(".christmas_jigsaw_game_inner_btn_rest_inner svg use").attr("xlink:href", "#icon-aixin");
						$(".game_success_full").css("display", "block");
						$(".game_success_empty").css("display", "none");
					}
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
					if(msg.info.result == 1){
						$("#accountLogId").val(msg.info.accountLogId);
						gameProcess();			
					}
					if(msg.info.result == 0){ //积分不足
						$(".game_layer_no_intergal").css("display", "block");			
					}
				}
			}
		});
	}
	
	var gameProcess = function(){
		$('body').unbind('touchstart');
		$('body').on('touchstart', function(e) {
			e.preventDefault();
		});
		boll = true;
		if(bol){
			for(var i = 0; i < 20; i++) { //随机打乱
				var a = Math.floor(Math.random() * 12);
				var b = Math.floor(Math.random() * 12);
				if(a != b) {
					random(a, b);
				}
			};
			id = setInterval(function() { //定时函数，额。。。待续。
				//endTime = Date.parse(new Date());
				seed++;
				//txt.value=seed/100;
				times.innerHTML = (seed / 100).toFixed(2) || '00.00';
			}, 10);
		}
		if($(".christmas_jigsaw_game_btn_start_span").html() == "开始") {
			$(".christmas_jigsaw_game_btn_start_span").html("提示")
			$(".pic").css("opacity","1");
			$(".game_picture_cover").css("display", "none");
			
		} else {
			$(".christmas_jigsaw_game_btn_start_span").html("开始");
			$(".game_picture_cover").css("display", "block");
			$(".pic").css("opacity","0");
		
		}
		bol = false;	

		startTime = Date.parse(new Date()); //获取到期1970年1月1日到当前时间的毫秒数，这个方法不常见，这里为试用
		for(var i = 0; i < pic.length; i++) {
			pic[i].style.display = "block"; //设置显示拼图，游戏开始
		}	
	}
	
	for(var i = 0; i < pic.length; i++) {
		pic[i].addEventListener('touchstart', function(e) {
			this.style.zIndex = 100; //设置拖拽元素的z-index值，使其在最上面。
			dx = e.targetTouches[0].pageX - this.offsetLeft; //记录触发拖拽的水平状态发生改变时的位置
			dy = e.targetTouches[0].pageY - this.offsetTop; //记录触发拖拽的垂直状态发生改变时的位置
			this.startX = this.offsetLeft; //记录当前初始状态水平发生改变时的位置
			this.startY = this.offsetTop; //offsetTop等取得的值与this.style.left获取的值区别在于前者不带px,后者带px
			this.style.transition = 'none';
		});
		pic[i].addEventListener('touchmove', function(e) {
			newLeft = e.targetTouches[0].pageX - dx; //记录拖拽的水平状态发生改变时的位置
			newtop = e.targetTouches[0].pageY - dy;

			if(newLeft <= -picWidth / 2) { //限制边界代码块，拖拽区域不能超出边界的一半
				newLeft = -picWidth / 2;
			} else if(newLeft >= (picboxWidth - picWidth / 2)) {
				newLeft = (picboxWidth - picWidth / 2);
			}
			if(newtop <= -picHeight / 2) {
				newtop = -picWidth / 2;
			} else if(newtop >= (picboxHeight - picHeight / 2)) {
				newtop = (picboxHeight - picHeight / 2);
			}
			this.style.left = newLeft + 'px';
			this.style.top = newtop + 'px'; //设置目标元素的left,top
		});
		pic[i].addEventListener('touchend', function(e) {
			this.style.zIndex = 0;
			//this.style.transition = 'all 0.1s ease 0s'; //添加css3动画效果
			this.endX = e.changedTouches[0].pageX - dx;
			this.endY = e.changedTouches[0].pageY - dy; //记录滑动结束时的位置，与进入元素对比，判断与谁交换
			var obj = change(e.target, this.endX, this.endY); //调用交换函数
			if(obj == e.target) { //如果交换函数返回的是自己
				obj.style.left = this.startX + 'px';
				obj.style.top = this.startY + 'px';
			} else { //否则
				var _left = obj.style.left;
				obj.style.left = this.startX + 'px';
				this.style.left = _left;
				var _top = obj.style.top;
				obj.style.top = this.startY + 'px';
				this.style.top = _top;
				var _index = obj.getAttribute('data-index');
				obj.setAttribute('data-index', this.getAttribute('data-index'));
				this.setAttribute('data-index', _index); //交换函数部分，可提取
			}
		});
		//拼图成功提示
		pic[i].addEventListener('touchend', function() {
			if(isSuccess() && boll) {
				
				clearInterval(id);
				//解除事件
				//$('body').unbind('touchstart');
				
				var url = "game-play-record";
				var data = {activityId : $("#activityId").val(),
						type : opType,
						gameScore : seed,
						finishTime : (new Date()).getTime(),
						accountLogId : $("#accountLogId").val()
				};
				$.ajax({
					type : "POST",
					url : url,
					data : data,
					dataType : "json",
					success : function(msg) {
						if (msg.res == "ok") {					
							if(msg.info.result == 1){					
								$("#gamescore").text((msg.info.gameScore/100)+"秒");
								$("#gamescorerate").text((((1-(msg.info.rank/msg.info.allPlayerCount))*100).toFixed(2)) + "%");
								$("#bestgamescore").text((msg.info.bestScore/100)+"秒");
								$("#bestrank").text("NO:" + msg.info.bestRank);
								//$(".game_layer_rank_list_title p").html("当前名次对应：<span>一等奖</span>&nbsp;&nbsp;iPhone7一台");
								//遮罩层
								$(".christmas_jigsalaw_game_layer_cover").css("display", "block");
								//提示框
								$(".christmas_jigsalaw_game_layer_success").css("display", "block");
							}
						}						
						boll = false;
						//判断开始还是提示
						bol = true;
						//时间清零
						seed = 0;
						//开始按钮
						$(".christmas_jigsaw_game_btn_start_span").html("开始");
						$(".game_picture_cover").css("display", "block");
					},
					error : function(){
						boll = false;
						//判断开始还是提示
						bol = true;
						//时间清零
						seed = 0;
						//开始按钮
						$(".christmas_jigsaw_game_btn_start_span").html("开始");
						$(".game_picture_cover").css("display", "block");
					}
				});
				
			} else {
				// pic[i].removeEventListener('transitionend');
			}
		})
	}

	function change(obj, x, y) { //交换函数，判断拖动元素的位置是不是进入到目标原始1/2，这里采用绝对值得方式
		for(var i = 0; i < pic.length; i++) { //还必须判断是不是当前原素本身。将自己排除在外
			if(Math.abs(pic[i].offsetLeft - x) <= picWidth / 2 && Math.abs(pic[i].offsetTop - y) <= picHeight / 2 && pic[i] != obj)
				return pic[i];
		}
		return obj; //返回当前
	}

	function random(a, b) { //随机打乱函数，其中交换部分，可以提取出来封装
		var aEle = pic[a];
		var bEle = pic[b];
		var _left;
		_left = aEle.style.left;
		aEle.style.left = bEle.style.left;
		bEle.style.left = _left;
		var _top;
		_top = aEle.style.top;
		aEle.style.top = bEle.style.top;
		bEle.style.top = _top;
		var _index;
		_index = aEle.getAttribute("data-index");
		aEle.setAttribute("data-index", bEle.getAttribute("data-index"));
		bEle.setAttribute("data-index", _index);
	}

	function isSuccess() { //判断成功标准
		var str = ''
		for(var i = 0; i < pic.length; i++) {
			str += pic[i].getAttribute('data-index');
		}
		if(str == '123456789101112') {
			return true;
		}
		return false;
	}
})