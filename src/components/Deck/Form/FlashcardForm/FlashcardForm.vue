<script setup lang="ts">
import { ref } from 'vue';
import type { IFlashcard, IUpdateContent } from '../../../../types/components/decks';
import LeftArrow from '../../../Flashcard/Arrows/LeftArrow/LeftArrow.vue';
import RightArrow from '../../../Flashcard/Arrows/RightArrow/RightArrow.vue';
import FlashcardInput from './FlashcardInput/FlashcardInput.vue';
import { computed } from 'vue';
import { validationRules } from '../../../../constants/validationRules';

export interface IFlashcardForm {
  flashcards?: IFlashcard[];
}

const props = defineProps<IFlashcardForm>();
const emit = defineEmits(['saveFlashcards']);
const flashcards = ref(props.flashcards || [{
  front: '',
  back: '',
}]);
const index = ref(0);

const frontSide = computed(() => flashcards.value[index.value].front);
const backSide = computed(() => flashcards.value[index.value].back);

function add() {
  const flashcard: IFlashcard = {
    front: '',
    back: ''
  };

  flashcards.value.push(flashcard);
  index.value = flashcards.value.length - 1;
}

function remove() {
  const i = index.value;
  flashcards.value.splice(i, 1);
  if (i > 0) {
    index.value--;
  }
}

function moveToPreviousFlashcard() {
  if (index.value > 0) {
    index.value--;
  }
}

function moveToNextFlashcard() {
  if (index.value < flashcards.value.length - 1) {
    index.value++;
  }
}

function updateFlashcards(update: IUpdateContent) {
  const { value, side } = update;
  flashcards.value[index.value][side] = value;
  emit('saveFlashcards', flashcards.value);
}
</script>

<template>
  <section>
    <div class="controls">
      <LeftArrow :class="index > 0 ? '' : 'invisible'" @click="moveToPreviousFlashcard"></LeftArrow>
      <div class="cards">
        <FlashcardInput :content="frontSide" side="front" @update-content="updateFlashcards"></FlashcardInput>
        <FlashcardInput :content="backSide" side="back" @update-content="updateFlashcards"></FlashcardInput>
      </div>
      <RightArrow :class="index < flashcards.length - 1 ? '' : 'invisible'" @click="moveToNextFlashcard"></RightArrow>
    </div>
    <div class="others">
      <p>{{ index + 1 }} / {{ flashcards.length }}</p>
      <v-btn @click.prevent="add" class="add-btn flashcard-btn" color="green">
        <template v-slot:prepend>
          <v-icon icon="mdi-plus"></v-icon>
        </template>
        Add
      </v-btn>
      <v-btn @click.prevent="remove" class="delete-btn flashcard-btn" color="red-darken-4" v-show="flashcards.length > validationRules.deck.flashcards.minimumFlashcards">
        <template v-slot:prepend>
          <v-icon icon="mdi-delete"></v-icon>
        </template>
        Delete
      </v-btn>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-bottom: 180px;
}

.invisible {
  visibility: hidden;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-bottom: 40px;
  gap: 10px;

  .cards {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
}

.others {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  .flashcard-btn {
    width: 300px;
  }
}
</style>