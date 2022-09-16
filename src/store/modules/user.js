import { getCurrentUser, getToken, setToken } from '@/utils/auth';
import { createToken, currentUser } from '../../api/user';

const state = () => ({
  token: getToken(),
  currentUser: getCurrentUser()
});

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  }
};

const actions = {
  // 登录方法(邮箱和密码获取token登录)
  async toLogin({ commit }, { email, password }) {
    try {
      const result = await createToken({ email, password });
      // 获取出token
      let token = result.data;
      commit('SET_TOKEN', token);
      setToken(token);
    } catch (err) {
      console.log(err);
    }
  },
  // 通过token获取用户信息
  async getCurrentUser({ commit }) {
    const result = await currentUser();
    console.log(result);
  }
};

const getter = {};

export default {
  state,
  mutations,
  actions,
  getter
};
