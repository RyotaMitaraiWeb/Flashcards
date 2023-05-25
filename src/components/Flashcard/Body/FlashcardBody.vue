<script setup lang="ts">
export interface IFlashcardBody {
  content: string;
  bold?: boolean;
  bigText?: boolean;
}

defineProps<IFlashcardBody>();
</script>

<template>
  <template v-if="bold">
    <v-card class="flashcard-body" elevation="12">
      <template v-slot:text>
        <span :class="bigText ? 'text big-text' : 'text'">
          <strong>{{ content }}</strong>
        </span>
      </template>
    </v-card>
  </template>
  <template v-else>
    <v-card class="flashcard-body" elevation="12">
      <template v-slot:text>
        <span :class="bigText ? 'text big-text' : 'text'">
          {{ content }}
        </span>
      </template>
    </v-card>
  </template>
</template>

<style lang="scss" scoped>
.flashcard-body {
  text-align: center;
  display: flex;
  align-items: center;

  .text {
    display: inline-block;
    text-align: left;
  }

  .big-text {
    font-size: 24pt;
    line-height: 1.05;

    @media screen and (max-width: 650px) {
      font-size: 12pt;
    }

    @media screen and (max-width: 360px) {
      font-size: 10pt;
    }
  }
}
</style>
