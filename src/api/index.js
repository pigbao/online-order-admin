import request from '@/utils/request';


/**
 * 查询 今日订单数  今日销售额 昨日销售额
 * @param {*} params 
 * @returns 
 */
export function apiOrderStatistic() {
  return request({
    url: '/statistic/orderCount',
    method: 'get',
  });
}

/**
 * 查询 今日订单数  今日销售额 昨日销售额
 * @param {*} params 
 * @returns 
 */
export function apiStatisticBy7Days() {
  return request({
    url: '/statistic/orderCountBy7Days',
    method: 'get',
  });
}


/**
 * 查询进行中订单
 * @param {*} params 
 * @returns 
 */
export function apiOrderList() {
  return request({
    url: '/statistic/orderList',
    method: 'get',
  });
}
