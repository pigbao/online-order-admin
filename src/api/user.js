import request from '@/utils/request';

export function apiUser(data) {
  return request({
    url: '/getUserInfo',
    method: 'get',
    data: data,
  });
}

/**
 * 查询用户
 * @param {*} params 
 * @returns 
 */
export function apiQuery(params) {
  return request({
    url: '/user/query',
    method: 'get',
    params: params,
  });
}

/**
 * 新增用户
 * @param {*} data 
 * @returns 
 */
export function apiAdd(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data: data,
  });
}

/**
 * 新增用户
 * @param {*} data 
 * @returns 
 */
export function apiDetail(id) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: {id},
  });
}
