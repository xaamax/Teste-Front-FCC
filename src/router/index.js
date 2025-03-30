import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store";

import Wrapper from '@/components/Wrapper.vue';
import Login from '@/pages/auth/Login.vue';
import Home from '@/pages/home/Home.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },  
  {
    path: '/',
    component: Wrapper, 
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },  
  {
    path: '/logout',
    redirect: '/login', 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({ name: "Login" });
    store.dispatch('logout');
  } else {
    next();
  }
});

export default router;