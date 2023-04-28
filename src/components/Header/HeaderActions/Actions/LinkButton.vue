<script setup lang="ts">
export interface ILinkButton {
  to: string;
  icon: string;
}

const props = defineProps<ILinkButton>();
</script>

<template>
  <RouterLink :to="props.to">
    <v-btn variant="text" theme="light" tag="span" color="white" class="button">
      <template v-slot:prepend>
        <v-icon :icon="props.icon"></v-icon>
      </template>
      <span class="link-text"><slot></slot></span>
    </v-btn>
  </RouterLink>
</template>