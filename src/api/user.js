import request from '@/utils/request';

export function apiUser(data) {
  return request({
    url: '/getUserInfo',
    method: 'get',
    data: data,
  });
}
