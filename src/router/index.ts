import { createRouter, createWebHistory } from 'vue-router';
import LoginVue from '../views/Login.vue';
import HomeVue from '../views/Home.vue';
import { IsGuestGuard } from '../guards/isGuest/isGuest';
import RegisterVue from '../views/Register.vue';
import LogoutVue from '../views/Logout.vue';
import PageNotFoundVue from '../views/PageNotFound.vue';
import { IsLoggedInGuard } from '../guards/isLoggedIn/isLoggedIn';
import { deckRoutes } from './decks';
import { getBookmarkedDecks } from './resolvers/getBookmarkedDecks/getBookmarkedDecks';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeVue,
      name: 'home',
      beforeEnter: [getBookmarkedDecks]
    },
    {
      path: '/login',
      component: LoginVue,
      beforeEnter: [IsGuestGuard],
      name: 'login',
    },
    {
      path: '/register',
      component: RegisterVue,
      beforeEnter: [IsGuestGuard],
      name: 'register',
    },
    {
      path: '/logout',
      component: LogoutVue,
      beforeEnter: [IsLoggedInGuard],
      name: 'logout',
    },
    
    ...deckRoutes,

    {
      path: '/page-not-found',
      component: PageNotFoundVue,
      name: '404',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/page-not-found',
    },
  ],
});

export default router;
