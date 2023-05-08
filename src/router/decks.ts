import type { RouteRecordRaw } from 'vue-router';
import DetailsVue from '../views/Decks/Details.vue';
import { getDeck } from './resolvers/getDeck/getDeck';

export const deckRoutes: RouteRecordRaw[] = [
  {
    path: '/decks/:id',
    component: DetailsVue,
    beforeEnter: [getDeck],
    name: 'details',
  }
];