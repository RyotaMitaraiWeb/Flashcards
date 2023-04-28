<template>
  <RouterLink to="/account/settings">
    <v-btn icon="mdi-cog" color="white" tag="span" variant="plain" class="gear">
    </v-btn>
    <v-tooltip text="Settings" activator="parent" location="bottom right"></v-tooltip>
  </RouterLink>
</template>

<style scoped lang="scss">
.gear {
  opacity: 1;

  &:hover {
    opacity: 0.7;
    background: rgba(255, 255, 255, 0.2);
  }

  &:active {
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>