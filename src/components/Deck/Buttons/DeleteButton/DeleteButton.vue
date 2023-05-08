<script setup lang="ts">
import { useRouter } from 'vue-router';
import { api } from '../../../../constants/api';
import { HttpStatus } from '../../../../constants/httpstatus';
import type { IHttpError } from '../../../../types/components/IHttpError';
import { del } from '../../../../util/request/request';
import { useSnackbarStore } from '../../../../stores/snackbar/snackbar';
import { successActionsMessages } from '../../../../constants/successActionsMessages';
import { invalidActionsMessages } from '../../../../constants/invalidActionsMessages';
import { useLoadingStore } from '../../../../stores/loading/loading';

export interface IDelete {
  id: number;
  width?: number;
  height?: number;
}

const props = defineProps<IDelete>();
const router = useRouter();
const snackbar = useSnackbarStore();
const loadingStore = useLoadingStore();

async function deleteDeck() {
  try {
    const { res, data } = await del<IHttpError>(api.endpoints.decks.delete(props.id));
    if (res.status === HttpStatus.NO_CONTENT) {
      snackbar.open(successActionsMessages.deletedDeck, 'success');
      await router.push('/');
    } else {
      snackbar.open(data!.message, 'error');

      if (res.status === HttpStatus.UNAUTHORIZED) {
        await router.push('/login');
      } else if (res.status === HttpStatus.NOT_FOUND) {
        await router.push('/404');
      } else {
        await router.push('/');
      }
    }
  } catch {
    snackbar.open(invalidActionsMessages.requestFailed, 'error');
    await router.push('/');
  }
}
</script>

<template>
  <v-btn :disabled="loadingStore.loading.status" variant="flat" color="red" class="delete-btn action-btn" @click.prevent="deleteDeck">
    <template v-slot:prepend>
        <v-icon icon="mdi-trash-can"></v-icon>
      </template>
    Delete
  </v-btn>
</template>

<style lang="scss" scoped>
.delete-btn {
  color: inherit;
  text-decoration: none;
}
</style>