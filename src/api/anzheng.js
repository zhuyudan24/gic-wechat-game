import { requests } from './index';

const PREFIX = '/gicfwh';

/**
 * 0会员详情1消费密码2储值余额
 * type=x&enterpriseId=x&memberId=x
 * */
/* eslint-disable-next-line */
export const getMemberInfo = params => requests(`${PREFIX}/get-member-info-anzheng.json`, params);
