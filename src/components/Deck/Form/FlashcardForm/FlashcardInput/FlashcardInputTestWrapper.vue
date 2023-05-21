<script setup lang="ts">
import { ref } from 'vue';
import type { IUpdateContent } from '../../../../../types/components/decks';
import FlashcardInput from './FlashcardInput.vue';
interface IFlashcardInput {
  content: string;
  side: 'front' | 'back';
}

const props = defineProps<IFlashcardInput>();

const content = ref(props.content || '');

function updateContent(update: IUpdateContent) {
  content.value = update.value;
}
</script>

<template>
  <FlashcardInput :side="side" :content="content" @update-content="updateContent"></FlashcardInput>
</template>