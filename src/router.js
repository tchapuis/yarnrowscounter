import Vue from 'vue'
import Router from 'vue-router'
import Counter from './views/Counter.vue'
import Projects from './views/Projects.vue'
import ProjectEdit from './views/ProjectEdit.vue'
import ProjectCreate from './views/ProjectCreate.vue'
import Login from './views/auth/Login.vue'
import store from './store'

const firebase = require('./firebaseConfig.js');

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/projects'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/counter/:projectId',
      name: 'counter',
      component: Counter,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/project/create',
      name: 'projectCreate',
      component: ProjectCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/project/edit/:projectId',
      name: 'projectEdit',
      component: ProjectEdit,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if(requiresAuth) {
    firebase.auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser);
        next();
      } else {
        next('/login');
      }
    })
  } else {
    next();
  }
});

export default router;
