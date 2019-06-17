import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { axios } from './api/index';

Vue.config.productionTip = false;

Vue.prototype.axios = axios;
Vue.prototype.axios.withCredentials = true;

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app');
