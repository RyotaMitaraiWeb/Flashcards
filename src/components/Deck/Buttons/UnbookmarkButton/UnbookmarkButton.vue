<script setup lang="ts">
import { api } from '../../../../constants/api';
import { HttpStatus } from '../../../../constants/httpstatus';
import { invalidActionsMessages } from '../../../../constants/invalidActionsMessages';
import { successActionsMessages } from '../../../../constants/successActionsMessages';
import { useLoadingStore } from '../../../../stores/loading/loading';
import { useSnackbarStore } from '../../../../stores/snackbar/snackbar';
import type { IHttpError } from '../../../../types/components/IHttpError';
import { del } from '../../../../util/request/request';

export interface IUnbookmarkButton {
  id: number;
}

const props = defineProps<IUnbookmarkButton>();
const snackbar = useSnackbarStore();

const emit = defineEmits(['unbookmark']);
const loadingStore = useLoadingStore();

async function unbookmark() {
  try {
    const { res, data } = await del<IHttpError>(api.endpoints.bookmarks.add(props.id));
    if (res.status === HttpStatus.NO_CONTENT) {
      snackbar.open(successActionsMessages.unbookmarked, 'success');
      emit('unbookmark');
    } else {
      const errors = data!;
      snackbar.open(errors.message, 'error');
    }
  } catch {
    snackbar.open(invalidActionsMessages.requestFailed, 'error');
  }
}
</script>

<template>
  <v-btn :disabled="loadingStore.loading.status" color="grey-darken-3" variant="flat" @click.prevent="unbookmark" class="action-btn unbookmark-btn">
    <template v-slot:prepend>
      <v-icon icon="mdi-bookmark" color="yellow"></v-icon>
    </template>

    Remove bookmark
  </v-btn>
</template>