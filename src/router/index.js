import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';
import NotFound from '@/views/404';
import AdminPanelMain from '@/views/admin/BaseView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'authorization',
    component: () => import ('@/views/auth/Auth.vue'),
  },
  {
    path: '/reset',
    name: 'resetPassword',
    component: ResetPassword,
    beforeEnter: (to, from, next)=> {
      let token = to.query.token;
      if (token && token.length === 48)
          return next()
      next({name: 'home'});
    }
  },
  {
    path: '/staff/panel',
    name: 'AdminPanelMain',
    component: AdminPanelMain,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
