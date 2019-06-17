/**
 * Created by DENG on 2017/8/4.
 */
/**
 *游戏入口
 * uId  玩家id
 * game  游戏机会（最多1次，分享加1次）
 * prizeLink  首页“我的奖券”超链接   值比如："http://baidu.com"
 * shopLink   核销页“jdv门店”超链接   值比如："http://baidu.com"
 * shareURL   分享链接的域名
 */
var gameData = {
  gameId: "4",uId: "4",cardNo: "J0007",nick: "陌上",game: "1",prizeLink: "http://baidu.com",shopLink: "http://baidu.com",shareURL: "http://baidu.com/", canPlay: false,
};
/**
 * 已经不再使用分享增加游戏次数了 2019-04-24
 * 增加游戏次数 api/share.php 接口
 * @param func
 *返回提交结果：result   1为成功，其余则失败（以下相同）
 * 返回值 {"result":1,"msg":"提交成功","data":""}
 */
function addTimes(func) {
  ajaxOBJ.send("game-addtimes-np",['gameId', gameData.gameId],(data) => {
    func(data);
  });
}
/**
 * 提交成绩 api/submitScore.php    传值'score'
 * @param find_hor 成绩
 * @param func
 *
 *返回提交结果：result 当前成绩排名：data
 * 返回值 {"result":1,"msg":"提交成功","data":"2"}
 */
function submitScore(find_hor,func) {
  ajaxOBJ.send("game-submitscore-np",[['gameId', gameData.gameId], ['score',find_hor], ['memberId',getQueryString("memberId")]],(data) => {
    	gameData.attendRecordId = data.result.attendRecordId;
    func(data);
  });
}
/**
 * 排行榜 rank.php  传值"top"  分页请求，每次返回50条数据，数据按成绩从高到低 u_max：成绩   u_nick：昵称
 * @param top
 * @param func
 *
 * 返回值{"result":1,"msg":"提交成功","data":[{"u_max":"6100","u_nick":"IceMan"},{"u_max":"3900","u_nick":"IceMan"},{"u_max":"3600","u_nick":"IceMan"}]}
 */
function rankData(top,func) {
  ajaxOBJ.send("game-ranklist-np",[['gameId', gameData.gameId],['top',top],['num',50], ['memberId', getQueryString('memberId')]],(data) => {
    func(data);
  });
}
/**
 * 奖券接口   prize.php
 * @param func
 *
 * 返回值{"result":1,"msg":"提交成功","data":{"p_name":"XXX抵扣券","p_code":"123456789012345678901234","p_rule":"券使用说明券使用说明"}}
 */
function prizeData() {
  //处理领卡事件
  if (gameData.isAuth == 1) {
    //已认证会员直接领取
    window.location.href = `/gicfwh/game-getprize-np?attendRecordId=${gameData.attendRecordId}&memberId=${getQueryString('memberId')}`;
  } else {
    //未认证的提示认证
    $("#couponNoMember").fadeIn();
  }
}

/**
 * 奖券列表
 * attend_id, prize_id, prize_value, prize_name, prize_status
 */
function prizeListData(top, func) {
  ajaxOBJ.send("game-prizelist-np",[['gameId', gameData.gameId],['top',top],['num',10], ['memberId', getQueryString('memberId')]],(data) => {
    func(data);
  });
}
/**
 * 获取基本信息
 * activityId memberId
 * */
function getWxInfo(activityId, memberId, func) {
  ajaxOBJ.send("game-wx-info",[['activityId', activityId], ['memberId', memberId]] ,(data) => {
    func(data);
  })
}

/**
 * 校验用户有没有达到参与门槛
 * */
function checkPermission(activityId, memberId, func) {
  ajaxOBJ.send('check-game-play-permission', [['activityId', activityId], ['memberId', memberId]], (data) => {
    func(data);
  })
}
