<script setup lang="ts">
import { ref } from 'vue';
import ListToggler from './ListToggler.vue';

const open = ref(false);
</script>

<template>
  <ListToggler v-model="open"></ListToggler>
</template>