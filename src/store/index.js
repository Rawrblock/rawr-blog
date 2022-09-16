import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import blog from './modules/blog';
import file from './modules/file';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    blog,
    file
  }
});
