import Vue from 'vue';
import App from './app.vue';
// import { axios } from '../../api';

Vue.config.productionTip = false;

// Vue.prototype.axios = axios;
// Vue.prototype.axios.withCredentials = true;

new Vue({
  render: h => h(App),
}).$mount('#app');
