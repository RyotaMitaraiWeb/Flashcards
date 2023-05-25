<script setup lang="ts">
import { colors } from '../../../../constants/colors';
import type { palette } from '../../../../types/store/store';
import PaletteOption from './PaletteOption/PaletteOption.vue';

const colorKeys: palette[] = Object.keys(colors) as palette[];
</script>

<template>
  <form class="palette-picker">
    <template v-for="color in colorKeys" :key="color">
      <PaletteOption :value="color"></PaletteOption>
    </template>
  </form>
</template>

<style lang="scss" scoped>
.palette-picker {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
}
</style>