import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
// import $ from 'jquery'
// import jQuery from 'jquery'
// import Bootstrap from 'bootstrap'
import home from '@/components/home'
import node_developer from '@/components/node_developer'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/developer/:Pid',
      name: 'node_developer',
      component: node_developer
    }
  ]
})
