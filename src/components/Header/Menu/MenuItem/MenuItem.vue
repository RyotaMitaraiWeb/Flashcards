<script setup lang="ts">
export interface IMenuItem {
  title: string;
  value: string;
  icon: string;
  to: string;
}

const props = defineProps<IMenuItem>();
</script>

<template>
  <RouterLink :to="props.to">
    <v-list-item :title="props.title" :value="props.value" :prepend-icon="props.icon" class="menu-link"></v-list-item>
  </RouterLink>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>