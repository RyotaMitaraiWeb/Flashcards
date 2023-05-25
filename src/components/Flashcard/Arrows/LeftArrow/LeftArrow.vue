<script setup lang="ts">
defineEmits(['decrement']);
</script>

<template>
  <v-btn
    color="primary"
    @click.prevent="$emit('decrement')"
    aria-label="Move to previous flashcard"
  >
    <v-icon class="arrow-icon" icon="mdi-arrow-left-bold" size="20pt"></v-icon>
  </v-btn>
</template>
