<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import DeckForm from '../../components/Deck/Form/DeckForm.vue';
import type { IDeckSubmission } from '../../types/components/decks';

const route = useRoute();
const deck = route.meta.deck as IDeckSubmission;

document.title = `Edit ${deck.title}`;
</script>

<template>
  <DeckForm context="edit" :deck="deck"></DeckForm>
</template>
