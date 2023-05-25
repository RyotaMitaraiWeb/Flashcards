<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../stores/user/user';
import LinkButton from './Actions/LinkButton.vue';
import SettingsButton from './Actions/SettingsButton.vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
  <template v-if="user.id === 0">
    <LinkButton to="/login" icon="mdi-login-variant">Login</LinkButton>
    <LinkButton to="/register" icon="mdi-form-select">Register</LinkButton>
  </template>
  <template v-else>
    <LinkButton to="/decks/own" icon="mdi-account">My decks</LinkButton>
    <LinkButton to="/logout" icon="mdi-logout-variant">Logout</LinkButton>
  </template>

  <SettingsButton></SettingsButton>
</template>
