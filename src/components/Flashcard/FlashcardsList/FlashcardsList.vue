<script setup lang="ts">
import { ref } from 'vue';
import type { IFlashcard } from '../../../types/components/decks';
import FlashcardBody from '../Body/FlashcardBody.vue';
import ListToggler from '../ListToggler/ListToggler.vue';

export interface IFlashcardsList {
  flashcards: IFlashcard[];
}

defineProps<IFlashcardsList>();
const open = ref(false);
</script>

<template>
  <ListToggler v-model="open"></ListToggler>
  <template v-if="open">
    <template v-for="flashcard, i in flashcards" :key="i">
      <div class="flashcard-pair">
        <FlashcardBody :content="flashcard.front" bold></FlashcardBody>
        <FlashcardBody :content="flashcard.back"></FlashcardBody>
      </div>
      <template v-if="i < flashcards.length - 1">
        <v-divider class="divider" thickness="3"></v-divider>
      </template>
    </template>
  </template>
</template>
<style lang="scss" scoped>
.divider {
  margin: 40px 0;
}

.flashcard-pair {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  &:first-of-type {
    margin-top: 20px;
  }

  .flashcard-body {
    width: 280px;
    height: 280px;
    border-radius: 0;
    margin: 10px;
  }
}
</style>