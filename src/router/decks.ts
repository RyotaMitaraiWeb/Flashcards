import type { RouteRecordRaw } from 'vue-router';
import DetailsVue from '../views/Decks/Details.vue';
import { getDeck } from './resolvers/getDeck/getDeck';
import AllVue from '../views/Decks/All.vue';
import { getCatalogueDecks } from './resolvers/getCatalogueDecks/getCatalogueDecks';
import SearchVue from '../views/Decks/Search.vue';

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
    path: '/decks/:id',
    component: DetailsVue,
    beforeEnter: [getDeck],
    name: 'details',
  }
];