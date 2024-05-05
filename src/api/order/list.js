import request from '@/utils/request';


/**
 * 查询
 * @param {*} params 
 * @returns 
 */
export function apiQuery(params) {
  return request({
    url: '/order/query',
    method: 'get',
    params: params,
  });
}

/**
 * 详情
 * @param {*} data 
 * @returns 
 */
export function apiDetail(id) {
  return request({
    url: '/order/detail',
    method: 'get',
    params: {id},
  });
}


export function apiStatus(id,status){
  return request({
    url:'/order/status',
    method:'post',
    data:{
      id,status
    }
  })
}