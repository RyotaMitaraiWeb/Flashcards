<script setup lang="ts">
defineEmits(['increment']);
</script>

<template>
  <v-btn color="primary" @click.prevent="$emit('increment')" aria-label="Move to next flashcard">
    <v-icon class="arrow-icon" icon="mdi-arrow-right-bold" size="20pt"></v-icon>
  </v-btn>
</template>