<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const input = ref('');

function search(event: Event) {
  event.preventDefault();
  const search = input.value;

  if (input.value) {
    input.value = '';
    router.push('/decks/search?title=' + search);
  }
}
</script>

<template>
  <form @submit="search" id="search">
    <v-text-field
      v-model="input"
      variant="outlined"
      label="Search decks by title"
      name="search"
      counter
      hint="The search is case insensitive"
      persistent-hint
      clearable
      prepend-inner-icon="mdi-magnify"
    >
    </v-text-field>
  </form>
</template>
