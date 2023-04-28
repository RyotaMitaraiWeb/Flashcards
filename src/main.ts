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

const app = createApp(App);
app.use(createPinia());

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
