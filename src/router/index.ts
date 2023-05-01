import { createRouter, createWebHistory } from 'vue-router';
import LoginVue from '../views/Login.vue';
import HomeVue from '../views/Home.vue';
import AboutVue from '../views/About.vue';
import { IsGuestGuard } from '../guards/isGuest/isGuest';
import RegisterVue from '../views/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeVue,
      name: 'home'
    },
    {
      path: '/about',
      component: AboutVue,
      name: 'about'
    },
    {
      path: '/login',
      component: LoginVue,
      beforeEnter: [IsGuestGuard]
    },
    {
      path: '/register',
      component: RegisterVue,
      beforeEnter: [IsGuestGuard],
    }
  ],
});

export default router;
