import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { colors } from './constants/colors';
import { getLocalStoragePalette, getLocalStorageTheme } from './util/localStorageTheme/localStoragePreferences';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import "@mdi/font/css/materialdesignicons.css";
import type { ICreatedSession } from './types/components/auth';
import { api } from './constants/api';
import { HttpStatus } from './constants/httpstatus';
import { useUserStore } from './stores/user/user';
import { post } from './util/request/request';

const app = createApp(App);
app.use(createPinia());

const userStore = useUserStore();

const { setUser, restartUser } = userStore;

const { res, data } = await post<ICreatedSession>(api.endpoints.accounts.session);
  if (res.status === HttpStatus.CREATED) {
    const { user, token } = data!;
    setUser(user);
    localStorage.setItem('accessToken', token);
  } else {
    restartUser();
  }

const palette = getLocalStoragePalette();

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: getLocalStorageTheme() === 'dark',
        colors: {
          primary: colors[palette],
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  }
});

app.use(vuetify);
app.use(router);

app.mount('#app');
