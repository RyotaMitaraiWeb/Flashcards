<script setup lang="ts">
import { ref } from 'vue';
import BasicData from './BasicData/BasicData.vue';
import type { IDeckSubmission, IFlashcard } from '../../../types/components/decks';
import FlashcardForm from './FlashcardForm/FlashcardForm.vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import MobileFlashcardForm from './FlashcardForm/MobileFlashcardForm/MobileFlashcardForm.vue';
import { flashcardValidator } from '../../../util/validators/flashcardValidator/flashcardValidator';
import { deckValidator } from '../../../util/validators/deckValidator/deckValidator';
import type { ValidatorFunction } from '../../../types/util/validators';
import type { ICreatedDeck } from '../../../types/components/decks';
import { useSnackbarStore } from '../../../stores/snackbar/snackbar';
import { validationRules } from '../../../constants/validationRules';
import { post, put } from '../../../util/request/request';
import { api } from '../../../constants/api';
import { invalidActionsMessages } from '../../../constants/invalidActionsMessages';
import { useRouter } from 'vue-router';
import { successActionsMessages } from '../../../constants/successActionsMessages';

export interface IDeckForm {
  deck?: IDeckSubmission;
  context: 'create' | 'edit';
}

const props = defineProps<IDeckForm>();

const title = ref(props.deck?.title || '');
const description = ref(props.deck?.description || '');

const flashcards = ref<IFlashcard[]>(
  props.deck?.flashcards || [
    {
      front: '',
      back: '',
    },
  ]
);

const display = useDisplay();
const width = display.width;

const snackbar = useSnackbarStore();
const router = useRouter();

function setTitle(value: string) {
  title.value = value;
}

function setDescription(value: string) {
  description.value = value;
}

function saveFlashcards(value: IFlashcard[]) {
  flashcards.value = value;
}
const tab = ref<'basic' | 'flashcards'>('basic');

function validate(value: string, ...rules: ValidatorFunction[]) {
  for (const rule of rules) {
    const result = rule(value);
    if (typeof result === 'string') {
      return false;
    }
  }

  return true;
}

function validateDeck() {
  const titleIsValid = validate(
    title.value,
    deckValidator.minTitleLength,
    deckValidator.maxTitleLength
  );
  const descriptionIsValid = validate(description.value, deckValidator.maxDescriptionLength);
  const hasMinimumFlashcards = deckValidator.minFlashcardsAmount(flashcards.value.length);

  if (!(titleIsValid && descriptionIsValid)) {
    tab.value = 'basic';
    snackbar.open('Please correct the title and/or description before proceeding!', 'error');
    return false;
  } else {
    if (!hasMinimumFlashcards) {
      tab.value = 'flashcards';
      snackbar.open(
        `Please add at least ${validationRules.deck.flashcards.minimumFlashcards} card(s) to your deck!`,
        'error'
      );
      return false;
    } else {
      for (let i = 0; i < flashcards.value.length; i++) {
        const flashcard = flashcards.value[i];
        const front = flashcard.front;
        const back = flashcard.back;

        const frontIsValid = validate(
          front,
          flashcardValidator.minSideLength,
          flashcardValidator.maxSideLength
        );
        const backIsValid = validate(
          back,
          flashcardValidator.minSideLength,
          flashcardValidator.maxSideLength
        );

        if (!(frontIsValid && backIsValid)) {
          snackbar.open(`Flashcard #${i + 1} is invalid!`, 'error');
          tab.value = 'flashcards';
          return false;
        }
      }
    }
  }

  return true;
}

async function createDeck() {
  const endpoint =
    props.context === 'create'
      ? api.endpoints.decks.create
      : api.endpoints.decks.edit(props.deck?.id || 0);
  const deckIsValid = validateDeck();
  if (deckIsValid) {
    try {
      const body = {
        title: title.value,
        description: description.value,
        flashcards: flashcards.value,
      };

      let res: Response;
      let data: ICreatedDeck | undefined = undefined;

      if (props.context === 'create') {
        const result = await post<ICreatedDeck>(endpoint, body);
        res = result.res;
        data = result.data;
      } else {
        const result = await put<undefined>(endpoint, body);
        res = result.res;
      }

      if (res.ok) {
        const id = data?.id || props.deck?.id || 0;
        await router.push(`/decks/${id}`);
        const message =
          props.context === 'create'
            ? successActionsMessages.createdDeck
            : successActionsMessages.editedDeck;
        snackbar.open(message, 'success');
      }
    } catch {
      snackbar.open(invalidActionsMessages.requestFailed, 'error');
    }
  }
}
</script>

<template>
  <div class="buttons">
    <v-btn class="tab-btn" @click="tab = 'basic'" aria-label="Manage title and description"
      >Basic Info</v-btn
    >
    <v-btn class="tab-btn" @click="tab = 'flashcards'" aria-label="Manage flashcards"
      >Flashcards</v-btn
    >
  </div>
  <template v-if="tab === 'basic'">
    <h1 v-if="context === 'create'">Create a new deck!</h1>
    <h1 v-else>Edit {{ deck?.title || '' }}!</h1>
    <BasicData
      :title="title"
      :description="description"
      @update-title="setTitle"
      @update-description="setDescription"
    >
    </BasicData>
  </template>
  <template v-else>
    <FlashcardForm
      v-if="width > 768"
      :flashcards="flashcards"
      @save-flashcards="saveFlashcards"
    ></FlashcardForm>
    <MobileFlashcardForm
      v-else
      :flashcards="flashcards"
      @save-flashcards="saveFlashcards"
    ></MobileFlashcardForm>
  </template>
  <v-btn class="submit" color="primary" @click.prevent="createDeck">
    <template v-if="context === 'create'">Create</template>
    <template v-else>Edit</template>
    Deck
  </v-btn>
</template>

<style lang="scss" scoped>
.buttons {
  display: flex;
  width: 100%;
  justify-content: center;
}

h1 {
  margin-top: 10px;
}

.tab-btn {
  width: 50%;
}

.submit {
  width: 300px;
  font-size: 16pt;
  padding-top: 24px;
  padding-bottom: 48px;
  border-radius: 20px;
}
</style>
