<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IFlashcard } from '../../../../../types/components/decks';
import LeftArrow from '../../../../Flashcard/Arrows/LeftArrow/LeftArrow.vue';
import RightArrow from '../../../../Flashcard/Arrows/RightArrow/RightArrow.vue';
import FlashcardInput from '../FlashcardInput/FlashcardInput.vue';
import { validationRules } from '../../../../../constants/validationRules';

const tab = ref<'front' | 'back'>('front');
export interface IFlashcardForm {
  flashcards?: IFlashcard[];
}

const props = defineProps<IFlashcardForm>();
const emit = defineEmits(['saveFlashcards']);

const flashcards = ref(
  props.flashcards || [
    {
      front: '',
      back: '',
    },
  ]
);
const index = ref(0);

const frontSide = computed(() => flashcards.value[index.value].front);
const backSide = computed(() => flashcards.value[index.value].back);

function add() {
  const flashcard: IFlashcard = {
    front: '',
    back: '',
  };

  flashcards.value.push(flashcard);
  index.value = flashcards.value.length - 1;
  tab.value = 'front';
}

function remove() {
  const i = index.value;
  flashcards.value.splice(i, 1);
  if (i > 0) {
    index.value--;
  }

  tab.value = 'front';
}

function moveToPreviousFlashcard() {
  if (index.value > 0) {
    index.value--;
  }

  tab.value = 'front';
}

function moveToNextFlashcard() {
  if (index.value < flashcards.value.length - 1) {
    index.value++;
  }

  tab.value = 'front';
}

function updateFlashcards(update: { side: 'front' | 'back'; value: string }) {
  const { value, side } = update;
  flashcards.value[index.value][side] = value;
  emit('saveFlashcards', flashcards.value);
}
</script>

<template>
  <section>
    <div class="buttons">
      <v-btn
        class="tab-btn"
        @click="tab = 'front'"
        color="primary"
        aria-label="Switch to front side"
        >Front</v-btn
      >
      <v-btn class="tab-btn" @click="tab = 'back'" color="primary" aria-label="Switch to back side"
        >Back</v-btn
      >
    </div>
    <div class="controls">
      <LeftArrow :class="index > 0 ? '' : 'invisible'" @click="moveToPreviousFlashcard"></LeftArrow>
      <div class="cards">
        <FlashcardInput
          v-show="tab === 'front'"
          :content="frontSide"
          side="front"
          @update-content="updateFlashcards"
        >
        </FlashcardInput>
        <FlashcardInput
          v-show="tab === 'back'"
          :content="backSide"
          side="back"
          @update-content="updateFlashcards"
        ></FlashcardInput>
      </div>
      <RightArrow
        :class="index < flashcards.length - 1 ? '' : 'invisible'"
        @click="moveToNextFlashcard"
      ></RightArrow>
    </div>
    <div class="others">
      <p class="count">{{ index + 1 }} / {{ flashcards.length }}</p>
      <v-btn @click.prevent="add" class="add-btn flashcard-btn" color="green">
        <template v-slot:prepend>
          <v-icon icon="mdi-plus"></v-icon>
        </template>
        Add
      </v-btn>
      <v-btn
        @click.prevent="remove"
        class="delete-btn flashcard-btn"
        color="red-darken-4"
        v-show="flashcards.length > validationRules.deck.flashcards.minimumFlashcards"
      >
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  margin-bottom: 50px;
}

.count {
  font-size: 20pt;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 80px;
  @media screen and (max-width: 421px) {
    flex-direction: column;

    .cards {
      margin-bottom: 4em;
    }
  }
}

.invisible {
  visibility: hidden;
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

.tab-btn {
  width: 50%;
  border-radius: 0;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: center;
  .flashcard-btn {
    width: 100%;
  }
}
</style>
