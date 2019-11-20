import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index.vue'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      component: Index,
      children: [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          requireLogin: true
        }
      }, {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
      }, {
        path: '*',
        name: '404 Not Found',
        component: () => import('./views/404.vue')
      },],
    },

  ]
})