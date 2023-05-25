<script setup lang="ts">
import { ref } from 'vue';
import { colors } from '../../../../../constants/colors';
import type { palette } from '../../../../../types/store/store';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { computed } from 'vue';

export interface IPaletteOption {
  value: palette;
}

const props = defineProps<IPaletteOption>();

const input = ref<HTMLInputElement>();
const theme = useTheme();

const matchesTheme = computed(
  () =>
    colors[props.value] === theme.themes.value.light.colors.primary ||
    colors[props.value] === theme.themes.value.dark.colors.primary
);

const labels = {
  deepPurple: 'Deep purple',
  indigo: 'Indigo',
  blue: 'Blue',
  green: 'Green',
  blueGrey: 'Blue gray',
  red: 'Red',
  pink: 'Pink',
};

function check() {
  if (input.value && input.value.checked === false) {
    input.value.checked = true;
    changePalette();
  }
}

function changePalette() {
  theme.themes.value.light.colors.primary = colors[props.value];
  theme.themes.value.dark.colors.primary = colors[props.value];

  localStorage.setItem('palette', props.value);
}
</script>

<template>
  <div :class="`option ${matchesTheme ? 'checked' : 'nocheck'}`" @click="check">
    <label
      class="color"
      :for="value"
      :style="{
        background: `${colors[value]}`,
      }"
    >
      {{ labels[value] }}
    </label>
    <input
      :id="value"
      ref="input"
      name="palette"
      type="radio"
      :class="`radio ${value}`"
      :value="value"
      :checked="matchesTheme"
      @change.prevent="changePalette"
    />
    <h2 aria-hidden="true">{{ labels[value] }}</h2>
  </div>
</template>

<style lang="scss" scoped>
.option {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  .color {
    display: block;
    width: 80px;
    height: 30px;
    cursor: pointer;
    border-radius: 30px;
    color: transparent;
    user-select: none;
    transition: border-color 0.2s;
  }

  .radio {
    visibility: hidden;
    position: absolute;
  }

  &.checked .color {
    border: 2px solid yellow;
  }

  &.checked h2 {
    color: #ffc300;
  }

  h2 {
    font-size: 12pt;
    transition: color 0.2s;
  }
}
</style>
