import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "general" */ '../views/Home.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "general" */ '../views/Search.vue')
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: () => import(/* webpackChunkName: "subjects" */ '../views/Subjects.vue')
    },
    {
      path: '/subjects/:subject',
      name: 'subject',
      component: () => import(/* webpackChunkName: "subjects" */ '../views/Subject.vue')
    },
    {
      path: '/subjects/:subject/:file',
      name: 'file',
      component: () => import(/* webpackChunkName: "files" */ '../views/File.vue')
    }
  ]
})
