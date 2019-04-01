import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import HomePage from "./views/HomePage.vue";
import SignUpPage from "./views/SignUpPage.vue";
import LoginPage from "./views/LoginPage.vue";
import CreatePost from "./views/CreatePost.vue";
import PostPage from "./views/PostPage.vue";
import EditPost from "./views/EditPost.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: { showNavbar: false }
    },
    {
      path: "/sign-up",
      name: "signUp",
      component: SignUpPage,
      meta: { showNavbar: false }
    },
    {
      path: "/posts/:id",
      name: "postPage",
      component: PostPage
    },
    {
      path: "/create-post",
      name: "createPost",
      component: CreatePost,
      meta: { requiresAuth: true }
    },
    {
      path: "/edit-post/:id",
      name: "editPost",
      component: EditPost,
      meta: { requiresAuth: true }
    },
    {
      path: "/",
      name: "home",
      component: HomePage
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;
