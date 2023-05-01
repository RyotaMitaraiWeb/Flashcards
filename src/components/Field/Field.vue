<script setup lang="ts">
import { ref } from 'vue';
import type { ValidatorFunction } from '../../types/util/validators';
import { watch } from 'vue';

export interface IField {
  label: string;
  name: string;
  rules?: ValidatorFunction[];
  hint: string;
  type: 'text' | 'password';
  counter?: number;
  displayMaxCounter?: boolean;
}

const emit = defineEmits(['changeValidStatus'])

const props = defineProps<IField>();
let errorMessages = ref([] as string[]);

const input = ref('');

watch(input, async () => {
  const errors: string[] = [];
  if (props.rules) {
    for (const fn of props.rules) {
      const result = await fn(input.value || '');
      if (typeof result === 'string') {
        errors.push(result);
      }
    }

    errorMessages.value = errors;
    emit('changeValidStatus', errorMessages.value.length === 0);
  }

});
</script>

<template>
  <v-text-field class="field" 
    :label="props.label" 
    :name="props.name"
    persistent-hint 
    :hint="props.hint" 
    clearable 
    v-model="input"
    :error-messages="errorMessages" 
    :max-errors="5" 
    :counter="props.displayMaxCounter ? props.counter : 'counter'"
    persistent-counter 
    :type="props.type"
  >
  </v-text-field>
</template>

<style lang="scss" scoped>
.field {
  width: 550px;

  @media screen and (max-width: 600px) {
    width: 300px;
  }
}
</style>