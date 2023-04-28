<script setup lang="ts">
import { useUserStore } from '../../../stores/user/user';
import LinkButton from './Actions/LinkButton.vue';
import SettingsButton from './Actions/SettingsButton.vue';

const userStore = useUserStore();
const user = userStore.user;
const id = user.id;
</script>

<template>
  <template v-if="id === 0">
    <LinkButton to="/login" icon="mdi-login-variant">Login</LinkButton>
    <LinkButton to="/register" icon="mdi-form-select">Register</LinkButton>
  </template>
  <template v-else>
    <LinkButton to="/account/decks" icon="mdi-account">My decks</LinkButton>
    <LinkButton to="/logout" icon="mdi-logout-variant">Logout</LinkButton>
  </template>

  <SettingsButton></SettingsButton>
</template>