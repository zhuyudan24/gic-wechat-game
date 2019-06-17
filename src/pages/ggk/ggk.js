import Vue from 'vue'
import ggk from './ggk.vue'
import { axios } from '../../api';

Vue.config.productionTip = false;

Vue.prototype.axios = axios;
Vue.prototype.axios.withCredentials = true;

new Vue({
  render: h => h(ggk),
}).$mount('#app');
