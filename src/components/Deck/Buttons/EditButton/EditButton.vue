<script setup lang="ts">
export interface IEdit {
  id: number;
}

defineProps<IEdit>();
</script>

<template>
  <v-btn variant="flat" :to="`/decks/${id}/edit`" class="edit-btn action-btn" color="primary">
    <template v-slot:prepend>
      <v-icon icon="mdi-pencil"></v-icon>
    </template>
    Edit
  </v-btn>
</template>