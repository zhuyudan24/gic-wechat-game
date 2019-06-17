import VueRouter from 'vue-router';

import memberInfo from './components/member-info.vue';
import succ from './components/succ.vue';

const routes = [
  {
    path: '/member-info',
    name: 'member-info',
    component: memberInfo,
  },
  {
    path: '/succ',
    name: 'succ',
    component: succ,
  },
  {
    path: '*',
    redirect: '/member-info',
  },
]

/* eslint-disable-next-line */
export const createRouter = function () {
  return new VueRouter({ routes });
}
