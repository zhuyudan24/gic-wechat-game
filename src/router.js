import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Error from './views/error/error.vue';
import Auth from './views/error/auth.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/dzp',
      name: 'dzp',
      component: () => import(/* webpackChunkName: "dzp" */ './pages/dzp/dzp.vue'),
    },
    {
      path: '/ggk',
      name: 'ggk',
      component: () => import(/* webpackChunkName: "ggk" */ './pages/ggk/ggk.vue'),
    },
    {
      path: '/klfl',
      name: 'klfl',
      component: () => import(/* webpackChunkName: "klfl" */ './pages/klfl/klfl.vue'),
    },
    {
      path: '/card-detail',
      name: 'card-detail',
      component: () => import(/*webpackChunkName: "card-detail"*/ './pages/card-detail/card-detail.vue'),
    },
    {
      path: '/get-pwd',
      name: 'get-pwd',
      component: () => import(/*webpackChunkName: "get-pwd"*/ './pages/get-pwd/app.vue'),
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
  ],
});
