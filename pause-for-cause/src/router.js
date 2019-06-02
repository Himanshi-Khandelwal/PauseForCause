import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Organization from './views/OrgView.vue'
import User from './views/userView.vue'
import UserTasks from './views/UserTasksView.vue'
import NGOsList from './views/NGOsListView.vue'
import Transactions from './views/Transactions.vue'
import NGO from './views/NGOView.vue'
import Map from './views/map.vue'

import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/organization',
      name: 'organization',
      component: Organization,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/userTasks',
      name: 'userTasks',
      component: UserTasks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ngosList',
      name: 'ngosList',
      component: NGOsList,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: Transactions,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ngo',
      name: 'ngo',
      component: NGO,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  } else if (!requiresAuth && currentUser) {
    next('user');
  } else {
    next();
  }
});

export default router;
