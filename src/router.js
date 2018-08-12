import Vue from 'vue'
import Router from 'vue-router'
import Counter from './views/Counter.vue'
import Projects from './views/Projects.vue'
import ProjectEdit from './views/ProjectEdit.vue'
import ProjectCreate from './views/ProjectCreate.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/counter/:projectId',
      name: 'counter',
      component: Counter
    },
    {
      path: '/',
      name: 'projects',
      component: Projects
    },
    {
      path: '/project/create',
      name: 'projectCreate',
      component: ProjectCreate
    },
    {
      path: '/project/edit/:projectId',
      name: 'projectEdit',
      component: ProjectEdit
    }
  ]
})
