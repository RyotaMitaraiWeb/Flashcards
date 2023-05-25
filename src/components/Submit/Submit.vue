<script setup lang="ts">
import { useLoadingStore } from '../../stores/loading/loading';
import { storeToRefs } from 'pinia';
const loadingStore = useLoadingStore();
const { loading } = storeToRefs(loadingStore);

export interface ISubmit {
  icon?: string;
  color?: string;
  disabled?: boolean;
}

const props = defineProps<ISubmit>();
</script>

<template>
  <v-btn
    class="submit-btn"
    :disabled="loading.status || props.disabled"
    variant="flat"
    type="submit"
    size="x-large"
    :prepend-icon="props.icon"
    :color="props.color || 'primary'"
  >
    <slot>Submit</slot>
  </v-btn>
</template>
