<script setup lang="ts">
import { useRouter } from 'vue-router';
import { api } from '../constants/api';
import { HttpStatus } from '../constants/httpstatus';
import { invalidActionsMessages } from '../constants/invalidActionsMessages';
import { successActionsMessages } from '../constants/successActionsMessages';
import { useSnackbarStore } from '../stores/snackbar/snackbar';
import type { IHttpError } from '../types/components/IHttpError';
import { del } from '../util/request/request';
import { useUserStore } from '../stores/user/user';
import { onMounted } from 'vue';

const snackbar = useSnackbarStore();
const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  try {
    const { res, data } = await del<IHttpError>(api.endpoints.accounts.logout);

    if (res.status === HttpStatus.NO_CONTENT) {
      router.push('/');
      snackbar.open(successActionsMessages.logout, 'success');

      userStore.restartUser();
      localStorage.removeItem('accessToken');
    } else if (res.status === HttpStatus.UNAUTHORIZED) {
      router.push('/login');
      snackbar.open(data!.message, 'error');
    } else {
      snackbar.open(invalidActionsMessages.requestFailed, 'error');
      router.push('/');
    }
  } catch {
    snackbar.open(invalidActionsMessages.requestFailed, 'error');
    router.push('/');
  }
});
</script>

<template></template>
