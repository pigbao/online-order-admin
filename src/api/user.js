import request from '@/utils/request';

export function apiUser() {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
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
 * 更新用户
 * @param {*} data
 * @returns
 */
export function apiUpdate(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data: data,
  });
}

/**
 * 获取用户
 * @param {*} data
 * @returns
 */
export function apiDetail(id) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: { id },
  });
}
