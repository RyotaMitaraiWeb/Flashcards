<script setup lang="ts">
import { ref } from 'vue';
import type { IDeck } from '@/types/components/decks';
import FlashcardBody from '@/components/Flashcard/Body/FlashcardBody.vue';
import FlipCard from '@/components/Flashcard/Flip/FlipCard.vue';
import FlashcardHead from '@/components/Flashcard/Head/FlashcardHead.vue';
import RightArrow from '@/components/Flashcard/Arrows/RightArrow/RightArrow.vue';
import { computed } from 'vue';
import LeftArrow from '@/components/Flashcard/Arrows/LeftArrow/LeftArrow.vue';

export interface IStudySession {
  deck: IDeck;
}

const props = defineProps<IStudySession>();

const flipped = ref(false);
const i = ref(0);

const isBelowMax = computed(() => i.value < props.deck.flashcards.length - 1);
const isAboveMinimum = computed(() => i.value > 0);

function increment() {
  if (isBelowMax.value) {
    if (flipped.value) {
      setTimeout(() => {
        i.value++;
      }, 200);

      flipped.value = false;
    } else {
      i.value++;
    }
  }
}

function decrement() {
  if (isAboveMinimum.value) {
    if (flipped.value) {
      setTimeout(() => {
        i.value--;
      }, 200);

      flipped.value = false;
    } else {
      i.value--;
    }
  }
}
</script>

<template>
  <section id="session">
    <div :class="!isAboveMinimum ? 'invisible' : ''">
      <LeftArrow @decrement="decrement"></LeftArrow>
    </div>
    <div class="cursor">
      <FlipCard v-model="flipped">
        <template v-slot:front>
          <FlashcardHead></FlashcardHead>
          <FlashcardBody big-text bold :content="deck.flashcards[i]['front']"></FlashcardBody>
        </template>
        <template v-slot:back>
          <FlashcardHead></FlashcardHead>
          <FlashcardBody big-text :content="deck.flashcards[i]['back']"></FlashcardBody>
        </template>
      </FlipCard>
    </div>
    <div :class="!isBelowMax ? 'invisible' : ''">
      <RightArrow @increment="increment"></RightArrow>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#session {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;

  @media screen and (max-width: 650px) {
    margin-top: 60px;
    gap: 30px;
  }

  @media screen and (max-width: 360px) {
    margin-top: 90px;
    gap: 20px;
  }
}

.cursor {
  cursor: pointer;
}

.flashcard-body {
  width: 500px;
  height: 500px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  @media screen and (max-width: 895px) {
    width: 400px;
    height: 400px;
  }

  @media screen and (max-width: 650px) {
    width: 200px;
    height: 200px;
  }

  @media screen and (max-width: 360px) {
    width: 150px;
    height: 150px;
  }
}

.flashcard-head {
  width: 500px;
  height: 90px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  @media screen and (max-width: 895px) {
    width: 400px;
  }

  @media screen and (max-width: 650px) {
    width: 200px;
    height: 45px;
  }

  @media screen and (max-width: 360px) {
    width: 150px;
    height: 35px;
  }
}

.invisible {
  visibility: hidden;
}
</style>
