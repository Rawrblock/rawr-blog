import axios from 'axios';
import store from '../store/index';

const baseURL = 'http://localhost:8080';
const tokenPreFix = 'Blog ';

const instance = axios.create({
  baseURL
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
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
// instance.interceptors.response.use(
//   response => {},
//   error => {}
// );

const { get, post, put } = instance;

export { get, post, put };
