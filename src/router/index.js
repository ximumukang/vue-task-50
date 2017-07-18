import Vue from 'vue'
import Router from 'vue-router'
/*import Hello from '@/components/Hello'
import editQuestionnaire from '@/components/editQuestionnaire'
import modal from '@/components/modal'*/
import App from '../App'

Vue.use(Router);
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    // {
    //   path: '/editQuestionnaire',
    //   name: 'editQuestionnaire',
    //   component: editQuestionnaire
    // },
    // {
    //   path: '/modal',
    //   name: 'modal',
    //   component: modal
    // }
    {
      path: '/',
      component: App,
      children:
        [
          {
              path: '',
              component: r => require.ensure([], () => r(require('../page/home')), 'home')
          },
          {
              path: '/editQuestionnaire',
              component: r => require.ensure([], () => r(require('../page/editQuestionnaire')), 'editQuestionnaire')
          },
          {
              path: '/fill',
              component: r => require.ensure([], () => r(require('../page/fill')), 'fill')
          },
          {
              path: '/view',
              component: r => require.ensure([], () => r(require('../page/view')), 'view')
          }
        ]
}
  ]
})
