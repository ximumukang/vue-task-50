import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Edit from '../components/Edit.vue'
import Fill from '../components/Fill.vue'
import View from '../components/View.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/fill',
      component: Fill
    },
    {
      path: '/view',
      component: View
    }
  ]
})
