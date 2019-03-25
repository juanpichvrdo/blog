import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import HomePage from './views/HomePage.vue';
import SignUpPage from './views/SignUpPage.vue';
import LoginPage from './views/LoginPage.vue';
import CreatePost from './views/CreatePost.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage,
    },
    {
      path: '/create-post',
      name: 'createPost',
      component: CreatePost,
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next()
  }
});

export default router;
