import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import '../src/assets/style/global.scss';
import 'nprogress/nprogress.css';
import 'default-passive-events';
import Notify from '@/components/Notify';
// 引入图标
import '@/utils/fortwaesom';
import '@/utils/veeValidationRolue';

Vue.prototype.$notify = Notify;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
