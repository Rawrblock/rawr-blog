import { post, get } from './index';

// 创建账号
export const create = userCreateRequest => {
  return post('/users', userCreateRequest);
};

// 登录方法：
export const createToken = tokenCreateRequest => {
  return post('/users/tokens', tokenCreateRequest);
};

// 获取当前用户信息
export const currentUser = () => {
  return get('/users/me');
};
