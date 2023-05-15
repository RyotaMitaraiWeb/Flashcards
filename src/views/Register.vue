<!-- eslint-disable vue/multi-word-component-names -->
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
import { accountValidator } from '../util/validators/accountValidator/accountValidator';
import { validationRules } from '../constants/validationRules';
import { ref } from 'vue';
import type { IHttpError } from '../types/components/IHttpError';
import { successActionsMessages } from '../constants/successActionsMessages';

document.title = 'Register';

const usernameIsValid = ref(false);
const passwordIsValid = ref(false);
const username = ref('');
const password = ref('');

const userStore = useUserStore();
const router = useRouter();
const snackbar = useSnackbarStore();
const loadingStore = useLoadingStore();

const maxUsernameLengthRule = validationRules.account.username.maxLength;

const {
  minPasswordLength,
  minUsernameLength,
  maxUsernameLength,
  uniqueUsername,
  alphanumericUsername,
} = accountValidator;

async function register() {
  const body = {
    username: username.value,
    password: password.value,
  }

  try {
    const { res, data } = await post<ICreatedSession>(api.endpoints.accounts.register, body);
    if (res.status === HttpStatus.CREATED) {
      const { user, token } = data!;

      userStore.setUser(user);
      localStorage.setItem('accessToken', token);

      router.push('/');
      snackbar.open(successActionsMessages.register, 'success');
    } else {
      const errors = (data as unknown) as IHttpError;
      if (res.status >= 500) {
        snackbar.open(invalidActionsMessages.requestFailed, 'error');
      } else {
        snackbar.open(errors.message, 'error');
      }
    }
  } catch {
    snackbar.open(invalidActionsMessages.requestFailed, 'error');
    loadingStore.stopLoading();
  }
}

function validateUsername(value: boolean) {
  usernameIsValid.value = value;  
}

function validatePassword(value: boolean) {
  passwordIsValid.value = value;
}
</script>

<template>
  <section id="register-section">
    <h1>Register</h1>
    <v-form @submit.prevent="register" id="register">
      <div class="field-section">
        <Field label="Username" name="username"
          hint="Username must be between 5 and 15 characters long, unique, and alphanumeric" type="text"
          :counter="maxUsernameLengthRule" :rules="[minUsernameLength, maxUsernameLength, alphanumericUsername, uniqueUsername]"
          display-max-counter v-model="username"
          @validate-field="validateUsername"
        >
        </Field>
      </div>
      <div class="field-section">
        <Field label="Password" name="password" hint="Password must be at least 6 characters long" type="password"
          :counter="6" :rules="[minPasswordLength]" v-model="password" @validate-field="validatePassword">
        </Field>
      </div>
      <div class="field-section">
        <Submit icon="mdi-form-select" :disabled="!(usernameIsValid && passwordIsValid)">Register</Submit>
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

#register {
  display: flex;
  flex-direction: column;
  gap: 30px;

  align-items: center;

  .field-section {
    display: block;
    margin: 0 auto;
  }
}
</style>