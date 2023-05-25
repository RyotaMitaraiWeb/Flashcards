<script lang="ts" setup>
import type { IDeck } from '../../../../types/components/decks';
import { dateFormatter } from '../../../../util/dateFormatter/dateFormatter';

export interface DeckDetails {
  deck: IDeck;
}

const props = defineProps<DeckDetails>();
const subtitle = dateFormatter(props.deck.createdAt, props.deck.updatedAt);
</script>

<template>
  <v-card :title="deck.title" id="deck-basic-info" :subtitle="subtitle" :text="deck.description">
  </v-card>
</template>

<style scoped lang="scss">
#deck-basic-info {
  width: 700px;
  height: 400px;

  @media screen and (max-width: 420px) {
    width: 300px;
    height: 300px;
  }
}
</style>
