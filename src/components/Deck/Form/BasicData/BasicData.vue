<script setup lang="ts">
import Field from '../../../Field/Field.vue';
import { deckValidator } from '../../../../util/validators/deckValidator/deckValidator';
import { validationRules } from '../../../../constants/validationRules';
import { ref } from 'vue';
export interface IBasicData {
  title?: string;
  description?: string;
}
const { minTitleLength, maxTitleLength, maxDescriptionLength } = deckValidator;

const props = defineProps<IBasicData>();
const emit = defineEmits(['updateTitle', 'updateDescription']);

const title = ref(props.title || '');
const description = ref(props.description || '');

function setTitle() {
  emit('updateTitle', title.value);
}

function setDescription() {
  emit('updateDescription', description.value);
}
</script>

<template>
  <section>
    <div class="field">
      <Field
        label="Title"
        name="title"
        :rules="[minTitleLength, maxTitleLength]"
        hint="Title must be between 5 and 200 characters long"
        type="text"
        :counter="validationRules.deck.title.maxLength"
        display-max-counter
        v-model="title"
        @update:model-value="setTitle"
      >
      </Field>
    </div>
    <div class="field">
      <Field
        label="Description"
        name="description"
        :rules="[maxDescriptionLength]"
        hint="Description must be no more than 500 characters. Description is optional"
        type="text"
        :counter="validationRules.deck.description.maxLength"
        display-max-counter
        v-model="description"
        @update:model-value="setDescription"
        textarea
      >
      </Field>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.field {
  margin-bottom: 1.5em;
}

section {
  margin-top: 40px;
}
</style>
