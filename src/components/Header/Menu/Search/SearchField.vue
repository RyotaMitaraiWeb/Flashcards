<script setup lang="ts">
// TO DO: add search navigation

function search(event: Event) {
  event.preventDefault();
}
</script>

<template>
  <form @submit="search" id="search">
    <v-text-field variant="outlined" label="Search decks by title" counter
      hint="The search is case insensitive" persistent-hint clearable prepend-inner-icon="mdi-magnify">
    </v-text-field>
  </form>
</template>