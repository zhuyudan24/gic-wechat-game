import { requests } from './index';

const PREFIX = '/gicfwh';

// 获取微信验证配置
// eslint-disable-next-line import/prefer-default-export
export const getWxConfig = params => requests(`${PREFIX}/puzzle-weixin-jsapi`, params);
// 获取卡券跳转url
export const gameGetCard = params => requests(`${PREFIX}/game-get-card`, params);
