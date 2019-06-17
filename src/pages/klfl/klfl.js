import Vue from 'vue'
import klfl from './klfl.vue'
import { axios } from '../../api';

Vue.config.productionTip = false;

Vue.prototype.axios = axios;
Vue.prototype.axios.withCredentials = true;
new Vue({
  render: h => h(klfl),
}).$mount('#app');
