import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import ChallengePage from '@/components/ChallengePage';
import ErrorPage from '@/components/ErrorPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/challenge/:slug',
      name: 'ChallengePage',
      component: ChallengePage,
    },
    {
      path: '*',
      name: 'ErrorPage',
      component: ErrorPage,
    },
  ],
});
