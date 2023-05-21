<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user/user';
import CataloguePartial from './Partials/CataloguePartial.vue';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import type { ICatalogueList } from '../types/components/decks';

document.title = 'Home';

const userStore = storeToRefs(useUserStore());
const user = userStore.user;

const route = useRoute();
const decks = route.meta.decks as ICatalogueList | undefined;

</script>

<template>
  <section>
    <h1>Home</h1>
    <template v-if="user.id === 0">
      <h2>Log in or register today for extra features!</h2>
      <p>
        With an account, you can save your favorite decks and see them here!
        You will also be able to create your own decks!
        So don't wait and <RouterLink to="/register">register</RouterLink> or
        <RouterLink to="/login">log into your account</RouterLink>!
      </p>
    </template>
    <template v-else>
      <template v-if="decks">
        <h2>Browse your saved decks</h2>
        <CataloguePartial api-endpoint="/bookmarks"></CataloguePartial>
      </template>
      <template v-else>
        <h2>An error occurred!</h2>
        <p>Please refresh and try again!</p>
      </template>
    </template>
  </section>
</template>

<style lang="scss" scoped>
h1, h2 {
  text-align: center;
}

h2 {
  margin-bottom: 15px;
}

p {
  padding: 0 20px;
}
</style>