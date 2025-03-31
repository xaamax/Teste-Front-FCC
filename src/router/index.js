import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store";

import Wrapper from '@/components/Wrapper.vue';
import Login from '@/pages/auth/Login.vue';
import Home from '@/pages/home/Home.vue';

import Cliente from '@/pages/clientes/Cliente.vue';
import ClienteLista from '@/pages/clientes/ClienteLista.vue';
import ClienteDetalhes from '@/pages/clientes/ClienteDetalhes.vue';

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
        name: 'home',
        component: Home,
      },
      {
        path: '/clientes',
        name: 'clientes',
        component: Cliente,
        redirect: 'clientes/lista',
        children: [
          { path: 'lista', name: 'clientes.lista', component: ClienteLista },
          { path: 'adicionar', name: 'clientes.adicionar', component: ClienteDetalhes },
          { path: '/:id/editar', name: 'clientes.editar', component: ClienteDetalhes },
        ]
      }
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