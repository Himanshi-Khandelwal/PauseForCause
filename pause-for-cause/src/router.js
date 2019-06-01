import Vue from 'vue'
import Router from 'vue-router'
import Organization from './views/OrgView.vue'
import User from './views/userView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/organization',
      name: 'organization',
      component: Organization
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
