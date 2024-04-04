import request from '@/utils/request';
// 角色
/**
 * 查询
 * @param {*} params 
 * @returns 
 */
export function apiQuery(params) {
  return request({
    url: '/role/query',
    method: 'get',
    params: params,
  });
}

/**
 * 新增
 * @param {*} data 
 * @returns 
 */
export function apiAdd(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data: data,
  });
}

/**
 * 编辑
 * @param {*} data 
 * @returns 
 */
export function apiUpdate(data) {
  return request({
    url: '/role/update',
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
    url: '/role/detail',
    method: 'get',
    params: {id},
  });
}
