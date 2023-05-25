import type { RouteRecordRaw } from 'vue-router';
import PreferencesVue from '../views/Account/Preferences.vue';

export const accountRoutes: RouteRecordRaw[] = [
  {
    path: '/account/settings',
    component: PreferencesVue,
    name: 'settings',
  },
];
