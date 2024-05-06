import request from '@/utils/request';

/**
 * 编辑
 * @param {*} data 
 * @returns 
 */
export function apiUpdate(data) {
  return request({
    url: '/shop/update',
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
    url: '/shop/detail',
    method: 'get',
    params: {id},
  });
}

