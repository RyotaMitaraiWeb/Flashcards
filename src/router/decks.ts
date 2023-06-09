import type { RouteRecordRaw } from 'vue-router';
import DetailsVue from '../views/Decks/Details.vue';
import { getDeck } from './resolvers/getDeck/getDeck';
import AllVue from '../views/Decks/All.vue';
import { getCatalogueDecks } from './resolvers/getCatalogueDecks/getCatalogueDecks';
import SearchVue from '../views/Decks/Search.vue';
import OwnVue from '../views/Decks/Own.vue';
import { IsLoggedInGuard } from '../guards/isLoggedIn/isLoggedIn';
import CreateVue from '../views/Decks/Create.vue';
import EditVue from '../views/Decks/Edit.vue';
import { IsOwnerGuard } from '../guards/isOwnerGuard/isOwnerGuard';

export const deckRoutes: RouteRecordRaw[] = [
  {
    path: '/decks/all',
    component: AllVue,
    beforeEnter: [getCatalogueDecks],
    name: 'all',
  },
  {
    path: '/decks/search',
    component: SearchVue,
    beforeEnter: [getCatalogueDecks],
    name: 'search',
  },
  {
    path: '/decks/create',
    component: CreateVue,
    beforeEnter: [IsLoggedInGuard],
    name: 'create',
  },
  {
    path: '/decks/:id/edit',
    component: EditVue,
    beforeEnter: [IsLoggedInGuard, getDeck, IsOwnerGuard],
    name: 'edit',
  },
  {
    path: '/decks/own',
    beforeEnter: [IsLoggedInGuard, getCatalogueDecks],
    name: 'own',
    component: OwnVue,
  },
  {
    path: '/decks/:id',
    component: DetailsVue,
    beforeEnter: [getDeck],
    name: 'details',
  },
];
