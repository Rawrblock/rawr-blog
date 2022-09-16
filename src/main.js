import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import '../src/assets/style/global.scss';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
