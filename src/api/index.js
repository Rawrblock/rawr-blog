import axios from 'axios';
import store from '../store/index';
import NProgress from 'nprogress';
import NotifyUtils from '@/utils/NotifyUtils';

const baseURL = 'http://localhost:8080';
const tokenPreFix = 'Blog ';

const instance = axios.create({
  baseURL
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    NProgress.start();
    if (store.state.user.token) {
      config.headers['Authorization'] = tokenPreFix + store.state.user.token;
    }
    return config;
  },
  error => {
    return new Promise(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    NProgress.done();
    if (response.data.code) {
      handlerErrorResponse(response);
      return Promise.reject(response);
    }
    return response;
  },
  error => {
    handlerErrorResponse(error.response);
    return Promise.reject(new Error(error));
  }
);

// 全局处理函数
const handlerErrorResponse = response => {
  console.log(response);
  // 当请求头过期时，就清除token与当前用户信息，退出登录操作
  if (response.status === 500 || response.status === 403) {
    store.dispatch('logout');
  }
  // 当错误函数存在多个时
  if (response.data instanceof Array) {
    response.data.forEach(item => {
      NotifyUtils.error(item.message);
    });
  } else {
    NotifyUtils.error(response.data.message);
  }
  NProgress.done();
};

const { get, post, put } = instance;

export { get, post, put };
