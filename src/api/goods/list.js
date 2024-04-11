import request from '@/utils/request';


/**
 * 查询
 * @param {*} params 
 * @returns 
 */
export function apiQuery(params) {
  return request({
    url: '/goods/query',
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
    url: '/goods/add',
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
    url: '/goods/update',
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
    url: '/goods/detail',
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
    url: '/goods/del',
    method: 'get',
    params: {id},
  });
}
