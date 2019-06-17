import Vue from 'vue'
import Dzp from './dzp.vue'
import { axios } from '../../api';

Vue.config.productionTip = false;

Vue.prototype.axios = axios;
Vue.prototype.axios.withCredentials = true;

new Vue({
  render: h => h(Dzp),
}).$mount('#app');
