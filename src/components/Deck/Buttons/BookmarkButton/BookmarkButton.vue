<script setup lang="ts">
import { api } from '../../../../constants/api';
import { HttpStatus } from '../../../../constants/httpstatus';
import { invalidActionsMessages } from '../../../../constants/invalidActionsMessages';
import { successActionsMessages } from '../../../../constants/successActionsMessages';
import { useLoadingStore } from '../../../../stores/loading/loading';
import { useSnackbarStore } from '../../../../stores/snackbar/snackbar';
import type { IHttpError } from '../../../../types/components/IHttpError';
import { post } from '../../../../util/request/request';

export interface IBookmarkButton {
  id: number;
}

const props = defineProps<IBookmarkButton>();
const snackbar = useSnackbarStore();

const emit = defineEmits(['bookmark']);
const loadingStore = useLoadingStore();

async function bookmark() {
  try {
    const { res, data } = await post<IHttpError>(api.endpoints.bookmarks.add(props.id));
    if (res.status === HttpStatus.CREATED) {
      snackbar.open(successActionsMessages.bookmarked, 'success');
      emit('bookmark');
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
  <v-btn
    :disabled="loadingStore.loading.status"
    color="blue-darken-4"
    variant="flat"
    @click.prevent="bookmark"
    class="action-btn bookmark-btn"
  >
    <template v-slot:prepend>
      <v-icon icon="mdi-bookmark"></v-icon>
    </template>

    Bookmark
  </v-btn>
</template>
