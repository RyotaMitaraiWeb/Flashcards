<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { IDeck } from '../../types/components/decks';
import DeckInfo from '../Partials/DeckInfo.vue';
import { ref } from 'vue';
import StudySession from '../Partials/StudySession.vue';

const route = useRoute();
const deck: IDeck = route.meta['deck'] as IDeck;
document.title = deck.title;

const currentTab = ref<'DeckInfo' | 'StudySession'>('DeckInfo');

const tabs = {
  DeckInfo,
  StudySession
}

function start() {
  currentTab.value = 'StudySession';
}
</script>

<template>
  <component :is="tabs[currentTab]" :deck="deck" :onStart="start"></component>
</template>