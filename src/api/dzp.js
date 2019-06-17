import { requests } from './index';

const PREFIX = '/gicfwh';

// 大转盘请求
export const checkGamePlayPermission = params => requests(`${PREFIX}/check-game-play-permission`, params); // 获取是否满足游戏门槛
export const gameWxInfoDetail = params => requests(`${PREFIX}/game-wx-info-detail`, params); // 获取游戏设置
export const getMemberIntegral = params => requests(`${PREFIX}/get_member_integral`, params); // 获取用户积分
export const gameWinRecord = params => requests(`${PREFIX}/game-win-record`, params); // 获取中奖用户列表
export const myWinRecord = params => requests(`${PREFIX}/game-my-win-record`, params); // 获取我的奖品列表
export const gameStart = params => requests(`${PREFIX}/game-start`, params); // 开始游戏
