import Vue from 'vue';
import CardDetail from './card-detail.vue';
// import router from './router';
// import { axios } from '../../api';

Vue.config.productionTip = false;

// Vue.prototype.axios = axios;
// Vue.prototype.axios.withCredentials = true;

new Vue({
  // router,
  render: h => h(CardDetail),
}).$mount('#app');
