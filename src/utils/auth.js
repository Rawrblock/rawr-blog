import Cookies from 'js-cookie';

// token持久化操作 KEY值
const TokenKey = 'token';
const UserKey = 'current-user';
const defaultUser = {
  username: null,
  password: null,
  role: []
};

// 获取Token
export const getToken = () => {
  return Cookies.get(TokenKey);
};

// 设置Token
export const setToken = token => {
  return Cookies.set(TokenKey, token);
};

// 删除Token
export const removeToken = () => {
  Cookies.remove(TokenKey);
};

// 获取当前用户信息
export const getCurrentUser = () => {
  const user = Cookies.get(UserKey);
  return user === undefined ? defaultUser : JSON.parse(user);
};

// 存储当前用户信息
export const setCurrentUser = currentUser => {
  return Cookies.set(UserKey, JSON.stringify(currentUser));
};

// 删除当前用户信息
export const removeCurrentUser = () => {
  Cookies.remove(UserKey);
};
