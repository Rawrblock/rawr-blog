import {
  getCurrentUser,
  getToken,
  setToken,
  removeToken,
  setCurrentUser,
  removeCurrentUser
} from '@/utils/auth';
import { createToken, currentUser, create } from '../../api/user';

const state = () => ({
  token: getToken(),
  currentUser: getCurrentUser()
});

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_CURRENT_USER: (state, currentUser) => {
    state.currentUser = currentUser;
  }
};

const actions = {
  // 登录方法(邮箱和密码获取token登录)
  toLogin({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      createToken({ email: email.trim(), password })
        .then(res => {
          let token = res.data;
          commit('SET_TOKEN', token);
          setToken(token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 通过token获取用户信息
  async getCurrentUser({ commit }) {
    const result = await currentUser();
    commit('SET_CURRENT_USER', result.data);
    setCurrentUser(result.data);
  },
  logout({ commit }) {
    commit('SET_TOKEN', '');
    commit('SET_CURRENT_USER', '');
    removeToken();
    removeCurrentUser();
  },
  // 注册方法
  async toRegister({ commit }, createUser) {
    await create(createUser);
  }
};

const getter = {};

export default {
  state,
  mutations,
  actions,
  getter
};
