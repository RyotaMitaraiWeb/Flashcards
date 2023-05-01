<script setup lang="ts">
import Field from '../components/Field/Field.vue';
import { post } from '../util/request/request';
import type { ICreatedSession } from '../types/components/auth';
import { api } from '../constants/api';
import { HttpStatus } from '../constants/httpstatus';
import { useUserStore } from '../stores/user/user';
import { useRouter } from 'vue-router';
import { useSnackbarStore } from '../stores/snackbar/snackbar';
import { invalidActionsMessages } from '../constants/invalidActionsMessages';
import Submit from '../components/Submit/Submit.vue';
import { useLoadingStore } from '../stores/loading/loading';
import { successActionsMessages } from '../constants/successActionsMessages';

const userStore = useUserStore();
const router = useRouter();
const snackbar = useSnackbarStore();
const loadingStore = useLoadingStore();

document.title = 'Login';

async function login(event: Event) {
  const target = event.target as HTMLFormElement;
  const form = new FormData(target);

  const [username, password] = form.values();

  try {
    const { res, data } = await post<ICreatedSession>(api.endpoints.accounts.login, { username, password });
    if (res.status === HttpStatus.CREATED) {
      const { user, token } = data!;

      userStore.setUser(user);
      localStorage.setItem('accessToken', token);

      router.push('/');
      snackbar.open(successActionsMessages.login, 'success');
    } else {
      if (res.status === HttpStatus.UNAUTHORIZED) {
        snackbar.open(invalidActionsMessages.failedLogin, 'error');
      } else if (res.status === HttpStatus.FORBIDDEN) {
        snackbar.open(invalidActionsMessages.isNotLoggedOut, 'error');
      } else if (res.status >= 500) {
        snackbar.open(invalidActionsMessages.requestFailed, 'error');
      }
    }
  } catch {
    snackbar.open(invalidActionsMessages.requestFailed, 'error');
    loadingStore.stopLoading();
  }
}
</script>

<template>
  <section id="login-section">
    <h1>Login</h1>
    <v-form @submit.prevent="login" id="login">
      <div class="field-section">
        <Field label="Username" name="username" hint="" type="text"></Field>
      </div>
      <div class="field-section">
        <Field label="Password" name="password" hint="" type="password"></Field>
      </div>
      <div class="field-section">
        <Submit icon="mdi-login-variant">Login</Submit>
      </div>
    </v-form>
  </section>
</template>

<style lang="scss" scoped>
section {
  height: 100vh;
  padding-top: 100px;
}

h1 {
  text-align: center;
}

#login {
  display: flex;
  flex-direction: column;
  gap: 10px;

  align-items: center;

  .field-section {
    display: block;
    margin: 0 auto;
  }
}
</style>