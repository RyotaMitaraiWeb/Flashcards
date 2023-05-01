<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSnackbarStore } from '../../stores/snackbar/snackbar';

const snackbarStore = useSnackbarStore();
const { snackbar } = storeToRefs(snackbarStore);
const { close } = snackbarStore;

const timeout = Number(import.meta.env.VITE_SNACKBAR_TIMEOUT);

</script>

<template>
  <v-snackbar class="snackbar" :timeout="timeout" :color="snackbar.status" multi-line v-model="snackbar.open">
    <template v-if="Array.isArray(snackbar.text)">
      <template v-for="text in snackbar.text">
        <p>{{ text }}</p>
      </template>
    </template>
    <template v-else>
      <p>{{ snackbar.text }}</p>
    </template>

    <template v-slot:actions>
        <v-btn
          variant="text"
          @click="close"
        >
          Close
        </v-btn>
      </template>
  </v-snackbar>
</template>