import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../page/home/home.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../page/blog/blog.vue'),
    meta: {
      title: 'Blog'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../page/login/login.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../page/register/register.vue'),
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: () => import('../page/forgotpassword/forgotpassword.vue'),
    meta: {
      title: 'ForgotPassword'
    }
  },
  {
    path: '/createblog',
    name: 'CreateBlog',
    component: () => import('../page/createblog/createblog.vue'),
    meta: {
      title: 'CreateBlog'
    }
  },
  {
    path: '/updateblog/:blogid',
    name: 'UpdateBlog',
    component: () => import('../page/createblog/createblog.vue'),
    meta: {
      title: 'UpdateBlog'
    }
  },
  {
    path: '/viewblog/:blogid',
    name: 'ViewBlog',
    component: () => import('../page/blog/viewblog.vue'),
    meta: {
      title: 'ViewBlog'
    }
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Rawr`;
  window.scrollBy(0, 0);
  next();
});

export default router;
