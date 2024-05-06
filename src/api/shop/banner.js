import request from '@/utils/request';

/**
 * 查询
 * @param {*}  
 * @returns 
 */
export function apiQuery() {
  return request({
    url: '/banner/query',
    method: 'get',
  });
}

/**
 * 新增
 * @param {*} data 
 * @returns 
 */
export function apiAdd(data) {
  return request({
    url: '/banner/add',
    method: 'post',
    data: data,
  });
}

/**
 * 修改
 * @param {*} data 
 * @returns 
 */
export function apiUpdate(data) {
  return request({
    url: '/banner/update',
    method: 'post',
    data: data,
  });
}

/**
 * 详情
 * @param {*} data 
 * @returns 
 */
export function apiDetail(id) {
  return request({
    url: '/banner/detail',
    method: 'get',
    params: {id},
  });
}

/**
 * 删除
 * @param {*} data 
 * @returns 
 */
export function apiDel(id) {
  return request({
    url: '/banner/del',
    method: 'get',
    params: {id},
  });
}
