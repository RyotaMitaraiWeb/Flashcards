<script setup lang="ts">
export interface IListToggler {
  modelValue: boolean;
}

defineProps<IListToggler>();
defineEmits(['update:modelValue']);

</script>

<template>
  <v-btn class="list-toggler" :ripple="false" @click="$emit('update:modelValue', !modelValue)">
    <template v-slot:prepend>
      <span class="start">

        {{ modelValue ? 'Close' : 'Open' }} list of flashcards
      </span>
    </template>
    <template v-slot:append>
      <span class="end">
        <v-icon :icon="`${!modelValue ? 'mdi-plus' : 'mdi-minus'}`"></v-icon>
      </span>
    </template>
  </v-btn>
</template>

<style lang="scss" scoped>
.list-toggler {
  width: 90vw;
  display: flex;
  justify-content: space-between;
  font-size: 16pt;
  padding: 32px;
  margin: 10px auto;
}
</style>