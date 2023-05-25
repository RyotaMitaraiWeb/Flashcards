<script setup lang="ts">
import { ref } from 'vue';
import FlashcardHead from '../../../../Flashcard/Head/FlashcardHead.vue';
import { validationRules } from '../../../../../constants/validationRules';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { flashcardValidator } from '../../../../../util/validators/flashcardValidator/flashcardValidator';
import type { IUpdateContent } from '../../../../../types/components/decks';
import { getLocalStorageTheme } from '../../../../../util/localStorageTheme/localStoragePreferences';

export interface IFlashcardInput {
  content: string;
  side: 'front' | 'back';
}

const props = defineProps<IFlashcardInput>();
const emit = defineEmits(['updateContent']);

const input = ref<HTMLInputElement | null>(null);
const theme = useTheme();
const mode = getLocalStorageTheme();

const error = theme.themes.value[mode].colors.error;

const { minSideLength } = flashcardValidator;

function update(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  const value = target.value;

  const content: IUpdateContent = {
    value,
    side: props.side,
  };

  emit('updateContent', content);
}

function focusToInput() {
  input.value?.focus();
}
</script>

<template>
  <div :class="`flashcard-input-wrapper ${side}`">
    <h2 v-if="side === 'front'">Front side</h2>
    <h2 v-else>Back side</h2>
    <v-card class="flashcard-input">
      <FlashcardHead @click="focusToInput"></FlashcardHead>
      <v-card-text @click="focusToInput" class="flashcard-textarea">
        <textarea
          ref="input"
          :class="side === 'front' ? 'bold textarea' : 'textarea'"
          :value="props.content"
          @input.prevent="update"
          :maxlength="validationRules.flashcard.sideMaxLength"
          :aria-label="`Flashcard content for ${side} side`"
        ></textarea>
      </v-card-text>
    </v-card>
    <p>{{ content.length }} / {{ validationRules.flashcard.sideMaxLength }}</p>

    <p
      class="error-text"
      :style="{ color: error }"
      v-show="typeof minSideLength(content) === 'string'"
    >
      Please fill this side!
    </p>
  </div>
</template>

<style lang="scss" scoped>
h2,
p {
  text-align: center;
}
.flashcard-input-wrapper {
  width: 300px;
  height: 300px;

  @media screen and (max-width: 476px) {
    width: 260px;
    height: 260px;
    margin-bottom: 40px;
  }
  .flashcard-input {
    width: 100%;
    height: 300px;
    text-align: center;

    .flashcard-textarea {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 250px;
    }

    textarea {
      width: 100%;
      height: 100%;
      padding: 10px;
      font-size: 1.3rem;
      resize: none;
    }
  }

  .flashcard-head {
    height: 50px;
  }

  .bold {
    font-weight: bold;
  }
}
</style>
