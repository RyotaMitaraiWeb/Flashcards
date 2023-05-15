<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';
import type { ValidatorFunction } from '../../types/util/validators';

export interface IField {
  label: string;
  name: string;
  rules?: ValidatorFunction[];
  hint: string;
  type: 'text' | 'password';
  counter?: number;
  displayMaxCounter?: boolean;
  modelValue?: string;
  textarea?: boolean;
}

const emit = defineEmits(['validateField', 'update:modelValue']);

const props = defineProps<IField>();
let errorMessages = ref([] as string[]);

const input = ref(props.modelValue);

async function validate() {
  const errors: string[] = [];
  if (props.rules) {
    for (const fn of props.rules) {
      const result = await fn(input.value || '');
      if (typeof result === 'string') {
        errors.push(result);
      }
    }

    errorMessages.value = errors;
    emit('validateField', errorMessages.value.length === 0);
  }

  emit('update:modelValue', input.value);
}
</script>

<template>
  <template v-if="textarea">
    <v-textarea class="field" :label="props.label" :name="props.name" persistent-hint :hint="props.hint" clearable
      v-model="input" :error-messages="errorMessages" :max-errors="5"
      :counter="props.displayMaxCounter ? props.counter : 'counter'" persistent-counter :type="props.type"
      @update:model-value="validate" auto-grow>

    </v-textarea>
  </template>
  <template v-else>
    <v-text-field class="field" :label="props.label" :name="props.name" persistent-hint :hint="props.hint" clearable
      v-model="input" :error-messages="errorMessages" :max-errors="5"
      :counter="props.displayMaxCounter ? props.counter : 'counter'" persistent-counter :type="props.type"
      @update:model-value="validate">
    </v-text-field>
  </template>
</template>

<style lang="scss" scoped>
.field {
  width: 550px;

  @media screen and (max-width: 600px) {
    width: 300px;
  }
}
</style>