<script setup lang="ts">
import DeckActions from '../../components/Deck/Details/Actions/DeckActions.vue';
import BasicInfo from '../../components/Deck/Details/BasicInfo/BasicInfo.vue';
import FlashcardsList from '../../components/Flashcard/FlashcardsList/FlashcardsList.vue';
import type { IDeck } from '../../types/components/decks';

export interface IDeckInfo {
  deck: IDeck;
}

defineProps<IDeckInfo>();
defineEmits(['start']);
</script>

<template>
  <section id="details">
    <section id="info">
      <BasicInfo :deck="deck"></BasicInfo>
      <DeckActions :deck="deck" @start="$emit('start')"></DeckActions>
    </section>
    <section id="cards">
      <FlashcardsList :flashcards="deck.flashcards"></FlashcardsList>
    </section>
  </section>
</template>

<style lang="scss" scoped>
#details {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 10px;

  #info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: row;
    width: 90vw;
    gap: 80px;
  }
}
</style>
