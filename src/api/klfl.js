import { requests } from './index';

const PREFIX = '/gicfwh';
// 获取活动信息
export const gameWxInfo = params => requests(`${PREFIX}/game-wx-info`, params);
// 获取奖励列表
export const getRecordList = params => requests(`${PREFIX}/load_game_win_record_list`, params);
// 获取卡券
export const getCardExt = params => requests(`${PREFIX}/get_card_ext`, params);
// 获取奖品信息
export const getPrizeInfo = params => requests(`${PREFIX}/get_prize_info`, params);
// 更新游戏状态
export const updateGameStatus = params => requests(`${PREFIX}/update_game_win_record_status`, params);
// 提交口令
export const verifyGamePassword = params => requests(`${PREFIX}/verify_game_password`, params);
// 校验用户有没有达到参与门槛
export const checkPermission = params => requests(`${PREFIX}/check-game-play-permission`, params);
